"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { AssemblyAI } from "assemblyai";
import * as faceapi from "face-api.js";
import toast from "react-hot-toast";

export default function InterviewScreen() {
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

  const client = new AssemblyAI({ apiKey: "43b24f3a62744557bfdc6813f3211783" });

  // Load models and start face detection
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
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
          videoRef.current.width = 640;
          videoRef.current.height = 480;
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
          const canvas = faceapi.createCanvasFromMedia(videoRef.current);
          const displaySize = { 
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight
          };
          faceapi.matchDimensions(canvas, displaySize);

          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          const landmarks = resizedDetections[0].landmarks;
          const nose = landmarks.getNose();
          const nosePosition = nose[3];

          checkAttention(nosePosition.x, displaySize.width);
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
          toast.dismiss(); // Dismiss any active warning toasts
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

  useEffect(() => {
    // This will ensure the warning message updates when isAway changes
    return () => {
      if (!isAway) {
        toast.dismiss();
      }
    };
  }, [isAway]);

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

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Live Interview</h1>

      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs md:max-w-md ${
                msg.type === "user"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-2">
          {isRecording ? (
            <>
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Recording... Speak now (auto-stops after silence)
            </>
          ) : loading ? (
            "Processing your response..."
          ) : (
            "Waiting for question..."
          )}
        </p>
        {isAway && (
          <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded">
            Warning: Please focus on the interview
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 w-40 h-28 border border-gray-300 shadow-lg rounded overflow-hidden bg-black">
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover" 
          muted 
          playsInline 
          width="160"
          height="120"
        />
      </div>
    </div>
  );
}