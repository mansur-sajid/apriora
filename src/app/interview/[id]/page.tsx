"use client";

import { useParams, notFound, useRouter } from "next/navigation";
// import { useInterviewQuery } from "@apriora/titan/gql-client";
// import { toGlobalId } from "@apriora/titan/gql-client";
import { useState, useRef, useEffect } from "react";

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params?.id as string;
  const [hasMediaAccess, setHasMediaAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // const { data } = useInterviewQuery(
  //   { id: toGlobalId("Interview", interviewId) },
  //   { enabled: !!interviewId }
  // );

  const checkPermissionsAndStartMedia = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideo = devices.some(
        (device) => device.kind === "videoinput" && device.label
      );
      const hasAudio = devices.some(
        (device) => device.kind === "audioinput" && device.label
      );

      if (hasVideo && hasAudio) {
        await startMediaStream();
      }
    } catch (error) {
      console.error("Error checking media permissions:", error);
    }
  };

  const startMediaStream = async () => {
    setIsLoading(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setHasMediaAccess(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert(
        "Could not access camera/microphone. Please check your permissions."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const startInterview = () => {
    router.push(`/interview/${interviewId}/start`);
  };

  useEffect(() => {
    checkPermissionsAndStartMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  if (!interviewId) return notFound();



  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Interview Preparation</h1>
      <p className="mb-6">Interview ID: {interviewId}</p>

      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          {!hasMediaAccess && (
            <button
              onClick={startMediaStream}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md ${
                isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {isLoading ? "Checking..." : "Enable Camera & Microphone"}
            </button>
          )}

          <button
            onClick={startInterview}
            disabled={!hasMediaAccess}
            className={`px-4 py-2 rounded-md ${
              !hasMediaAccess ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
}
