import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Brain, Award, Clock, ArrowRight, BookOpen, Lightbulb, Zap } from "lucide-react";
import { CareerRecommendation, RoadmapNode } from "../types";

interface CareerMindMapProps {
  careerResult: CareerRecommendation;
  onSelectNode?: (nodeInfo: { title: string; type: string; description: string; duration?: string; difficulty?: string; skills?: string[] }) => void;
}

interface MapNode {
  id: string;
  label: string;
  type: "center" | "phase" | "skill";
  x: number;
  y: number;
  parentId?: string;
  color: string;
  details: {
    title: string;
    description: string;
    duration?: string;
    difficulty?: string;
    skills?: string[];
  };
}

export default function CareerMindMap({ careerResult, onSelectNode }: CareerMindMapProps) {
  const [nodes, setNodes] = useState<MapNode[]>([]);
  const [connections, setConnections] = useState<{ from: string; to: string; type: string }[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);

  useEffect(() => {
    if (!careerResult) return;

    const canvasWidth = 800;
    const canvasHeight = 600;
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;

    const calculatedNodes: MapNode[] = [];
    const calculatedConnections: { from: string; to: string; type: string }[] = [];

    // 1. Center Node
    const centerNode: MapNode = {
      id: "center",
      label: careerResult.title,
      type: "center",
      x: cx,
      y: cy,
      color: "#78A4CB", // Steel Blue Theme
      details: {
        title: careerResult.title,
        description: careerResult.summary,
        duration: careerResult.timeline,
        difficulty: "Executive",
        skills: careerResult.skills
      }
    };
    calculatedNodes.push(centerNode);

    const phases = careerResult.roadmap || [];
    const numPhases = phases.length;

    // Phase distance from center
    const phaseRadius = 150;
    // Skill distance from phase
    const skillRadius = 100;

    phases.forEach((phase, index) => {
      // Calculate angle for this phase (distributed around the center)
      const angle = (index * 2 * Math.PI) / numPhases - Math.PI / 2;
      const px = cx + phaseRadius * Math.cos(angle);
      const py = cy + phaseRadius * Math.sin(angle);
      
      const phaseId = `phase-${phase.id || index}`;
      const phaseColor = index === 0 ? "#78A4CB" : index === 1 ? "#9AC1D9" : "#BCE3EB";

      const phaseNode: MapNode = {
        id: phaseId,
        label: phase.phase,
        type: "phase",
        x: px,
        y: py,
        parentId: "center",
        color: phaseColor,
        details: {
          title: phase.label,
          description: phase.description,
          duration: phase.duration,
          difficulty: phase.difficulty,
          skills: phase.skills
        }
      };
      calculatedNodes.push(phaseNode);
      calculatedConnections.push({ from: "center", to: phaseId, type: "primary" });

      const skills = phase.skills || [];
      const numSkills = skills.length;

      skills.forEach((skill, sIdx) => {
        // Distribute skills in a sub-arc pointing outwards from the phase node
        const spread = 1.1; // Total radians spread
        const startAngle = angle - spread / 2;
        const skillAngle = numSkills > 1 
          ? startAngle + (sIdx * spread) / (numSkills - 1)
          : angle;

        const sx = px + skillRadius * Math.cos(skillAngle);
        const sy = py + skillRadius * Math.sin(skillAngle);

        const skillId = `skill-${phaseId}-${sIdx}`;

        const skillNode: MapNode = {
          id: skillId,
          label: skill,
          type: "skill",
          x: sx,
          y: sy,
          parentId: phaseId,
          color: "#FFFFFF",
          details: {
            title: skill,
            description: `Core technical specialty in ${phase.label}. Requires hands-on sandbox calibration and micro-testing environments.`,
            difficulty: phase.difficulty,
            duration: "Continuous training"
          }
        };
        calculatedNodes.push(skillNode);
        calculatedConnections.push({ from: phaseId, to: skillId, type: "secondary" });
      });
    });

    setNodes(calculatedNodes);
    setConnections(calculatedConnections);
    
    // Select the center node by default
    setActiveNodeId("center");
  }, [careerResult]);

  const handleNodeClick = (node: MapNode) => {
    setActiveNodeId(node.id);
    if (onSelectNode) {
      onSelectNode({
        title: node.details.title,
        type: node.type,
        description: node.details.description,
        duration: node.details.duration,
        difficulty: node.details.difficulty,
        skills: node.details.skills
      });
    }
  };

  const selectedNode = nodes.find(n => n.id === activeNodeId) || nodes.find(n => n.id === "center");

  return (
    <div className="w-full bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm overflow-hidden flex flex-col lg:flex-row gap-6">
      
      {/* 1. VISUAL MIND MAP CANVAS */}
      <div className="flex-1 min-h-[420px] lg:min-h-[520px] bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden select-none">
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25" />
        
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Soft glowing filters */}
            <filter id="glow-primary" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-secondary" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Draw glowing paths */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            // Generate aesthetic organic curve
            // We use standard quadratic curve matching coordinate centers
            const mx = (fromNode.x + toNode.x) / 2;
            const pathData = conn.type === "primary"
              ? `M ${fromNode.x} ${fromNode.y} Q ${mx} ${(fromNode.y + toNode.y) / 2 - 25} ${toNode.x} ${toNode.y}`
              : `M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`;

            const isSelectedLink = activeNodeId === fromNode.id || activeNodeId === toNode.id;

            return (
              <g key={idx}>
                {/* Underlay glow path */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={conn.type === "primary" ? "#78A4CB" : "#9AC1D9"}
                  strokeWidth={conn.type === "primary" ? 4 : 2}
                  strokeOpacity={isSelectedLink ? 0.6 : 0.15}
                  filter="url(#glow-secondary)"
                />
                {/* Main link path */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={conn.type === "primary" ? "#78A4CB" : "#94A3B8"}
                  strokeWidth={conn.type === "primary" ? 2 : 1}
                  strokeDasharray={conn.type === "secondary" ? "4,4" : undefined}
                  strokeOpacity={isSelectedLink ? 0.95 : 0.4}
                  className={conn.type === "primary" ? "animate-pulse" : ""}
                />
              </g>
            );
          })}

          {/* Draw interactive SVG Nodes */}
          {nodes.map((node) => {
            const isCenter = node.type === "center";
            const isPhase = node.type === "phase";
            const isSkill = node.type === "skill";
            const isActive = node.id === activeNodeId;
            const isHovered = hoveredNode?.id === node.id;

            // Compute sizing metrics
            const radius = isCenter ? 26 : isPhase ? 18 : 11;
            const activeScale = isActive ? 1.25 : isHovered ? 1.15 : 1.0;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y}) scale(${activeScale})`}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer select-none group"
              >
                {/* Glowing Outer Ring */}
                <circle
                  r={radius + 6}
                  fill="none"
                  stroke={isCenter ? "#78A4CB" : isPhase ? node.color : "#64748B"}
                  strokeWidth={2}
                  strokeOpacity={isActive ? 0.8 : isHovered ? 0.4 : 0}
                  className="transition-all duration-300"
                  filter="url(#glow-secondary)"
                />

                {/* Primary Circle Body */}
                <circle
                  r={radius}
                  fill={isCenter ? "#78A4CB" : isPhase ? node.color : isActive ? "#FDF4C5" : "#1E293B"}
                  stroke={isCenter ? "#FFFFFF" : isPhase ? "#FFFFFF" : isActive ? "#78A4CB" : "#475569"}
                  strokeWidth={isCenter ? 2.5 : isActive ? 2 : 1}
                  className="transition-all duration-300 shadow-lg"
                />

                {/* Node Icons / Micro text */}
                {isCenter && (
                  <Brain className="w-5 h-5 text-white -translate-x-2.5 -translate-y-2.5" />
                )}
                {isPhase && (
                  <Sparkles className="w-4 h-4 text-slate-950 -translate-x-2 -translate-y-2" />
                )}
                {isSkill && (
                  <circle r={2.5} fill={isActive ? "#0F172A" : "#64748B"} />
                )}

                {/* Node Text Label */}
                <foreignObject
                  x={isCenter ? -85 : isPhase ? -75 : -65}
                  y={radius + 3}
                  width={isCenter ? 170 : isPhase ? 150 : 130}
                  height={50}
                  className="pointer-events-none"
                >
                  <div className="flex flex-col items-center text-center">
                    <span
                      className={`font-display text-[10px] leading-tight select-none font-bold tracking-tight rounded px-1.5 py-0.5 max-w-full truncate ${
                        isActive
                          ? "bg-amber-100 text-slate-900 font-extrabold border border-amber-300 shadow-sm"
                          : isCenter
                          ? "text-white bg-slate-800 border border-slate-700"
                          : isPhase
                          ? "text-slate-900 bg-white/90 border border-slate-200"
                          : "text-slate-350 hover:text-white"
                      }`}
                    >
                      {node.label}
                    </span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Interactive Legend */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-slate-800/80 p-2.5 rounded-xl flex items-center gap-4 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-luxury-gold" />
            <span>Path Core</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-luxury-silver" />
            <span>Learning Phases</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-slate-500" />
            <span>Technical Skills</span>
          </div>
        </div>

        {/* Instruction overlay */}
        <div className="absolute top-3 right-3 bg-slate-950/40 border border-white/5 px-2.5 py-1 rounded-lg text-[9px] font-mono text-slate-350">
          ⚡ Click any node to calibrate curriculum deep-dives
        </div>
      </div>

      {/* 2. DYNAMIC FLOATING CURRICULUM INSPECTOR */}
      <div className="w-full lg:w-[320px] bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between text-left shrink-0">
        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 text-left"
            >
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-widest block mb-1">
                  {selectedNode.type === "center" ? "Career Path Main node" : selectedNode.type === "phase" ? "Curriculum Phase" : "Technical Specialty Skill"}
                </span>
                <h4 className="text-md md:text-lg font-extrabold text-black flex items-start gap-1.5 leading-snug">
                  {selectedNode.type === "center" && <Brain className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />}
                  {selectedNode.type === "phase" && <Sparkles className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5 animate-spin" />}
                  {selectedNode.type === "skill" && <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />}
                  <span>{selectedNode.details.title}</span>
                </h4>
              </div>

              {/* Node Details body */}
              <div className="flex flex-col gap-3">
                <p className="text-slate-600 text-xs leading-relaxed font-light">
                  {selectedNode.details.description}
                </p>

                {/* Micro KPIs */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-mono uppercase font-bold">Estimated Time</span>
                      <span className="text-[10px] font-mono text-black font-extrabold">{selectedNode.details.duration || "Continuous"}</span>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-luxury-gold" />
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-mono uppercase font-bold">Difficulty</span>
                      <span className="text-[10px] font-mono text-black font-extrabold">{selectedNode.details.difficulty || "Expert"}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-Skills Array (if center or phase) */}
                {selectedNode.details.skills && selectedNode.details.skills.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-extrabold">Active Targets:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.details.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-white border border-slate-200 text-slate-800 text-[9px] font-mono px-2 py-1 rounded-lg font-bold shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons inside the card */}
              <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 mt-2">
                <button
                  onClick={() => {
                    // Pre-fill coach chat with query about this specific node!
                    const targetInput = document.querySelector('input[placeholder="Ask your AI Coach a question..."]') as HTMLInputElement;
                    if (targetInput) {
                      targetInput.value = `Explain the fundamentals, core concepts, and typical career challenges associated with "${selectedNode.details.title}" in details.`;
                      targetInput.focus();
                    }
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm border border-slate-900"
                >
                  <BookOpen className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>Explain with AI</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
