import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, Sparkles, Plus, Send, CheckCircle2, ChevronRight, BarChart2, 
  Target, Zap, Briefcase, FileText, Globe, GraduationCap, Users, Trash2, Heart,
  Video, Play, Pause, Volume2, VolumeX, RotateCcw, Radio, AlertCircle, Edit3, Save,
  Check, Copy, AlertTriangle, Layers, Award, Calendar, ExternalLink, Mail, ArrowRight, X
} from "lucide-react";
import { jsPDF } from "jspdf";

interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  salaryRange: string;
  workMode: 'remote' | 'hybrid' | 'on-site';
  schedule: 'full-time' | 'internship';
  skillsRequired: string[];
  description: string;
  deadline: string;
  experienceLevel?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  perks?: string[];
  milestones?: string[];
  applicationsCount?: number;
  draft?: boolean;
}

export default function EmployerDashboard() {
  // Navigation: 'analytics' | 'hiring' | 'talent' | 'company'
  const [activeTab, setActiveTab] = useState<'analytics' | 'hiring' | 'talent' | 'company'>('analytics');

  // Company Profile State
  const [companyDetails, setCompanyDetails] = useState({
    name: "Aetheria Intelligence Node",
    tagline: "High-dimensional neural compute & cognitive architecture systems",
    about: "Aetheria is an hyper-scalable software and deep cognitive research enterprise creating multi-modal transformer complexes and superdense entanglement registers for global Fortune 50 clients.",
    mission: "To eliminate logical friction states between human synaptic thought and synthetic systems engineering parameters.",
    culture: "Autonomous, brutalist transparency, continuous vector calibration, luxurious intellectual curiosity.",
    website: "https://aetheria.intelligence",
    officeGallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80"
    ],
    achievements: ["Delivered world's first multi-dimensional reasoning synapse cluster v1", "Top 10 Quantum Compute Developer Choice Awards 2026"]
  });

  // Hiring Posts State
  const [jobPosts, setJobPosts] = useState<JobPost[]>(() => {
    const saved = localStorage.getItem("nexus_jobs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    const defaultJobs = [
      {
        id: "j1",
        title: "AI Core Synaptic Architect",
        department: "Cognitive Engineering Group",
        location: "San Francisco, CA / Remote",
        salaryRange: "$240,000 - $310,000",
        workMode: "remote",
        schedule: "full-time",
        skillsRequired: ["Transformer Mechanics", "Tensor Entrapment", "PyTorch Matrix Tuning"],
        description: "Direct engineering overlay on liquid-network cognitive structures. Focuses heavily on reducing model weight decay parameters and micro-attention tuning cycles.",
        deadline: "2026-07-15"
      },
      {
        id: "j2",
        title: "Quantum Cryo-Security Engineer",
        department: "Failsafe Decoupling team",
        location: "Geneva, Switzerland / Hybrid",
        salaryRange: "$195,000 - $265,000",
        workMode: "hybrid",
        schedule: "full-time",
        skillsRequired: ["Qubit Cryo Shielding", "Preemptive Quantum Leak Detection"],
        description: "Supervise deep physical cryo containment units housing our 64-qubit cryptographic processing grid. Perfect compliance safeguards architecture.",
        deadline: "2026-06-30"
      },
      {
        id: "j3",
        title: "Holographic UX Spatial Designer",
        department: "Brutalist Experience lab",
        location: "Kyoto, Japan / Remote",
        salaryRange: "$175,000 - $220,000",
        workMode: "remote",
        schedule: "full-time",
        skillsRequired: ["Spatial Viewport Projection", "Zero-G Interface Physics", "Holographic Emissives"],
        description: "Craft next-generation responsive spatial displays projecting multidimensional candidate metrics. Work heavily with light wave interference matrices to resolve cognitive eye fatigue.",
        deadline: "2026-08-10"
      },
      {
        id: "j4",
        title: "Neuromorphic Infrastructure Director",
        department: "Cognitive Engineering Group",
        location: "Austin, TX / On-Site",
        salaryRange: "$280,000 - $350,005",
        workMode: "on-site",
        schedule: "full-time",
        skillsRequired: ["SpiNNaker Systems", "Analog Threshold Silicon", "Synaptic Bus Routing"],
        description: "Lead deployment of neuromorphic brain-silicon compute cores. You will scale 10,000-layer spiking neural network chassis arrays in secure bunker grids.",
        deadline: "2026-09-01"
      },
      {
        id: "j5",
        title: "Bio-Cybernetics Ethics Officer",
        department: "Failsafe Decoupling team",
        location: "Paris, France / Remote",
        salaryRange: "$160,040 - $210,000",
        workMode: "remote",
        schedule: "full-time",
        skillsRequired: ["Synaptic Autonomy Ethics", "Bypass Loop Safeguards", "Cognitive Sovereignty Auditing"],
        description: "Draft alignment protocols governing synthetic thought synthesis. Protect consumer neural buffers from persistent enterprise advertising injections and override states.",
        deadline: "2026-10-12"
      },
      {
        id: "j6",
        title: "Deep Space Algorithmic Strategist",
        department: "Cognitive Engineering Group",
        location: "Singapore Grid Node / Hybrid",
        salaryRange: "$310,000 - $420,000",
        workMode: "hybrid",
        schedule: "full-time",
        skillsRequired: ["Relativistic Arbitrage", "Lag-Tolerant Models", "Telemetry Aggregation"],
        description: "Optimize high stakes trades using lag-tolerant intelligence models synchronized over lunar laser transceivers. Leverage orbital relays with extreme latency mitigation.",
        deadline: "2026-12-05"
      },
      {
        id: "j7",
        title: "Synthetic Genetics Protocol Lead",
        department: "Cybernetics Bio-Grid",
        location: "Boston, MA / On-Site",
        salaryRange: "$225,000 - $290,000",
        workMode: "on-site",
        schedule: "full-time",
        skillsRequired: ["CRISPR Compiler Tools", "Base-Pair Wave-Interference", "Metabolic Logic Gates"],
        description: "Direct computer-assisted gene compiling arrays. Your software will compile customizable somatic upgrades for extreme marine deep-sea environments and radiation shields.",
        deadline: "2026-08-25"
      },
      {
        id: "j8",
        title: "Quantum Entanglement Comms Architect",
        department: "Failsafe Decoupling team",
        location: "Seoul, South Korea / Remote",
        salaryRange: "$185,000 - $250,100",
        workMode: "remote",
        schedule: "full-time",
        skillsRequired: ["Quantum State Decoherence Safeguards", "Bell State Synthesis", "Sub-space Ingress"],
        description: "Deploy zero-latency secure quantum entanglement radio-frequency bridges linking neural satellite arrays to global enterprise nodes.",
        deadline: "2026-11-20"
      }
    ];
    localStorage.setItem("nexus_jobs", JSON.stringify(defaultJobs));
    return defaultJobs;
  });

  // Form states for creating new jobs
  const [newTitle, setNewTitle] = useState("");
  const [newDept, setNewDept] = useState("Cognitive Engineering Group");
  const [newLoc, setNewLoc] = useState("");
  const [newSalary, setNewSalary] = useState("$180,000 - $240,000");
  const [newMode, setNewMode] = useState<'remote' | 'hybrid' | 'on-site'>('remote');
  const [newSchedule, setNewSchedule] = useState<'full-time' | 'internship'>('full-time');
  const [newSkillsStr, setNewSkillsStr] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [aisynthesizing, setAisynthesizing] = useState(false);

  // Expanded detailed recruitment node fields
  const [newExperience, setNewExperience] = useState<string>("Senior");
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');
  const [newPerks, setNewPerks] = useState<string[]>(["Remote-First", "Health & Biotech Coverage"]);
  const [newMilestones, setNewMilestones] = useState<string[]>([
    "1. Synaptic Code Assessment",
    "2. Technical Panel Interview",
    "3. Culture Alignment",
    "4. Lock Offer"
  ]);
  const [newMilestoneInput, setNewMilestoneInput] = useState("");
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [hiringTab, setHiringTab] = useState<'deployed' | 'preview'>('deployed');
  const [previewSubTab, setPreviewSubTab] = useState<'flyer' | 'match' | 'outreach'>('flyer');
  const [selectedPreviewCandidateId, setSelectedPreviewCandidateId] = useState<string>("ac_2"); // Chit Naing
  const [customEmailSubject, setCustomEmailSubject] = useState<string>("");
  const [customEmailBody, setCustomEmailBody] = useState<string>("");

  // Active Video Candidate Player States
  const [activeVideoCandidate, setActiveVideoCandidate] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [videoError, setVideoError] = useState(false);

  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulated AI Candidates with Chit Naing included at the top!
  const [candidatesList, setCandidatesList] = useState([
    {
      id: "c_user",
      name: "Chit Naing",
      title: "AI Core Synaptic Architect (You)",
      matchScore: 99.2,
      gpaAndSchool: "Nexus Scholar Program Graduate",
      skills: ["Transformer Mechanics", "Tensor Entrapment", "Distributed Parameter Tuning"],
      bio: "High-dimensional synaptic weighting engineer with physical evidence maps. Proven ability to architect sub-millisecond logical pipelines and calibrate attention matrices.",
      isSaved: true
    },
    {
      id: "c1",
      name: "Elena Rostova",
      title: "Senior AI & Synaptic Engineer",
      matchScore: 98.7,
      gpaAndSchool: "M.S. MIT Quantum Sciences",
      skills: ["Tensor Entrapment", "Transformer Mechanics", "PyTorch Matrix Tuning", "Neural Decoupling"],
      bio: "Highly specialized in developing self-reflection and parameter distillation layers in distributed systems. Completed 14 production model alignments.",
      isSaved: true
    },
    {
      id: "c2",
      name: "Marcus Vance",
      title: "Holographic Lead Architect",
      matchScore: 94.2,
      gpaAndSchool: "Stanford CS Core Graduate",
      skills: ["High-Dimensional Logic", "Synthetic Synaptogenesis", "Linear Superpositions"],
      bio: "Created decentralized topological graph retrieval pipelines for multi-agent grids. Leverages WebAssembly compiler loops.",
      isSaved: true
    },
    {
      id: "c3",
      name: "Sienna Drake",
      title: "Cryo Shield Security Specialist",
      matchScore: 91.8,
      gpaAndSchool: "ETH Zurich Security Labs",
      skills: ["Qubit Cryo Shielding", "Preemptive Quantum Leak Detection", "Decoupled Cryptography"],
      bio: "Physical system researcher specializing in temperature coefficient models to resist side-channel qubit state interception.",
      isSaved: false
    }
  ]);

  // Candidate Analytics Custom State (Pre-populated with Bella Cruise and others)
  const [analyticsCandidates, setAnalyticsCandidates] = useState([
    {
      id: "ac_1",
      name: "Bella Cruise",
      age: 25,
      role: "Marketing Executive",
      interviewStatus: "Interviewed" as "Scheduled" | "Shortlisted" | "Under Review" | "Interviewed" | "Offer Made" | "Rejected",
      country: "USA",
      position: "Marketing Executive",
      interviewDate: "25 Sep 2021",
      jobOpeningId: "Abc-123",
      deptPosnNum: "Marketing/ Executive",
      interviewer: "James Carter",
      interviewType: "Personal Interview",
      ratings: {
        technicalSkills: 2,
        educationTraining: 3,
        workExperience: 0,
        organizationSkills: 2,
        training: 2,
        communication: 2
      },
      comments: {
        technicalSkills: "Technical skills are up to the mark",
        educationTraining: "Applicant is qualified for the job role",
        workExperience: "Applicant is not having work experience required for the job",
        organizationSkills: "Good coordination skills",
        training: "Training certifications completed successfully",
        communication: "Communicates logic clearly and articulates effectively"
      },
      finalRecommendation: "020 - Make Offer" as "020 - Make Offer" | "110 - Not Chose" | "120 - Withdrawn"
    },
    {
      id: "ac_2",
      name: "Chit Naing",
      age: 27,
      role: "AI Core Synaptic Architect",
      interviewStatus: "Shortlisted" as "Scheduled" | "Shortlisted" | "Under Review" | "Interviewed" | "Offer Made" | "Rejected",
      country: "Singapore",
      position: "AI Core Synaptic Architect",
      interviewDate: "18 Jul 2026",
      jobOpeningId: "Nexus-99",
      deptPosnNum: "Cognitive Engineering/ Core",
      interviewer: "Sophia Mitchell",
      interviewType: "Technical Panel",
      ratings: {
        technicalSkills: 3,
        educationTraining: 3,
        workExperience: 3,
        organizationSkills: 2,
        training: 3,
        communication: 3
      },
      comments: {
        technicalSkills: "Phenomenal transformer and vector routing depth",
        educationTraining: "Elite level academic background in machine learning",
        workExperience: "Substantial high stakes systems optimization background",
        organizationSkills: "Strong architectural vision and project lead",
        training: "Deep-learning hardware acceleration expert",
        communication: "Exceptional presentation of high stakes logical systems"
      },
      finalRecommendation: "020 - Make Offer" as "020 - Make Offer" | "110 - Not Chose" | "120 - Withdrawn"
    },
    {
      id: "ac_3",
      name: "Elena Rostova",
      age: 29,
      role: "Senior AI & Synaptic Engineer",
      interviewStatus: "Under Review" as "Scheduled" | "Shortlisted" | "Under Review" | "Interviewed" | "Offer Made" | "Rejected",
      country: "Switzerland",
      position: "Senior AI Engineer",
      interviewDate: "12 Jun 2026",
      jobOpeningId: "Nexus-104",
      deptPosnNum: "Cognitive Engineering/ Lead",
      interviewer: "Marcus Sterling",
      interviewType: "Core System Deep Dive",
      ratings: {
        technicalSkills: 3,
        educationTraining: 3,
        workExperience: 2,
        organizationSkills: 2,
        training: 2,
        communication: 2
      },
      comments: {
        technicalSkills: "Excellent neural compiler understanding",
        educationTraining: "Highly specialized M.S. from MIT",
        workExperience: "Strong corporate track record with 14 alignments",
        organizationSkills: "Structured thinker who values deep focus",
        training: "Maintains optimal telemetry guidelines",
        communication: "Calm, precise, objective, and highly professional"
      },
      finalRecommendation: "020 - Make Offer" as "020 - Make Offer" | "110 - Not Chose" | "120 - Withdrawn"
    },
    {
      id: "ac_4",
      name: "Sienna Drake",
      age: 26,
      role: "Cryo Shield Security Specialist",
      interviewStatus: "Scheduled" as "Scheduled" | "Shortlisted" | "Under Review" | "Interviewed" | "Offer Made" | "Rejected",
      country: "Germany",
      position: "Security Specialist",
      interviewDate: "15 Aug 2026",
      jobOpeningId: "Cryo-12",
      deptPosnNum: "Failsafe Decoupling/ Core",
      interviewer: "Hans Gruber",
      interviewType: "Security Topology Audit",
      ratings: {
        technicalSkills: 1,
        educationTraining: 2,
        workExperience: 1,
        organizationSkills: 2,
        training: 1,
        communication: 2
      },
      comments: {
        technicalSkills: "Lacks advanced qubit phase alignment depth",
        educationTraining: "Solid security foundations at ETH Zurich",
        workExperience: "Slightly shorter tenure in quantum environments",
        organizationSkills: "Good risk mitigation and emergency management",
        training: "Completed cybersecurity core bootcamps",
        communication: "Friendly, direct, and straightforward"
      },
      finalRecommendation: "110 - Not Chose" as "020 - Make Offer" | "110 - Not Chose" | "120 - Withdrawn"
    }
  ]);

  const [selectedCandidateId, setSelectedCandidateId] = useState("ac_1");

  // Editable Graph Data State
  const [graphSourcingData, setGraphSourcingData] = useState([
    { label: "Synaptic AI", val: 542 },
    { label: "Quantum Devs", val: 318 },
    { label: "Cybernetics", val: 192 },
    { label: "Interface Des", val: 223 },
    { label: "BioTech Sec", val: 105 }
  ]);

  // Editing direct candidate fields state
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    age: 25,
    role: "",
    interviewStatus: "Scheduled" as "Scheduled" | "Shortlisted" | "Under Review" | "Interviewed" | "Offer Made" | "Rejected",
    country: "",
    position: ""
  });

  // Adding candidate form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
    age: 25,
    role: "Software Engineer",
    interviewStatus: "Scheduled" as "Scheduled" | "Shortlisted" | "Under Review" | "Interviewed" | "Offer Made" | "Rejected",
    country: "USA",
    position: "Software Engineer",
    interviewDate: "18 Jul 2026",
    jobOpeningId: "New-99",
    deptPosnNum: "R&D Team",
    interviewer: "Lead Recruiter",
    interviewType: "Video Screening"
  });

  // Handle graph update
  const handleUpdateGraphVal = (idx: number, newVal: number) => {
    setGraphSourcingData(prev => prev.map((item, i) => i === idx ? { ...item, val: Math.max(0, newVal) } : item));
  };

  // Start editing inline row
  const handleStartEditRow = (cand: any) => {
    setEditingCandidateId(cand.id);
    setEditFormData({
      name: cand.name,
      age: cand.age,
      role: cand.role,
      interviewStatus: cand.interviewStatus,
      country: cand.country,
      position: cand.position
    });
  };

  // Save inline row edit
  const handleSaveEditRow = (id: string) => {
    setAnalyticsCandidates(prev => prev.map(c => c.id === id ? { ...c, ...editFormData } : c));
    setEditingCandidateId(null);
  };

  // Delete a candidate
  const handleDeleteAnalyticsCandidate = (id: string) => {
    setAnalyticsCandidates(prev => prev.filter(c => c.id !== id));
    if (selectedCandidateId === id) {
      const remaining = analyticsCandidates.filter(c => c.id !== id);
      if (remaining.length > 0) {
        setSelectedCandidateId(remaining[0].id);
      }
    }
  };

  // Add new candidate analytics entry
  const handleAddNewCandidate = () => {
    if (!addFormData.name.trim()) return;
    const newCand = {
      id: `ac_${Date.now()}`,
      name: addFormData.name,
      age: Number(addFormData.age) || 25,
      role: addFormData.role,
      interviewStatus: addFormData.interviewStatus,
      country: addFormData.country,
      position: addFormData.position,
      interviewDate: addFormData.interviewDate,
      jobOpeningId: addFormData.jobOpeningId,
      deptPosnNum: addFormData.deptPosnNum,
      interviewer: addFormData.interviewer,
      interviewType: addFormData.interviewType,
      ratings: {
        technicalSkills: 2,
        educationTraining: 2,
        workExperience: 2,
        organizationSkills: 2,
        training: 2,
        communication: 2
      },
      comments: {
        technicalSkills: "Pending active session logs",
        educationTraining: "Syllabus mapping aligned",
        workExperience: "Experience coordinates logged",
        organizationSkills: "Coherent logical framework",
        training: "Training cycle completed",
        communication: "Articulate interview parameters"
      },
      finalRecommendation: "020 - Make Offer" as "020 - Make Offer" | "110 - Not Chose" | "120 - Withdrawn"
    };

    setAnalyticsCandidates(prev => [...prev, newCand]);
    setSelectedCandidateId(newCand.id);
    setShowAddForm(false);
    // Reset add form
    setAddFormData({
      name: "",
      age: 25,
      role: "Software Engineer",
      interviewStatus: "Scheduled",
      country: "USA",
      position: "Software Engineer",
      interviewDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      jobOpeningId: "Abc-999",
      deptPosnNum: "R&D/ Core Team",
      interviewer: "Alex Mercer",
      interviewType: "Technical Screening"
    });
  };

  const toggleSaveCandidate = (id: string) => {
    setCandidatesList(prev => prev.map(c => c.id === id ? { ...c, isSaved: !c.isSaved } : c));
  };

  // Dynamic subtitles and backup source paths mapping
  const candidateSubtitlesMap: Record<string, { src: string; subs: { time: number; text: string }[] }> = {
    c_user: {
      src: localStorage.getItem("nexus_candidate_video_base64") || "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-developer-coding-on-a-laptop-42171-large.mp4",
      subs: [
        { time: 0, text: "Systems online. Hello, I am Chit Naing, AI Core Synaptic Architect." },
        { time: 3, text: "I specialize in fine-tuning Transformer weights and reducing parameter decay." },
        { time: 7, text: "I build high-dimensional neural pipelines that reduce compute latency by 40%." },
        { time: 11, text: "In this Verified Passport, you can inspect my live evidence-based metrics." },
        { time: 14, text: "Let's connect and calibrate future-focused digital architectures." }
      ]
    },
    c1: {
      src: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-futuristic-vr-glasses-41312-large.mp4",
      subs: [
        { time: 0, text: "Telemetry online. Hello, I am Elena Rostova, Senior AI Engineer." },
        { time: 3, text: "I develop self-reflection and parameter distillation layers." },
        { time: 7, text: "I've overseen 14 production model alignments to remove catastrophic forgetting." },
        { time: 11, text: "My pipelines guarantee 99.8% semantic recall under load." },
        { time: 14, text: "Review my live simulation metrics. Ready to calibrate future clusters." }
      ]
    },
    c2: {
      src: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-developer-coding-on-a-laptop-42171-large.mp4",
      subs: [
        { time: 0, text: "Holographic architect Marcus Vance transmitting secure channel." },
        { time: 3, text: "Designing high-dimensional topological graph retrieval engines." },
        { time: 7, text: "My work utilizes multi-agent loops to automate synthetic asset deployment." },
        { time: 11, text: "All code compiles using optimized WebAssembly loops to reduce latency." },
        { time: 14, text: "Review the evidence-based bento matrix for my continuous learning logs." }
      ]
    },
    c3: {
      src: "https://assets.mixkit.co/videos/preview/mixkit-cyber-security-hacker-wearing-hoodie-and-glasses-41309-large.mp4",
      subs: [
        { time: 0, text: "Security feed activated. Sienna Drake speaking from Crypto Labs." },
        { time: 3, text: "My core research focuses on temperature coefficient models of cryogenic qubits." },
        { time: 7, text: "We preemptively intercept hardware side-channel quantum attacks." },
        { time: 11, text: "Our cryptographic isolation protocols are mathematical and verified." },
        { time: 14, text: "Let's interlock and audit security coordinates for sovereign networks." }
      ]
    }
  };

  const getCandidateVideoSrc = (id: string) => {
    if (id === "c_user") {
      const preset = localStorage.getItem("nexus_candidate_video_preset") || "preset_1";
      if (preset === "custom") {
        return localStorage.getItem("nexus_candidate_video_base64") || candidateSubtitlesMap.c_user.src;
      } else if (preset === "preset_2") {
        return "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-developer-coding-on-a-laptop-42171-large.mp4";
      } else {
        return "https://assets.mixkit.co/videos/preview/mixkit-woman-with-futuristic-vr-glasses-41312-large.mp4";
      }
    }
    return candidateSubtitlesMap[id]?.src || "";
  };

  // Sync playback progress for subtitle tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeVideoCandidate && isPlaying && modalVideoRef.current) {
      interval = setInterval(() => {
        if (modalVideoRef.current) {
          setCurrentTime(modalVideoRef.current.currentTime);
        }
      }, 250);
    }
    return () => clearInterval(interval);
  }, [activeVideoCandidate, isPlaying]);

  const [pdfGenerating, setPdfGenerating] = useState(false);

  const exportSavedCandidatesPDF = () => {
    const saved = candidatesList.filter(c => c.isSaved);
    if (saved.length === 0) {
      alert("No stored candidates found. Please save target candidates using the Heart icon prior to export.");
      return;
    }

    setPdfGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      // Header Banner
      doc.setFillColor(15, 23, 42); // slate dark background of header
      doc.rect(0, 0, 595, 140, "F");

      // Header Accent line
      doc.setFillColor(154, 165, 255); // gold
      doc.rect(0, 137, 595, 3, "F");

      // Title & Subtitle inside PDF
      doc.setFont("helvetica", "bold");
      doc.setTextColor(154, 165, 255);
      doc.setFontSize(22);
      doc.text("AETHER CORE RECRUITMENT SYSTEM", 40, 55);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(248, 250, 252);
      doc.setFontSize(10);
      doc.text("HIGH-DIMENSIONAL TALENT MATRIX SELECTION", 40, 75);

      doc.setTextColor(148, 163, 184);
      doc.text(`Export Timestamp: ${new Date().toLocaleString()}`, 40, 95);
      doc.text(`Total Candidates Synced: ${saved.length}`, 40, 110);

      let yOffset = 180;

      saved.forEach((cand, idx) => {
        // Page boundary safety
        if (yOffset > 650) {
          doc.addPage();
          // Paint simple page header
          doc.setFillColor(15, 23, 42);
          doc.rect(0, 0, 595, 50, "F");
          doc.setFillColor(154, 165, 255);
          doc.rect(0, 48, 595, 2, "F");
          doc.setFont("helvetica", "bold");
          doc.setTextColor(154, 165, 255);
          doc.setFontSize(12);
          doc.text("AETHER CANDIDATE EVALUATION LOG", 40, 30);
          yOffset = 80;
        }

        // Draw profile card block
        doc.setDrawColor(226, 232, 240);
        doc.setFillColor(250, 250, 250);
        doc.rect(35, yOffset, 525, 155, "F");
        doc.rect(35, yOffset, 525, 155, "D");

        // Mini Match badge inside PDF card
        doc.setFillColor(15, 118, 110); // green matching block
        doc.rect(455, yOffset + 15, 85, 25, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.text(`${cand.matchScore}% MATCH`, 465, yOffset + 31);

        // Name
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(14);
        doc.text(cand.name, 50, yOffset + 30);

        // Title
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(10);
        doc.text(cand.title, 50, yOffset + 48);

        // School/GPA
        doc.setFont("helvetica", "italic");
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(9);
        doc.text(cand.gpaAndSchool, 50, yOffset + 63);

        // Bio split for clean line wrapping
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(9.5);
        const bioText = cand.bio;
        const splitBio = doc.splitTextToSize(bioText, 495);
        doc.text(splitBio, 50, yOffset + 85);

        // Core Skills Title
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(9);
        doc.text("ALIGNED SKILLS:", 50, yOffset + 130);

        // Skills mapped horizontally with bullet
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 118, 110);
        doc.setFontSize(9);
        const skillsLine = cand.skills.join("  |  ");
        doc.text(skillsLine, 145, yOffset + 130);

        yOffset += 180;
      });

      // Save document
      doc.save(`Aether_Saved_Talent_Summary_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF engine failure:", err);
      alert("Encountered PDF rendering issue. Local telemetry fallback loaded.");
    } finally {
      setPdfGenerating(false);
    }
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const skillsArr = newSkillsStr
      ? newSkillsStr.split(",").map(s => s.trim()).filter(Boolean)
      : ["Cognitive Design", "Quantum Topology"];

    if (editingJobId) {
      // Update existing
      const updatedJobs = jobPosts.map(j => j.id === editingJobId ? {
        ...j,
        title: newTitle,
        department: newDept,
        location: newLoc || "Silicon Valley Grid / Remote",
        salaryRange: newSalary,
        workMode: newMode,
        schedule: newSchedule,
        skillsRequired: skillsArr,
        description: newDescription,
        experienceLevel: newExperience,
        priority: newPriority,
        perks: newPerks,
        milestones: newMilestones,
        draft: isDraft
      } : j);
      setJobPosts(updatedJobs);
      localStorage.setItem("nexus_jobs", JSON.stringify(updatedJobs));
      setEditingJobId(null);
    } else {
      // Create new
      const newJob: JobPost = {
        id: `j_${Date.now()}`,
        title: newTitle,
        department: newDept,
        location: newLoc || "Silicon Valley Grid / Remote",
        salaryRange: newSalary,
        workMode: newMode,
        schedule: newSchedule,
        skillsRequired: skillsArr,
        description: newDescription,
        deadline: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0], // 30 days deadline
        experienceLevel: newExperience,
        priority: newPriority,
        perks: newPerks,
        milestones: newMilestones,
        draft: isDraft,
        applicationsCount: Math.floor(Math.random() * 25) + 3 // procedurally seed applications count
      };

      const updatedJobs = [newJob, ...jobPosts];
      setJobPosts(updatedJobs);
      localStorage.setItem("nexus_jobs", JSON.stringify(updatedJobs));
    }

    // Reset Form
    setNewTitle("");
    setNewLoc("");
    setNewSkillsStr("");
    setNewDescription("");
    setNewExperience("Senior");
    setNewPriority("High");
    setNewPerks(["Remote-First", "Health & Biotech Coverage"]);
    setNewMilestones([
      "1. Synaptic Code Assessment",
      "2. Technical Panel Interview",
      "3. Culture Alignment",
      "4. Lock Offer"
    ]);
    setIsDraft(false);
  };

  const deleteJob = (id: string) => {
    const updatedJobs = jobPosts.filter(j => j.id !== id);
    setJobPosts(updatedJobs);
    localStorage.setItem("nexus_jobs", JSON.stringify(updatedJobs));
    if (editingJobId === id) {
      setEditingJobId(null);
    }
  };

  // Triggers luxury simulated AI Job Description synthesis
  const handleAISynthesize = async () => {
    if (!newTitle.trim()) return;
    setAisynthesizing(true);
    
    try {
      // Call our career prediction server route to extrapolate a highly advanced, luxurious description outline
      const response = await fetch("/api/career/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: `Provide a luxurious 2-sentence recruitment description and 3 required tools for an elite role: ${newTitle}` })
      });
      if (response.ok) {
        const data = await response.json();
        setNewDescription(`${data.summary || ""} This elite role requires immediate alignment with ${data.skills?.join(", ") || "advanced quantum workflows"}.`);
        setNewSkillsStr(data.skills?.join(", ") || "Model Calibration, Quantum Logic, Cognitive Synthesis");
        
        // Extrapolate other fields!
        if (data.salary) setNewSalary(data.salary);
        if (data.demand) {
          if (data.demand === 'Exponential') setNewPriority('Critical');
          else if (data.demand === 'High') setNewPriority('High');
          else setNewPriority('Medium');
        }
        
        // Formulate milestones based on the role
        setNewMilestones([
          "1. AI Technical Screening Grid",
          `2. Live ${data.skills?.[0] || 'Core'} Architecture Panel`,
          "3. Leadership Alignment Sync",
          "4. Immutable Offer Locked"
        ]);
      } else {
        setNewDescription(`We are seeking an elite ${newTitle} to architect high stakes logical parameters. Deep alignment across enterprise nodes and continuous self-reflection frameworks is mandatory.`);
      }
    } catch {
      setNewDescription(`We are seeking an elite ${newTitle} to architect high stakes logical parameters. Deep alignment across enterprise nodes and continuous self-reflection frameworks is mandatory.`);
    } finally {
      setAisynthesizing(false);
    }
  };

  const handleEditJob = (job: JobPost) => {
    setEditingJobId(job.id);
    setNewTitle(job.title);
    setNewDept(job.department);
    setNewLoc(job.location || "");
    setNewSalary(job.salaryRange || "$150k - $210k");
    setNewMode(job.workMode || "remote");
    setNewSchedule(job.schedule || "full-time");
    setNewSkillsStr(job.skillsRequired ? job.skillsRequired.join(", ") : "");
    setNewDescription(job.description || "");
    setNewExperience(job.experienceLevel || "Senior");
    setNewPriority(job.priority || "High");
    setNewPerks(job.perks || ["Remote-First", "Health & Biotech Coverage"]);
    setNewMilestones(job.milestones || [
      "1. Synaptic Code Assessment",
      "2. Technical Panel Interview",
      "3. Culture Alignment",
      "4. Lock Offer"
    ]);
    setIsDraft(!!job.draft);
  };

  const calculateConvergence = (cand: any): number => {
    if (!cand) return 75;
    const formSkills = newSkillsStr
      ? newSkillsStr.split(",").map(s => s.trim().toLowerCase()).filter(Boolean)
      : [];
    if (formSkills.length === 0) {
      return cand.ratings ? Math.round((cand.ratings.technicalSkills + cand.ratings.cultureFit) * 5) : 85;
    }

    let matches = 0;
    formSkills.forEach(fs => {
      if (cand.skills && cand.skills.some((cs: string) => cs.toLowerCase().includes(fs) || fs.includes(cs.toLowerCase()))) {
        matches++;
      }
    });

    const skillRatio = matches / formSkills.length;
    const score = 60 + Math.round(skillRatio * 38);
    return Math.min(99, score);
  };

  const generateDefaultEmail = (cand: any) => {
    if (!cand) return { subject: "", body: "" };
    const role = newTitle || "Senior AI Research Architect";
    return {
      subject: `[Nexus Interlock] Career Inquiry: ${role} Opportunity`,
      body: `Hi ${cand.name},\n\nI am reaching out from ${companyDetails.name}'s recruitment node regarding our active hunt for a ${role} in the ${newDept}.\n\nYour profile highlights strong competency across ${cand.skills ? cand.skills.slice(0, 3).join(", ") : "advanced AI architectures"}.\n\nLet's schedule a brief 15-minute Interlock Audit to align on technical coordinates.\n\nWarm regards,\nRecruitment Team\n${companyDetails.name}`
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 text-left">
      
      {/* Dynamic Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 matches-glow">
          <Building className="w-4 h-4 text-white" />
          Enterprise Recruiter Deck
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white mb-2">
          Nexus Recruiting Core
        </h2>
        <p className="text-slate-400 mt-1 text-sm font-light">
          Configure company culture models, deploy high stakes recruitment job posts, and let AI discovery recommend candidate vectors with high synaptic match rates.
        </p>
      </div>

      {/* Luxury Minimal Selector Tabs */}
      <div className="flex border-b border-white/5 pb-1 gap-1 flex-wrap">
        {[
          { id: 'analytics', label: 'Candidate Analytics', icon: BarChart2 },
          { id: 'hiring', label: 'Hiring Post Engine', icon: Briefcase },
          { id: 'talent', label: 'AI Talent Discovery', icon: Target },
          { id: 'company', label: 'Company Profile Hub', icon: Building }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4.5 py-3 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
                isSelected 
                  ? "bg-white text-black shadow-lg" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        
        {/* Tab 1: Candidate Analytics Screen */}
        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-8 w-full"
          >
            {/* Quick stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Active Evaluation Nodes", value: analyticsCandidates.length, change: "Real-time sync active", active: true },
                { label: "Mean Technical Rating", value: (analyticsCandidates.reduce((acc, c) => acc + c.ratings.technicalSkills, 0) / (analyticsCandidates.length || 1)).toFixed(1) + " / 3", change: "System parameter scale", active: false },
                { label: "Total Recruited Target", value: analyticsCandidates.filter(c => c.finalRecommendation === "020 - Make Offer").length, change: "Offers Synthesized", active: true },
                { label: "Mean Overall Score", value: (analyticsCandidates.reduce((acc, c) => {
                  const sum = c.ratings.technicalSkills + c.ratings.educationTraining + c.ratings.workExperience + c.ratings.organizationSkills + c.ratings.training + c.ratings.communication;
                  return acc + sum;
                }, 0) / (analyticsCandidates.length || 1)).toFixed(1) + " / 18", change: "Comprehensive Average", active: false }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl relative overflow-hidden backdrop-blur-xl shadow-lg">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">{stat.label}</span>
                  <p className="text-4xl font-mono font-extrabold text-white">{stat.value}</p>
                  <span className={`text-[10px] font-mono mt-2 block ${stat.active ? 'text-emerald-400' : 'text-slate-500'}`}>
                    · {stat.change}
                  </span>
                </div>
              ))}
            </div>

            {/* Graph: Editable Sourcing Telemetry Graph Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Graphical representation (Dynamic & Responsive SVG) */}
              <div className="lg:col-span-8 bg-slate-900/45 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative flex flex-col gap-6 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest block mb-1">Interactive Sourcing Matrix</span>
                    <h4 className="text-white font-extrabold text-xl">Candidate Sourcing Telemetry Graph</h4>
                    <p className="text-xs text-slate-400 mt-1 font-light">Tweak values in the graph editor to update real-time recruitment vectors.</p>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded bg-slate-950/80">
                    LIVE SVG GENERATOR
                  </span>
                </div>

                {/* Graphical representation container */}
                <div className="h-64 w-full flex items-end justify-between px-4 pb-2 border-b border-slate-800 pt-8 relative">
                  {graphSourcingData.map((bar, idx) => {
                    // Normalize height relative to maximum possible value (e.g., 600)
                    const maxVal = Math.max(...graphSourcingData.map(b => b.val), 300);
                    const percentage = (bar.val / maxVal) * 100;
                    
                    return (
                      <div key={idx} className="flex flex-col items-center gap-3 w-1/5 group relative">
                        {/* Interactive floating bubble indicator */}
                        <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-300 bg-slate-950 border border-slate-700 px-2 py-1 rounded shadow-lg text-center z-20">
                          <span className="text-[10px] font-mono text-emerald-400 font-extrabold">{bar.val} candidates</span>
                        </div>
                        
                        {/* Bar with dual gradient stack */}
                        <div className="w-14 bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-t-xl transition-all duration-300 relative overflow-hidden h-44 flex items-end shadow-inner">
                          <motion.div 
                            className="w-full rounded-t-xl bg-gradient-to-t from-teal-500/80 via-[#3bba9c] to-teal-400"
                            style={{ height: `${percentage}%` }}
                            layoutId={`chartBar_${idx}`}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                          >
                            {/* Reflection overlay effect inside the bar */}
                            <div className="absolute inset-y-0 left-0 w-[2px] bg-white/20" />
                          </motion.div>
                        </div>
                        
                        <div className="text-center w-full">
                          <span className="text-[11px] font-mono text-white font-extrabold block">{bar.val}</span>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block truncate mt-0.5">{bar.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                  <span>REAL-TIME INTERACTION: COMPLIANT WITH SVG PIPELINE</span>
                  <span>TAP SLIDERS ON RIGHT TO EDIT</span>
                </div>
              </div>

              {/* Interactive Graph Editor Panel */}
              <div className="lg:col-span-4 bg-slate-900/45 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between gap-6 shadow-xl">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-luxury-gold uppercase tracking-widest mb-1.5">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    Interactive Graph Controls
                  </div>
                  <h4 className="text-white font-extrabold text-md">Direct Dataset Tuning</h4>
                  <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                    Slide or input custom values below. Watch the recruitment pipeline telemetry bar graphs recalibrate their vectors instantly.
                  </p>
                </div>

                {/* Sourcing values editor list */}
                <div className="flex flex-col gap-3">
                  {graphSourcingData.map((bar, idx) => (
                    <div key={idx} className="flex flex-col gap-1 bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl shadow-sm">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-600 font-bold">{bar.label}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#78A4CB] font-extrabold">{bar.val}</span>
                          <span className="text-slate-400 text-[8px]">NODES</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="600"
                          value={bar.val}
                          onChange={(e) => handleUpdateGraphVal(idx, Number(e.target.value))}
                          className="flex-grow accent-[#78A4CB] h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          value={bar.val}
                          onChange={(e) => handleUpdateGraphVal(idx, Number(e.target.value))}
                          className="w-14 bg-white border border-slate-200 text-[10px] font-mono text-slate-800 p-1 text-center rounded outline-none focus:border-[#78A4CB] shadow-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setGraphSourcingData([
                    { label: "Synaptic AI", val: 542 },
                    { label: "Quantum Devs", val: 318 },
                    { label: "Cybernetics", val: 192 },
                    { label: "Interface Des", val: 223 },
                    { label: "BioTech Sec", val: 105 }
                  ])}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[10px] font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                >
                  Reset Chart Telemetry Dataset
                </button>
              </div>
            </div>

            {/* Master Candidates Table with full inline editing capability */}
            <div className="bg-slate-900/45 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest block mb-1">Master Talent Ledger</span>
                  <h4 className="text-white font-extrabold text-2xl">Candidates Analytics Matrix Table</h4>
                  <p className="text-xs text-slate-400 mt-1 font-light">Select any candidate to load their structured HR evaluation form below. You can also edit values inline.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-[#3bba9c] hover:scale-[1.02] text-black font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(45,212,191,0.2)]"
                  >
                    <Plus className="w-4 h-4 text-black" />
                    <span>Add New Candidate Node</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Expandable Add Candidate Form */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-teal-500/20 bg-teal-950/10 p-5 rounded-2xl overflow-hidden"
                  >
                    <h5 className="text-white text-xs font-mono uppercase tracking-wider text-teal-400 mb-4">Register New Applicant Analytics Node</h5>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Candidate Name</span>
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          value={addFormData.name}
                          onChange={(e) => setAddFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-slate-950 border border-slate-800 rounded-xl text-xs text-white p-2.5 outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Age</span>
                        <input
                          type="number"
                          placeholder="e.g. 28"
                          value={addFormData.age}
                          onChange={(e) => setAddFormData(prev => ({ ...prev, age: Number(e.target.value) }))}
                          className="bg-slate-950 border border-slate-800 rounded-xl text-xs text-white p-2.5 outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Position / Target Job</span>
                        <input
                          type="text"
                          placeholder="e.g. Software Architect"
                          value={addFormData.position}
                          onChange={(e) => setAddFormData(prev => ({ ...prev, position: e.target.value, role: e.target.value }))}
                          className="bg-slate-950 border border-slate-800 rounded-xl text-xs text-white p-2.5 outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Country</span>
                        <input
                          type="text"
                          placeholder="e.g. Canada"
                          value={addFormData.country}
                          onChange={(e) => setAddFormData(prev => ({ ...prev, country: e.target.value }))}
                          className="bg-slate-950 border border-slate-800 rounded-xl text-xs text-white p-2.5 outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Interview Status</span>
                        <select
                          value={addFormData.interviewStatus}
                          onChange={(e: any) => setAddFormData(prev => ({ ...prev, interviewStatus: e.target.value }))}
                          className="bg-slate-950 border border-slate-800 rounded-xl text-xs text-white p-2.5 outline-none focus:border-teal-500 cursor-pointer"
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Interviewed">Interviewed</option>
                          <option value="Offer Made">Offer Made</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Interview Date</span>
                        <input
                          type="text"
                          placeholder="e.g. 18 Jul 2026"
                          value={addFormData.interviewDate}
                          onChange={(e) => setAddFormData(prev => ({ ...prev, interviewDate: e.target.value }))}
                          className="bg-slate-950 border border-slate-800 rounded-xl text-xs text-white p-2.5 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Job Opening ID</span>
                        <input
                          type="text"
                          placeholder="e.g. Abc-101"
                          value={addFormData.jobOpeningId}
                          onChange={(e) => setAddFormData(prev => ({ ...prev, jobOpeningId: e.target.value }))}
                          className="bg-slate-950 border border-slate-800 rounded-xl text-xs text-white p-2.5 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Dept/Posn #</span>
                        <input
                          type="text"
                          placeholder="e.g. Sales/ Executive"
                          value={addFormData.deptPosnNum}
                          onChange={(e) => setAddFormData(prev => ({ ...prev, deptPosnNum: e.target.value }))}
                          className="bg-slate-950 border border-slate-800 rounded-xl text-xs text-white p-2.5 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-5">
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddNewCandidate}
                        className="px-5 py-2 bg-teal-400 hover:bg-teal-500 text-black font-extrabold text-xs rounded-xl uppercase"
                      >
                        Publish Candidate Node
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Responsive Candidate Table Container */}
              <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950/70">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-4 text-center w-12">Select</th>
                      <th className="p-4">Applicant Name</th>
                      <th className="p-4 w-20">Age</th>
                      <th className="p-4">Target Role</th>
                      <th className="p-4">Country</th>
                      <th className="p-4">Position Title</th>
                      <th className="p-4">Interview Status</th>
                      <th className="p-4 text-center w-36">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {analyticsCandidates.map((cand) => {
                      const isSelected = selectedCandidateId === cand.id;
                      const isEditing = editingCandidateId === cand.id;
                      
                      return (
                        <tr 
                          key={cand.id} 
                          className={`group hover:bg-slate-50/60 transition-colors ${isSelected ? 'bg-[#78A4CB]/10 border-l-4 border-l-[#78A4CB]' : ''}`}
                        >
                          {/* Selection checkbox cell */}
                          <td className="p-4 text-center">
                            <input
                              type="radio"
                              name="selectedCandidate"
                              checked={isSelected}
                              onChange={() => setSelectedCandidateId(cand.id)}
                              className="w-4 h-4 cursor-pointer accent-[#78A4CB]"
                              title={`Evaluate ${cand.name}`}
                            />
                          </td>

                          {/* Name cell */}
                          <td className="p-4 font-bold text-slate-800">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="bg-white border border-slate-300 text-xs text-slate-800 p-1.5 rounded w-full outline-none focus:border-[#78A4CB]"
                              />
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-slate-800">{cand.name}</span>
                                {cand.id === "ac_2" && (
                                  <span className="text-[8px] bg-amber-100 border border-amber-300 text-amber-800 px-1.5 py-0.5 rounded uppercase tracking-wider font-bold font-mono">
                                    YOU
                                  </span>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Age cell */}
                          <td className="p-4">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editFormData.age}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, age: Number(e.target.value) }))}
                                className="bg-white border border-slate-300 text-xs text-slate-800 p-1.5 rounded w-16 outline-none focus:border-[#78A4CB]"
                              />
                            ) : (
                              <span className="text-slate-600 font-mono font-semibold">{cand.age}</span>
                            )}
                          </td>

                          {/* Role cell */}
                          <td className="p-4 text-slate-600 text-xs">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editFormData.role}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, role: e.target.value }))}
                                className="bg-white border border-slate-300 text-xs text-slate-800 p-1.5 rounded w-full outline-none focus:border-[#78A4CB]"
                              />
                            ) : (
                              cand.role
                            )}
                          </td>

                          {/* Country cell */}
                          <td className="p-4 text-slate-600 text-xs">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editFormData.country}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, country: e.target.value }))}
                                className="bg-white border border-slate-300 text-xs text-slate-800 p-1.5 rounded w-full outline-none focus:border-[#78A4CB]"
                              />
                            ) : (
                              cand.country
                            )}
                          </td>

                          {/* Position cell */}
                          <td className="p-4 text-slate-600 text-xs">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editFormData.position}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, position: e.target.value }))}
                                className="bg-white border border-slate-300 text-xs text-slate-800 p-1.5 rounded w-full outline-none focus:border-[#78A4CB]"
                              />
                            ) : (
                              cand.position
                            )}
                          </td>

                          {/* Interview Status cell */}
                          <td className="p-4">
                            {isEditing ? (
                              <select
                                value={editFormData.interviewStatus}
                                onChange={(e: any) => setEditFormData(prev => ({ ...prev, interviewStatus: e.target.value }))}
                                className="bg-white border border-slate-300 text-xs text-slate-800 p-1.5 rounded w-full cursor-pointer outline-none focus:border-[#78A4CB]"
                              >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Interviewed">Interviewed</option>
                                <option value="Offer Made">Offer Made</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            ) : (
                              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                                cand.interviewStatus === "Offer Made"
                                  ? "bg-emerald-950/40 border-emerald-500/20 text-emerald-400"
                                  : cand.interviewStatus === "Rejected"
                                  ? "bg-red-950/40 border-red-500/20 text-red-400"
                                  : cand.interviewStatus === "Interviewed"
                                  ? "bg-blue-950/40 border-blue-500/20 text-blue-400"
                                  : cand.interviewStatus === "Under Review"
                                  ? "bg-amber-950/40 border-amber-500/20 text-amber-400"
                                  : "bg-slate-50 border-slate-200 text-slate-500"
                              }`}>
                                {cand.interviewStatus}
                              </span>
                            )}
                          </td>

                          {/* Actions cell */}
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {isEditing ? (
                                <button
                                  onClick={() => handleSaveEditRow(cand.id)}
                                  className="p-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg transition-colors cursor-pointer"
                                  title="Save updates"
                                >
                                  <Save className="w-4 h-4 text-emerald-600" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStartEditRow(cand)}
                                  className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
                                  title="Edit fields inline"
                                >
                                  <Edit3 className="w-4 h-4 text-slate-500" />
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedCandidateId(cand.id)}
                                className={`px-2.5 py-1 text-[10px] font-mono rounded-lg border transition-all cursor-pointer ${
                                  isSelected 
                                    ? "bg-[#78A4CB]/15 border-[#78A4CB] text-[#1E40AF] font-extrabold" 
                                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800"
                                }`}
                                title="Open Detailed Form View"
                              >
                                Evaluate
                              </button>
                              <button
                                onClick={() => handleDeleteAnalyticsCandidate(cand.id)}
                                className="p-1.5 bg-slate-800/50 hover:bg-red-950/30 border border-slate-700/50 hover:border-red-900/40 text-slate-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                                title="Delete Candidate Row"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* HIGH-FIDELITY HR EVALUATION FORM (Matches layout of provided image screenshot perfectly) */}
            {(() => {
              const cand = analyticsCandidates.find(c => c.id === selectedCandidateId);
              if (!cand) return (
                <div className="p-12 text-center border border-dashed border-slate-800 bg-slate-900/20 rounded-3xl text-slate-500">
                  Select a candidate from the table ledger above to evaluate their physical score metrics.
                </div>
              );

              // Calculate overall score (sum of ratings)
              const overallRatingSum = cand.ratings.technicalSkills + cand.ratings.educationTraining + cand.ratings.workExperience + cand.ratings.organizationSkills + cand.ratings.training + cand.ratings.communication;

              // Helper to update specific evaluation ratings
              const updateRating = (category: keyof typeof cand.ratings, value: number) => {
                setAnalyticsCandidates(prev => prev.map(c => {
                  if (c.id === cand.id) {
                    return {
                      ...c,
                      ratings: {
                        ...c.ratings,
                        [category]: value
                      }
                    };
                  }
                  return c;
                }));
              };

              // Helper to update specific evaluation comments
              const updateComment = (category: keyof typeof cand.comments, value: string) => {
                setAnalyticsCandidates(prev => prev.map(c => {
                  if (c.id === cand.id) {
                    return {
                      ...c,
                      comments: {
                        ...c.comments,
                        [category]: value
                      }
                    };
                  }
                  return c;
                }));
              };

              // Helper to update specific applicant header details
              const updateHeader = (field: string, value: string) => {
                setAnalyticsCandidates(prev => prev.map(c => {
                  if (c.id === cand.id) {
                    return {
                      ...c,
                      [field]: value
                    };
                  }
                  return c;
                }));
              };

              // Helper to update final recommendation
              const updateRecommendation = (rec: "020 - Make Offer" | "110 - Not Chose" | "120 - Withdrawn") => {
                setAnalyticsCandidates(prev => prev.map(c => {
                  if (c.id === cand.id) {
                    return {
                      ...c,
                      finalRecommendation: rec
                    };
                  }
                  return c;
                }));
              };

              return (
                <div className="bg-white border border-slate-200 text-slate-900 rounded-[32px] p-8 shadow-2xl relative overflow-hidden max-w-5xl mx-auto w-full transition-all duration-300">
                  {/* Subtle decorative watermark/grid background to simulate official paperwork print layout */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

                  {/* Header Form Titles matching image styling */}
                  <div className="text-center mb-6 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans text-slate-800">
                      HR Candidate Recruitment Evaluation Form
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 max-w-3xl mx-auto mt-2 leading-relaxed font-light">
                      Evaluation form presented below showcase assessment of a candidate who applied for the job. It requires major skills such as- technical skill, educational skills, organizational skills and so on.
                    </p>
                    <div className="h-[2px] bg-slate-200 mt-4 w-full" />
                  </div>

                  {/* Metadata Input Fields mimicking layout of image */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 relative z-10 mb-8">
                    {/* Left Column details */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center rounded overflow-hidden border border-slate-300">
                        <span className="w-1/3 bg-[#3bba9c] text-white font-bold text-xs px-3 py-2.5 uppercase tracking-wider shrink-0 select-none border-r border-slate-300">
                          Applicant Name :
                        </span>
                        <input
                          type="text"
                          value={cand.name}
                          onChange={(e) => updateHeader("name", e.target.value)}
                          className="w-2/3 bg-slate-50 text-slate-900 text-xs px-3 py-2.5 outline-none font-bold"
                          placeholder="Bella Cruise"
                        />
                      </div>

                      <div className="flex items-center rounded overflow-hidden border border-slate-300">
                        <span className="w-1/3 bg-[#3bba9c] text-white font-bold text-xs px-3 py-2.5 uppercase tracking-wider shrink-0 select-none border-r border-slate-300">
                          Job Opening ID:
                        </span>
                        <input
                          type="text"
                          value={cand.jobOpeningId}
                          onChange={(e) => updateHeader("jobOpeningId", e.target.value)}
                          className="w-2/3 bg-slate-50 text-slate-900 text-xs px-3 py-2.5 outline-none"
                          placeholder="Abc-123"
                        />
                      </div>

                      <div className="flex items-center rounded overflow-hidden border border-slate-300">
                        <span className="w-1/3 bg-[#3bba9c] text-white font-bold text-xs px-3 py-2.5 uppercase tracking-wider shrink-0 select-none border-r border-slate-300">
                          Interview :
                        </span>
                        <input
                          type="text"
                          value={cand.interviewer}
                          onChange={(e) => updateHeader("interviewer", e.target.value)}
                          className="w-2/3 bg-slate-50 text-slate-900 text-xs px-3 py-2.5 outline-none"
                          placeholder="James Carter"
                        />
                      </div>
                    </div>

                    {/* Right Column details */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center rounded overflow-hidden border border-slate-300">
                        <span className="w-1/3 bg-[#3bba9c] text-white font-bold text-xs px-3 py-2.5 uppercase tracking-wider shrink-0 select-none border-r border-slate-300">
                          Interview Date:
                        </span>
                        <input
                          type="text"
                          value={cand.interviewDate}
                          onChange={(e) => updateHeader("interviewDate", e.target.value)}
                          className="w-2/3 bg-slate-50 text-slate-900 text-xs px-3 py-2.5 outline-none"
                          placeholder="25 Sep 2021"
                        />
                      </div>

                      <div className="flex items-center rounded overflow-hidden border border-slate-300">
                        <span className="w-1/3 bg-[#3bba9c] text-white font-bold text-xs px-3 py-2.5 uppercase tracking-wider shrink-0 select-none border-r border-slate-300">
                          Dept/ Posn # :
                        </span>
                        <input
                          type="text"
                          value={cand.deptPosnNum}
                          onChange={(e) => updateHeader("deptPosnNum", e.target.value)}
                          className="w-2/3 bg-slate-50 text-slate-900 text-xs px-3 py-2.5 outline-none"
                          placeholder="Marketing/ Executive"
                        />
                      </div>

                      <div className="flex items-center rounded overflow-hidden border border-slate-300">
                        <span className="w-1/3 bg-[#3bba9c] text-white font-bold text-xs px-3 py-2.5 uppercase tracking-wider shrink-0 select-none border-r border-slate-300">
                          Interview Type :
                        </span>
                        <input
                          type="text"
                          value={cand.interviewType}
                          onChange={(e) => updateHeader("interviewType", e.target.value)}
                          className="w-2/3 bg-slate-50 text-slate-900 text-xs px-3 py-2.5 outline-none"
                          placeholder="Personal Interview"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rating instructions line */}
                  <div className="bg-slate-100 p-2.5 rounded border border-slate-200 mb-4 text-[11px] md:text-xs text-slate-700 font-bold tracking-wide text-left relative z-10">
                    Rate the Applicant : 0 (Not Applicable) 0 (Unsatisfactory) 1 (Marginal) 2 (Satisfactory) 3 (Superior)
                  </div>

                  {/* Criteria Rating Evaluation Matrix Table matching the screenshot structure */}
                  <div className="overflow-x-auto border border-slate-300 rounded overflow-hidden mb-6 relative z-10 bg-white">
                    <table className="w-full text-left border-collapse min-w-[750px]">
                      <thead>
                        <tr className="bg-[#3498db] text-white text-xs font-bold font-sans">
                          <th className="p-3 w-1/4 border-r border-blue-400">Category</th>
                          <th className="p-3 text-center border-r border-blue-400" colSpan={8}>Interview Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-xs text-slate-800">
                        {/* Define the categories we map */}
                        {[
                          { key: "technicalSkills", label: "Technical Skills A", originalKey: "technicalSkills" },
                          { key: "educationTraining", label: "Education /Training", originalKey: "educationTraining" },
                          { key: "workExperience", label: "Work Experience", originalKey: "workExperience" },
                          { key: "organizationSkills", label: "Organization Skills", originalKey: "organizationSkills" },
                          { key: "training", label: "Training", originalKey: "training" },
                          { key: "communication", label: "Communication", originalKey: "communication" }
                        ].map((category) => {
                          const currentRating = cand.ratings[category.key as keyof typeof cand.ratings];
                          const commentValue = cand.comments[category.key as keyof typeof cand.comments];

                          return (
                            <React.Fragment key={category.key}>
                              {/* Evaluation category label and checkbox choices row */}
                              <tr className="bg-slate-50">
                                <td className="p-3 font-bold border-r border-slate-200 bg-slate-100 w-1/4">
                                  {category.label}
                                </td>
                                
                                {/* 0 rating choice */}
                                <td className="p-3 border-r border-slate-200 text-center bg-white">
                                  <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                                    <span className="font-mono font-bold text-slate-500">0</span>
                                    <input
                                      type="checkbox"
                                      checked={currentRating === 0}
                                      onChange={() => updateRating(category.key as any, 0)}
                                      className="w-4 h-4 cursor-pointer accent-[#3498db]"
                                    />
                                  </label>
                                </td>

                                {/* 1 rating choice */}
                                <td className="p-3 border-r border-slate-200 text-center bg-white">
                                  <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                                    <span className="font-mono font-bold text-slate-500">1</span>
                                    <input
                                      type="checkbox"
                                      checked={currentRating === 1}
                                      onChange={() => updateRating(category.key as any, 1)}
                                      className="w-4 h-4 cursor-pointer accent-[#3498db]"
                                    />
                                  </label>
                                </td>

                                {/* 2 rating choice */}
                                <td className="p-3 border-r border-slate-200 text-center bg-white">
                                  <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                                    <span className="font-mono font-bold text-slate-500">2</span>
                                    <input
                                      type="checkbox"
                                      checked={currentRating === 2}
                                      onChange={() => updateRating(category.key as any, 2)}
                                      className="w-4 h-4 cursor-pointer accent-[#3498db]"
                                    />
                                  </label>
                                </td>

                                {/* 3 rating choice */}
                                <td className="p-3 text-center bg-white">
                                  <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                                    <span className="font-mono font-bold text-slate-500">3</span>
                                    <input
                                      type="checkbox"
                                      checked={currentRating === 3}
                                      onChange={() => updateRating(category.key as any, 3)}
                                      className="w-4 h-4 cursor-pointer accent-[#3498db]"
                                    />
                                  </label>
                                </td>
                              </tr>

                              {/* Comments Row */}
                              <tr className="bg-slate-100">
                                <td className="p-2 pl-4 text-slate-500 italic font-mono text-[10px] border-r border-slate-200">
                                  Comments:
                                </td>
                                <td className="p-2" colSpan={7}>
                                  <input
                                    type="text"
                                    value={commentValue}
                                    onChange={(e) => updateComment(category.key as any, e.target.value)}
                                    className="w-full bg-blue-50/50 hover:bg-blue-50/90 text-slate-800 text-xs px-3 py-1.5 rounded border border-blue-200/50 outline-none focus:border-[#3498db]"
                                    placeholder="Add evaluation comments here..."
                                  />
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Calculations and overall rating matching image */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 border-t border-slate-200 pt-4 items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Enter An Overall Rate (Sum of Above):</span>
                        <div className="bg-[#f0f9ff] border border-blue-200 px-4 py-2 rounded-xl text-center shadow-sm">
                          <span className="text-xl font-mono font-extrabold text-[#3498db]">{overallRatingSum}</span>
                          <span className="text-[10px] text-slate-400 font-mono ml-1">/ 18 POINTS</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-xs font-bold text-slate-600 uppercase">Overall Rating Scorecard:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold px-2 py-1 rounded bg-[#3bba9c] text-white">
                          {overallRatingSum >= 15 ? "SUPERIOR" : overallRatingSum >= 10 ? "SATISFACTORY" : overallRatingSum >= 5 ? "MARGINAL" : "UNSATISFACTORY"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Final Recommendation area mimicking checkboxes exactly */}
                  <div className="border border-slate-300 rounded-xl bg-slate-50 p-4 mt-6 text-left relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Enter a Final Recommendation:
                    </span>
                    
                    <div className="flex flex-wrap gap-4 md:gap-6 items-center">
                      {/* Make Offer option */}
                      <label className="flex items-center gap-2 font-bold text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                        <input
                          type="checkbox"
                          checked={cand.finalRecommendation === "020 - Make Offer"}
                          onChange={() => updateRecommendation("020 - Make Offer")}
                          className="w-4 h-4 cursor-pointer accent-[#2dd4bf]"
                        />
                        <span>020 - Make Offer</span>
                      </label>

                      {/* Not Chose option */}
                      <label className="flex items-center gap-2 font-bold text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                        <input
                          type="checkbox"
                          checked={cand.finalRecommendation === "110 - Not Chose"}
                          onChange={() => updateRecommendation("110 - Not Chose")}
                          className="w-4 h-4 cursor-pointer accent-[#2dd4bf]"
                        />
                        <span>110 - Not Chose*</span>
                      </label>

                      {/* Withdrawn option */}
                      <label className="flex items-center gap-2 font-bold text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                        <input
                          type="checkbox"
                          checked={cand.finalRecommendation === "120 - Withdrawn"}
                          onChange={() => updateRecommendation("120 - Withdrawn")}
                          className="w-4 h-4 cursor-pointer accent-[#2dd4bf]"
                        />
                        <span>120 - Withdrawn*</span>
                      </label>
                    </div>
                  </div>

                  {/* Print / Save button overlay for PDF of individual form */}
                  <div className="flex justify-between items-center mt-6 text-[10px] text-slate-400 italic">
                    <span>*This slide is 100% editable. Adapt it to your need and capture your audience's attention.</span>
                    <button
                      onClick={() => {
                        alert(`Successfully locked and archived evaluation metrics database for candidate: ${cand.name}. Total score: ${overallRatingSum}/18.`);
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1 text-[11px]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Lock & Sync Candidate Form</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* Tab 2: Hiring Post Engine */}
        {activeTab === 'hiring' && (
          <motion.div
            key="hiring"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in"
          >
            
            {/* Create / Edit job form in glass panel */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  {editingJobId ? "EDIT RECRUITMENT NODE" : "POST NEW COORDINATE NODE"}
                </span>
                {editingJobId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingJobId(null);
                      setNewTitle("");
                      setNewLoc("");
                      setNewSkillsStr("");
                      setNewDescription("");
                      setNewExperience("Senior");
                      setNewPriority("High");
                      setNewPerks(["Remote-First", "Health & Biotech Coverage"]);
                      setNewMilestones([
                        "1. Synaptic Code Assessment",
                        "2. Technical Panel Interview",
                        "3. Culture Alignment",
                        "4. Lock Offer"
                      ]);
                      setIsDraft(false);
                    }}
                    className="text-[10px] font-mono text-rose-400 hover:text-rose-300 transition-colors cursor-pointer border border-rose-500/30 bg-rose-500/10 px-2 py-1 rounded-lg"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
              
              <form onSubmit={handleCreateJob} className="flex flex-col gap-4">
                {/* Target Role Title */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Target Role Title</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. AI Core Synaptic Architect"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="flex-grow bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleAISynthesize}
                      disabled={!newTitle.trim() || aisynthesizing}
                      className="px-3 bg-white/5 border border-white/10 hover:bg-white text-slate-300 hover:text-black rounded-xl text-xs font-mono transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      title="Synthesize Description & Milestones using Gemini"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {aisynthesizing ? "..." : "AI"}
                    </button>
                  </div>
                </div>

                {/* Department & Comp Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Department</label>
                    <select
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="bg-slate-950 border border-white/10 text-xs text-white p-3 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="Cognitive Engineering Group">Cognitive Group</option>
                      <option value="Failsafe Decoupling team">Failsafe Team</option>
                      <option value="Brutalist Experience lab">UI/UX Labs</option>
                      <option value="Cybernetics Bio-Grid">Bio-Cybernetics</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Comp Range</label>
                    <input
                      type="text"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                    />
                  </div>
                </div>

                {/* Work Mode & Schedule Type */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Work Mode</label>
                    <select
                      value={newMode}
                      onChange={(e) => setNewMode(e.target.value as any)}
                      className="bg-slate-950 border border-white/10 text-xs text-white p-3 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="on-site">On-Site</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Schedule Type</label>
                    <select
                      value={newSchedule}
                      onChange={(e) => setNewSchedule(e.target.value as any)}
                      className="bg-slate-950 border border-white/10 text-xs text-white p-3 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="full-time">Full-Time</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>

                {/* Experience Level & Priority */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Experience Requirement</label>
                    <select
                      value={newExperience}
                      onChange={(e) => setNewExperience(e.target.value)}
                      className="bg-slate-950 border border-white/10 text-xs text-white p-3 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="Junior">Junior Node (0-2 yr)</option>
                      <option value="Mid-Level">Mid-Level Synapse (2-5 yr)</option>
                      <option value="Senior">Senior Architect (5-8 yr)</option>
                      <option value="Lead">Lead Coordinator (8-12 yr)</option>
                      <option value="Principal">Principal Sovereign (12+ yr)</option>
                      <option value="Executive">Executive Matrix</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">System Urgency Priority</label>
                    <div className="grid grid-cols-4 gap-1.5 mt-1">
                      {(['Low', 'Medium', 'High', 'Critical'] as const).map((lvl) => {
                        const isActive = newPriority === lvl;
                        let colorClass = "";
                        if (isActive) {
                          if (lvl === 'Low') colorClass = "bg-slate-100 border-slate-300 text-slate-700 font-bold shadow-sm";
                          else if (lvl === 'Medium') colorClass = "bg-blue-50 border-blue-200 text-blue-700 font-bold shadow-sm";
                          else if (lvl === 'High') colorClass = "bg-amber-50 border-amber-200 text-amber-700 font-bold shadow-sm";
                          else colorClass = "bg-rose-50 border-rose-200 text-rose-700 font-bold shadow-sm animate-pulse";
                        } else {
                          colorClass = "bg-slate-50/50 border-slate-200/60 text-slate-500 hover:bg-slate-100 hover:text-slate-700";
                        }
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setNewPriority(lvl)}
                            className={`py-2 text-[10px] font-mono font-bold uppercase border rounded-lg transition-all cursor-pointer text-center truncate ${colorClass}`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Location Grid Node */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Location Grid Coordinate</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco Grid / Remote"
                    value={newLoc}
                    onChange={(e) => setNewLoc(e.target.value)}
                    className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                  />
                </div>

                {/* Required Skills */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Required Skills (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. LoRA, Triton Kernels, PEFT"
                    value={newSkillsStr}
                    onChange={(e) => setNewSkillsStr(e.target.value)}
                    className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                  />
                </div>

                {/* Interactive Milestones Pipeline */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Interactive Milestones Pipeline</label>
                  <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1 border border-slate-200 p-2 rounded-xl bg-slate-50/40">
                    {newMilestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white border border-slate-200/80 px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-700 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-slate-100 text-[9px] text-slate-700 flex items-center justify-center font-bold font-mono border border-slate-200">
                            {idx + 1}
                          </span>
                          <span>{milestone.replace(/^\d+\.\s*/, '')}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewMilestones(newMilestones.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-all cursor-pointer"
                          title="Remove Stage"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {newMilestones.length === 0 && (
                      <div className="text-[10px] text-slate-500 font-mono text-center py-2">
                        No custom milestones defined. Using automatic default stages.
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="Add custom stage (e.g., Live Refactoring)"
                      value={newMilestoneInput}
                      onChange={(e) => setNewMilestoneInput(e.target.value)}
                      className="flex-grow bg-white border border-slate-200 text-xs text-slate-800 px-3 py-2 rounded-xl outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newMilestoneInput.trim()) {
                            setNewMilestones([...newMilestones, `${newMilestones.length + 1}. ${newMilestoneInput.trim()}`]);
                            setNewMilestoneInput("");
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newMilestoneInput.trim()) {
                          setNewMilestones([...newMilestones, `${newMilestones.length + 1}. ${newMilestoneInput.trim()}`]);
                          setNewMilestoneInput("");
                        }
                      }}
                      className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Perks & Benefits Checklist */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Perks & Benefits Checklist</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Remote-First", "Health & Biotech Coverage", "Aether Stock Options", 
                      "Unlimited Rest Cycles", "Hardware Rig Stipend", "Learning Credits"
                    ].map((perk) => {
                      const isSelected = newPerks.includes(perk);
                      return (
                        <button
                          key={perk}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setNewPerks(newPerks.filter(p => p !== perk));
                            } else {
                              setNewPerks([...newPerks, perk]);
                            }
                          }}
                          className={`px-2.5 py-1 text-[10px] font-mono rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                            isSelected 
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold shadow-sm" 
                              : "bg-slate-50 border-slate-200/60 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Plus className="w-3 h-3 text-slate-400" />}
                          <span>{perk}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Job Description */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Job Description (Recruitment Axioms)</label>
                  <textarea
                    rows={3}
                    placeholder="Define roles, work guidelines, or strategic milestones..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed"
                    required
                  />
                </div>

                {/* Save Draft / Active Selection */}
                <div className="flex items-center justify-between px-1.5 py-1 bg-black/10 rounded-xl border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400">Publish Mode State</span>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isDraft}
                      onChange={(e) => setIsDraft(e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#9AA5FF] cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-white tracking-wider">
                      {isDraft ? "Draft Mode" : "Live Recruiting"}
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#78A4CB] hover:bg-[#5D8EB7] active:scale-[0.99] text-white font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  {editingJobId ? "Sync Deployed Coordinates" : "Deploy Recruiting Target"}
                </button>
              </form>
            </div>

            {/* Right Tabbed Panel Workspace */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              
              {/* Premium Inner Navigation */}
              <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                <div className="flex gap-2">
                  <button
                    onClick={() => setHiringTab('deployed')}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer border ${
                      hiringTab === 'deployed' 
                        ? "bg-slate-100 text-slate-800 border-slate-300 shadow-sm" 
                        : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Deployed Targets ({jobPosts.length})
                  </button>
                  <button
                    onClick={() => {
                      setHiringTab('preview');
                      const activeCandObj = candidatesList.find(c => c.id === selectedPreviewCandidateId) || candidatesList[0];
                      const defaults = generateDefaultEmail(activeCandObj);
                      setCustomEmailSubject(defaults.subject);
                      setCustomEmailBody(defaults.body);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer border ${
                      hiringTab === 'preview' 
                        ? "bg-slate-100 text-slate-800 border-slate-300 shadow-sm" 
                        : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    Engine Preview & AI Match
                  </button>
                </div>

                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  Live Recruiter Dashboard Node
                </div>
              </div>

              {/* Sub-tab A: Deployed Job Lists */}
              {hiringTab === 'deployed' && (
                <div className="flex flex-col gap-4">
                  {jobPosts.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-white/10 rounded-3xl bg-slate-950/20">
                      <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                      <p className="text-white text-sm font-semibold">No Published Coordinates</p>
                      <p className="text-slate-400 text-xs mt-1 font-light">Input title and compile role profile to initiate.</p>
                    </div>
                  ) : (
                    jobPosts.map((job) => {
                      const priority = job.priority || "High";
                      const isJobDraft = !!job.draft;
                      
                      let priorityColor = "bg-amber-950/40 border-amber-500/20 text-amber-400";
                      if (priority === 'Low') priorityColor = "bg-slate-900 border-slate-600 text-slate-300";
                      else if (priority === 'Medium') priorityColor = "bg-blue-950/40 border-blue-500/20 text-blue-400";
                      else if (priority === 'Critical') priorityColor = "bg-rose-950/60 border-rose-500/40 text-rose-400 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.2)]";

                      return (
                        <div key={job.id} className="p-6 bg-slate-900/40 border border-white/10 rounded-3xl hover:border-white/20 hover:bg-slate-900/50 transition-all flex flex-col gap-4 relative overflow-hidden group">
                          
                          {/* Priority tag or draft label at top-right */}
                          <div className="absolute top-5 right-5 flex items-center gap-2">
                            {isJobDraft && (
                              <span className="text-[8px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded">
                                DRAFT
                              </span>
                            )}
                            <span className={`text-[8px] font-mono border px-2 py-0.5 rounded font-bold uppercase tracking-wider ${priorityColor}`}>
                              {priority} PRIORITY
                            </span>
                          </div>

                          <div className="flex justify-between items-start">
                            <div className="max-w-[70%]">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                  {job.department}
                                </span>
                                {job.experienceLevel && (
                                  <span className="text-[9px] font-mono text-indigo-300 uppercase tracking-wider bg-indigo-950/30 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                                    {job.experienceLevel}
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xl font-bold text-white mt-2.5 font-sans group-hover:text-[#9AA5FF] transition-colors">
                                {job.title}
                              </h4>
                            </div>
                            
                            <div className="flex items-center gap-1 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEditJob(job)}
                                className="text-slate-400 hover:text-[#9AA5FF] p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                                title="Edit published job"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => {
                                  const mdText = `## Job Opportunity: ${job.title}\n- **Department**: ${job.department}\n- **Salary**: ${job.salaryRange}\n- **Mode**: ${job.workMode} / ${job.schedule}\n- **Skills**: ${job.skillsRequired.join(", ")}\n\n### Description:\n${job.description}`;
                                  navigator.clipboard.writeText(mdText);
                                  alert("Job coordinates markdown description copied to clipboard.");
                                }}
                                className="text-slate-400 hover:text-[#D4F7DF] p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                                title="Copy Markdown to Clipboard"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => deleteJob(job.id)}
                                className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                                title="Delete job post"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-3">
                            {job.description}
                          </p>

                          {/* Skills display */}
                          <div className="flex flex-wrap gap-1.5">
                            {job.skillsRequired.map((sk, i) => (
                              <span key={i} className="text-[9px] font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded-md border border-white/5">
                                {sk}
                              </span>
                            ))}
                          </div>

                          {/* Optional Perks visualization */}
                          {job.perks && job.perks.length > 0 && (
                            <div className="flex flex-wrap gap-1 border-t border-white/5 pt-3.5">
                              {job.perks.map((p, i) => (
                                <span key={i} className="text-[8px] font-mono text-emerald-400/85 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/10">
                                  ✓ {p}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Optional Timeline milestones view */}
                          {job.milestones && job.milestones.length > 0 && (
                            <div className="mt-1">
                              <span className="text-[8px] uppercase font-mono text-slate-500 block mb-2">Hiring Pipeline Stages</span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {job.milestones.map((m, i) => (
                                  <React.Fragment key={i}>
                                    {i > 0 && <span className="text-slate-600 text-[10px] font-mono">→</span>}
                                    <span className="text-[9px] font-mono bg-indigo-950/20 border border-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded">
                                      {m.replace(/^\d+\.\s*/, '')}
                                    </span>
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Metrics bar */}
                          <div className="grid grid-cols-4 gap-2 border-t border-white/5 pt-3.5 mt-1 text-left">
                            <div>
                              <span className="text-[8px] text-slate-500 font-mono uppercase">Compensation Map</span>
                              <p className="text-[11px] font-mono text-white mt-0.5 font-bold">{job.salaryRange}</p>
                            </div>
                            <div>
                              <span className="text-[8px] text-slate-500 font-mono uppercase">Work Model</span>
                              <p className="text-[11px] font-mono text-white mt-0.5 font-bold capitalize">{job.workMode}</p>
                            </div>
                            <div>
                              <span className="text-[8px] text-slate-500 font-mono uppercase">Schedule</span>
                              <p className="text-[11px] font-mono text-white mt-0.5 font-bold capitalize">{job.schedule}</p>
                            </div>
                            <div>
                              <span className="text-[8px] text-slate-500 font-mono uppercase">Applied Synapses</span>
                              <p className="text-[11px] font-mono text-emerald-400 mt-0.5 font-extrabold">
                                {job.applicationsCount || Math.floor(Math.random() * 12) + 2} coordinates
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Sub-tab B: Engine Preview & Copilots */}
              {hiringTab === 'preview' && (
                <div className="flex flex-col gap-5 bg-slate-950/20 border border-white/5 rounded-3xl p-6 relative">
                  
                  {/* Selector for Preview Sub-tab */}
                  <div className="flex border-b border-white/5 pb-2 gap-3 items-center justify-between">
                    <div className="flex gap-2">
                      {[
                        { id: 'flyer', label: 'Candidate Flyer', icon: Globe },
                        { id: 'match', label: 'AI Match Analyzer', icon: Target },
                        { id: 'outreach', label: 'Recruitment Outreach', icon: Mail }
                      ].map((sub) => {
                        const Icon = sub.icon;
                        const isSubSel = previewSubTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setPreviewSubTab(sub.id as any);
                              if (sub.id === 'outreach') {
                                const activeCandObj = candidatesList.find(c => c.id === selectedPreviewCandidateId) || candidatesList[0];
                                const defaults = generateDefaultEmail(activeCandObj);
                                setCustomEmailSubject(defaults.subject);
                                setCustomEmailBody(defaults.body);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer border ${
                              isSubSel 
                                ? "bg-white text-black border-white shadow" 
                                : "border-transparent text-slate-400 hover:text-white"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-[9px] font-mono text-slate-400 animate-pulse bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Live Telemetry Stream
                    </div>
                  </div>

                  {/* Sub-tab B1: Candidate Flyer Render */}
                  {previewSubTab === 'flyer' && (
                    <div className="bg-[#0b0b0d] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden text-left flex flex-col gap-4">
                      {/* Grid background effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                      
                      {/* Glow element */}
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex justify-between items-start relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-md shadow-inner">
                            {companyDetails.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-mono text-slate-400 tracking-wider">
                              {companyDetails.name}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                              <Globe className="w-3 h-3 text-slate-500" />
                              <span>{newLoc || "Silicon Valley Grid / Remote"}</span>
                            </div>
                          </div>
                        </div>

                        <span className={`text-[9px] font-mono font-bold border px-2.5 py-1 rounded-full uppercase tracking-widest ${
                          newPriority === 'Critical' 
                            ? 'bg-rose-950/60 border-rose-500/50 text-rose-400 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                            : newPriority === 'High'
                            ? 'bg-amber-950/40 border-amber-500/30 text-amber-400'
                            : 'bg-white/5 border-white/5 text-slate-400'
                        }`}>
                          {newPriority} PRIORITY TARGET
                        </span>
                      </div>

                      <div className="border-t border-white/5 pt-4 relative z-10">
                        <h3 className="text-2xl font-extrabold text-white font-sans tracking-tight">
                          {newTitle || "Untitled Strategic Coordinate"}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/30 border border-indigo-500/20 px-2 py-0.5 rounded">
                            {newDept}
                          </span>
                          <span className="text-[9px] font-mono text-purple-400 bg-purple-950/30 border border-purple-500/20 px-2 py-0.5 rounded">
                            {newExperience} Level
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded">
                            {newSalary}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 relative z-10 text-slate-300 text-xs font-light leading-relaxed">
                        <span className="text-[8px] uppercase font-mono text-slate-500 font-bold block tracking-widest">
                          Axiom Mission Statement
                        </span>
                        <p>{newDescription || "Define description parameters in the form to generate live recruitment axioms."}</p>
                      </div>

                      {/* Interactive Milestones Timeline Vector Visual */}
                      <div className="border-t border-white/5 pt-4 relative z-10">
                        <span className="text-[8px] uppercase font-mono text-slate-500 font-bold block tracking-widest mb-3.5">
                          Hiring Vector Sequence
                        </span>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-1 bg-black/30 p-3 rounded-2xl border border-white/5">
                          {newMilestones.map((m, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 flex-1 w-full md:w-auto">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9AA5FF] to-[#D4F7DF] text-black font-extrabold font-mono text-xs flex items-center justify-center shadow-lg relative shrink-0">
                                {idx + 1}
                                {idx < newMilestones.length - 1 && (
                                  <div className="hidden md:block absolute left-7 top-1/2 w-8 border-t border-dashed border-slate-500 pointer-events-none z-0" />
                                )}
                              </div>
                              <div className="text-left">
                                <span className="text-[8px] text-slate-500 font-mono uppercase block">Stage {idx + 1}</span>
                                <span className="text-[11px] font-mono font-bold text-white leading-tight">
                                  {m.replace(/^\d+\.\s*/, '')}
                                </span>
                              </div>
                            </div>
                          ))}
                          {newMilestones.length === 0 && (
                            <div className="text-[10px] text-slate-500 font-mono text-center w-full">
                              No vector sequence steps registered yet.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Required Skills Badges */}
                      <div className="border-t border-white/5 pt-4 relative z-10">
                        <span className="text-[8px] uppercase font-mono text-slate-500 font-bold block tracking-widest mb-2">
                          Mandatory Core Skill Registers
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {newSkillsStr ? (
                            newSkillsStr.split(",").map(s => s.trim()).filter(Boolean).map((sk, i) => (
                              <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/5 text-slate-300 px-3 py-1 rounded-lg hover:border-white/20 hover:text-white transition-colors">
                                {sk}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] font-mono text-slate-500 italic">No skill matrices inputted.</span>
                          )}
                        </div>
                      </div>

                      {/* Perks checklist visualization */}
                      <div className="border-t border-white/5 pt-4 relative z-10">
                        <span className="text-[8px] uppercase font-mono text-slate-500 font-bold block tracking-widest mb-2">
                          Standard Compensation Perks
                        </span>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {newPerks.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-slate-300 font-mono text-[10px] bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 shadow-sm">
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate">{p}</span>
                            </div>
                          ))}
                          {newPerks.length === 0 && (
                            <span className="text-[10px] font-mono text-slate-500 italic col-span-3">No perks selected.</span>
                          )}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Sub-tab B2: AI Match Analyzer */}
                  {previewSubTab === 'match' && (
                    <div className="flex flex-col gap-4 text-left animate-fade-in">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <span className="text-[9px] uppercase font-mono text-slate-400">Select Active Candidate Register</span>
                          <h4 className="text-white font-bold text-sm mt-0.5">Real-time Compatibility Simulator</h4>
                        </div>
                        <select
                          value={selectedPreviewCandidateId}
                          onChange={(e) => {
                            setSelectedPreviewCandidateId(e.target.value);
                            const candObj = candidatesList.find(c => c.id === e.target.value) || candidatesList[0];
                            const defaults = generateDefaultEmail(candObj);
                            setCustomEmailSubject(defaults.subject);
                            setCustomEmailBody(defaults.body);
                          }}
                          className="bg-slate-950 border border-white/10 text-xs text-white p-2.5 rounded-xl outline-none cursor-pointer min-w-[200px]"
                        >
                          {candidatesList.map(c => (
                            <option key={c.id} value={c.id}>{c.name} ({c.title})</option>
                          ))}
                        </select>
                      </div>

                      {(() => {
                        const activeCand = candidatesList.find(c => c.id === selectedPreviewCandidateId) || candidatesList[0];
                        if (!activeCand) return null;
                        const convergenceScore = calculateConvergence(activeCand);
                        
                        // Strengths & Gaps calculations
                        const formSkills = newSkillsStr.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
                        const matchedSkills = formSkills.filter(fs => 
                          activeCand.skills.some((cs: string) => cs.toLowerCase().includes(fs) || fs.includes(cs.toLowerCase()))
                        );
                        const unmatchedSkills = formSkills.filter(fs => 
                          !activeCand.skills.some((cs: string) => cs.toLowerCase().includes(fs) || fs.includes(cs.toLowerCase()))
                        );

                        return (
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                            {/* Score Ring Display */}
                            <div className="md:col-span-4 bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
                              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-4">Convergence Index</span>
                              
                              <div className="relative w-28 h-28 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                                  <motion.circle 
                                    cx="50" 
                                    cy="50" 
                                    r="40" 
                                    stroke="url(#matchGlowGradient)" 
                                    strokeWidth="8" 
                                    fill="transparent" 
                                    strokeDasharray="251.2"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    animate={{ strokeDashoffset: 251.2 - (251.2 * convergenceScore) / 100 }}
                                    transition={{ duration: 0.8 }}
                                  />
                                  <defs>
                                    <linearGradient id="matchGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#9AA5FF" />
                                      <stop offset="100%" stopColor="#D4F7DF" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                  <span className="text-2xl font-mono font-extrabold text-white">{convergenceScore}%</span>
                                  <span className="text-[8px] font-mono text-emerald-400 uppercase">Synchronous</span>
                                </div>
                              </div>

                              <span className="text-[10px] font-mono text-slate-400 mt-4 leading-normal">
                                Strong resonance across high-dimensional parameter grids.
                              </span>
                            </div>

                            {/* Detailed strengths and gaps */}
                            <div className="md:col-span-8 bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col gap-4 text-left">
                              <div>
                                <h5 className="text-white font-bold text-xs uppercase tracking-wider font-sans border-b border-white/5 pb-2">
                                  Synaptic Matching Diagnostics
                                </h5>
                                <div className="mt-3 flex flex-col gap-2.5">
                                  {/* Strengths list */}
                                  <div className="flex gap-2 items-start">
                                    <div className="p-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                                      <Check className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                      <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">Key Strengths Match</span>
                                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                                        {matchedSkills.length > 0 
                                          ? `Direct expertise verified in: ${matchedSkills.join(", ")}.`
                                          : `Highly applicable academic backing from: ${activeCand.gpaAndSchool}.`}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Gaps list */}
                                  <div className="flex gap-2 items-start">
                                    <div className="p-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5">
                                      <AlertTriangle className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                      <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block">Integrative Growth Spaces</span>
                                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                                        {unmatchedSkills.length > 0 
                                          ? `Needs system exposure onboarding regarding: ${unmatchedSkills.join(", ")}.`
                                          : "Profile matches current requirements completely with zero logical gaps identified."}
                                      </p>
                                    </div>
                                  </div>

                                  {/* General Recommendation */}
                                  <div className="flex gap-2 items-start border-t border-white/5 pt-3 mt-1">
                                    <div className="p-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mt-0.5">
                                      <Award className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                      <span className="text-[10px] uppercase font-mono text-indigo-300 font-bold block">Recruiter Decision Route</span>
                                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed font-light">
                                        {convergenceScore >= 85 
                                          ? "High conviction profile. We recommend scheduling an immediate 'Interlock Audit' to initiate video interview logs."
                                          : "Satisfactory compliance. Keep profile active in candidate matrices for next batch evaluations."}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Sub-tab B3: Recruitment Outreach Copilot */}
                  {previewSubTab === 'outreach' && (
                    <div className="flex flex-col gap-4 text-left animate-fade-in">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <span className="text-[9px] uppercase font-mono text-slate-400">Send Direct Interlock Outreach</span>
                          <h4 className="text-white font-bold text-sm mt-0.5">Refined AI Message Generator</h4>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const activeCand = candidatesList.find(c => c.id === selectedPreviewCandidateId) || candidatesList[0];
                              const defaultEmail = generateDefaultEmail(activeCand);
                              setCustomEmailSubject(defaultEmail.subject);
                              setCustomEmailBody(defaultEmail.body + "\n\n(Adjusted Tone: Polite & Intellectual)");
                            }}
                            className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-lg text-[9px] font-mono cursor-pointer transition-all"
                          >
                            Polite/Intellectual
                          </button>
                          <button
                            onClick={() => {
                              const activeCand = candidatesList.find(c => c.id === selectedPreviewCandidateId) || candidatesList[0];
                              const defaultEmail = generateDefaultEmail(activeCand);
                              setCustomEmailSubject(defaultEmail.subject);
                              setCustomEmailBody(`[URGENT INTERLOCK] ${newTitle || "Sovereign Engineering Position"}\n\nHi ${activeCand.name},\n\nWe need to deploy extreme synaptic competence immediately into our ${newDept} group.\n\nYour telemetry highlights ${calculateConvergence(activeCand)}% compatibility. Let's arrange a direct technical screening loop tomorrow.\n\nRequired stacks: ${newSkillsStr || "Triton, LoRA, PyTorch"}.\n\nReply directly with your availability,\nRecruitment Lead`);
                            }}
                            className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-lg text-[9px] font-mono cursor-pointer transition-all"
                          >
                            Direct/Technical
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3.5 bg-[#0b0b0d] border border-white/10 p-5 rounded-2xl">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase font-mono text-slate-400">Message Subject</label>
                          <input
                            type="text"
                            value={customEmailSubject}
                            onChange={(e) => setCustomEmailSubject(e.target.value)}
                            className="bg-white/5 border border-white/10 text-xs text-white p-3 rounded-xl outline-none font-mono"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase font-mono text-slate-400">Message Body</label>
                          <textarea
                            rows={8}
                            value={customEmailBody}
                            onChange={(e) => setCustomEmailBody(e.target.value)}
                            className="bg-white/5 border border-white/10 text-xs text-white p-3.5 rounded-xl outline-none font-mono resize-none leading-relaxed"
                          />
                        </div>

                        <div className="flex gap-2.5 border-t border-white/5 pt-4 mt-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`Subject: ${customEmailSubject}\n\n${customEmailBody}`);
                              alert("Outreach email copied securely to clipboard.");
                            }}
                            className="px-4 py-2.5 bg-white/10 hover:bg-white/25 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Outreach</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              const activeCand = candidatesList.find(c => c.id === selectedPreviewCandidateId) || candidatesList[0];
                              alert(`Secure transmission queue compiled. Message securely dispatched to Candidate ${activeCand.name}'s verified communication receiver.`);
                            }}
                            className="flex-grow py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-90 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(16,185,129,0.15)]"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Secure Interlock Message</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </motion.div>
        )}

        {/* Tab 3: AI Talent Discovery */}
        {activeTab === 'talent' && (
          <motion.div
            key="talent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">AI-Recommended Profiles</span>
                <h4 className="text-white font-bold text-lg">Top Aligned Talent Coordinates</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/5 px-3 py-2 rounded-xl">
                  {candidatesList.length} TOTAL SYNCED · {candidatesList.filter(c => c.isSaved).length} SAVED
                </span>
                <button
                  onClick={exportSavedCandidatesPDF}
                  disabled={pdfGenerating}
                  className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-tr from-[#9AA5FF] to-[#D4F7DF] hover:scale-[1.03] active:scale-[0.97] text-black rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(154, 165, 255,0.15)] disabled:opacity-50"
                >
                  <FileText className="w-3.5 h-3.5 text-black" />
                  {pdfGenerating ? "Synthesizing PDF..." : "Export Formatted PDF Summary"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {candidatesList.map((cand) => (
                <div key={cand.id} className="bg-slate-900/40 border border-[#9AA5FF]/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between min-h-[440px] hover:border-[#9AA5FF]/35 transition-all group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors" />
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-white font-bold text-xs select-none shadow-sm">
                        {cand.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1 shadow-inner">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          {cand.matchScore}% Match
                        </div>
                        <button
                          onClick={() => toggleSaveCandidate(cand.id)}
                          className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                            cand.isSaved 
                              ? "bg-rose-500/15 border-rose-500/40 text-rose-500" 
                              : "bg-white/5 border-white/5 text-slate-400 hover:text-rose-400 hover:border-rose-400/30"
                          }`}
                          title={cand.isSaved ? "Unsave candidate profile" : "Save candidate profile"}
                        >
                          <Heart className={`w-3.5 h-3.5 ${cand.isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
                        </button>
                      </div>
                    </div>
 
                    <div>
                      <h4 className="text-xl font-bold text-white font-sans">{cand.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 font-mono">{cand.title}</p>
                      <span className="text-[9px] text-[#EAEAEA] font-mono mt-1 block tracking-wider">{cand.gpaAndSchool}</span>
                    </div>
 
                    <p className="text-xs text-slate-300 leading-relaxed font-light my-2">
                      {cand.bio}
                    </p>
 
                    <div className="flex flex-wrap gap-1.5">
                      {cand.skills.map((sk, i) => (
                        <span key={i} className="text-[9px] font-mono bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
 
                  <div className="border-t border-white/5 pt-4 mt-6 flex gap-2">
                    <button
                      onClick={() => {
                        setActiveVideoCandidate(cand);
                        setIsPlaying(true);
                        setIsMuted(false);
                        setVideoError(false);
                        setCurrentTime(0);
                      }}
                      className="px-4 bg-white/5 text-[#AEDFFF] hover:bg-[#AEDFFF]/10 hover:text-white border border-[#AEDFFF]/20 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      title="Watch Self-Introduction Video"
                    >
                      <Video className="w-4 h-4 shrink-0" />
                      <span>Intro</span>
                    </button>
                    <button
                      onClick={() => alert(`Contact request project code successfully initiated to ${cand.name}.`)}
                      className="flex-grow py-2.5 bg-white text-black hover:bg-[#EAEAEA] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Request Interlock Audit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 4: Company Profile Hub */}
        {activeTab === 'company' && (
          <motion.div
            key="company"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            
            {/* Form details */}
            <div className="md:col-span-12 lg:col-span-7 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-4">Edit Core Company Profile Grid</span>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Enterprise Node Name</label>
                    <input
                      type="text"
                      value={companyDetails.name}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, name: e.target.value })}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Global Website Gateway</label>
                    <input
                      type="text"
                      value={companyDetails.website}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, website: e.target.value })}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Company Tagline Headline</label>
                  <input
                    type="text"
                    value={companyDetails.tagline}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, tagline: e.target.value })}
                    className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">About Enterprise</label>
                  <textarea
                    rows={3}
                    value={companyDetails.about}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, about: e.target.value })}
                    className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Structured Mission</label>
                    <textarea
                      rows={2}
                      value={companyDetails.mission}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, mission: e.target.value })}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none resize-none leading-relaxed"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Team Cultural Axioms</label>
                    <textarea
                      rows={2}
                      value={companyDetails.culture}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, culture: e.target.value })}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <button
                  onClick={() => alert("Company profile changes synced to master nodes successfully.")}
                  className="py-3 bg-white text-black font-semibold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer mt-2"
                >
                  Commit Profile State Updates
                </button>
              </div>
            </div>

            {/* Preview Card */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block border-b border-white/5 pb-2">Holographic Public Preview</span>
                
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xl shadow-inner">
                    AE
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white font-sans">{companyDetails.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono italic">{companyDetails.website}</span>
                  </div>
                </div>

                <h5 className="text-xs text-white font-bold tracking-tight italic mt-1 font-sans">
                  "{companyDetails.tagline}"
                </h5>

                <p className="text-xs text-slate-330 leading-relaxed font-light">
                  {companyDetails.about}
                </p>

                <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4 mt-2">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono uppercase">Mission Objectives</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light mt-1">{companyDetails.mission}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono uppercase">Culture Profile</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light mt-1">{companyDetails.culture}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Gallery Backplane</span>
                <div className="grid grid-cols-2 gap-2">
                  {companyDetails.officeGallery.map((url, i) => (
                    <img key={i} src={url} alt="Office" className="w-full h-16 object-cover rounded-lg border border-white/10" />
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Candidate Video Introduction Modal overlay */}
      <AnimatePresence>
        {activeVideoCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0b0b0d] border border-[#AEDFFF]/30 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl relative text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#AEDFFF]/[0.03] rounded-full blur-2xl pointer-events-none" />

              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <h4 className="text-white font-bold text-sm flex items-center gap-2">
                      {activeVideoCandidate.name} 
                      <span className="text-[10px] font-mono text-[#AEDFFF] bg-[#AEDFFF]/10 px-2 py-0.5 rounded-md">
                        {activeVideoCandidate.matchScore}% Match
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                      Secure Introduction Link Node
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveVideoCandidate(null);
                    setIsPlaying(false);
                    setVideoError(false);
                  }}
                  className="text-slate-400 hover:text-white text-xs font-mono border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                >
                  Disconnect [X]
                </button>
              </div>

              {/* Screen stage */}
              <div className="relative aspect-video bg-black/80 border-b border-white/5 flex items-center justify-center overflow-hidden">
                {videoError || !getCandidateVideoSrc(activeVideoCandidate.id) ? (
                  <canvas
                    ref={modalCanvasRef}
                    width={640}
                    height={360}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    ref={modalVideoRef}
                    src={getCandidateVideoSrc(activeVideoCandidate.id)}
                    autoPlay={isPlaying}
                    muted={isMuted}
                    playsInline
                    onEnded={() => setIsPlaying(false)}
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Secure overlay HUD */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#AEDFFF]/20 text-[9px] font-mono text-[#AEDFFF] flex items-center gap-1.5">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>DECRYPTED DEEP-STUDIO LINK</span>
                </div>

                {/* Dynamic typewriter speech subtitles */}
                <div className="absolute bottom-6 left-6 right-6 text-center bg-black/75 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-xl">
                  <p className="text-white text-xs font-sans leading-relaxed min-h-[1.5rem]">
                    {candidateSubtitlesMap[activeVideoCandidate.id]?.subs.reduce((acc, sub) => {
                      if (currentTime >= sub.time) return sub.text;
                      return acc;
                    }, "Systems connected. Awaiting stream playback...")}
                  </p>
                </div>
              </div>

              {/* Controls bar */}
              <div className="p-6 bg-[#070709] flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (modalVideoRef.current) {
                        if (isPlaying) {
                          modalVideoRef.current.pause();
                          setIsPlaying(false);
                        } else {
                          modalVideoRef.current.play().then(() => {
                            setIsPlaying(true);
                          }).catch((err) => {
                            console.warn("Playback prevented or blocked by browser policies:", err);
                            setIsPlaying(false);
                          });
                        }
                      }
                    }}
                    className="w-10 h-10 rounded-full bg-white text-black hover:bg-zinc-200 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#AEDFFF]" />}
                  </button>

                  <button
                    onClick={() => {
                      if (modalVideoRef.current) {
                        modalVideoRef.current.currentTime = 0;
                        setCurrentTime(0);
                        modalVideoRef.current.play().catch(() => {});
                        setIsPlaying(true);
                      }
                    }}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all"
                    title="Restart Clip"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Active Transmission Node</span>
                  <p className="text-xs text-white font-mono font-bold mt-0.5">
                    {activeVideoCandidate.id === "c_user" ? "Dynamic Local Storage Stream" : "Procedural Synthetic Stream v1.2"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
