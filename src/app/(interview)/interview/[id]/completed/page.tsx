"use client";
import { useGetInterviewSumaryMutation } from "@/libs/gql-client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const InterviewCompleted = () => {
  const { id } = useParams();
  const router = useRouter();
  const { mutateAsync: getInterviewSummary } = useGetInterviewSumaryMutation();
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Function to stop all media tracks
    const stopAllMediaTracks = () => {
      // Stop any previously stored stream
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        mediaStreamRef.current = null;
      }

      // Get all active media streams from the browser
      // Note: This might not work in all browsers due to privacy restrictions
      try {
        const tracks = window.document.querySelectorAll('video, audio');
        tracks.forEach((mediaElement: HTMLMediaElement) => {
          if (mediaElement.srcObject) {
            const stream = mediaElement.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            mediaElement.srcObject = null;
          }
        });
      } catch (error) {
        console.log("Could not access media elements:", error);
      }
    };

    // First stop any active media
    stopAllMediaTracks();

    // Then fetch interview summary
    const fetchInterviewSummary = async () => {
      try {
        const response = await getInterviewSummary({ interviewId: id });
        console.log("Interview Summary:", response);
      } catch (error) {
        console.error("Error fetching interview summary:", error);
      }
    };

    fetchInterviewSummary();

    // Cleanup function to stop media tracks when component unmounts
    return () => {
      stopAllMediaTracks();
    };
  }, [id, getInterviewSummary]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-xl bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          We appreciate you taking the time to complete the interview.
        </p>
        <p className="text-md text-gray-600 mb-6">
          The camera and microphone have been released. A detailed summary of your responses will be sent to the recruiter shortly.
        </p>
        <p
          className="text-sm text-gray-600 underline cursor-pointer"
          onClick={() => router.push("/")}
        >
          Go to home
        </p>
      </div>
    </div>
  );
};

export default InterviewCompleted;