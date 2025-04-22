"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
  Box,
  Button,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  MobileStepper,
  IconButton
} from "@mui/material";
import { CheckCircle, Videocam, Mic, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params?.id as string;
  const [activeStep, setActiveStep] = useState(0);
  const [videoGranted, setVideoGranted] = useState(false);
  const [audioGranted, setAudioGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const steps = [
    { 
      name: "Camera Access", 
      icon: <Videocam fontSize="large" />,
      action: requestCameraPermission,
      description: "Please allow access to your camera for video recording",
      completed: videoGranted,
      buttonText: "Allow Camera Access"
    },
    { 
      name: "Microphone Access", 
      icon: <Mic fontSize="large" />,
      action: requestMicrophonePermission,
      description: "Please allow access to your microphone for audio recording",
      completed: audioGranted,
      buttonText: "Allow Microphone Access"
    },
    {
      name: "Ready to Start",
      icon: <CheckCircle fontSize="large" />,
      description: "You're all set! Click below to begin your interview",
      completed: videoGranted && audioGranted,
      buttonText: "Start Interview"
    }
  ];

  async function requestCameraPermission() {
    setIsLoading(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setVideoGranted(true);
      setStream(mediaStream);
      handleNext();
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Camera access is required for the interview.");
    } finally {
      setIsLoading(false);
    }
  }

  async function requestMicrophonePermission() {
    setIsLoading(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: videoGranted, // Keep video if already granted
        audio: true
      });
      
      setAudioGranted(true);
      setStream(mediaStream);
      handleNext();
    } catch (error) {
      console.error("Microphone access denied:", error);
      alert("Microphone access is required for the interview.");
    } finally {
      setIsLoading(false);
    }
  }

  const startInterview = () => {
    router.push(`/interview/${interviewId}/start`);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleCurrentAction = () => {
    if (activeStep === 0) return requestCameraPermission();
    if (activeStep === 1) return requestMicrophonePermission();
    if (activeStep === 2) return startInterview();
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  if (!interviewId) return notFound();

  const progressValue = ((videoGranted ? 1 : 0) + (audioGranted ? 1 : 0)) / 2 * 100;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Interview Preparation
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={progressValue} 
        sx={{ my: 3, height: 10, borderRadius: 5, backgroundColor: '#f5f5f5', // Light gray background (optional)
          }}
      />

      <Card sx={{ minHeight: 300, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ mb: 3, color: steps[activeStep].completed ? 'success.main' : 'primary.main' }}>
            {steps[activeStep].completed ? <CheckCircle fontSize="large" color="success" /> : steps[activeStep].icon}
          </Box>
          <Typography variant="h5" gutterBottom textAlign="center">
            {steps[activeStep].name}
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>
            {steps[activeStep].description}
          </Typography>
        </CardContent>

        <MobileStepper
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1, bgcolor: 'background.default' }}
          nextButton={
            <Button
              size="small"
              onClick={handleCurrentAction}
              disabled={isLoading}
              variant="contained"
            >
              {isLoading ? 'Processing...' : steps[activeStep].buttonText}
              {activeStep < steps.length - 1 && <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <IconButton
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0 || isLoading}
            >
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      </Card>
    </Box>
  );
}