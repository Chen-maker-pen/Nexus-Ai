import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, Sparkles, Brain, DollarSign, Calendar, Target, Award, ArrowUpRight, 
  Cpu, Compass, MessageSquare, BrainCircuit, Mic, Volume2, ShieldAlert, 
  BookOpen, CheckCircle, RefreshCw, BarChart2, Video, VideoOff, Users, ArrowRight, 
  UserCircle2, Bot, ShieldCheck, Heart, Radio, Activity, Sparkles as SparkleIcon, VolumeX
} from "lucide-react";
import { CareerRecommendation, InterviewQuestion, InterviewEvaluation } from "../types";
import CareerMindMap from "./CareerMindMap";

interface CareerAndInterviewHubProps {
  initialTab?: "coach" | "interview";
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  avatar: string; // Emoji
  accentColor: string; // Tailwind class
  style: string;
  description: string;
  topics: string[];
  intro: string;
}

export const specialistsList: Specialist[] = [
  {
    id: "elena",
    name: "Dr. Elena Frost",
    role: "AI Synaptic Architect & Neural Engineer",
    avatar: "🧠",
    accentColor: "border-blue-200 text-blue-700 bg-blue-50/50 hover:border-blue-400",
    style: "Rigorous Socratic Technical",
    description: "Former OpenAI Research Director. Specializes in transformer weights, multi-agent scheduling swarms, and high-performance tensor computing.",
    topics: ["Transformer Mechanics", "Tensor Entrapment", "MoE Calibration"],
    intro: "Welcome. Let's calibrate your deep comprehension of modern neural layers. Latency is unacceptable."
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    role: "Sovereign Quantitative Portfolio Director",
    avatar: "⚡",
    accentColor: "border-amber-200 text-amber-700 bg-amber-50/50 hover:border-amber-400",
    style: "High-Pressure Analytical & Math",
    description: "Chief of Quantum Trading at Citadel. Specializes in sub-second market latency, high-density trade queues, and game theoretic models.",
    topics: ["Market Latency", "Stochastic Calculus", "Liquidity Models"],
    intro: "Let's be direct. In high-frequency finance, slow thinking equals immediate loss of capital. Prove your speed."
  },
  {
    id: "kai",
    name: "Dr. Kai Mercer",
    role: "Lead Biomimetic & Biotech Systems Engineer",
    avatar: "🧬",
    accentColor: "border-emerald-200 text-emerald-700 bg-emerald-50/50 hover:border-emerald-400",
    style: "Interdisciplinary Scenario Deep-dive",
    description: "Co-founder of GenSplicer Labs. Expert in CRISPR gene sequences, neural-prosthetic feedback layers, and wet-lab diagnostic automation.",
    topics: ["CRISPR Diagnostics", "Somatic Feedback Loops", "Automation"],
    intro: "Engineering biology requires absolute precision. Let's explore your bio-diagnostic and automation blueprints."
  },
  {
    id: "lyra",
    name: "Lyra Sterling",
    role: "VP of Spatial Computing & Retinal Interface UX",
    avatar: "📐",
    accentColor: "border-purple-200 text-purple-700 bg-purple-50/50 hover:border-purple-400",
    style: "Design Case-Study Critique",
    description: "Former Lead Spatial UX at Apple. Designs fully immersive holographic viewport projections and computational layouts.",
    topics: ["Computational Layout", "Holographic Viewports", "Ergonomics"],
    intro: "A pixel in spatial coordinate grids is a bio-commitment. How do you design virtual spaces that align with human biology?"
  },
  {
    id: "sarah",
    name: "Sarah Jenkins",
    role: "Principal Systems & Enterprise Product VP",
    avatar: "💼",
    accentColor: "border-rose-200 text-rose-700 bg-rose-50/50 hover:border-rose-400",
    style: "Direct Executive Case Study",
    description: "Enterprise scaling lead. Focuses on SaaS pricing models, global legal compliance grids, and virality loops.",
    topics: ["SaaS pricing", "Global Legal Compliance", "Virality Loops"],
    intro: "A robust technical stack means nothing without solid unit economics and market-entry strategy. Convince me."
  },
  {
    id: "knox",
    name: "Commander Knox",
    role: "Orbital Telecom Systems Director",
    avatar: "🌌",
    accentColor: "border-cyan-200 text-cyan-700 bg-cyan-50/50 hover:border-cyan-400",
    style: "Extreme Mission Critical Triage",
    description: "Astrionics coordinator at SpaceX. Specializes in signal coherence, deep-space packet recovery, and solar storm magnetic shields.",
    topics: ["Signal Coherence", "Astrionics Telemetry", "Packet Recovery"],
    intro: "In deep-space orbits, secondary nodes do not exist. Let's see if your communication protocols survive a magnetic drift."
  }
];

