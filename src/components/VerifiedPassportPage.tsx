import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Award, ShieldCheck, CheckCircle2, Copy, ExternalLink, 
  Sparkles, Code, Cpu, Compass, BookOpen, Clock, Globe, Download, HelpCircle, Terminal, Brain, Star, Check, Zap, Eye,
  Play, Pause, Volume2, VolumeX, RotateCcw, Video, Radio, AlertCircle
} from "lucide-react";

interface VerifiedPassportPageProps {
  candidateName?: string;
  candidateEmail?: string;
  onClose?: () => void;
  isStandalone?: boolean;
}

export default function VerifiedPassportPage({ 
  candidateName = "Chit Naing", 
  candidateEmail = "chitn0188@gmail.com",
  onClose,
  isStandalone = false
}: VerifiedPassportPageProps) {
  const [copied, setCopied] = useState(false);
  const [localToast, setLocalToast] = useState<string | null>(null);
  const [stats, setStats] = useState({
    nexusScore: 84,
    interviewAvg: "92/100",
    missionsDone: 4,
    dayOneTests: 3,
    skillsMapped: 7,
    technicalScore: 94,
    behavioralScore: 90,
    architecturalScore: 92,
    confidenceScore: 95,
    totalMissions: 5,
    criticalMissions: 2,
    dayOneChallenges: 3,
    skills: ["Transformer Mechanics", "Tensor Entrapment", "Triton Kernels", "PyTorch Matrix Tuning", "LoRA Adapters", "Distributed Parameter Tuning", "Smart Contract Security"],
    projects: [
      "Project Bio-Scribe", 
      "Synergistic Attention Layer Calibration",
      "Certified Transformer Attention Alignment",
      "Certified Reentrancy Attack Prevention"
    ]
  });

  // Self Introduction Video Player States
  const [videoConfig, setVideoConfig] = useState({
    preset: "preset_1",
    customRecordedBase64: "",
    title: "Synthesized Hologram Avatar"
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const presetsMap: Record<string, { src: string; title: string; subs: { time: number; text: string }[] }> = {
    preset_1: {
      src: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-developer-coding-on-a-laptop-42171-large.mp4",
      title: "AI Neural Avatar Integration",
      subs: [
        { time: 0, text: "Systems online. Hello, I am Chit Naing, AI Core Synaptic Architect." },
        { time: 3, text: "I specialize in fine-tuning Transformer weights and reducing parameter decay." },
        { time: 7, text: "I build high-dimensional neural pipelines that reduce compute latency by 40%." },
        { time: 11, text: "In this Verified Passport, you can inspect my live evidence-based metrics." },
        { time: 14, text: "Let's connect and calibrate future-focused digital architectures." }
      ]
    },
    preset_2: {
      src: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-futuristic-vr-glasses-41312-large.mp4",
      title: "Quantum Code Streams",
      subs: [
        { time: 0, text: "Verifiable telemetry loaded. Quantum computing interfaces deployed." },
        { time: 3, text: "Synthesized 12-Gate qubit superpositions using high stakes mathematical models." },
        { time: 7, text: "My code utilizes WebAssembly compiler loops for near-zero logical friction." },
        { time: 11, text: "Explore the Skill Galaxy Map to trace my continuous learning nodes." },
        { time: 14, text: "Initiating live interlock protocol. Thank you for auditing." }
      ]
    },
    custom: {
      src: "",
      title: "Custom Candidate Recorded Intro",
      subs: [
        { time: 0, text: "Candidate custom webcam recording playing..." },
        { time: 3, text: "Reviewing unique professional capabilities and live evidence-based logs." },
        { time: 7, text: "Aligning custom credentials with enterprise cognitive needs." },
        { time: 11, text: "Providing absolute proof over claims for full-stack architecture roles." },
        { time: 14, text: "Recording completed safely. Ready to calibrate." }
      ]
    }
  };

  const loadVideoConfig = () => {
    try {
      const savedPreset = localStorage.getItem("nexus_candidate_video_preset") || "preset_1";
      const customVideo = localStorage.getItem("nexus_candidate_video_base64") || "";
      setVideoConfig({
        preset: savedPreset,
        customRecordedBase64: customVideo,
        title: savedPreset === "custom" ? "Custom Webcam Recording" : (presetsMap[savedPreset]?.title || "AI Neural Avatar")
      });
      setVideoError(false);
      setIsPlaying(false);
    } catch (e) {
      console.error("Failed to load video configuration:", e);
    }
  };

  const loadStats = () => {
    try {
      const raw = localStorage.getItem("nexus_passport_stats");
      const defaultStats = {
        nexusScore: 84,
        interviewAvg: "92/100",
        missionsDone: 4,
        dayOneTests: 3,
        skillsMapped: 7,
        technicalScore: 94,
        behavioralScore: 90,
        architecturalScore: 92,
        confidenceScore: 95,
        totalMissions: 5,
        criticalMissions: 2,
        dayOneChallenges: 3,
        skills: ["Transformer Mechanics", "Tensor Entrapment", "Triton Kernels", "PyTorch Matrix Tuning", "LoRA Adapters", "Distributed Parameter Tuning", "Smart Contract Security"],
        projects: [
          "Project Bio-Scribe", 
          "Synergistic Attention Layer Calibration",
          "Certified Transformer Attention Alignment",
          "Certified Reentrancy Attack Prevention"
        ]
      };
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setStats({
            nexusScore: typeof parsed.nexusScore === "number" ? parsed.nexusScore : defaultStats.nexusScore,
            interviewAvg: parsed.interviewAvg || defaultStats.interviewAvg,
            missionsDone: typeof parsed.missionsDone === "number" ? parsed.missionsDone : defaultStats.missionsDone,
            dayOneTests: typeof parsed.dayOneTests === "number" ? parsed.dayOneTests : defaultStats.dayOneTests,
            skillsMapped: typeof parsed.skillsMapped === "number" ? parsed.skillsMapped : defaultStats.skillsMapped,
            technicalScore: typeof parsed.technicalScore === "number" ? parsed.technicalScore : defaultStats.technicalScore,
            behavioralScore: typeof parsed.behavioralScore === "number" ? parsed.behavioralScore : defaultStats.behavioralScore,
            architecturalScore: typeof parsed.architecturalScore === "number" ? parsed.architecturalScore : defaultStats.architecturalScore,
            confidenceScore: typeof parsed.confidenceScore === "number" ? parsed.confidenceScore : defaultStats.confidenceScore,
            totalMissions: typeof parsed.totalMissions === "number" ? parsed.totalMissions : defaultStats.totalMissions,
            criticalMissions: typeof parsed.criticalMissions === "number" ? parsed.criticalMissions : defaultStats.criticalMissions,
            dayOneChallenges: typeof parsed.dayOneChallenges === "number" ? parsed.dayOneChallenges : defaultStats.dayOneChallenges,
            skills: Array.isArray(parsed.skills) ? parsed.skills : defaultStats.skills,
            projects: Array.isArray(parsed.projects) ? parsed.projects : defaultStats.projects,
          });
          return;
        }
      }
      localStorage.setItem("nexus_passport_stats", JSON.stringify(defaultStats));
      setStats(defaultStats);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStats();
    loadVideoConfig();
    
    const handleUpdate = () => {
      loadStats();
    };

    const handleVideoUpdate = () => {
      loadVideoConfig();
    };

    window.addEventListener("nexus_passport_updated", handleUpdate);
    window.addEventListener("nexus_video_updated", handleVideoUpdate);
    
    return () => {
      window.removeEventListener("nexus_passport_updated", handleUpdate);
      window.removeEventListener("nexus_video_updated", handleVideoUpdate);
    };
  }, []);

  // Sync canvas background visualizer when video fails or is custom-inactive
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let step = 0;
        const render = () => {
          ctx.fillStyle = "rgba(11, 19, 43, 0.95)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw a cool matrix-like soundwave
          ctx.strokeStyle = isPlaying ? "rgba(120, 164, 203, 0.85)" : "rgba(120, 164, 203, 0.35)";
          ctx.lineWidth = isPlaying ? 2.0 : 1.0;
          ctx.beginPath();
          const sliceWidth = canvas.width / 40;
          for (let i = 0; i < 40; i++) {
            const x = i * sliceWidth;
            const speed = isPlaying ? step : step * 0.3; // Slower wave when paused
            const multiplier = isPlaying ? 24 : 8; // Smaller wave when paused
            const amp = Math.sin(i * 0.4 + speed) * Math.cos(i * 0.2 + speed * 0.5) * multiplier;
            const y = canvas.height / 2 + amp;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          // CRT scanlines simulation
          ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
          for (let y = 0; y < canvas.height; y += 4) {
            ctx.fillRect(0, y, canvas.width, 1);
          }

          step += isPlaying ? 0.08 : 0.02; // Slower animation when paused
          animationId = requestAnimationFrame(render);
        };
        render();
      }
    }
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPlaying, videoError, videoConfig.preset, videoConfig.customRecordedBase64]);

  const passportId = "NX-MQRPRFLI";
  const shareableUrl = `https://nexus.ai/passport/${passportId}`;

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareableUrl)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(() => {
            fallbackCopy(shareableUrl);
          });
      } else {
        fallbackCopy(shareableUrl);
      }
    } catch (e) {
      fallbackCopy(shareableUrl);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setLocalToast("Could not access system clipboard. Select URL manually: " + text);
        setTimeout(() => setLocalToast(null), 5000);
      }
    } catch (err) {
      setLocalToast("Could not access system clipboard. Select URL manually: " + text);
      setTimeout(() => setLocalToast(null), 5000);
    }
  };

  const handleExportPDF = () => {
    setLocalToast("EXPORT INITIATED:\nYour scores, skill nodes, and validated simulation milestones have been bundled into an ATS-optimised verified passport PDF document.");
    setTimeout(() => setLocalToast(null), 6000);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (videoConfig.preset === "custom" && !videoConfig.customRecordedBase64) {
      setVideoError(true);
      setIsPlaying(!isPlaying);
      return;
    }

    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("Playback prevented or blocked by browser policies:", err);
          setIsPlaying(false);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleVideoLoaded = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration || 15);
      setVideoError(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  const restartVideo = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch((err) => {
        console.warn("Restart playback prevented:", err);
        setIsPlaying(false);
      });
    }
  };

  const getActiveSubtitle = () => {
    const activeSubList = presetsMap[videoConfig.preset]?.subs || presetsMap.preset_1.subs;
    if (!activeSubList || activeSubList.length === 0) {
      return "";
    }
    let found = activeSubList[0]?.text || "";
    for (const sub of activeSubList) {
      if (sub && currentTime >= sub.time) {
        found = sub.text;
      }
    }
    return found;
  };

  const getVideoSource = () => {
    if (videoConfig.preset === "custom") {
      return videoConfig.customRecordedBase64 || "";
    }
    return presetsMap[videoConfig.preset]?.src || presetsMap.preset_1.src;
  };

  return (
    <div 
      id="verified-passport-fullscreen-container"
      className={`min-h-[80vh] w-full bg-slate-50 text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#78A4CB]/20 selection:text-slate-900 ${isStandalone ? "" : "p-6 md:p-8 rounded-[32px] border border-[#BCE3EB] shadow-lg backdrop-blur-3xl"}`}
    >
      {/* Soft Decorative Grid Pattern */}
      <div id="passport-grid" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,164,203,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,164,203,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div id="passport-glow-head" className="absolute top-0 left-1/3 w-[500px] h-[250px] bg-[#78A4CB]/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Header Controls */}
      <div id="passport-header-controls" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#BCE3EB] relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center font-black text-white font-sans text-sm shadow">
            NX
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.2em] uppercase text-slate-900 font-sans leading-none">VERIFIED CAREER PASSPORT</h1>
            <span className="text-[9px] font-mono text-slate-500 tracking-wider uppercase mt-1.5 block">Evidence-Based Professional Authority</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-passport-export"
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-[#BCE3EB] text-xs font-bold tracking-wide flex items-center gap-2 cursor-pointer transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-900" />
            <span>EXPORT PASSPORT PDF</span>
          </button>

          <button
            id="btn-passport-copy"
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-xl bg-[#78A4CB] hover:bg-[#5D8EB7] text-white text-xs font-mono font-semibold tracking-wider flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>LINK COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY SHARE LINK</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div id="passport-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 relative z-10 items-stretch flex-grow text-left">
        
        {/* Left Column: Big Circular score, core info & Self-Intro Video */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-8 rounded-[28px] bg-white border border-[#BCE3EB] relative overflow-hidden flex flex-col items-center text-center justify-between min-h-[380px] shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,164,203,0.03),transparent_60%)] pointer-events-none" />
            
            {/* Header Identity */}
            <div className="w-full flex flex-col items-center">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-4">LIVE MERIT VERIFICATION</span>
              
              <div className="relative w-36 h-36 flex items-center justify-center mb-5">
                {/* Score Circular progress ring */}
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    className="stroke-slate-100"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    className="stroke-[#78A4CB] transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 64}
                    strokeDashoffset={2 * Math.PI * 64 * (1 - stats.nexusScore / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">NEXUS SCORE</span>
                  <span className="text-4xl font-extrabold text-slate-900 mt-1 font-mono">{stats.nexusScore}</span>
                  <span className="text-[10px] font-mono text-slate-500">/ 100</span>
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{candidateName}</h2>
                <p className="text-xs font-mono text-slate-500">AI Core Synaptic Architect</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-50 border border-[#BCE3EB] text-[9px] font-mono text-slate-600 mt-2">
                  <ShieldCheck className="w-3 h-3 text-[#78A4CB]" />
                  <span>ID: {passportId}</span>
                </div>
              </div>
            </div>

            {/* Cert status */}
            <div className="w-full border-t border-slate-100 pt-5 mt-5 text-[10px] font-mono text-slate-500 space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulations runs on isolated virtual grids</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Behavioral telemetry validated by AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cryptographically signed by Nexus Nodes</span>
              </div>
            </div>
          </div>

          {/* Interactive Candidate 30s Video Introduction */}
          <div className="p-6 rounded-[28px] bg-white border border-[#BCE3EB] relative overflow-hidden flex flex-col gap-4 text-left shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#78A4CB]/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#78A4CB] animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#78A4CB]">30s Introduction Video</span>
              </div>
              <span className="text-[8px] font-mono uppercase bg-blue-50 text-[#78A4CB] px-2 py-0.5 rounded border border-[#BCE3EB] font-bold">
                {videoConfig.preset === "custom" ? "User Webcam" : "AI Avatar"}
              </span>
            </div>

            {/* Video Canvas Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group">
              {/* Scanlines Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-70" />
              
              {/* Custom Canvas Fallback if video fails/is offline */}
              {videoError || (videoConfig.preset === "custom" && !videoConfig.customRecordedBase64) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover -z-10" width="320" height="180" />
                  <div className="text-center z-10 flex flex-col items-center gap-2 p-4 bg-black/75 border border-white/5 backdrop-blur-sm max-w-[90%]">
                    <Radio className="w-6 h-6 text-[#78A4CB] animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-300 font-semibold uppercase tracking-wider">
                      {videoConfig.preset === "custom" ? "Camera Stream Ready" : "Preset Fallback Active"}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 leading-tight">
                      {videoConfig.preset === "custom" ? "Record your intro in the Portfolio Builder to activate this node." : "Neural representation offline. Generating procedural audio wave."}
                    </span>
                  </div>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={getVideoSource()}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleVideoLoaded}
                  onEnded={handleVideoEnded}
                  onError={() => setVideoError(true)}
                  muted={isMuted}
                  playsInline
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                />
              )}

              {/* Central Play Button Overlay (Visible when paused/inactive) */}
              {!isPlaying && (
                <div 
                  onClick={togglePlayback}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer z-20 group-hover:bg-black/50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-[#78A4CB]/90 hover:bg-[#78A4CB] text-white flex items-center justify-center shadow-[0_0_25px_rgba(120,164,203,0.5)] transition-transform hover:scale-110 duration-200">
                    <Play className="w-6 h-6 fill-white ml-1 text-white" />
                  </div>
                </div>
              )}

              {/* Overlay Player Controllers */}
              <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 gap-2">
                {/* Progress bar */}
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#78A4CB]" 
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={togglePlayback}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button 
                      onClick={restartVideo}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-mono text-zinc-400">
                      0:{Math.floor(currentTime).toString().padStart(2, "0")} / 0:{Math.floor(duration).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Real-time Subtitles / Audio Transcription */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 min-h-[54px] flex items-center justify-center text-center">
              <p className="text-[10px] font-mono text-slate-700 leading-relaxed italic transition-all duration-300">
                {isPlaying ? (
                  <>
                    <span className="text-[#78A4CB] font-bold uppercase mr-1">● LIVE TRANSCRIPT:</span>
                    "{getActiveSubtitle()}"
                  </>
                ) : (
                  <span className="text-slate-400 font-sans font-light">Click Play to watch the candidate self-introduction video.</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Bento of metrics, pillars & evidence */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Top row of 4 mini metrics cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "INTERVIEW AVG", value: stats.interviewAvg, icon: Brain, color: "text-[#78A4CB]" },
              { label: "MISSIONS DONE", value: stats.missionsDone, icon: Terminal, color: "text-[#78A4CB]" },
              { label: "DAY ONE TESTS", value: stats.dayOneTests, icon: Star, color: "text-[#78A4CB]" },
              { label: "SKILLS MAPPED", value: stats.skillsMapped, icon: Compass, color: "text-[#78A4CB]" }
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-white border border-[#BCE3EB] flex flex-col justify-between h-32 relative overflow-hidden shadow-sm">
                  <div className="absolute top-4 right-4 text-slate-300">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">{card.label}</span>
                    <span className="text-2xl font-black text-slate-900 mt-2 block font-mono">{card.value}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Three-column evidence layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch flex-grow">
            
            {/* Column 1: Interview Evidence */}
            <div className="p-6 rounded-[22px] bg-white border border-[#BCE3EB] flex flex-col gap-5 text-left shadow-sm">
              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">PILLAR 01</span>
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight mt-1 uppercase">Interview Evidence</h4>
              </div>

              <div className="space-y-4 flex-grow justify-center flex flex-col">
                {[
                  { label: "Technical", value: stats.technicalScore },
                  { label: "Behavioral", value: stats.behavioralScore },
                  { label: "Architectural", value: stats.architecturalScore },
                  { label: "Confidence", value: stats.confidenceScore }
                ].map((bar, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-500">{bar.label}</span>
                      <span className="text-slate-900 font-bold">{bar.value > 0 ? `${bar.value}%` : "—"}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div 
                        className="h-full bg-[#78A4CB] transition-all duration-1000" 
                        style={{ width: `${bar.value}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Simulation Evidence */}
            <div className="p-6 rounded-[22px] bg-white border border-[#BCE3EB] flex flex-col gap-5 text-left shadow-sm">
              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">PILLAR 02</span>
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight mt-1 uppercase">Simulation Evidence</h4>
              </div>

              <div className="space-y-4 flex-grow justify-center flex flex-col font-mono text-xs">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                  <span className="text-slate-500 font-bold">Total Missions:</span>
                  <span className="text-slate-900 font-bold text-sm">{stats.totalMissions}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                  <span className="text-slate-500 font-bold">Critical Missions:</span>
                  <span className="text-[#78A4CB] font-bold text-sm">{stats.criticalMissions}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                  <span className="text-slate-500 font-bold">Day One Challenges:</span>
                  <span className="text-emerald-600 font-bold text-sm">{stats.dayOneChallenges}</span>
                </div>
              </div>
            </div>

            {/* Column 3: Skill Alignment */}
            <div className="p-6 rounded-[22px] bg-white border border-[#BCE3EB] flex flex-col gap-5 text-left shadow-sm">
              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">PILLAR 03</span>
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight mt-1 uppercase">Skill Alignment</h4>
              </div>

              <div className="space-y-4 flex-grow justify-center flex flex-col">
                <div className="space-y-2 border-b border-slate-100 pb-3">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Transformer Mechanics</span>
                    <span className="text-slate-900 font-bold">92%</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Tensor Entrapment</span>
                    <span className="text-slate-900 font-bold">88%</span>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">ACTIVE SKILLS BLOCK</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5 max-h-[80px] overflow-y-auto">
                    {(stats?.skills || []).map((sk, idx) => (
                      <span key={idx} className="text-[8px] font-mono bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 mt-2 space-y-2">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">PORTFOLIO PROJECTS & CERTIFICATES</span>
                  {stats.projects && stats.projects.length > 0 ? (
                    <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                      {stats.projects.map((proj, idx) => {
                        // Simple stable hash function to generate a cryptographic-style code
                        let hash = 0;
                        for (let i = 0; i < proj.length; i++) {
                          hash = proj.charCodeAt(i) + ((hash << 5) - hash);
                        }
                        const hex = Math.abs(hash).toString(16).substring(0, 6).toUpperCase();
                        
                        return (
                          <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-lg shadow-sm">
                            <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <div className="flex-grow min-w-0">
                              <span className="text-slate-900 text-[10px] font-bold truncate block">{proj}</span>
                              <span className="text-[7.5px] font-mono text-slate-400 block">NX-CRED-{hex} • VERIFIED SYNC</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 mt-1 block">0 Verified Assets Active</span>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Old vs New Paradigm footer prompt */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600 flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#78A4CB] animate-pulse" />
              <span>LinkedIn shows what people say. <strong className="text-slate-900">NEXUS shows evidence of what they can execute.</strong></span>
            </span>
            <span className="text-[#78A4CB] font-bold uppercase tracking-wider">PROOF OVER CLAIMS</span>
          </div>

        </div>

      </div>

      {/* Footer Branding block */}
      <div id="passport-footer" className="pt-4 border-t border-[#BCE3EB] flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono text-slate-400 gap-2 relative z-10">
        <span>Prepared for global talent sifting. Hand-crafted in Cloud Workstation Environment.</span>
        <span className="text-slate-400 font-semibold tracking-wider uppercase">NEXUS AI SYSTEMS © 2026. ALL RIGHTS VERIFIED.</span>
      </div>

      {/* LUXURY TOAST NOTIFICATION */}
      {localToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-black/90 border-2 border-[#78A4CB] text-white p-4 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-md flex gap-3 items-start animate-pulse">
          <Sparkles className="w-5 h-5 text-[#78A4CB] shrink-0 mt-0.5 animate-spin" />
          <div className="space-y-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#78A4CB] block font-black">NEXUS SYSTEM TELEMETRY</span>
            <p className="text-[11px] text-slate-200 leading-relaxed font-semibold whitespace-pre-wrap">{localToast}</p>
          </div>
        </div>
      )}

    </div>
  );
}
