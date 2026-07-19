import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  FileText, Sparkles, Download, Share2, MapPin, Mail, Github, Linkedin, Briefcase, Plus, RefreshCw, Layers
} from "lucide-react";

export default function PortfolioBuilder() {
  // Main states reflecting the user's exact uploaded mockup
  const [resume, setResume] = useState({
    fullName: "Alex Rivera",
    profession: "Senior Full-Stack & Solutions Architect",
    candidateId: "NEX-9842-X7",
    location: "Neo-San Francisco, CA",
    github: "github.com/alexrivera-nexus",
    linkedin: "linkedin.com/in/alexrivera-dev",
    email: "alex.rivera@nexus-core.io",
    bioSummary: "Specializing in decentralized state machines, high-throughput microsecond-latency microservices, and reactive canvas user interfaces. Passionate about system consistency and secure edge protocols.",
    timelineText: "• Staff Engineer at Cyberdyne Systems (2024 - 2026)\nLed transition to concurrent React architecture, reducing interaction latency by 45%.\n\n• Senior Solutions Architect at Omnicorp (2021 - 2024)\nDesigned sub-second telemetry queues handling 10M+ operations/sec with zero failures.\n\n• Software Engineer at StarkTech (2018 - 2021)\nCore designer of multi-region synchronized database pipelines.",
    skills: ["TypeScript", "React", "Node.js", "Express", "Distributed Systems", "WebRTC", "Canvas API", "Framer Motion", "Tailwind CSS", "Redis"]
  });

  const [draftSkill, setDraftSkill] = useState("");
  const [isAIOptimizing, setIsAIOptimizing] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Trigger brief success notification toast
  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  // Add / Remove Skills
  const handleAddSkill = () => {
    if (!draftSkill.trim()) return;
    if (resume.skills.includes(draftSkill.trim())) {
      setDraftSkill("");
      return;
    }
    setResume(prev => ({
      ...prev,
      skills: [...prev.skills, draftSkill.trim()]
    }));
    setDraftSkill("");
    triggerToast(`Added skill: ${draftSkill.trim()}`);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
    triggerToast(`Removed skill: ${skillToRemove}`);
  };

  // AI ATS Grammar Optimizer simulation
  const handleAIOptimize = () => {
    setIsAIOptimizing(true);
    setTimeout(() => {
      setResume(prev => ({
        ...prev,
        bioSummary: "Architecting elite decentralized state machines, high-throughput sub-millisecond telemetry microservices, and high-performance reactive canvas user interfaces. Champion of extreme system reliability, distributed consistency, and zero-trust edge networks.",
        profession: "Principal Solutions Architect & Systems Engineer"
      }));
      setIsAIOptimizing(false);
      triggerToast("AI Optimization applied: Bio upgraded with top-tier ATS metrics.");
    }, 1000);
  };

  // PDF Export Trigger
  const handleExportPDF = () => {
    alert("Exporting Swiss Minimalist CV PDF...\n\nYour formatted biographic profile, competencies, and professional career milestones have been parsed and packaged into a pixel-perfect, ATS-optimized print layout.");
    triggerToast("CV PDF exported successfully.");
  };

  // Copy shareable link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://nexus-protocol.ai/cv/${resume.candidateId}`);
    triggerToast("Shareable profile ledger URL copied to clipboard!");
  };

  // Parser helper to render the chronological timeline markdown/plaintext nicely
  const renderTimeline = (text: string) => {
    const lines = text.split("\n");
    return (
      <div className="space-y-4">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-2" />; // Spacer for double line breaks
          
          if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
            // Bullet milestone header line
            const cleanedText = trimmed.replace(/^[•-]\s*/, "");
            return (
              <div key={idx} className="flex items-start gap-1.5 mt-3 first:mt-0">
                <span className="text-zinc-950 font-bold text-sm select-none leading-none mt-0.5">•</span>
                <p className="text-xs text-zinc-950 font-bold tracking-tight font-sans">
                  {cleanedText}
                </p>
              </div>
            );
          }
          
          // Secondary text details lines below the milestone header
          return (
            <p key={idx} className="text-xs text-zinc-600 pl-4 leading-relaxed font-normal">
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-6 text-left relative">
      
      {/* Toast Notification Banner */}
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-white text-black text-xs font-mono px-4 py-2.5 rounded-xl shadow-[0_12px_40px_rgba(255,255,255,0.15)] border border-zinc-200 flex items-center gap-2 animate-fade-in">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9AA5FF] uppercase tracking-widest mb-1.5">
            <Layers className="w-4 h-4 text-white" />
            AI Bio Customizer Studio
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-sans">
            Cryptographic Biographic Ledger
          </h2>
          <p className="text-zinc-400 mt-1 text-xs font-light">
            Modify your verified professional footprint parameters to dynamically compile an ATS-optimal Swiss modern curriculum document in real-time.
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleAIOptimize}
          disabled={isAIOptimizing}
          className="self-start md:self-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl text-xs font-mono font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 border border-indigo-400/20"
        >
          <Sparkles className={`w-3.5 h-3.5 text-white ${isAIOptimizing ? "animate-spin" : ""}`} />
          {isAIOptimizing ? "RE-CALIBRATING SPEECH..." : "OPTIMIZE ATS COGNITION"}
        </button>
      </div>

      {/* Main Split Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Biographic Customizer Card */}
        <div className="lg:col-span-6 bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4 text-left">
          
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/60">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-mono font-black text-zinc-300 uppercase tracking-[0.25em]">
              BIOGRAPHIC CUSTOMIZER
            </span>
          </div>

          {/* Identity Info Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">Full Name</label>
              <input
                type="text"
                value={resume.fullName}
                onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 p-3 rounded-xl outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">Professional Title</label>
              <input
                type="text"
                value={resume.profession}
                onChange={(e) => setResume({ ...resume, profession: e.target.value })}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 p-3 rounded-xl outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          </div>

          {/* Non-editable Ledger ID Key */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-500 font-bold">
              CANDIDATE ID (NON-EDITABLE LEDGER KEY)
            </label>
            <input
              type="text"
              value={resume.candidateId}
              disabled
              className="bg-zinc-950/40 border border-zinc-800/50 text-zinc-500 p-3 rounded-xl outline-none cursor-not-allowed font-mono text-xs font-semibold"
            />
          </div>

          {/* Contact coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">Location</label>
              <input
                type="text"
                value={resume.location}
                onChange={(e) => setResume({ ...resume, location: e.target.value })}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 p-3 rounded-xl outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">Github</label>
              <input
                type="text"
                value={resume.github}
                onChange={(e) => setResume({ ...resume, github: e.target.value })}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 p-3 rounded-xl outline-none focus:border-zinc-500 transition-colors font-mono"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">Linkedin</label>
              <input
                type="text"
                value={resume.linkedin}
                onChange={(e) => setResume({ ...resume, linkedin: e.target.value })}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 p-3 rounded-xl outline-none focus:border-zinc-500 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Email coordinate */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">Email</label>
            <input
              type="email"
              value={resume.email}
              onChange={(e) => setResume({ ...resume, email: e.target.value })}
              className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 p-3 rounded-xl outline-none focus:border-zinc-500 transition-colors font-mono"
            />
          </div>

          {/* Biography summary statement */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">Bio Summary Statement</label>
            <textarea
              value={resume.bioSummary}
              onChange={(e) => setResume({ ...resume, bioSummary: e.target.value })}
              rows={3}
              className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 p-3 rounded-xl outline-none focus:border-zinc-500 transition-colors resize-none font-sans leading-relaxed"
            />
          </div>

          {/* Chronological career timeline markdown/plaintext */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">
                CHRONOLOGICAL CAREER TIMELINE (MARKDOWN / PLANTEXT)
              </label>
            </div>
            <textarea
              value={resume.timelineText}
              onChange={(e) => setResume({ ...resume, timelineText: e.target.value })}
              rows={6}
              className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 p-3.5 rounded-xl outline-none focus:border-zinc-500 transition-colors font-mono leading-relaxed"
            />
          </div>

          {/* Skills tags system */}
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800/40">
            <label className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">Add Verified Skills</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. PostgreSQL, Rust, Docker..."
                value={draftSkill}
                onChange={(e) => setDraftSkill(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddSkill(); } }}
                className="flex-grow bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 p-3 rounded-xl outline-none focus:border-zinc-500 transition-colors"
              />
              <button 
                type="button"
                onClick={handleAddSkill}
                className="px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors active:scale-95 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            
            {/* Interactive tag list */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {resume.skills.map((sk, idx) => (
                <span 
                  key={idx} 
                  className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 text-zinc-300 pl-2 pr-1.5 py-1 rounded-md flex items-center gap-1.5 hover:border-zinc-700 transition-all group"
                >
                  {sk}
                  <button 
                    type="button"
                    onClick={() => handleRemoveSkill(sk)} 
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Swiss Minimalist Preview Panel */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Preview Section Header */}
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
              SWISS MINIMALIST PREVIEW
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin" style={{ animationDuration: "8s" }} />
              <span className="tracking-widest uppercase">REAL-TIME ACTIVE MAPPING</span>
            </div>
          </div>

          {/* Stark White Swiss Modernist Paper Preview Sheet */}
          <div className="w-full bg-white text-zinc-900 shadow-2xl rounded-2xl p-8 md:p-10 font-sans min-h-[720px] flex flex-col justify-between border border-zinc-200">
            
            <div className="flex flex-col gap-6">
              
              {/* Document Header Panel */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                
                {/* Left side name and professional title */}
                <div className="flex flex-col">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 font-sans leading-none">
                    {resume.fullName || "Alex Rivera"}
                  </h1>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mt-2 font-sans">
                    {resume.profession || "Senior Professional Architect"}
                  </span>
                </div>

                {/* Right side alignment contact info */}
                <div className="flex flex-col items-start md:items-end gap-1.5 font-mono text-[10px] text-zinc-600">
                  <div className="flex items-center gap-1.5 md:justify-end">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    <span>{resume.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:justify-end">
                    <Mail className="w-3 h-3 text-zinc-400" />
                    <span>{resume.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:justify-end">
                    <Github className="w-3 h-3 text-zinc-400" />
                    <span>{resume.github}</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:justify-end">
                    <Linkedin className="w-3 h-3 text-zinc-400" />
                    <span>{resume.linkedin}</span>
                  </div>
                </div>

              </div>

              {/* Bold black divider rule */}
              <div className="border-t-2 border-zinc-900" />

              {/* Section: Biographic Profile */}
              {resume.bioSummary && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-extrabold tracking-widest text-zinc-950 font-mono uppercase">
                    BIOGRAPHIC PROFILE
                  </h3>
                  <p className="text-xs text-zinc-700 leading-relaxed font-normal">
                    {resume.bioSummary}
                  </p>
                </div>
              )}

              {/* Section: Core Competency matrix */}
              {resume.skills.length > 0 && (
                <div className="flex flex-col gap-2.5 mt-2">
                  <h3 className="text-xs font-extrabold tracking-widest text-zinc-950 font-mono uppercase">
                    CORE COMPETENCY MATRIX
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {resume.skills.map((sk, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono border border-zinc-300 bg-zinc-50 text-zinc-800 px-2.5 py-0.5 rounded font-medium"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Section: Career timeline stamps */}
              {resume.timelineText && (
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-1.5 text-zinc-950">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-900" />
                    <h3 className="text-xs font-extrabold tracking-widest uppercase font-mono">
                      PROFESSIONAL TIMELINE STAMPS
                    </h3>
                  </div>
                  <div className="mt-1">
                    {renderTimeline(resume.timelineText)}
                  </div>
                </div>
              )}

            </div>

            {/* Document Footer Block */}
            <div className="mt-12">
              <div className="border-t border-zinc-200 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                <span>NEXUS PROTOCOL LEDGER PASSPORT STAMP</span>
                <span>{resume.candidateId}</span>
              </div>
            </div>

          </div>

          {/* Action Row Buttons matching general style */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <button
              onClick={handleExportPDF}
              className="p-3.5 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-black" />
              EXPORT PASSPORT PDF
            </button>
            <button
              onClick={handleCopyLink}
              className="p-3.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4 text-zinc-400" />
              COPY SHAREABLE LINK
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
