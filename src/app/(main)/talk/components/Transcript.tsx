"use client";

import { Typography, Avatar, Box } from "@mui/material";
import { ControlButtons } from "./ControlButtons";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from 'date-fns';

interface Message {
  type: string;
  text: string;
  time?: string;
}

interface ChatTranscriptProps {
  messages: Message[];
  loading: boolean;
  isRecording: boolean;
  company: string;
  position: string;
}

export const ChatTranscript = ({ messages, loading, isRecording, company, position }: ChatTranscriptProps) => {
  const [selected, setSelected] = useState<'info' | 'people' | 'message'>('message');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositions = useRef({
    message: 0,
    info: 0,
    people: 0
  });

  // Store scroll position before tab change
  const handleTabChange = (newTab: 'info' | 'people' | 'message') => {
    if (containerRef.current) {
      scrollPositions.current[selected] = containerRef.current.scrollTop;
    }
    setSelected(newTab);
  };

  // Restore scroll position after tab change
  useEffect(() => {
    if (containerRef.current) {
      const timer = setTimeout(() => {
        containerRef.current!.scrollTop = scrollPositions.current[selected];
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  // Auto-scroll to bottom for new messages in message tab
  useEffect(() => {
    if (selected === 'message') {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, loading, selected]);

  const formatTime = (date?: Date) => {
    return format(date || new Date(), 'h:mm a');
  };

  const participants = [
    { name: "You", image: "/umer.jpeg" },
    { name: "AI Interviewer", image: "/ai.jpeg" },
  ];

  const renderContent = () => {
    if (selected === 'message') {
      return (
        <>
          <Typography
            variant="subtitle1"
            className="font-bold mb-4 text-center"
            sx={{ fontWeight: 600 }}
          >
            Interview Transcript
          </Typography>

          <div className="space-y-3" ref={containerRef}>
            <AnimatePresence>
              {messages?.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.type === "bot" && (
                    <div className="flex gap-2 max-w-[80%]">
                      <div>
                        <Typography variant="caption" className="text-gray-500">
                          {msg.time || formatTime()}
                        </Typography>
                        <motion.div 
                          className="mt-1 px-3 py-2 bg-gray-100 rounded-lg rounded-tl-none"
                          initial={{ x: -20 }}
                          animate={{ x: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Typography variant="body2">{msg.text}</Typography>
                        </motion.div>
                      </div>
                    </div>
                  )}
                  {msg.type === "user" && (
                    <div className="max-w-[80%]">
                      <div className="flex justify-end">
                        <Typography variant="caption" className="text-gray-500 mr-2">
                          {msg.time || formatTime()}
                        </Typography>
                      </div>
                      <motion.div
                        className="mt-1 px-3 py-2 bg-blue-600 text-white rounded-lg rounded-tr-none"
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Typography variant="body2">{msg.text}</Typography>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="px-3 py-2 bg-gray-100 rounded-lg rounded-tl-none">
                  <Typography variant="body2">Processing your response...</Typography>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </>
      );
    } else if (selected === 'info') {
      return (
        <div ref={containerRef}>
        <>
          <Typography variant="subtitle1" className="font-bold mb-4 text-center" sx={{ fontWeight: 600 }}>
            Interview Information
          </Typography>
          <Box className="space-y-4 p-4">
            <div>
              <Typography variant="body2" className="text-gray-500">Position:</Typography>
              <Typography variant="body1">{position}</Typography>
            </div>
            <div>
              <Typography variant="body2" className="text-gray-500">Company:</Typography>
              <Typography variant="body1">{company}</Typography>
            </div>
            <div>
              <Typography variant="body2" className="text-gray-500">Status:</Typography>
              <Typography variant="body1">
                {isRecording ? "Recording in progress" : "Waiting for question"}
              </Typography>
            </div>
          </Box>
        </>
        </div>
      );
    } else if (selected === 'people') {
      return (
        <div ref={containerRef}>
        <>
          <Typography variant="subtitle1" className="font-bold mb-4 text-center" sx={{ fontWeight: 600 }}>
            Participants
          </Typography>
          <div className="space-y-5 mt-4">
            {participants?.map((participant, index) => (
              <div key={index} className="flex items-center gap-3 px-4">
                <Avatar src={participant.image} alt={participant.name} />
                <div>
                  <Typography variant="body1" className="font-medium">
                    {participant.name}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {participant.name === "You" ? "Candidate" : "AI Interviewer"}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg">
        {renderContent()}
      </div>
      <div className="mt-auto">
        <ControlButtons 
          selected={selected} 
          setSelected={handleTabChange} 
        />
      </div>
    </div>
  );
};