export default function CareerAndInterviewHub({ initialTab = "coach" }: CareerAndInterviewHubProps) {
  const [activeTab, setActiveTab] = useState<"coach" | "interview">(initialTab);

  // ==========================================
  // STATE: CAREER COACH (Pathway Mapping)
  // ==========================================
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [careerResult, setCareerResult] = useState<CareerRecommendation | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [sendingChat, setSendingChat] = useState(false);
  
  // Custom Display sub-tab for Career Coach
  const [careerDisplayTab, setCareerDisplayTab] = useState<"mindmap" | "timeline">("mindmap");

  const presetCareers = [
    { name: "AI Engineer", search: "ai engineer" },
    { name: "Quantum Computing Engineer", search: "quantum cognitive engineer" },
    { name: "Bio-Medical Technology Specialist", search: "bio telemetry" }
  ];

  // ==========================================
  // STATE: INTERVIEW SIMULATOR (Mock Boards)
  // ==========================================
  const [targetCareer, setTargetCareer] = useState("AI Engineer");
  const [selectMode, setSelectMode] = useState<"preset" | "custom">("preset");
  const [customCareer, setCustomCareer] = useState("");
  const [activeCareerName, setActiveCareerName] = useState("AI Engineer");

  const [activeSession, setActiveSession] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);

  const [interviewChatMessages, setInterviewChatMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
  const [interviewChatInput, setInterviewChatInput] = useState("");
  const [sendingInterviewChat, setSendingInterviewChat] = useState(false);
  const [micActive, setMicActive] = useState(false);

  // Specialist Selection State
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(specialistsList[0]);

  // Webcam & Voice State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Webcam stream capture hook
  useEffect(() => {
    if (activeSession && cameraActive) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(mediaStream => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch(err => {
          console.warn("Webcam blocked or unavailable. Directing fallback cyber-tracking mode.", err);
        });
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeSession, cameraActive]);

  // Automatic Text-To-Speech for Interview questions
  useEffect(() => {
    if (activeSession && questions.length > 0 && !loadingQuestions && voiceEnabled) {
      speakQuestionText(questions[currentIndex]?.text);
    }
  }, [activeSession, currentIndex, questions, loadingQuestions, voiceEnabled]);

  const speakQuestionText = (textToSpeak: string) => {
    if (!textToSpeak || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const plainText = textToSpeak.replace(/[*#`_\\]/g, "");
      const utterance = new SpeechSynthesisUtterance(plainText);
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith("en"));
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Failed speech synthesis initialization:", err);
    }
  };

  const stopSpeakingText = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // ==========================================
  // HANDLERS: CAREER COACH
  // ==========================================
  const handleSearch = async (targetQuery: string) => {
    if (!targetQuery.trim()) return;
    setLoading(true);
    setCareerResult(null);
    setChatMessages([]);
    setChatInput("");
    try {
      const response = await fetch("/api/career/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: targetQuery })
      });
      if (response.ok) {
        const data = await response.json();
        setCareerResult(data);
      } else {
        console.error("Coach API returned non-200 response");
      }
    } catch (e) {
      console.error("Error communicating with Career Coach API:", e);
    } finally {
      setLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || !careerResult) return;
    const userMsg = chatInput;
    setChatInput("");
    const updatedMsgs = [...chatMessages, { role: "user" as const, content: userMsg }];
    setChatMessages(updatedMsgs);
    setSendingChat(true);

    try {
      const response = await fetch("/api/career/coach/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roadmapTitle: careerResult.title,
          query: userMsg,
          history: updatedMsgs
        })
      });
      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [...prev, { role: "model" as const, content: data.reply }]);
      }
    } catch (e) {
      console.error("Coach chat error:", e);
    } finally {
      setSendingChat(false);
    }
  };

  // ==========================================
  // HANDLERS: INTERVIEW SIMULATOR
  // ==========================================
  const startInterview = async () => {
    const careerToUse = selectMode === "custom" && customCareer.trim() ? customCareer.trim() : targetCareer;
    setActiveCareerName(careerToUse);

    setLoadingQuestions(true);
    setActiveSession(true);
    setEvaluation(null);
    setCurrentIndex(0);
    setInterviewChatMessages([]);
    setInterviewChatInput("");
    try {
      const response = await fetch("/api/career/interview/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          career: careerToUse,
          specialistName: selectedSpecialist.name,
          specialistRole: selectedSpecialist.role,
          specialistStyle: selectedSpecialist.style
        })
      });
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
      }
    } catch (e) {
      console.error("Failed loading interview questions:", e);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const submitResponse = async () => {
    if (!answerInput.trim()) return;
    setSubmittingAnswer(true);
    setEvaluation(null);
    const activeQuestion = questions[currentIndex]?.text || "";
    try {
      const response = await fetch("/api/career/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: activeQuestion,
          answer: answerInput
        })
      });
      if (response.ok) {
        const data = await response.json();
        setEvaluation(data);

        // Update dynamic Career Passport scorecard stats
        try {
          const raw = localStorage.getItem("nexus_passport_stats");
          const currentStats = raw ? JSON.parse(raw) : {
            nexusScore: 42,
            interviewAvg: "—",
            missionsDone: 0,
            dayOneTests: 0,
            skillsMapped: 2,
            technicalScore: 0,
            behavioralScore: 0,
            architecturalScore: 0,
            confidenceScore: 0,
            totalMissions: 0,
            criticalMissions: 0,
            dayOneChallenges: 0,
            skills: ["Transformer Mechanics", "Tensor Entrapment"],
            projects: ["Project Bio-Scribe", "Synergistic Attention Layer Calibration"]
          };
          
          currentStats.interviewAvg = `${data.overallScore}/100`;
          currentStats.technicalScore = Math.min(data.overallScore + 4, 100);
          currentStats.behavioralScore = Math.min(data.overallScore - 2, 100);
          currentStats.architecturalScore = Math.min(data.overallScore + 1, 100);
          currentStats.confidenceScore = data.confidenceScore || 85;
          currentStats.dayOneTests = currentStats.dayOneTests + 1;
          currentStats.dayOneChallenges = currentStats.dayOneChallenges + 1;
          
          currentStats.nexusScore = Math.min(
            60 + 
            Math.floor((data.overallScore) * 0.2) + 
            currentStats.missionsDone * 4 + 
            currentStats.skillsMapped * 2, 
            100
          );

          localStorage.setItem("nexus_passport_stats", JSON.stringify(currentStats));
          window.dispatchEvent(new Event("nexus_passport_updated"));
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error("Failed submitting answer to evaluation API:", e);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const nextQuestion = () => {
    setEvaluation(null);
    setAnswerInput("");
    setInterviewChatMessages([]);
    setInterviewChatInput("");
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setActiveSession(false);
    }
  };

  const sendInterviewChatMessage = async () => {
    if (!interviewChatInput.trim() || !evaluation) return;
    const userMsg = interviewChatInput;
    setInterviewChatInput("");
    const updatedMsgs = [...interviewChatMessages, { role: "user" as const, content: userMsg }];
    setInterviewChatMessages(updatedMsgs);
    setSendingInterviewChat(true);

    try {
      const response = await fetch("/api/career/interview/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questions[currentIndex]?.text,
          userAnswer: answerInput,
          evaluation: evaluation,
          query: userMsg,
          history: updatedMsgs
        })
      });
      if (response.ok) {
        const data = await response.json();
        setInterviewChatMessages(prev => [...prev, { role: "model" as const, content: data.reply }]);
      }
    } catch (e) {
      console.error("Interview chat error:", e);
    } finally {
      setSendingInterviewChat(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 min-h-[85vh]">
      
      {/* 1. MASTER HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
        <div className="text-left">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
            Career Companion Center
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight flex items-center gap-3">
            <Brain className="w-8 md:w-10 h-8 md:h-10 text-luxury-gold animate-pulse" />
            AI Career & Interview Hub
          </h2>
          <p className="text-luxury-gray mt-2 text-sm max-w-2xl font-light">
            Switch between generating personalized learning steps and practicing simulated interviews.
          </p>
        </div>

        {/* Dynamic Dual Tab Selector */}
        <div className="flex bg-[#F1F5F9] border border-slate-250 p-1.5 rounded-2xl shrink-0 self-start md:self-center">
          <button
            onClick={() => {
              setActiveTab("coach");
              setEvaluation(null);
              setActiveSession(false);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === "coach"
                ? "bg-white text-black shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-200"
                : "text-slate-500 hover:text-black"
            }`}
          >
            <Cpu className="w-4 h-4" />
            AI Career Coach
          </button>
          <button
            onClick={() => {
              setActiveTab("interview");
              setCareerResult(null);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === "interview"
                ? "bg-white text-black shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-200"
                : "text-slate-500 hover:text-black"
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            Interview Sim
          </button>
        </div>
      </div>

      {/* 2. CHOSEN INTERACTIVE ARENA */}
      <AnimatePresence mode="wait">
        
        {/* =======================================================
            TAB: CAREER COACH
            ======================================================= */}
        {activeTab === "coach" && (
          <motion.div
            key="coach-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Prompt Deck */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm flex flex-col gap-6 text-left">
              <h3 className="text-black text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-luxury-gold" />
                Select Your Path
              </h3>

              <div className="relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. I want to become an AI Engineer or learn about Quantum Computing..."
                  className="w-full min-h-[120px] bg-[#F8FAFC] border border-slate-250 focus:border-luxury-gold rounded-2xl p-4 text-sm resize-none outline-none transition-all text-black placeholder:text-slate-400"
                />
                <button
                  onClick={() => handleSearch(query)}
                  disabled={loading || !query.trim()}
                  className="absolute bottom-3 right-3 p-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-hover disabled:opacity-35 text-white font-bold transition-all cursor-pointer shadow-[0_4px_12px_rgba(120,164,203,0.3)]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-2 text-left">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Popular Careers</span>
                <div className="flex flex-wrap gap-2">
                  {presetCareers.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(c.name);
                        handleSearch(c.search);
                      }}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-black text-xs font-semibold transition-all cursor-pointer"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Display Node */}
            <div className="lg:col-span-7 min-h-[350px] flex flex-col justify-center items-center relative">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading-prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center p-12 text-center gap-4"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-2 border-slate-200 border-t-luxury-gold animate-spin" />
                      <Brain className="absolute w-6 h-6 text-luxury-gold animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-luxury-gold font-mono text-xs uppercase tracking-widest animate-pulse font-bold">Creating Your Blueprint...</span>
                      <span className="text-slate-500 text-xs font-sans">Mapping steps and compiling salary targets</span>
                    </div>
                  </motion.div>
                )}

                {!loading && !careerResult && (
                  <motion.div
                    key="empty-prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center p-12 text-center border border-dashed border-slate-200 rounded-[32px] bg-white shadow-sm"
                  >
                    <Compass className="w-12 h-12 text-slate-400 mb-4 animate-pulse" />
                    <h4 className="text-slate-800 font-bold text-md mb-2">No Pathway Active</h4>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Select a popular career on the left or type your own interest to generate an AI blueprint.
                    </p>
                  </motion.div>
                )}

                {!loading && careerResult && (
                  <motion.div
                    key="result-prompt"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col gap-6 text-left"
                  >
                    {/* Career Intro Card */}
                    <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm relative overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <span className="text-luxury-gold font-mono text-xs uppercase tracking-widest font-bold">Generated AI Roadmap</span>
                          <h3 className="text-2xl md:text-3xl font-extrabold text-black mt-1">{careerResult.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
                          Demand: {careerResult.demand}
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                        {careerResult.summary}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 pt-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-luxury-gold shrink-0">
                            <DollarSign className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Estimated Salary</span>
                            <span className="text-sm font-mono text-black font-bold">{careerResult.salary}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 shrink-0">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Duration</span>
                            <span className="text-sm font-mono text-black font-bold">{careerResult.timeline}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 col-span-2 md:col-span-1">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-luxury-gold shrink-0">
                            <Target className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Key Skills</span>
                            <span className="text-xs text-black font-semibold truncate max-w-[150px]">{careerResult.skills?.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* View mode selectors for career results */}
                    <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start border border-slate-200 mt-2">
                      <button
                        onClick={() => setCareerDisplayTab("mindmap")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                          careerDisplayTab === "mindmap"
                            ? "bg-white text-black shadow-sm"
                            : "text-slate-500 hover:text-black"
                        }`}
                      >
                        <Brain className="w-4 h-4 text-luxury-gold" />
                        Interactive Mind Map
                      </button>
                      <button
                        onClick={() => setCareerDisplayTab("timeline")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                          careerDisplayTab === "timeline"
                            ? "bg-white text-black shadow-sm"
                            : "text-slate-500 hover:text-black"
                        }`}
                      >
                        <Target className="w-4 h-4 text-slate-500" />
                        Linear Curriculum
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {careerDisplayTab === "mindmap" ? (
                        <motion.div
                          key="mindmap-layout"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="w-full mt-2"
                        >
                          <CareerMindMap careerResult={careerResult} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="timeline-layout"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-4 text-left mt-2"
                        >
                          <h4 className="text-black font-extrabold text-md flex items-center gap-2">
                            <Target className="w-4.5 h-4.5 text-luxury-gold" />
                            Learning Steps
                          </h4>

                          <div className="relative border-l-2 border-slate-150 pl-6 ml-3 py-2 flex flex-col gap-6">
                            {careerResult.roadmap?.map((r, rIdx) => (
                              <div key={r.id || rIdx} className="relative group text-left">
                                <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-luxury-gold group-hover:bg-luxury-gold transition-all flex items-center justify-center p-0.5" />
                                
                                <div className="bg-white border border-slate-200 hover:border-luxury-gold p-5 rounded-[22px] transition-all duration-300 shadow-sm">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                                    <span className="text-xs font-mono text-luxury-gold font-bold uppercase tracking-widest">{r.phase}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100 font-semibold">{r.duration}</span>
                                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md font-semibold ${r.difficulty === 'Advanced' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>{r.difficulty}</span>
                                    </div>
                                  </div>

                                  <h5 className="text-black text-md font-extrabold mb-2">{r.label}</h5>
                                  <p className="text-slate-600 text-xs leading-relaxed mb-4 font-light">{r.description}</p>

                                  <div className="flex flex-wrap gap-2">
                                    {r.skills?.map((sk, skIdx) => (
                                      <span key={skIdx} className="text-[10px] font-mono text-slate-700 bg-slate-50 border border-slate-100 py-1 px-2.5 rounded-xl font-medium">
                                        #{sk}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Capstone Projects */}
                    <div className="flex flex-col gap-4 text-left">
                      <h4 className="text-black font-extrabold text-md flex items-center gap-2">
                        <Award className="w-4.5 h-4.5 text-luxury-gold" />
                        Suggested Projects
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {careerResult.projects?.map((p, pIdx) => (
                          <div key={pIdx} className="p-5 border border-slate-200 bg-white rounded-2xl relative overflow-hidden text-left hover:border-luxury-gold transition-all shadow-sm">
                            <div className="absolute top-3.5 right-3.5 text-[9px] font-mono tracking-wider uppercase py-0.5 px-2.5 rounded-full bg-slate-50 text-slate-500 border border-slate-100 font-bold">
                              {p.difficulty || "Expert"}
                            </div>
                            <h5 className="font-extrabold text-black text-sm mb-2 mt-1 flex items-center gap-1.5">
                              <ArrowUpRight className="w-4 h-4 text-luxury-gold" />
                              {p.title}
                            </h5>
                            <p className="text-slate-600 text-xs leading-relaxed font-light">{p.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chat Section (Strictly Styled in Jet-Black as requested) */}
                    <div className="flex flex-col gap-4 mt-6 border-t border-slate-200 pt-6">
                      <h4 className="text-black font-extrabold text-md flex items-center gap-2">
                        <MessageSquare className="w-4.5 h-4.5 text-luxury-gold" />
                        Chat with your Coach
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">
                        Ask custom follow-up questions to customize this roadmap, discover resource links, or deep dive into specific topics.
                      </p>

                      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-inner text-left">
                        {chatMessages.length === 0 && (
                          <div className="text-center py-4 text-slate-400 text-xs">
                            Ask your coach: "Which frameworks should I learn first?" or "Can you detail the first steps?"
                          </div>
                        )}
                        {chatMessages.map((msg, mIdx) => (
                          <div
                            key={mIdx}
                            className={`p-4 rounded-xl max-w-[85%] text-xs leading-relaxed shadow-sm ${
                              msg.role === 'user'
                                ? 'bg-luxury-gold text-white self-end text-right rounded-tr-none'
                                : 'bg-slate-800 text-slate-100 self-start text-left rounded-tl-none border border-slate-700'
                            }`}
                          >
                            <span className={`font-mono text-[9px] uppercase tracking-widest block mb-1 font-extrabold ${msg.role === 'user' ? 'text-white/85' : 'text-luxury-gold'}`}>
                              {msg.role === 'user' ? 'You' : 'AI Coach'}
                            </span>
                            <div className="whitespace-pre-line font-sans font-medium">{msg.content}</div>
                          </div>
                        ))}
                        {sendingChat && (
                          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 self-start text-left max-w-[85%] text-xs flex items-center gap-2.5 text-slate-400 animate-pulse">
                            <Brain className="w-4 h-4 text-luxury-gold animate-spin" />
                            Coach is typing...
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              sendChatMessage();
                            }
                          }}
                          placeholder="Ask your AI Coach a question..."
                          className="flex-grow bg-[#F8FAFC] border border-slate-250 focus:border-luxury-gold text-black rounded-xl px-4 py-3 text-xs outline-none"
                        />
                        <button
                          onClick={sendChatMessage}
                          disabled={sendingChat || !chatInput.trim()}
                          className="px-5 py-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-hover text-white text-xs font-extrabold uppercase tracking-wider transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Send className="w-3.5 h-3.5 text-white" />
                          <span>Send</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* =======================================================
            TAB: INTERVIEW SIMULATOR
            ======================================================= */}
        {activeTab === "interview" && (
          <motion.div
            key="interview-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col gap-6"
          >
            <AnimatePresence mode="wait">
              {!activeSession ? (
                /* CONFIGURATION PANEL */
                <motion.div
                  key="config-screen"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="max-w-4xl mx-auto w-full bg-white border border-slate-200 p-8 rounded-[32px] shadow-sm flex flex-col items-center text-center gap-6 relative overflow-hidden"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-luxury-gold shadow-sm">
                    <Mic className="w-8 h-8 text-luxury-gold animate-pulse" />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-black mb-1">Start Mock Board Interview</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">Practice and receive structured feedback on your career answers. Setup your board below.</p>
                  </div>

                  {/* STEP 1: CHOOSE TARGET CAREER ROLE */}
                  <div className="w-full flex flex-col gap-3 text-left border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2">
                      <Target className="w-4.5 h-4.5 text-luxury-gold" />
                      <h4 className="text-sm font-extrabold text-black uppercase tracking-wider">Select Your Career Focus</h4>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectMode("preset")}
                          className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer border ${
                            selectMode === "preset"
                              ? "bg-luxury-gold text-white font-bold border-luxury-gold shadow-sm"
                              : "bg-white text-slate-500 border-slate-200 hover:text-black"
                          }`}
                        >
                          Popular Roles
                        </button>
                        <button
                          onClick={() => setSelectMode("custom")}
                          className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer border ${
                            selectMode === "custom"
                              ? "bg-luxury-gold text-white font-bold border-luxury-gold shadow-sm"
                              : "bg-white text-slate-500 border-slate-200 hover:text-black"
                          }`}
                        >
                          Custom Role
                        </button>
                      </div>

                      <div className="flex-grow flex gap-2">
                        {selectMode === "preset" ? (
                          <select
                            value={targetCareer}
                            onChange={(e) => setTargetCareer(e.target.value)}
                            className="flex-grow bg-[#F8FAFC] border border-slate-250 text-black rounded-xl p-3 text-xs outline-none cursor-pointer font-medium"
                          >
                            <option value="AI Engineer">AI Engineer</option>
                            <option value="Quantum Systems Architect">Quantum Systems Architect</option>
                            <option value="Bio-Medical Technology Specialist">Bio-Medical Technology Specialist</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={customCareer}
                            onChange={(e) => setCustomCareer(e.target.value)}
                            placeholder="e.g. Senior Software Engineer..."
                            className="flex-grow bg-[#F8FAFC] border border-slate-250 text-black rounded-xl p-3 text-xs outline-none placeholder:text-slate-400 font-medium"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* STEP 2: SELECT SPECIALIST GRID */}
                  <div className="w-full flex flex-col gap-3 text-left border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4.5 h-4.5 text-luxury-gold" />
                      <h4 className="text-sm font-extrabold text-black uppercase tracking-wider">Select Your AI Board Specialist</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-light mb-2">
                      Each specialist dynamically shapes your question database, interview style, and evaluation tone to match their professional career.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                      {specialistsList.map((spec) => {
                        const isSelected = selectedSpecialist.id === spec.id;
                        return (
                          <div
                            key={spec.id}
                            onClick={() => {
                              setSelectedSpecialist(spec);
                              if (selectMode === "preset") {
                                if (spec.id === "elena") setTargetCareer("AI Engineer");
                                if (spec.id === "marcus") setTargetCareer("Quantum Systems Architect");
                                if (spec.id === "kai") setTargetCareer("Bio-Medical Technology Specialist");
                              }
                            }}
                            className={`p-4 border rounded-2xl relative overflow-hidden transition-all duration-300 cursor-pointer text-left flex flex-col justify-between ${
                              isSelected
                                ? "bg-slate-50/80 border-luxury-gold shadow-md"
                                : "bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/40"
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-3 right-3 text-luxury-gold bg-amber-50 border border-amber-200 p-0.5 rounded-full">
                                <CheckCircle className="w-3.5 h-3.5 fill-luxury-gold text-white" />
                              </div>
                            )}

                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">{spec.avatar}</span>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-extrabold text-xs text-black truncate">{spec.name}</span>
                                  <span className="text-[8px] font-mono text-slate-400 truncate uppercase tracking-tight">{spec.style}</span>
                                </div>
                              </div>
                              <p className="text-[10px] text-slate-600 leading-normal mb-3 font-normal line-clamp-3">
                                {spec.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-1 border-t border-slate-100 pt-2 mt-1">
                              {spec.topics.slice(0, 2).map((topic, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[8px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-bold"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 3: HARDWARE METER DECK */}
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-left">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl border ${cameraActive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                          {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-extrabold text-black">Active Webcam Stream</span>
                          <span className="text-[9px] text-slate-400 font-mono">Capture local candidate video</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setCameraActive(!cameraActive)}
                        className={`w-11 h-6 rounded-full transition-all relative ${cameraActive ? 'bg-luxury-gold' : 'bg-slate-300'}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${cameraActive ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-left">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl border ${voiceEnabled ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                          {voiceEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-extrabold text-black">Coach Voice Speech (TTS)</span>
                          <span className="text-[9px] text-slate-400 font-mono">Board reads questions aloud</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setVoiceEnabled(!voiceEnabled)}
                        className={`w-11 h-6 rounded-full transition-all relative ${voiceEnabled ? 'bg-luxury-gold' : 'bg-slate-300'}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${voiceEnabled ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                    </div>
                  </div>

                  {/* START FORM SUBMIT */}
                  <div className="w-full border-t border-slate-100 pt-6 flex justify-end">
                    <button
                      onClick={startInterview}
                      disabled={selectMode === "custom" && !customCareer.trim()}
                      className="px-8 py-3.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-hover text-white font-extrabold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(120,164,203,0.3)] disabled:opacity-35"
                    >
                      <RefreshCw className="w-4 h-4 text-white" />
                      <span>Assemble Board & Start</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ACTIVE BOARD SCREEN */
                <motion.div
                  key="active-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left w-full animate-fadeIn"
                >
                  
                  {/* IMMERSIVE VIDEO MOCK BOARD CONFERENCE HUD */}
                  <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 border border-slate-800 p-6 rounded-[32px] shadow-lg relative overflow-hidden">
                    {/* Background tech grids */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

                    {/* Specialist Pane */}
                    <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between p-4 shadow-inner group">
                      {/* Top Overlay details */}
                      <div className="flex items-center justify-between z-10">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-red-500 bg-red-950/60 border border-red-900/60 px-2 py-0.5 rounded flex items-center gap-1.5 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
                          ● Live Stream
                        </span>
                        <span className="text-[8px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
                          RESOLUTION: 4K HIGH DEPTH
                        </span>
                      </div>

                      {/* Specialist Character Centerpiece */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="relative">
                          <div className={`w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-4xl shadow-md transition-all duration-300 ${isSpeaking ? 'ring-4 ring-luxury-gold scale-105' : 'group-hover:scale-105'}`}>
                            {selectedSpecialist.avatar}
                          </div>
                          {isSpeaking && (
                            <span className="absolute bottom-0 right-0 bg-luxury-gold text-slate-950 p-1 rounded-full border border-slate-950">
                              <Radio className="w-3.5 h-3.5 animate-pulse" />
                            </span>
                          )}
                        </div>
                        <h5 className="font-extrabold text-white text-sm mt-3">{selectedSpecialist.name}</h5>
                        <p className="text-luxury-gold text-[9px] font-mono uppercase tracking-wide truncate max-w-[220px] text-center mt-1">{selectedSpecialist.role}</p>
                      </div>

                      {/* Specialist active subtitling subtitle box */}
                      <div className="z-10 bg-slate-950/85 border border-slate-800 px-3 py-2 rounded-xl backdrop-blur-xs text-left max-w-full">
                        <p className="text-[10px] font-mono text-slate-400 leading-relaxed line-clamp-2">
                          <span className="text-luxury-gold font-extrabold">{selectedSpecialist.name.split(" ")[1]}:</span>{" "}
                          {loadingQuestions 
                            ? "Gathering technical query..." 
                            : isSpeaking 
                            ? (questions[currentIndex]?.text || selectedSpecialist.intro) 
                            : `Standby. Currently evaluating ${activeCareerName} credentials...`}
                        </p>
                      </div>

                      {/* bottom bar details */}
                      <div className="flex items-center justify-between z-10 text-[8px] font-mono text-slate-500 mt-2">
                        <div className="flex items-center gap-1">
                          <Bot className="w-3 h-3 text-luxury-gold" />
                          <span>STYLE: {selectedSpecialist.style}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/* Audio wavebars animation */}
                          <div className="flex gap-0.5 items-center h-2.5">
                            <span className={`w-0.5 bg-luxury-gold rounded-full ${isSpeaking ? 'h-2 animate-bounce' : 'h-1'}`} />
                            <span className={`w-0.5 bg-luxury-gold rounded-full ${isSpeaking ? 'h-3 animate-ping' : 'h-1'}`} style={{ animationDelay: "100ms" }} />
                            <span className={`w-0.5 bg-luxury-gold rounded-full ${isSpeaking ? 'h-2.5 animate-bounce' : 'h-1'}`} style={{ animationDelay: "200ms" }} />
                            <span className={`w-0.5 bg-luxury-gold rounded-full ${isSpeaking ? 'h-1.5 animate-ping' : 'h-1'}`} style={{ animationDelay: "300ms" }} />
                          </div>
                          <span>GAIN: AUTO</span>
                        </div>
                      </div>
                    </div>

                    {/* Candidate Pane */}
                    <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between p-4 shadow-inner group">
                      
                      {/* Live Camera Track */}
                      {cameraActive && stream ? (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover z-0"
                        />
                      ) : null}

                      {/* Tech scanner mesh overlay (if camera is inactive or blocked) */}
                      {(!cameraActive || !stream) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950/90 z-0">
                          {/* Pulsing mesh tracker circles */}
                          <div className="relative w-20 h-20 flex items-center justify-center">
                            <span className="absolute inset-0 rounded-full border border-luxury-gold/20 animate-ping" />
                            <span className="absolute inset-2 rounded-full border border-luxury-gold/40 animate-pulse" />
                            <span className="absolute inset-5 rounded-full border border-luxury-gold/60" />
                            <Activity className="w-6 h-6 text-luxury-gold animate-pulse" />
                          </div>
                          <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-widest mt-3 font-extrabold animate-pulse">Scanning Candidate Node</span>
                          <span className="text-[7px] font-mono text-slate-500 uppercase mt-1">Facial geometry analyzer active</span>
                        </div>
                      )}

                      {/* Top Overlay details */}
                      <div className="flex items-center justify-between z-10 relative">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-500 bg-emerald-950/60 border border-emerald-900/60 px-2 py-0.5 rounded uppercase">
                          ● FEED OK
                        </span>
                        <span className="text-[8px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
                          LATENCY: 14ms
                        </span>
                      </div>

                      {/* Middle overlay biometric stats */}
                      {(!cameraActive || !stream) && (
                        <div className="z-10 relative self-start bg-slate-900/70 border border-slate-800 p-2.5 rounded-xl text-left max-w-[200px] mt-1 flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-4 text-[7px] font-mono text-slate-400 uppercase">
                            <span>Biometrics</span>
                            <span className="text-emerald-500 font-bold">MATCHED</span>
                          </div>
                          <div className="h-[1px] bg-slate-800" />
                          <div className="flex items-center justify-between text-[7px] font-mono text-slate-400 uppercase">
                            <span>Heart Rate</span>
                            <span className="text-slate-300 font-bold">72 BPM</span>
                          </div>
                          <div className="flex items-center justify-between text-[7px] font-mono text-slate-400 uppercase">
                            <span>Stress Index</span>
                            <span className="text-emerald-500 font-bold">OPTIMAL</span>
                          </div>
                        </div>
                      )}

                      {/* bottom bar details */}
                      <div className="flex items-center justify-between z-10 relative text-[8px] font-mono text-slate-500 mt-auto">
                        <div className="flex items-center gap-1 text-slate-300 font-extrabold bg-slate-950/70 px-2 py-0.5 rounded border border-white/5">
                          <UserCircle2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>CANDIDATE: [LOCAL NODE]</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-950/70 px-2 py-0.5 rounded border border-white/5 text-slate-400">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          <span>STABLE SECURE HASH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Left Side Question & Input */}
                  <div className="lg:col-span-6 flex flex-col gap-6">
                    
                    <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm flex flex-col gap-6 relative overflow-hidden text-left">
                      <div className="text-[10px] font-mono text-slate-400 tracking-wider font-bold text-right">
                        QUESTION {currentIndex + 1} OF {questions.length}
                      </div>

                      {/* Visual Frequency wave */}
                      <div className="flex flex-col items-center justify-center py-4 border-b border-slate-100">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3 font-semibold">Sound Waves</span>
                        <div className="flex gap-1 items-center h-8">
                          <div className="w-1.5 h-4 bg-luxury-gold/40 rounded-full animate-pulse" />
                          <div className="w-1.5 h-6 bg-luxury-gold/70 rounded-full animate-bounce" />
                          <div className="w-1.5 h-8 bg-luxury-gold rounded-full animate-pulse" />
                          <div className="w-1.5 h-3 bg-luxury-gold/30 rounded-full animate-bounce" />
                          <div className="w-1.5 h-7 bg-luxury-gold rounded-full animate-pulse" />
                          <div className="w-1.5 h-5 bg-luxury-gold/50 rounded-full animate-bounce" />
                          <div className="w-1.5 h-2 bg-luxury-gold/20 rounded-full" />
                        </div>
                      </div>

                      {loadingQuestions ? (
                        <span className="text-sm font-mono text-slate-400 uppercase tracking-wide animate-pulse">Loading interview question...</span>
                      ) : (
                        <div>
                          <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-md bg-slate-50 text-luxury-gold border border-slate-100 font-bold">
                            {questions[currentIndex]?.category || "Core"} Question
                          </span>
                          <p className="text-black text-md font-extrabold font-sans mt-3 leading-relaxed">
                            "{questions[currentIndex]?.text}"
                          </p>
                          <p className="text-slate-500 text-xs italic mt-2 font-normal">
                            💡 Tip: Try to mention "{questions[currentIndex]?.sampleAnswerHint}" for a better score.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Response Draft panel */}
                    <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm flex flex-col gap-4 text-left">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs uppercase font-mono tracking-widest text-slate-500 font-bold">Your Answer</label>
                        <button
                          onClick={() => {
                            setMicActive(!micActive);
                            if (!micActive) {
                              setAnswerInput(`We can improve the efficiency and scaling of our system architectures for ${activeCareerName} by implementing caching strategies and optimizing communication threads.`);
                            }
                          }}
                          className={`px-3 py-1 rounded-lg border text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1 font-semibold ${
                            micActive 
                              ? "bg-red-50 text-red-600 border-red-200 animate-pulse" 
                              : "bg-slate-50 border-slate-150 text-slate-500 hover:text-black"
                          }`}
                        >
                          <Volume2 className="w-3 h-3" />
                          {micActive ? "Speech Active" : "Simulate Speech Input"}
                        </button>
                      </div>

                      <textarea
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                        placeholder="Type your detailed answer here..."
                        className="w-full min-h-[140px] bg-[#F8FAFC] border border-slate-250 focus:border-luxury-gold text-black rounded-2xl p-4 text-xs resize-none outline-none transition-all placeholder:text-slate-400 font-sans leading-relaxed"
                      />

                      <button
                        onClick={submitResponse}
                        disabled={submittingAnswer || !answerInput.trim()}
                        className="w-full py-3.5 bg-luxury-gold hover:bg-luxury-gold-hover text-white font-extrabold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md border border-luxury-gold disabled:opacity-35"
                      >
                        {submittingAnswer ? "Analyzing your answer..." : "Submit Answer for Feedback"}
                      </button>
                    </div>

                  </div>

                  {/* Right Side Evaluation & Feedback */}
                  <div className="lg:col-span-6 flex flex-col justify-start items-stretch">
                    <AnimatePresence mode="wait">
                      {submittingAnswer && (
                        <motion.div
                          key="eval-loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-white border border-slate-200 p-8 rounded-[32px] text-center shadow-sm flex flex-col items-center justify-center gap-4 min-h-[400px]"
                        >
                          <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-luxury-gold animate-spin flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-luxury-gold animate-pulse" />
                          </div>
                          <span className="text-luxury-gold font-mono text-xs uppercase tracking-widest font-bold animate-pulse">Evaluating Answer Resonance...</span>
                        </motion.div>
                      )}

                      {!submittingAnswer && !evaluation && (
                        <motion.div
                          key="eval-empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-white border border-dashed border-slate-200 p-8 rounded-[32px] text-center shadow-sm flex flex-col items-center justify-center gap-4 min-h-[400px]"
                        >
                          <BookOpen className="w-12 h-12 text-slate-300 animate-pulse" />
                          <h4 className="text-slate-800 font-bold text-md">Awaiting Answer</h4>
                          <p className="text-xs text-slate-500 max-w-xs">Type your response on the left and submit it to see real-time scorecards and expert coach suggestions.</p>
                        </motion.div>
                      )}

                      {!submittingAnswer && evaluation && (
                        <motion.div
                          key="eval-result"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm text-left flex flex-col gap-6"
                        >
                          {/* Score and Metric */}
                          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <div>
                              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block">Overall Evaluation Score</span>
                              <span className="text-2xl font-black text-black font-mono">{evaluation.overallScore}/100</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block">Confidence Rating</span>
                              <span className="text-sm font-mono text-luxury-gold font-extrabold">{evaluation.confidenceScore}% Optimal</span>
                            </div>
                          </div>

                          {/* Strengths & Weaknesses Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                              <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider font-extrabold block mb-2">✓ Key Strengths</span>
                              <ul className="flex flex-col gap-1.5 text-xs text-slate-700 font-light">
                                {evaluation.strengths?.map((str, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                                    <span>{str}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-4 bg-red-50/30 border border-red-100 rounded-2xl">
                              <span className="text-[10px] font-mono text-red-700 uppercase tracking-wider font-extrabold block mb-2">⚠ Growth Opportunities</span>
                              <ul className="flex flex-col gap-1.5 text-xs text-slate-700 font-light">
                                {evaluation.gaps?.map((gap, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-red-500 font-bold mt-0.5">•</span>
                                    <span>{gap}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Suggested answer hint */}
                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5 font-bold">Suggested Best Answer Format</span>
                            <p className="text-slate-700 text-xs leading-relaxed font-light whitespace-pre-wrap">
                              {evaluation.suggestedAnswer}
                            </p>
                          </div>

                          {/* Next controls */}
                          <div className="flex gap-3 justify-end items-center border-t border-slate-100 pt-5 mt-2">
                            <button
                              onClick={nextQuestion}
                              className="px-6 py-3 bg-black hover:bg-zinc-800 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                            >
                              <span>{currentIndex < questions.length - 1 ? "Next Question" : "Complete Session"}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                            </button>
                          </div>

                          {/* Interactive Interview Chat Follow-Up (Black) */}
                          <div className="flex flex-col gap-4 mt-6 border-t border-slate-200 pt-6">
                            <h4 className="text-black font-extrabold text-md flex items-center gap-2">
                              <MessageSquare className="w-4.5 h-4.5 text-luxury-gold" />
                              Interactive Coaching Session
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-light">
                              Ask how to rephrase your answer, detailed definitions of target metrics, or tips to raise your alignment scores.
                            </p>

                            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-inner text-left">
                              {interviewChatMessages.length === 0 && (
                                <div className="text-center py-4 text-slate-450 text-xs font-medium">
                                  Ask your Interview coach: "How do I explain this with an example?" or "What's wrong with my grammar?"
                                </div>
                              )}
                              {interviewChatMessages.map((msg, mIdx) => (
                                <div
                                  key={mIdx}
                                  className={`p-4 rounded-xl max-w-[85%] text-xs leading-relaxed shadow-sm ${
                                    msg.role === 'user'
                                      ? 'bg-luxury-gold text-white self-end text-right rounded-tr-none'
                                      : 'bg-slate-800 text-slate-100 self-start text-left rounded-tl-none border border-slate-700'
                                  }`}
                                >
                                  <span className={`font-mono text-[9px] uppercase tracking-widest block mb-1 font-extrabold ${msg.role === 'user' ? 'text-white/85' : 'text-luxury-gold'}`}>
                                    {msg.role === 'user' ? 'You' : 'AI Interviewer'}
                                  </span>
                                  <div className="whitespace-pre-line font-sans font-medium">{msg.content}</div>
                                </div>
                              ))}
                              {sendingInterviewChat && (
                                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 self-start text-left max-w-[85%] text-xs flex items-center gap-2.5 text-slate-400 animate-pulse">
                                  <Brain className="w-4 h-4 text-luxury-gold animate-spin" />
                                  Interviewer is typing...
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={interviewChatInput}
                                onChange={(e) => setInterviewChatInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    sendInterviewChatMessage();
                                  }
                                }}
                                placeholder="Ask your Interviewer a question..."
                                className="flex-grow bg-[#F8FAFC] border border-slate-250 focus:border-luxury-gold text-black rounded-xl px-4 py-3 text-xs outline-none"
                              />
                              <button
                                onClick={sendInterviewChatMessage}
                                disabled={sendingInterviewChat || !interviewChatInput.trim()}
                                className="px-5 py-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-hover text-white text-xs font-extrabold uppercase tracking-wider transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer shadow-md"
                              >
                                <Send className="w-3.5 h-3.5 text-white" />
                                <span>Send</span>
                              </button>
                            </div>
                          </div>

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
