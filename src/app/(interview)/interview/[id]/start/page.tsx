"use client";

import { useEffect, useState, useRef } from "react";
import { useParams , useRouter} from "next/navigation";
import { AssemblyAI } from "assemblyai";
import * as faceapi from "face-api.js";
import toast from "react-hot-toast";
import { InterviewHeader } from "../../../../(main)/talk/components/Header";
import { VideoFeed } from "../../../../(main)/talk/components/VideoFeed";
import { ChatTranscript } from "../../../../(main)/talk/components/Transcript";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import { useInterviewQuery, toGlobalId } from "@apriora/titan/gql-client";

export default function InterviewPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState<{ type: string; text: string; audio?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAway, setIsAway] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const audioQueueRef = useRef<{ audio: string; messageType: string }[]>([]);
  const isPlayingRef = useRef(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioTypeRef = useRef<string | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const faceCheckInterval = useRef<NodeJS.Timeout | null>(null);
  const lookAwayStartTime = useRef<number | null>(null);
  const warningGiven = useRef(false);
  const { data } = useInterviewQuery({ id: toGlobalId("Interview", String(id)) });
  const router = useRouter();
  const interview = data?.interviews.edges[0]?.node;
  console.log("Interview data:", interview);

  const client = new AssemblyAI({ apiKey: "43b24f3a62744557bfdc6813f3211783" });

  // Load models and start face detection
  useEffect(() => {
    const loadModels = async () => {
      try {
         faceapi.nets.tinyFaceDetector.loadFromUri('/models');
         faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        startVideo();
      } catch (error) {
        console.error("Error loading face detection models:", error);
      }
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
          };
        }

        detectFaces();
      } catch (error) {
        console.error("Error accessing camera:", error);
        toast.error("Camera access denied. Please enable camera for this interview.");
      }
    };

    const detectFaces = async () => {
      if (!videoRef.current || videoRef.current.readyState < 2) {
        faceCheckInterval.current = setTimeout(detectFaces, 100);
        return;
      }

      try {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks();

        if (detections.length > 0) {
          const landmarks = detections[0].landmarks;
          const nose = landmarks.getNose();
          const nosePosition = nose[3];

          checkAttention(nosePosition.x, videoRef.current.videoWidth);
        } else {
          handleLookAway();
        }
      } catch (error) {
        console.error("Face detection error:", error);
      }

      faceCheckInterval.current = setTimeout(detectFaces, 300);
    };

    const checkAttention = (noseX: number, videoWidth: number) => {
      const center = videoWidth / 2;
      const deviation = Math.abs(noseX - center);
      const threshold = videoWidth * 0.25;
    
      if (deviation > threshold) {
        handleLookAway();
      } else {
        // User is looking back - reset all warning states
        lookAwayStartTime.current = null;
        if (warningGiven.current || isAway) {
          warningGiven.current = false;
          setIsAway(false);
          toast.dismiss();
        }
      }
    };

    const handleLookAway = () => {
      const now = Date.now();
      
      if (!lookAwayStartTime.current) {
        lookAwayStartTime.current = now;
      } else if (now - lookAwayStartTime.current > 5000 && !warningGiven.current) {
        toast.error("Please focus on the interview and look at the screen");
        warningGiven.current = true;
        setIsAway(true);
      }
    };

    loadModels();

    return () => {
      if (faceCheckInterval.current) clearTimeout(faceCheckInterval.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    audioElementRef.current = new Audio();
    audioElementRef.current.onended = handleAudioEnd;

    const ws = new WebSocket(`wss://prototype-apriora.duckdns.org/ws/interview/${id}/`);
    ws.onopen = () => console.log("✅ WebSocket connected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "text_message") {
        setMessages((prev) => [...prev, {
          type: data.is_ai ? "bot" : "user",
          text: data.text
        }]);
      } 
      if (data.type === "tts_audio") {
        audioQueueRef.current.push({
          audio: data.audio_chunk,
          messageType: data.message_type,
        });
        if (data.message_type === 'question') {
          currentAudioTypeRef.current = data.message_type;
        }
        if (data.message_type === 'interview_complete') {
          const checkAndRedirect = () => {
            if (!isPlayingRef.current && audioQueueRef.current.length === 0) {
              cleanup();
              router.push(`/interview/${id}/completed`);
            }
          };
        
          // Poll the queue after each second until it's done
          const interval = setInterval(() => {
            if (!isPlayingRef.current && audioQueueRef.current.length === 0) {
              clearInterval(interval);
              checkAndRedirect();
            }
          }, 500);
        
          // Also check immediately in case everything is already done
          checkAndRedirect();
        }
        if (!isPlayingRef.current) {
          playNextAudio();
        }
      }
    };

    ws.onclose = () => console.log("❌ WebSocket disconnected");
    socketRef.current = ws;

    return () => {
      cleanup();
      ws.close();
    };
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && isRecording) {
        stopRecording();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRecording]);

  const handleAudioEnd = () => {
    isPlayingRef.current = false;
    if (audioQueueRef.current.length > 0) {
      playNextAudio();
    } else {
      currentAudioTypeRef.current = null;
      startRecording();
    }
  };

  const cleanup = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.onended = null;
    }
    stopRecording();
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    // Reset attention states
    lookAwayStartTime.current = null;
    warningGiven.current = false;
    setIsAway(false);
    toast.dismiss();
  };

  const playNextAudio = () => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current) return;

    const nextAudio = audioQueueRef.current.shift();
    if (!nextAudio || !audioElementRef.current) return;

    isPlayingRef.current = true;
    audioElementRef.current.src = `data:audio/mp3;base64,${nextAudio.audio}`;
    audioElementRef.current.play().catch((e) => {
      console.error("Audio playback failed:", e);
      isPlayingRef.current = false;
      playNextAudio();
    });
  };

  const startRecording = async () => {
    try {
      if (isRecording) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }
          silenceTimerRef.current = setTimeout(() => {
            stopRecording();
          }, 3000);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        await processAudio(audioBlob);
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }
      };

      mediaRecorder.start(250);
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        const transcript = await client.transcripts.transcribe({ audio: base64Audio });

        if (transcript.status === "error") {
          console.error("🚨 Transcription error:", transcript.error);
          return;
        }

        const transcribedText = transcript.text;
        setMessages((prev) => [...prev, { type: "user", text: transcribedText }]);

        if (socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ response: transcribedText }));
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (err) {
      console.error("Error processing audio:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpaceButtonClick = () => {
    if (isRecording) {
      stopRecording();
    }
  };

  return (
    <Box className="w-screen p-6 flex gap-5 h-screen" style={{ backgroundColor: "#101a25" }}>
      <Box className="w-3/4">
        <InterviewHeader position={interview?.jobPostApplication.jobPost.title}/>
        
        <div className="mt-1">
          <VideoFeed videoRef={videoRef} isAway={isAway} />
        </div>
        
        <div className="flex justify-center mt-3">
          <IconButton
            onClick={handleSpaceButtonClick}
            sx={{
              backgroundColor: isRecording ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: isRecording ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
              },
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              width: '200px',
            }}
          >
            <SpaceBarIcon className="text-white"/>
            {isRecording && (
              <span className="ml-2 text-white text-xs">Stop Recording</span>
            )}
          </IconButton>
        </div>
      </Box>
      
      <Box className="w-1/4">
        <ChatTranscript messages={messages} loading={loading} isRecording={isRecording} position={interview?.jobPostApplication.jobPost.title} company={interview?.jobPostApplication.jobPost.company.name}/>
      </Box>
    </Box>
  );
}