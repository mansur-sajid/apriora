"use client";

import { useRef } from 'react';

interface VideoFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isAway: boolean;
}

export const VideoFeed = ({ videoRef, isAway }: VideoFeedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-800 rounded-lg w-full overflow-hidden"
      style={{
        paddingBottom: '45%', // 16:9 aspect ratio
        height: 0,
      }}
    >
      {/* Video element for camera feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
      />

      {/* AI avatar overlay */}
      <div className="absolute bottom-3 right-3 w-16 h-16 rounded-md overflow-hidden shadow-lg border-2 border-white/30 backdrop-blur-sm">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-xs">AI</span>
        </div>
      </div>

      {/* Warning indicator when user looks away */}
      {isAway && (
        <div className="absolute top-3 left-3 bg-yellow-500/90 text-white px-3 py-1 rounded-md text-sm font-medium">
          Please look at the screen
        </div>
      )}
    </div>
  );
};