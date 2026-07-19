import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, Play, Pause, Upload, FileVideo, CheckCircle2, AlertCircle, 
  Sparkles, Trash2, Copy, Check, Radio, Award, Compass, BrainCircuit, 
  FileText, Cpu, Terminal, Users, ExternalLink, RefreshCw, Send, Lock,
  Fingerprint, Eye, Zap, ArrowRight, ShieldCheck, Activity, User, Calendar,
  Bell, Globe, Filter, MessageSquare, Briefcase, ChevronRight
} from "lucide-react";

interface CandidateDashboardOverviewProps {
  user: {
    name: string;
    email: string;
    role: string;
    onboardingData?: {
      interest?: string;
      title?: string;
      bio?: string;
    };
  };
  setCurrentView: (view: string) => void;
}

export default function CandidateDashboardOverview({ user, setCurrentView }: CandidateDashboardOverviewProps) {
  // Video States
  const [videoPreset, setVideoPreset] = useState(() => localStorage.getItem("nexus_candidate_video_preset") || "preset_1");
  const [customVideoBase64, setCustomVideoBase64] = useState<string | null>(() => localStorage.getItem("nexus_candidate_video_base64"));
  const [videoMode, setVideoMode] = useState<"preset" | "upload">(() => {
    const preset = localStorage.getItem("nexus_candidate_video_preset") || "preset_1";
    return preset === "custom" ? "upload" : "preset";
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Video Subtitles Timeline for the mock image/video player
  const mockSubtitles = [
    { time: 0, text: `Decrypting candidate transmission node... Connection secure.` },
    { time: 2, text: `Hello, I'm ${user?.name || "Alex Vane"}, specializing in high-dimensional neural pipelines.` },
    { time: 6, text: `My core expertise is resolving model parameter decay and fine-tuning transformers.` },
    { time: 10, text: `I leverage simulated environment logs to optimize real-world pipeline throughput.` },
    { time: 14, text: `Explore my verified evidence passport to inspect my continuous engineering metrics.` }
  ];

  const [currentSubtitle, setCurrentSubtitle] = useState(mockSubtitles[0].text);

  // Track video progress simulation for the custom placeholder mockup
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Monitor playback if custom video is present
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && videoRef.current) {
      interval = setInterval(() => {
        if (videoRef.current) {
          setCurrentTime(videoRef.current.currentTime);
          const t = videoRef.current.currentTime;
          const sub = mockSubtitles.reduce((acc, curr) => {
            if (t >= curr.time) return curr.text;
            return acc;
          }, mockSubtitles[0].text);
          setCurrentSubtitle(sub);
        }
      }, 250);
    } else if (isPlaying && !customVideoBase64) {
      // Simulate subtitles if playing mock placeholder
      let mockTime = 0;
      interval = setInterval(() => {
        mockTime = (mockTime + 0.5) % 18;
        setCurrentTime(mockTime);
        const sub = mockSubtitles.reduce((acc, curr) => {
          if (mockTime >= curr.time) return curr.text;
          return acc;
        }, mockSubtitles[0].text);
        setCurrentSubtitle(sub);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, customVideoBase64]);

  // Handle Drag & Drop Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processVideoFile = (file: File) => {
    setUploadError(null);
    setUploadSuccess(false);

    if (!file.type.startsWith("video/")) {
      setUploadError("Format Error: Please select or drop a valid video file format (e.g. MP4, WebM, MOV).");
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 15) {
      setUploadError("Payload Warning: Video file exceeds 15MB limit. Please upload a shorter, optimized introduction.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      try {
        localStorage.setItem("nexus_candidate_video_base64", base64);
        localStorage.setItem("nexus_candidate_video_preset", "custom");
        setCustomVideoBase64(base64);
        setVideoPreset("custom");
        setVideoMode("upload");
        setUploadSuccess(true);
        setIsPlaying(true);
        
        // Notify other windows/components
        window.dispatchEvent(new Event("nexus_video_updated"));
      } catch (err) {
        console.warn("Storage threshold exceeded:", err);
        // Exceeds local storage quota, save in memory anyway for high fidelity
        setCustomVideoBase64(base64);
        localStorage.setItem("nexus_candidate_video_preset", "custom");
        setVideoPreset("custom");
        setVideoMode("upload");
        setUploadSuccess(true);
        setUploadError(`⚠️ Payload size (${fileSizeMB.toFixed(1)}MB) exceeds local browser persistent quota. Preview is active, but will reset upon page reload.`);
        window.dispatchEvent(new Event("nexus_video_updated"));
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to parse video data stream. Try another file.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processVideoFile(e.target.files[0]);
    }
  };

  const loadSampleVideo = () => {
    setUploadError(null);
    setUploadSuccess(false);
    const sampleUrl = "https://assets.mixkit.co/videos/preview/mixkit-woman-with-futuristic-vr-glasses-41312-large.mp4";
    setCustomVideoBase64(sampleUrl);
    localStorage.setItem("nexus_candidate_video_base64", sampleUrl);
    localStorage.setItem("nexus_candidate_video_preset", "custom");
    setVideoPreset("custom");
    setVideoMode("upload");
    setUploadSuccess(true);
    setIsPlaying(true);
    window.dispatchEvent(new Event("nexus_video_updated"));
  };

  const clearCustomVideo = () => {
    localStorage.removeItem("nexus_candidate_video_base64");
    localStorage.setItem("nexus_candidate_video_preset", "preset_1");
    setCustomVideoBase64(null);
    setVideoPreset("preset_1");
    setVideoMode("preset");
    setUploadSuccess(false);
    setIsPlaying(false);
    window.dispatchEvent(new Event("nexus_video_updated"));
  };

  // Active Recruiter Handshake state
  const [handshakeState, setHandshakeState] = useState<Record<string, 'idle' | 'successing' | 'completed'>>({});
  const [unlockedState, setUnlockedState] = useState<Record<string, boolean>>({});
  const [scheduledState, setScheduledState] = useState<Record<string, string>>({});
  const [activeTabFilter, setActiveTabFilter] = useState<"all" | "match" | "inbound">("all");
  const [activeScheduleModal, setActiveScheduleModal] = useState<string | null>(null);

  const triggerHandshake = (recruiterId: string) => {
    setHandshakeState(prev => ({ ...prev, [recruiterId]: 'successing' }));
    setTimeout(() => {
      setHandshakeState(prev => ({ ...prev, [recruiterId]: 'completed' }));
    }, 1200);
  };

  const triggerUnlock = (recruiterId: string) => {
    setUnlockedState(prev => ({ ...prev, [recruiterId]: true }));
  };

  const handleConfirmSchedule = (recruiterId: string, timeSlot: string) => {
    setScheduledState(prev => ({ ...prev, [recruiterId]: timeSlot }));
    setActiveScheduleModal(null);
  };

  // Interactive Checklist states
  const isVideoUploaded = !!customVideoBase64 || videoPreset === "custom";
  const checklistItems = [
    { id: "interview", label: "Perform AI Behavioral Simulation", status: true, score: "92/100", actionLabel: "Launch Prep", view: "interview" },
    { id: "galaxy", label: "Calibrate Skill Galaxy Map", status: true, score: "18 Nodes Active", actionLabel: "Map Nodes", view: "galaxy" },
    { id: "video", label: "Configure Video Introduction Node", status: isVideoUploaded, score: isVideoUploaded ? "Live Node" : "Pending Action", actionLabel: "Upload Now", view: "video" },
    { id: "cv", label: "Build Optimized ATS Resume", status: true, score: "Score: 98%", actionLabel: "Edit Resume", view: "portfolio-builder" },
    { id: "road", label: "Consult AI Career Roadmap advisor", status: true, score: "Plan Decrypted", actionLabel: "Coach Advisor", view: "coach" },
  ];

  const totalCompleted = checklistItems.filter(item => item.status).length;
  const progressPercent = Math.round((totalCompleted / checklistItems.length) * 100);

  // Recruiter activities list with richer real-world signal structures
  const [recruiterActivities, setRecruiterActivities] = useState([
    { 
      id: "r1", 
      company: "Apple AI Systems", 
      agent: "Sarah Jenkins (Talent Partner)", 
      logoLetter: "A",
      logoBg: "bg-zinc-800 text-white",
      time: "2h ago", 
      query: "Searched 'Transformer Weight Alignment'", 
      match: "98% Match",
      matchVal: 98,
      status: "Inbound Review",
      details: "Sarah Jenkins has requested access to inspect your AI Interview simulator score reports.",
      isInbound: true
    },
    { 
      id: "r2", 
      company: "Stripe Core Engine", 
      agent: "Marcus Vance (Staff Recruiter)", 
      logoLetter: "S",
      logoBg: "bg-indigo-950 text-indigo-400 border border-indigo-500/20",
      time: "5h ago", 
      query: "Downloaded Verified PDF Credentials", 
      match: "94% Match",
      matchVal: 94,
      status: "Inbound Inquiry",
      details: "Marcus Vance is reviewing your low-latency incident resolution times from your Workstation simulation lab.",
      isInbound: true
    },
    { 
      id: "r3", 
      company: "OpenAI Core Team", 
      agent: "Aether Scout Node", 
      logoLetter: "O",
      logoBg: "bg-emerald-950 text-emerald-400 border border-emerald-500/20",
      time: "1 day ago", 
      query: "Queried 'Multi-Agent Workflow Simulation'", 
      match: "100% Match",
      matchVal: 100,
      status: "Active Handshake Request",
      details: "System flagged high interest query matching all 18 active skill competency nodes.",
      isInbound: false
    },
    { 
      id: "r4", 
      company: "Google DeepMind", 
      agent: "Sienna Drake (HR Lead)", 
      logoLetter: "G",
      logoBg: "bg-blue-950 text-blue-400 border border-blue-500/20",
      time: "2 days ago", 
      query: "Calibrated low-latency interview logs", 
      match: "96% Match",
      matchVal: 96,
      status: "Inbound Review",
      details: "Talent team requested authentication to view your live recorded self introduction stream.",
      isInbound: true
    },
  ]);

  // Recruiter Simulator Function
  const [simulatingPing, setSimulatingPing] = useState(false);
  const simulateNewSignal = () => {
    setSimulatingPing(true);
    setTimeout(() => {
      const companies = [
        { name: "Meta AI Research", letter: "M", bg: "bg-blue-900/50 text-blue-300 border border-blue-500/30", agent: "Elena Rostova (Lead Sourcer)", query: "Queried 'Distributed Parameter Scaling'", match: "97% Match", matchVal: 97 },
        { name: "Anthropic Safety Node", letter: "A", bg: "bg-amber-950 text-amber-400 border border-amber-500/20", agent: "Clara Chen (Safety Architect recruiter)", query: "Inspected AI Simulation transcripts", match: "95% Match", matchVal: 95 },
        { name: "Tesla Autopilot Core", letter: "T", bg: "bg-red-950 text-red-400 border border-red-500/20", agent: "David Vance (Talent Lead)", query: "Analyzed Workstation benchmark metrics", match: "99% Match", matchVal: 99 },
        { name: "NVIDIA Quantum Systems", letter: "N", bg: "bg-lime-950 text-lime-400 border border-lime-500/20", agent: "Jason Kim (Staff Sourcer)", query: "Searched 'GPU Memory Bound Architecture'", match: "93% Match", matchVal: 93 }
      ];

      const chosen = companies[Math.floor(Math.random() * companies.length)];
      const newId = `r_${Date.now()}`;
      
      const newSignal = {
        id: newId,
        company: chosen.name,
        agent: chosen.agent,
        logoLetter: chosen.letter,
        logoBg: chosen.bg,
        time: "Just now",
        query: chosen.query,
        match: chosen.match,
        matchVal: chosen.matchVal,
        status: "Live Connection",
        details: `Freshly captured telemetry signal. Recruiter is viewing your cryptographic passport node!`,
        isInbound: true
      };

      setRecruiterActivities(prev => [newSignal, ...prev]);
      setSimulatingPing(false);
    }, 1000);
  };

  // Filtered Activities
  const filteredActivities = recruiterActivities.filter(act => {
    if (activeTabFilter === "match") return act.matchVal >= 96;
    if (activeTabFilter === "inbound") return act.isInbound;
    return true;
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* 1. Header Hero Banner with Circular Progress and Verifiable Status */}
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900/80 via-neutral-900 to-luxury-gold/5 border border-luxury-gold/30 p-6 md:p-10 rounded-[32px] shadow-2xl hover:border-luxury-gold/50 transition-all duration-300">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-luxury-gold/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-4 right-6 bg-luxury-gold/10 text-luxury-gold text-[10px] font-mono uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-luxury-gold/20 font-extrabold">
          ⭐ PASSIVE VERIFIED STATUS
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 max-w-5xl">
          <div className="flex flex-col gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shadow-inner shrink-0">
                <Shield className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-gold/80 block font-bold">NEXUS VERIFIED SYSTEM BLOCK</span>
                <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-[#FAF9FF] tracking-tight mt-0.5">
                  Verified Career Passport Hub
                </h3>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed mt-2 max-w-2xl font-light">
              Your decentralized career footprint is active and verified. The system aggregates metrics from real workstation simulation labs and secure AI audio interview loops into a tamper-proof cryptographic passport for prime recruiters.
            </p>
            
            {/* Live passport verification badge */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">🟢 TRANSMITTING CRYPTO ID: NEXUS-SECURE-992B</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Fingerprint className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] font-mono text-slate-400">PASSPORT READINESS: {progressPercent}%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[240px] items-center justify-center bg-black/40 border border-white/5 p-6 rounded-2xl">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Circular progress bar */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-neutral-800"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-[#AEDFFF]"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={2 * Math.PI * 34 * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-sm font-mono font-bold text-white">{progressPercent}%</span>
            </div>
            
            <button 
              onClick={() => setCurrentView("passport")}
              className="w-full py-2.5 bg-[#AEDFFF] text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Open Career Passport
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Dashboard Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full text-left">
        
        {/* LEFT COLUMN: Video Intro Studio & Readiness Matrix */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Candidate Self Introduction Studio Card */}
          <div className="bg-[#09090b]/80 border border-white/10 rounded-[28px] p-6 shadow-xl relative text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#AEDFFF]/[0.02] rounded-full blur-xl pointer-events-none" />
            
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-luxury-gold">
                <Radio className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold font-black">Video Transmission Node</span>
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight">Recruiter Verified Video Intro</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Add an authentic face and voice to your verified records. Recruiter dashboards play this video alongside your cryptographic scorecards instantly.
              </p>
            </div>

            {/* Video Player Showcase */}
            <div className="relative aspect-video rounded-2xl bg-black overflow-hidden border border-white/10 group mb-6 flex items-center justify-center">
              
              {customVideoBase64 ? (
                // Real Video Player
                <video
                  ref={videoRef}
                  src={customVideoBase64}
                  className="w-full h-full object-cover"
                  playsInline
                  controls={isPlaying}
                  onClick={() => setIsPlaying(!isPlaying)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ) : (
                // Ultra Premium Aesthetic Mockup Placeholder with play overlays and HUD
                <>
                  {/* Mock Background Graphic with elegant layout & abstract gradient */}
                  <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
                    {/* Abstract technical backdrop representation */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900 via-zinc-950 to-neutral-900 opacity-90" />
                    <div className="absolute inset-0 bg-[radial-gradient(#1c1c1e_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                    
                    {/* Simulated avatar preview image inside the mockup */}
                    <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#AEDFFF]/20 to-neutral-950 blur-3xl pointer-events-none opacity-40 animate-pulse" />
                    
                    {/* Tech visual card showing user information inside the simulated video */}
                    <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-[#AEDFFF] mb-2.5 shadow-xl">
                        <User className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-white tracking-wider block">{user?.name || "Alex Vane"}</span>
                      <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 uppercase tracking-widest">{user?.onboardingData?.title || "AI Core Synaptic Architect"}</span>
                      <div className="mt-2.5 flex items-center gap-1.5 bg-neutral-900/80 border border-[#AEDFFF]/30 px-3 py-1 rounded-full">
                        <Zap className="w-2.5 h-2.5 text-[#AEDFFF] animate-bounce" />
                        <span className="text-[8px] font-mono text-[#AEDFFF] font-bold uppercase">PRE-RECORDED AI DEMO PRESENTATION</span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal visual scanlines */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
                </>
              )}

              {/* Secure Decryption Overlay HUD */}
              <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#AEDFFF]/20 text-[9px] font-mono text-[#AEDFFF] flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>DECRYPTED DEEP-STUDIO LINK</span>
              </div>

              {/* Play Pause Button Overlay on simulated container */}
              {(!customVideoBase64 || !isPlaying) && (
                <button
                  onClick={() => {
                    if (customVideoBase64 && videoRef.current) {
                      videoRef.current.play().catch(() => {});
                    }
                    setIsPlaying(true);
                  }}
                  className="absolute z-30 w-16 h-16 rounded-full bg-white text-black hover:bg-zinc-200 flex items-center justify-center cursor-pointer transition-transform duration-300 transform hover:scale-105 shadow-2xl active:scale-95"
                >
                  <Play className="w-5 h-5 fill-black ml-0.5 text-black" />
                </button>
              )}

              {/* Subtitles Overlay during playback */}
              {isPlaying && (
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/80 backdrop-blur-sm border border-white/10 p-2.5 rounded-xl text-center">
                  <p className="text-white text-[11px] font-sans leading-relaxed">
                    {currentSubtitle}
                  </p>
                </div>
              )}

              {/* Live Playback Indicator HUD (when simulating play) */}
              {isPlaying && !customVideoBase64 && (
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded border border-white/10 text-[9px] font-mono text-white">
                  <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                  <span>PLAYING DEMO STREAM</span>
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="ml-1 hover:text-red-400 font-bold"
                  >
                    [PAUSE]
                  </button>
                </div>
              )}
            </div>

            {/* Custom Interactive File Uploader Dock */}
            <div className="flex flex-col gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Video Node Management</span>
                {customVideoBase64 && (
                  <button
                    onClick={clearCustomVideo}
                    className="text-[9px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer transition-all border border-red-500/10 hover:border-red-500/20 px-2 py-1 rounded-lg"
                  >
                    <Trash2 className="w-3 h-3" /> Disconnect Video
                  </button>
                )}
              </div>

              {/* Drag and Drop Box */}
              {!customVideoBase64 && (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 min-h-[120px] ${
                    isDragging 
                      ? "border-[#AEDFFF] bg-[#AEDFFF]/5 shadow-inner" 
                      : "border-white/10 bg-black/20 hover:border-[#AEDFFF]/40 hover:bg-black/30"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[#AEDFFF]">
                    <Upload className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Drop or select self-introduction video</span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">Supports MP4, WebM, MOV. Max 10MB</span>
                  </div>
                  <button
                    type="button"
                    className="px-2.5 py-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-[9px] font-bold font-mono transition-all cursor-pointer"
                  >
                    BROWSE STORAGE
                  </button>
                </div>
              )}

              {/* Sample Loader */}
              {!customVideoBase64 && (
                <div className="flex flex-col sm:flex-row items-center justify-between p-3 bg-white/[0.01] border border-[#AEDFFF]/10 rounded-xl gap-2">
                  <div className="flex items-center gap-2.5">
                    <FileVideo className="w-6 h-6 text-[#AEDFFF] shrink-0" />
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-white block">Test with Demo Presenter</span>
                      <span className="text-[8px] text-zinc-400 font-mono block">Instantly load pre-configured high-fidelity video sample</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={loadSampleVideo}
                    className="px-3 py-1 bg-[#AEDFFF] hover:bg-zinc-200 text-black rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Load Sample
                  </button>
                </div>
              )}

              {/* Alerts & Notifications */}
              {uploadSuccess && (
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-[9px] text-emerald-200 flex gap-2 items-center leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Aligned to passport channels successfully. Recruiter feeds updated in real-time!</span>
                </div>
              )}

              {uploadError && (
                <div className="p-2.5 bg-amber-950/40 border border-amber-500/20 rounded-xl text-[9px] text-amber-200 flex gap-2 items-start leading-relaxed">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Circular Verification Checklist / Readiness Matrix */}
          <div className="bg-[#09090b]/80 border border-white/10 rounded-[28px] p-6 shadow-xl relative text-left">
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-[#AEDFFF]">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold">Passport Readiness Matrix</span>
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight">Ecosystem Milestones</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Unlock higher search visibility brackets by resolving verification tasks.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {checklistItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                    item.status 
                      ? "bg-emerald-950/[0.04] border-emerald-500/10 hover:border-emerald-500/20" 
                      : "bg-white/[0.01] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      item.status 
                        ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20" 
                        : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                    }`}>
                      {item.status ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Lock className="w-3 h-3" />}
                    </div>
                    <div className="text-left">
                      <span className={`text-[11px] font-bold block ${item.status ? "text-emerald-100" : "text-zinc-400"}`}>
                        {item.label}
                      </span>
                      <span className={`text-[8px] font-mono block mt-0.5 ${item.status ? "text-emerald-400" : "text-zinc-600"}`}>
                        {item.score}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (item.view === "video") {
                        setVideoMode("upload");
                      } else {
                        setCurrentView(item.view);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wide transition-all uppercase font-mono shrink-0 cursor-pointer ${
                      item.status 
                        ? "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5" 
                        : "bg-white text-black hover:bg-zinc-200 border border-white"
                    }`}
                  >
                    {item.actionLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Recruiting Signals (Significant Upgrade) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Main Active Recruiter Signal Hub Card */}
          <div className="bg-[#09090b]/80 border border-white/10 rounded-[32px] p-6 md:p-8 shadow-2xl relative text-left">
            {/* Pulsing signal background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.02] rounded-full blur-2xl pointer-events-none" />
            
            {/* Title / Description */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-extrabold text-emerald-400">
                    LIVE RECRUITER SIGNAL RADAR
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-white tracking-tight mt-1">
                  Active Recruiting Signals
                </h4>
                <p className="text-xs text-slate-400 font-light mt-1">
                  Secure cryptographic pipeline monitoring active talent sourcers reviewing your skill nodes, simulating technical matches, and requesting secure handshakes.
                </p>
              </div>

              {/* Recruiter Simulator Ping Button */}
              <button
                onClick={simulateNewSignal}
                disabled={simulatingPing}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/10 hover:from-emerald-500/30 hover:to-teal-500/20 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl text-xs font-bold transition-all shadow-[0_4px_15px_rgba(16,185,129,0.1)] flex items-center justify-center gap-2 cursor-pointer self-start md:self-center shrink-0"
              >
                {simulatingPing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>CALIBRATING BEAM...</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5 animate-bounce" />
                    <span>Simulate Incoming Signal</span>
                  </>
                )}
              </button>
            </div>

            {/* Premium Analytics Banner inside the Signals Card */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col gap-1 text-left">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">TOTAL SIGNALS</span>
                <span className="text-xl md:text-2xl font-sans font-black text-white">{recruiterActivities.length}</span>
                <span className="text-[8px] font-mono text-emerald-400 mt-0.5">🟢 ACTIVE BROADCAST</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col gap-1 text-left">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">PEAK MATCH VALUE</span>
                <span className="text-xl md:text-2xl font-sans font-black text-[#AEDFFF]">100%</span>
                <span className="text-[8px] font-mono text-zinc-400 mt-0.5">OPENAI CORE NODE</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col gap-1 text-left">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">DECRYPTIONS GIVEN</span>
                <span className="text-xl md:text-2xl font-sans font-black text-white">
                  {Object.keys(unlockedState).length}
                </span>
                <span className="text-[8px] font-mono text-[#AEDFFF] mt-0.5">SECURE KEY SHARING</span>
              </div>
            </div>

            {/* Standard Signal Filter Bar */}
            <div className="flex items-center justify-between gap-4 mb-5 bg-black/40 p-2 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
                <button
                  onClick={() => setActiveTabFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTabFilter === "all" 
                      ? "bg-white/10 text-white" 
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  All Alerts ({recruiterActivities.length})
                </button>
                <button
                  onClick={() => setActiveTabFilter("match")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTabFilter === "match" 
                      ? "bg-white/10 text-white" 
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  High Match (&gt;=96%)
                </button>
                <button
                  onClick={() => setActiveTabFilter("inbound")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTabFilter === "inbound" 
                      ? "bg-white/10 text-white" 
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Inbound Review ({recruiterActivities.filter(a => a.isInbound).length})
                </button>
              </div>

              <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
                RADAR REFRESH RATE: 1.5S
              </div>
            </div>

            {/* Live Signals Stream List */}
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {filteredActivities.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center bg-black/20 border border-white/5 rounded-2xl"
                  >
                    <Users className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                    <span className="text-xs text-zinc-400 font-bold block">No matching signals captured</span>
                    <span className="text-[10px] text-zinc-600 font-mono mt-1">Adjust filters or click "Simulate Incoming Signal" to boot transmission</span>
                  </motion.div>
                ) : (
                  filteredActivities.map((act) => {
                    const isUnlocked = !!unlockedState[act.id];
                    const hasScheduled = scheduledState[act.id];
                    const isHandshaking = handshakeState[act.id] === 'successing';
                    const isHandshaked = handshakeState[act.id] === 'completed';

                    return (
                      <motion.div
                        layout
                        key={act.id}
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="p-5 rounded-2xl bg-gradient-to-b from-[#121214] to-[#09090b] border border-white/10 hover:border-[#AEDFFF]/30 transition-all flex flex-col gap-4 relative shadow-sm hover:shadow-md"
                      >
                        {/* Event Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {/* Standard Corporate Monogram Logo */}
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-base ${act.logoBg} shrink-0`}>
                              {act.logoLetter}
                            </div>
                            
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white block">
                                  {act.company}
                                </span>
                                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">
                                  {act.status}
                                </span>
                              </div>
                              <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                                {act.agent}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <span className="text-[10px] text-[#AEDFFF] bg-[#AEDFFF]/10 px-2 py-0.5 rounded-lg font-mono font-bold tracking-tight">
                              {act.match}
                            </span>
                            <span className="text-[9px] text-zinc-500 font-mono">
                              {act.time}
                            </span>
                          </div>
                        </div>

                        {/* Query Logs and Telemetry Information */}
                        <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-left">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 mb-1">
                            <Terminal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>DECRYPTED QUERY PATTERN:</span>
                          </div>
                          <span className="text-xs text-white font-mono bg-white/5 px-2 py-1 rounded inline-block select-all">
                            {act.query}
                          </span>
                          <p className="text-[11px] text-zinc-400 mt-2 font-sans font-light leading-relaxed">
                            {act.details}
                          </p>
                        </div>

                        {/* Standard Recruiter Handshake Action Drawer */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3 mt-1">
                          
                          {/* Left-aligned state display based on unlock/schedule state */}
                          <div className="flex items-center gap-2">
                            {isUnlocked ? (
                              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 px-2.5 py-1 rounded-md border border-emerald-500/20 flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>UNLOCKED SECURE CONTACT</span>
                              </div>
                            ) : (
                              <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                                <Lock className="w-3 h-3 text-zinc-600" />
                                <span>Private credentials cryptographically locked</span>
                              </div>
                            )}

                            {hasScheduled && (
                              <div className="text-[10px] font-mono text-[#AEDFFF] bg-[#AEDFFF]/10 px-2.5 py-1 rounded-md border border-[#AEDFFF]/20 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>INTERVIEW BOOKED: {hasScheduled}</span>
                              </div>
                            )}
                          </div>

                          {/* Right-aligned actions */}
                          <div className="flex items-center gap-2">
                            
                            {/* Unlock Private Details Button */}
                            {!isUnlocked && (
                              <button
                                onClick={() => triggerUnlock(act.id)}
                                className="text-[10px] font-mono text-[#AEDFFF] hover:text-white border border-[#AEDFFF]/30 hover:border-white px-3 py-1.5 rounded-lg transition-all cursor-pointer bg-transparent hover:bg-[#AEDFFF]/10 flex items-center gap-1.5"
                                title="Approve access request to decrypt and transmit your real verified contact details."
                              >
                                <Lock className="w-3 h-3" />
                                <span>Grant Decryption access</span>
                              </button>
                            )}

                            {/* Book/Schedule Meeting Button (enabled after unlock) */}
                            {isUnlocked && !hasScheduled && (
                              <div className="relative">
                                <button
                                  onClick={() => setActiveScheduleModal(activeScheduleModal === act.id ? null : act.id)}
                                  className="text-[10px] font-mono text-white hover:text-black bg-white/5 hover:bg-white border border-white/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <Calendar className="w-3 h-3 text-inherit" />
                                  <span>Schedule Meeting</span>
                                </button>

                                {/* Simple Inline Time Picker Drawer */}
                                {activeScheduleModal === act.id && (
                                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-neutral-900 border border-white/10 p-2.5 rounded-xl shadow-2xl z-50 flex flex-col gap-1.5">
                                    <span className="text-[9px] font-mono text-zinc-400 block mb-1 uppercase tracking-wider">Select Available Block</span>
                                    {["Today at 4:30 PM", "Tomorrow at 10:00 AM", "Friday at 2:00 PM"].map((slot) => (
                                      <button
                                        key={slot}
                                        onClick={() => handleConfirmSchedule(act.id, slot)}
                                        className="text-[10px] text-left text-zinc-300 hover:text-white hover:bg-white/5 p-1.5 rounded transition-all cursor-pointer"
                                      >
                                        {slot}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Verification Handshake trigger */}
                            {isHandshaked ? (
                              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/25 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>HANDSHAKE SECURED</span>
                              </div>
                            ) : isHandshaking ? (
                              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg">
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-inherit" />
                                <span>AUTHENTICATING BEAM...</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => triggerHandshake(act.id)}
                                className="text-[10px] font-mono text-white bg-neutral-800 hover:bg-neutral-700 hover:text-[#AEDFFF] border border-white/5 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Secure Handshake</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
