"use client"

import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from "next/navigation";

const VideoLandingPage: NextPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const router = useRouter();
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  useEffect(() => {
    const attemptPlay = () => {
      videoRef.current?.play().catch(() => setIsVideoLoaded(true));
    };
    
    attemptPlay();
    window.addEventListener('click', attemptPlay);
    return () => window.removeEventListener('click', attemptPlay);
  }, []);

  // Reusable component for NAXIORA text with gradient and font
  const NaxioraText = ({ text = "NAXIORA" }: { text?: string }) => (
    <span 
      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
      style={{ fontFamily: "'Axle BC', sans-serif", letterSpacing: '2px' }}
    >
      {text}
    </span>
  );

  return (
    <>
      <Head>
        <title>Naxiora</title>
        <meta name="description" content="Revolutionize hiring with Naxiora's AI recruiter that automates interviews and candidate evaluation" />
        <link rel="preload" href="/background.mp4" as="video" />
        <link href="https://fonts.cdnfonts.com/css/axle-bc" rel="stylesheet" />
      </Head>

      {/* Fixed video background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating Contact Button */}
      <button 
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40 flex items-center space-x-2"
        onClick={() => setShowEmailPopup(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>Contact</span>
      </button>

      {/* Email Popup */}
      {showEmailPopup && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowEmailPopup(false)}
        >
          <div 
            className="bg-gradient-to-br from-blue-600/90 to-purple-600/90 p-6 rounded-xl shadow-2xl max-w-md mx-4 relative animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setShowEmailPopup(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
            <div className="flex items-center justify-center space-x-2 bg-white/10 p-4 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a 
                href="mailto:info@naxiora.com" 
                className="text-xl font-mono text-white hover:underline"
              >
                info@naxiora.com
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable content container */}
      <div className="relative min-h-screen w-full pt-20 pb-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center text-center px-4 text-white animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              Welcome to <NaxioraText />
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed animate-slide-up delay-100">
              The Future of AI-Powered Recruitment
            </p>
            <div className="animate-bounce mt-12 animate-fade-in delay-300">
              <svg 
                className="w-10 h-10 mx-auto text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 px-4 max-w-6xl mx-auto animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-slide-up">
              How <NaxioraText /> Works
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-lg animate-slide-up delay-100">
                <h3 className="text-2xl font-semibold mb-4 text-blue-200">For Candidates</h3>
                <ol className="space-y-4 text-lg list-decimal list-inside">
                  <li className="pb-2 border-b border-white/10 animate-fade-in delay-200">Apply to job postings</li>
                  <li className="pb-2 border-b border-white/10 animate-fade-in delay-300">Select preferred interview time</li>
                  <li className="pb-2 border-b border-white/10 animate-fade-in delay-400">Receive email confirmation with interview link</li>
                  <li className="pb-2 border-b border-white/10 animate-fade-in delay-500">Interview with our AI recruiter SARA</li>
                  <li className="animate-fade-in delay-600">Get timely updates on your application</li>
                </ol>
              </div>

              <div className="bg-white/5 p-6 rounded-lg animate-slide-up delay-200">
                <h3 className="text-2xl font-semibold mb-4 text-blue-200">For Employers</h3>
                <ol className="space-y-4 text-lg list-decimal list-inside">
                  <li className="pb-2 border-b border-white/10 animate-fade-in delay-300">Post your job requirements</li>
                  <li className="pb-2 border-b border-white/10 animate-fade-in delay-400">Candidates apply and self-schedule</li>
                  <li className="pb-2 border-b border-white/10 animate-fade-in delay-500">SARA conducts AI-powered interviews</li>
                  <li className="pb-2 border-b border-white/10 animate-fade-in delay-600">Receive comprehensive candidate reports</li>
                  <li className="animate-fade-in delay-700">Make informed hiring decisions</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* SARA AI Section */}
        <section className="py-16 px-4 max-w-4xl mx-auto text-white text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
            Meet <span className="text-purple-300">SARA</span> - Your AI Interviewer
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 animate-slide-up delay-100">
            <p className="text-xl mb-6 animate-fade-in">
              SARA conducts intelligent, structured interviews with:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
              <li className="bg-white/5 p-6 rounded-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-blue-600/30 hover:scale-105 hover:shadow-lg hover:border hover:border-blue-400/50 cursor-pointer animate-pop-in delay-200">
                Introductory Questions
              </li>
              <li className="bg-white/5 p-6 rounded-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-purple-600/30 hover:scale-105 hover:shadow-lg hover:border hover:border-purple-400/50 cursor-pointer animate-pop-in delay-300">
                Experience Evaluation
              </li>
              <li className="bg-white/5 p-6 rounded-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-pink-600/30 hover:scale-105 hover:shadow-lg hover:border hover:border-pink-400/50 cursor-pointer animate-pop-in delay-400">
                Technical Assessments
              </li>
            </ul>
          </div>
          <p className="text-xl animate-fade-in delay-500">
            Each interview concludes with a detailed report including candidate strengths, weaknesses, and hiring recommendations.
          </p>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-16 px-4 max-w-2xl mx-auto text-center text-white animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl mb-8 animate-fade-in delay-100">
            Join the future of recruitment with <NaxioraText text="Naxiora" />&apos;s AI-powered platform.
          </p>
          <button onClick={() => router.push("/login")} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg animate-jump animate-infinite animate-duration-[2000ms] animate-delay-200">
            Try It Now
          </button>
        </section>
      </div>

      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/axle-bc');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          60% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes jump {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          40% {
            transform: translateY(-15px) scale(1.05);
          }
          60% {
            transform: translateY(-5px) scale(1.02);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-pop-in {
          animation: popIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .animate-jump {
          animation: jump 2s ease-in-out;
        }
        
        .animate-infinite {
          animation-iteration-count: infinite;
        }
        
        .animate-duration-\[2000ms\] {
          animation-duration: 2000ms;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
};

export default VideoLandingPage;