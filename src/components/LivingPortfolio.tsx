import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { 
  Award, Code, CheckCircle, Plus, Sparkles, User, Briefcase, Download, ShieldCheck,
  Video, Play, Pause, Radio, RefreshCw, VolumeX, AlertCircle, Camera, CheckCircle2, ChevronRight, Check,
  Upload, FileVideo
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  impactWeight: number;
}

export default function LivingPortfolio() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "a1", title: "Compiled project Bio-Scribe Neural Transducers", category: "AI Development", date: "2026-02-14", impactWeight: 15 },
    { id: "a2", title: "Configured 12-Gate Qubit Superpositions", category: "Hardware Physics", date: "2026-03-22", impactWeight: 20 },
    { id: "a3", title: "Mitigated Server Grid Feedback Bypass", category: "Security Ops", date: "2026-05-01", impactWeight: 12 }
  ]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputCat, setInputCat] = useState("AI Development");

  // Candidate Self Introduction Video States
  const [videoPreset, setVideoPreset] = useState(() => localStorage.getItem("nexus_candidate_video_preset") || "preset_1");
  const [videoMode, setVideoMode] = useState<"preset" | "webcam" | "upload">(() => {
    const preset = localStorage.getItem("nexus_candidate_video_preset") || "preset_1";
    if (preset === "custom") {
      return "upload";
    }
    return "preset";
  });
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const [webcamActive, setWebcamActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingCountdown, setRecordingCountdown] = useState(15);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordingSuccess, setRecordingSuccess] = useState(false);

  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const playbackVideoRef = useRef<HTMLVideoElement | null>(null);

  // Camera Access & Live Preview initialization
  const startCamera = async () => {
    try {
      setCameraError(null);
      setRecordedVideoUrl(null);
      setRecordingSuccess(false);
      
      const constraints = {
        video: { width: 320, height: 240, frameRate: 15 },
        audio: true
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      setWebcamActive(true);
      
      setTimeout(() => {
        if (previewVideoRef.current) {
          previewVideoRef.current.srcObject = stream;
          previewVideoRef.current.play().catch(err => console.log("Video preview error:", err));
        }
      }, 100);
    } catch (err: any) {
      console.error("Camera connection failed:", err);
      setCameraError("Camera permission was denied, or camera is occupied. Please verify device permissions.");
    }
  };

  const stopCamera = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    setWebcamActive(false);
    setIsRecording(false);
  };

  const startRecording = () => {
    if (!localStream) return;
    setRecordedChunks([]);
    setRecordingCountdown(15);
    
    try {
      const recorder = new MediaRecorder(localStream, { mimeType: "video/webm;codecs=vp8,opus" });
      setMediaRecorder(recorder);
      
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start MediaRecorder:", err);
      setCameraError("Failed to initialize system recording codec. Using synthetic fallback.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Convert the recorded chunks to Blob and Base64 string for persistent storage
  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        try {
          localStorage.setItem("nexus_candidate_video_base64", base64);
          localStorage.setItem("nexus_candidate_video_preset", "custom");
          setVideoPreset("custom");
          setRecordingSuccess(true);
          window.dispatchEvent(new Event("nexus_video_updated"));
        } catch (err) {
          console.error("Base64 string too large for storage quota:", err);
          alert("Recording too large for localStorage quota. Preserved in temporary session memory!");
        }
      };
      reader.readAsDataURL(blob);
    }
  }, [isRecording, recordedChunks]);

  // Countdown timer logic
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    if (isRecording && recordingCountdown > 0) {
      countdownInterval = setInterval(() => {
        setRecordingCountdown((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [isRecording, recordingCountdown]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream]);

  const selectPreset = (presetName: string) => {
    localStorage.setItem("nexus_candidate_video_preset", presetName);
    setVideoPreset(presetName);
    setRecordingSuccess(false);
    window.dispatchEvent(new Event("nexus_video_updated"));
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processVideoFile = (file: File) => {
    setUploadError(null);
    setRecordingSuccess(false);

    if (!file.type.startsWith("video/")) {
      setUploadError("Invalid file format. Please upload a standard video file (e.g. MP4, WebM).");
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    
    // Create temporary session URL for immediate high-performance playback
    const objectUrl = URL.createObjectURL(file);
    setRecordedVideoUrl(objectUrl);

    // Read to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      try {
        localStorage.setItem("nexus_candidate_video_base64", base64);
        localStorage.setItem("nexus_candidate_video_preset", "custom");
        setVideoPreset("custom");
        setRecordingSuccess(true);
        window.dispatchEvent(new Event("nexus_video_updated"));
      } catch (err) {
        console.warn("Storage quota exceeded, keeping in memory:", err);
        localStorage.setItem("nexus_candidate_video_preset", "custom");
        setVideoPreset("custom");
        setRecordingSuccess(true);
        setUploadError(`⚠️ Video size (${fileSizeMB.toFixed(1)}MB) exceeds browser offline storage quota. Playback works perfectly in this session, but will not persist if you refresh.`);
        window.dispatchEvent(new Event("nexus_video_updated"));
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to parse file. Please try another video.");
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
    setRecordingSuccess(false);
    const sampleUrl = "https://assets.mixkit.co/videos/preview/mixkit-woman-with-futuristic-vr-glasses-41312-large.mp4";
    setRecordedVideoUrl(sampleUrl);
    localStorage.setItem("nexus_candidate_video_base64", sampleUrl);
    localStorage.setItem("nexus_candidate_video_preset", "custom");
    setVideoPreset("custom");
    setRecordingSuccess(true);
    window.dispatchEvent(new Event("nexus_video_updated"));
  };

  // Dynamic portfolio analytics and scoring
  const totalBaseScore = achievements.reduce((acc, current) => acc + current.impactWeight, 50);
  const portfolioScore = Math.min(totalBaseScore, 100);
  const readinessRating = Math.round(portfolioScore * 0.94);

  // Time Series Growth Curve Data for Recharts
  const chartData = [
    { name: "Week 1", score: 50 },
    { name: "Week 2", score: 50 + (achievements[0]?.impactWeight || 0) },
    { name: "Week 3", score: 50 + (achievements[0]?.impactWeight || 0) + 5 },
    { name: "Week 4", score: 50 + (achievements[0]?.impactWeight || 0) + (achievements[1]?.impactWeight || 0) },
    { name: "Week 5", score: portfolioScore - 5 },
    { name: "Week 6", score: portfolioScore }
  ];

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const newAch: Achievement = {
      id: `a-${Date.now()}`,
      title: inputTitle.trim(),
      category: inputCat,
      date: new Date().toISOString().split("T")[0],
      impactWeight: Math.round(Math.random() * 12) + 8
    };

    setAchievements([newAch, ...achievements]);
    setInputTitle("");
  };

  return (
    <div id="living-portfolio-root" className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 min-h-[85vh]">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight flex items-center gap-3">
            <Award className="w-8 md:w-10 h-8 md:h-10 text-luxury-gold animate-pulse" />
            Living Bio-Matrix
          </h2>
          <p className="text-luxury-gray mt-2 text-sm font-light">
            An evolving representation of your future expertise. Add achievements to watch your metrics recalibrate.
          </p>
        </div>

        {/* Recruiter portfolio mode toggle */}
        <button
          id="btn-recruiter-toggle"
          onClick={() => setRecruiterMode(!recruiterMode)}
          className={`px-5 py-2.5 rounded-xl border text-xs font-extrabold tracking-wider uppercase font-mono cursor-pointer flex items-center gap-2 duration-300 transition-all ${
            recruiterMode 
              ? "bg-luxury-gold hover:bg-luxury-gold-hover text-black border-luxury-gold shadow-[0_4px_15px_rgba(154, 165, 255,0.22)]" 
              : "bg-white/5 border-white/10 hover:border-luxury-gold/30 text-luxury-gold"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          {recruiterMode ? "Active: Recruiter View" : "Activate Recruiter View"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {recruiterMode ? (
          /* RECRUITER MODE: Clean premium polished resume layout */
          <motion.div
            key="recruiter-board"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#B4C3FF]/[0.05] backdrop-blur-3xl text-white p-8 md:p-12 rounded-[32px] shadow-2xl border border-white/15 text-left transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-8 gap-6">
              <div>
                <span className="text-xs font-mono text-luxury-gold uppercase tracking-widest font-extrabold">NEXUS SECURE VERIFIED PROFILE</span>
                <h3 className="text-3xl font-extrabold text-white mt-2">Holographic Candidate #2910</h3>
                <p className="text-luxury-gray text-sm mt-1">Interdisciplinary Systems Engineer & Quantum Architect</p>
              </div>
              <div className="flex flex-col items-end text-right">
                <div className="px-4 py-2 bg-black/40 rounded-lg text-luxury-white font-mono text-xs border border-white/10">
                  Vetting Score: <strong className="text-luxury-gold font-extrabold">{portfolioScore}%</strong>
                </div>
                <span className="text-[10px] text-luxury-gray mt-1">Verified via Hyper Ledger #20A9</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-10">
              <div className="md:col-span-8 flex flex-col gap-8">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-luxury-gray mb-4 border-b border-white/5 pb-1">Verified Project Logs</h4>
                  <div className="flex flex-col gap-6">
                    {achievements.map((a) => (
                      <div key={a.id} className="group">
                        <span className="text-[10px] font-mono text-luxury-gold font-bold">{a.date} | {a.category}</span>
                        <h5 className="font-bold text-white text-md mt-0.5">{a.title}</h5>
                        <p className="text-xs text-luxury-gray mt-1 leading-relaxed">Completed active microgigs inside dynamic sandbox containers with strict consensus validation triggers.</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-luxury-gray mb-4 border-b border-white/5 pb-1 font-sans">Cognitive Certifications</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <strong className="block text-white font-bold mb-1">Quantum Superdense Encryption</strong>
                      Full hardware simulation capability.
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <strong className="block text-white font-bold mb-1">MoE Weights Fine-Tuning</strong>
                      Verified parameter quantization expert.
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="bg-black/40 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
                  <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-luxury-gray border-b border-white/5 pb-1">AI Match Matrix</h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-luxury-gray">Enterprise Readiness</span>
                      <span className="font-mono font-bold text-white">{readinessRating}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-luxury-gold" style={{ width: `${readinessRating}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-luxury-gray">Algorithmic Velocity</span>
                      <span className="font-mono font-bold text-white">{portfolioScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-luxury-bronze" style={{ width: `${portfolioScore}%` }} />
                    </div>
                  </div>
                  <button className="w-full py-2 bg-luxury-gold text-black rounded-lg text-xs font-extrabold hover:bg-luxury-gold-hover mt-4 cursor-pointer flex items-center justify-center gap-2 transition-colors border border-luxury-gold">
                    <Download className="w-3.5 h-3.5" /> Direct PDF Export
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* DEFAULT DETAILED IMMERSIVE EXPERIENCE */
          <motion.div
            key="dashboard-board"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
          >
            
            {/* Left: Interactive Score Counters & Live input */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Score Meter Bento Box */}
              <div className="bg-[#B4C3FF]/[0.05] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/[0.01] rounded-full blur-xl" />
                <h3 className="text-white text-md font-mono uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-luxury-gold animate-pulse" />
                  Real-Time AI Portfolio Audit
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-white/10 p-4 rounded-2xl text-center">
                    <span className="text-4xl font-mono font-extrabold text-luxury-gold">{portfolioScore}</span>
                    <span className="text-[10px] text-luxury-gray uppercase tracking-widest block mt-1">Portfolio Strength</span>
                  </div>
                  <div className="bg-black/40 border border-white/10 p-4 rounded-2xl text-center">
                    <span className="text-4xl font-mono font-extrabold text-luxury-bronze">{readinessRating}</span>
                    <span className="text-[10px] text-luxury-gray uppercase tracking-widest block mt-1">AI Alignment Index</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-luxury-white mt-5 leading-relaxed">
                  Your current coordinate configuration shows an outstanding <strong>{readinessRating}%</strong> compatibility match with premium enterprise and future sovereign networks.
                </div>
              </div>

              {/* Configure Self-Introduction Video Panel */}
              <div className="bg-[#0c0c0e] border border-[#AEDFFF]/30 p-6 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col gap-5 text-left">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#AEDFFF]/[0.02] rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <h3 className="text-white text-md font-sans font-bold flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#AEDFFF]" />
                    Candidate Video Matrix
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest mt-1">
                    Manage your 30s self-introduction video node
                  </p>
                </div>

                {/* Selection Presets / Webcam / Upload toggle */}
                <div className="grid grid-cols-3 gap-1 bg-black/40 p-1.5 rounded-xl border border-white/5">
                  <button
                    onClick={() => {
                      stopCamera();
                      setRecordedVideoUrl(null);
                      selectPreset("preset_1");
                      setVideoMode("preset");
                    }}
                    className={`py-2 rounded-lg text-center text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${videoMode === "preset" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    AI Avatar
                  </button>
                  <button
                    onClick={() => {
                      setRecordedVideoUrl(null);
                      setVideoMode("webcam");
                      startCamera();
                    }}
                    className={`py-2 rounded-lg text-center text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${videoMode === "webcam" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    Webcam Studio
                  </button>
                  <button
                    onClick={() => {
                      stopCamera();
                      setRecordedVideoUrl(null);
                      setVideoMode("upload");
                    }}
                    className={`py-2 rounded-lg text-center text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${videoMode === "upload" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    Video Upload
                  </button>
                </div>

                {/* Sub-panels */}
                {videoMode === "preset" && (
                  /* Presets selection view */
                  <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Select Premium Synthetic Preset</span>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => selectPreset("preset_1")}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${videoPreset === "preset_1" ? "border-[#AEDFFF] bg-[#AEDFFF]/5" : "border-white/5 bg-black/20 hover:border-white/10"}`}
                      >
                        <div>
                          <span className="text-xs font-bold text-white block">Node A: AI Neural Avatar</span>
                          <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">Procedural presentation with speech subtitles</span>
                        </div>
                        {videoPreset === "preset_1" && <Check className="w-4 h-4 text-[#AEDFFF]" />}
                      </button>

                      <button
                        onClick={() => selectPreset("preset_2")}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${videoPreset === "preset_2" ? "border-[#AEDFFF] bg-[#AEDFFF]/5" : "border-white/5 bg-black/20 hover:border-white/10"}`}
                      >
                        <div>
                          <span className="text-xs font-bold text-white block">Node B: Quantum Code Streams</span>
                          <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">Abstract coding interface overlay briefing</span>
                        </div>
                        {videoPreset === "preset_2" && <Check className="w-4 h-4 text-[#AEDFFF]" />}
                      </button>
                    </div>

                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[10px] text-zinc-400 leading-relaxed font-mono">
                      ✨ Selected synthetic node is loaded automatically onto your shareable recruiter verified passport view.
                    </div>
                  </div>
                )}

                {videoMode === "webcam" && (
                  /* Webcam View */
                  <div className="flex flex-col gap-3">
                    <div className="relative aspect-video rounded-xl bg-black overflow-hidden border border-white/10 flex flex-col items-center justify-center">
                      
                      {/* Live Camera View */}
                      {webcamActive && !recordedVideoUrl && (
                        <video
                          ref={previewVideoRef}
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Recorded video playback */}
                      {!webcamActive && recordedVideoUrl && (
                        <video
                          ref={playbackVideoRef}
                          src={recordedVideoUrl}
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Not Active Placeholder */}
                      {!webcamActive && !recordedVideoUrl && (
                        <div className="text-center p-4 flex flex-col items-center gap-2">
                          <Camera className="w-8 h-8 text-[#AEDFFF]" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider block">Webcam Node Standby</span>
                          <span className="text-[10px] text-zinc-500 font-sans leading-tight block max-w-[80%]">
                            {localStorage.getItem("nexus_candidate_video_base64") 
                              ? "You have a custom introduction recorded. Press stream to check or re-record."
                              : "Initialize your front-facing device camera stream to record a custom 15s greeting."}
                          </span>
                        </div>
                      )}

                      {/* Recording status overlay */}
                      {isRecording && (
                        <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-white flex items-center gap-1.5 animate-pulse">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span>REC 0:{recordingCountdown.toString().padStart(2, "0")}</span>
                        </div>
                      )}
                    </div>

                    {/* Camera error banner */}
                    {cameraError && (
                      <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-[10px] text-red-200 flex gap-2 items-center">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{cameraError}</span>
                      </div>
                    )}

                    {/* Controls buttons */}
                    <div className="flex gap-2">
                      {!webcamActive && !recordedVideoUrl ? (
                        <>
                          <button
                            onClick={startCamera}
                            className="flex-grow py-2.5 bg-[#AEDFFF] text-black hover:bg-zinc-200 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center block"
                          >
                            Activate Camera Stream
                          </button>
                          {localStorage.getItem("nexus_candidate_video_base64") && (
                            <button
                              onClick={() => {
                                const stored = localStorage.getItem("nexus_candidate_video_base64");
                                if (stored) setRecordedVideoUrl(stored);
                              }}
                              className="py-2.5 px-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-mono transition-colors cursor-pointer"
                            >
                              Play Stored
                            </button>
                          )}
                        </>
                      ) : webcamActive ? (
                        <>
                          {!isRecording ? (
                            <button
                              onClick={startRecording}
                              className="flex-grow py-2.5 bg-red-600 text-white hover:bg-red-500 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                            >
                              Start Recording (15s)
                            </button>
                          ) : (
                            <button
                              onClick={stopRecording}
                              className="flex-grow py-2.5 bg-zinc-800 text-white hover:bg-zinc-700 rounded-xl text-xs font-bold transition-colors cursor-pointer animate-pulse"
                            >
                              Stop & Finalize Stream
                            </button>
                          )}
                          <button
                            onClick={stopCamera}
                            className="py-2.5 px-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={startCamera}
                            className="flex-grow py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                          >
                            Re-record Clip
                          </button>
                          <button
                            onClick={() => {
                              setRecordedVideoUrl(null);
                              stopCamera();
                              setRecordingSuccess(true);
                              // Sync state
                              setVideoPreset("custom");
                            }}
                            className="py-2.5 px-6 bg-[#AEDFFF] text-black hover:bg-zinc-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                          >
                            Save Node
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {videoMode === "upload" && (
                  /* Custom Video File Upload View */
                  <div className="flex flex-col gap-4">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Upload Custom Self-Introduction Video File</span>

                    {/* Hidden input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {/* Drag and Drop Container */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 min-h-[160px] ${
                        isDragging 
                          ? "border-[#AEDFFF] bg-[#AEDFFF]/5 shadow-inner" 
                          : "border-white/10 bg-black/20 hover:border-[#AEDFFF]/40 hover:bg-black/30"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[#AEDFFF]">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Drag and drop your introduction video here</span>
                        <span className="text-[10px] text-zinc-500 font-mono block mt-1">Supports MP4, WebM, MOV (Max 4MB for offline preservation)</span>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer"
                      >
                        BROWSE FILES
                      </button>
                    </div>

                    {/* Quick Demo Sample Video Option */}
                    <div className="p-4 bg-white/[0.02] border border-[#AEDFFF]/20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-3">
                        <FileVideo className="w-8 h-8 text-[#AEDFFF] shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-white block">Need a Sample Video?</span>
                          <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">Test the pipeline instantly with a pre-configured model presentation video</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={loadSampleVideo}
                        className="px-4 py-2 bg-[#AEDFFF] text-black hover:bg-zinc-200 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                      >
                        Load Sample Video
                      </button>
                    </div>

                    {/* Preview Player for currently uploaded video */}
                    {recordedVideoUrl && (
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Live Stream Active Preview</span>
                        <div className="relative aspect-video rounded-xl bg-black overflow-hidden border border-white/10">
                          <video
                            src={recordedVideoUrl}
                            controls
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* File Upload / Size warnings */}
                    {uploadError && (
                      <div className="p-3 bg-amber-950/40 border border-amber-500/20 rounded-xl text-[10px] text-amber-200 flex gap-2 items-center leading-relaxed">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{uploadError}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Save confirmation banner */}
                {recordingSuccess && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-200 flex gap-2 items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Self-introduction video uploaded successfully onto your cryptographic Verified Passport.</span>
                  </div>
                )}
              </div>

              {/* Add Accolade Log Form */}
              <div className="bg-[#B4C3FF]/[0.05] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-2xl">
                <h3 className="text-white text-md font-semibold mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-luxury-gold" /> Log Custom Accolade
                </h3>
                <form onSubmit={handleAddAchievement} className="flex flex-col gap-4">
                  <div>
                    <label className="text-[10px] text-luxury-gray font-mono uppercase tracking-wider block mb-1.5">Achievement Title</label>
                    <input
                      type="text"
                      id="input-accolade-title"
                      value={inputTitle}
                      onChange={(e) => setInputTitle(e.target.value)}
                      placeholder="e.g. Mastered Matrix Quantization models..."
                      className="w-full bg-black/40 border border-white/10 focus:border-luxury-gold/50 text-white rounded-xl p-3 text-xs outline-none focus:bg-black/70 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-luxury-gray font-mono uppercase tracking-wider block mb-1.5">Core Discipline Group</label>
                    <select
                      id="select-accolade-discipline"
                      value={inputCat}
                      onChange={(e) => setInputCat(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 text-white rounded-xl p-3 text-xs outline-none cursor-pointer"
                    >
                      <option value="AI Development" className="bg-black">AI Development</option>
                      <option value="Hardware Physics" className="bg-black">Quantum / Hardware Physics</option>
                      <option value="Security Ops" className="bg-black">Sovereign Security Ops</option>
                      <option value="SocioTech Systems" className="bg-black">SocioTech Systems</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    id="btn-accolade-submit"
                    className="w-full py-3 bg-luxury-gold hover:bg-luxury-gold-hover text-black font-extrabold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer shadow-[0_4px_15px_rgba(154, 165, 255,0.22)] border border-luxury-gold"
                  >
                    Commit to Tensor Database
                  </button>
                </form>
              </div>

            </div>

            {/* Right: Immersive Recharts curve and active chronological milestones */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Graphic container */}
              <div className="bg-[#B4C3FF]/[0.05] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-2xl flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-luxury-gold uppercase tracking-widest">Skill Growth Vector Projections</span>
                  <span className="text-[10px] text-luxury-gold bg-white/5 px-2.5 py-0.5 rounded-md font-mono border border-white/10">CALIBRATING</span>
                </div>
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#AEDFFF" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#AEDFFF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.03} />
                      <XAxis dataKey="name" stroke="#8C8C8C" fontSize={10} tickLine={false} />
                      <YAxis stroke="#8C8C8C" fontSize={10} tickLine={false} domain={[30, 110]} />
                      <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#ffffff1a', borderRadius: '12px', fontSize: '11px', color: '#FAF9FF' }} />
                      <Area type="monotone" dataKey="score" stroke="#AEDFFF" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Milestones timeline logs list */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono text-luxury-gray uppercase tracking-wider px-1">Commit Chronometer History</span>
                <div className="flex flex-col gap-3">
                  <AnimatePresence>
                    {achievements.map((a) => (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 border border-white/10 hover:border-luxury-gold/20 bg-white/5 rounded-2xl flex items-center justify-between gap-4 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-luxury-gold">
                            <Code className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-white text-xs font-bold">{a.title}</span>
                            <span className="text-[10px] text-luxury-gray mt-0.5 font-mono">{a.date} · {a.category}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-luxury-gold font-bold">+{a.impactWeight} V</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
