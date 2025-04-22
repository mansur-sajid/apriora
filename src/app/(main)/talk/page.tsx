import { InterviewHeader } from "./components/Header";
import { VideoFeed } from "./components/VideoFeed";
import { ChatTranscript } from "./components/Transcript";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import SpaceBarIcon from '@mui/icons-material/SpaceBar';

export default function InterviewPage() {
  return (
      <Box className="w-screen p-6 flex gap-5 h-screen" style={{ backgroundColor: "#101a25" }}>
        <Box className="w-3/4">
        <InterviewHeader />
        
        <div className="mt-1">
        <VideoFeed />
          
        </div>
        <div className="flex justify-center mt-3">
      <IconButton
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          },
          borderRadius: '10px', // Circular button
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          width: '200px',
        }}
      >
        <SpaceBarIcon className="text-white"/>
      </IconButton>
    </div>
        </Box>
        <Box className="w-1/4">
          <ChatTranscript />
          </Box>
          
      </Box>
  );
}