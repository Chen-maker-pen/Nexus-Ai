import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, Award, Target, Terminal, Play, CheckCircle2, ChevronRight, Lock, 
  ShieldCheck, Zap, Sparkles, Code, Sliders, RefreshCw, AlertCircle, ArrowLeft,
  Database, Shield, Eye, Flame, FileText, Check, Cpu, Hammer, Server, HardDrive, Network
} from "lucide-react";

interface Mission {
  id: string;
  name: string;
  difficulty: "Core Novice" | "Mid-Level Calibrator" | "High-Stakes Master";
  difficultyColor: string;
  xp: number;
  skills: string[];
  description: string;
  scenario: string;
  instructions: string;
  playgroundType: "ai_attention" | "pixel_artisan" | "contract_sec" | "async_engine";
  initialState: any;
  targetState: any;
}

interface Track {
  id: string;
  title: string;
  icon: any;
  role: string;
  color: string;
  borderColor: string;
  accentBg: string;
  description: string;
  missions: Mission[];
  category: "it" | "business" | "design" | "biotech";
}

function ExplorerBadge({ title, emoji }: { title: string; emoji: string }) {
  const pathId = `badgePath-${title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
  return (
    <div className="relative w-28 h-28 mx-auto flex items-center justify-center select-none">
      <div className="absolute inset-0 animate-[spin_24s_linear_infinite] hover:[animation-play-state:paused]">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <path
              id={pathId}
              d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
              fill="none"
            />
          </defs>
          <text className="text-[7.2px] font-black tracking-[0.14em] fill-white/95 uppercase font-mono">
            <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
              {title} • COMPETE NOW •
            </textPath>
          </text>
        </svg>
      </div>
      <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-inner flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0.5 rounded-full bg-white/20 border border-white/10" />
        <span className="text-3xl relative z-10 filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{emoji}</span>
      </div>
    </div>
  );
}

export default function MissionsChallengesHub() {
  const [activeTrackId, setActiveTrackId] = useState<string>("ai_synaptic");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  
  // Playground states
  const [attentionSliders, setAttentionSliders] = useState({ query: 0.2, key: 0.3, value: 0.5 });
  const [pixelSliders, setPixelSliders] = useState({ padding: 12, gap: 8, radius: 4 });
  const [patchedLines, setPatchedLines] = useState<number[]>([]);
  const [backoffCoefficient, setBackoffCoefficient] = useState<number>(0);
  
  // Verification progress states
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);
  const [verificationPassed, setVerificationPassed] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  
  // Local storage completion states
  const [completedMissions, setCompletedMissions] = useState<string[]>(() => {
    const raw = localStorage.getItem("nexus_completed_missions");
    return raw ? JSON.parse(raw) : [];
  });

  const tracks: Track[] = [
    {
      id: "ai_synaptic",
      title: "AI Synaptic Architect",
      icon: Cpu,
      role: "AI & Neural Engineer",
      color: "from-blue-600 to-indigo-600",
      borderColor: "border-blue-200",
      accentBg: "bg-blue-50 text-blue-700",
      description: "Optimize high-dimensional transformers, prevent gradient decay, and calibrate synapse weights in live-agent models.",
      category: "it",
      missions: [
        {
          id: "syn_attn",
          name: "Transformer Attention Alignment",
          difficulty: "Mid-Level Calibrator",
          difficultyColor: "text-blue-700 border-blue-200 bg-blue-50",
          xp: 25,
          skills: ["Transformer Mechanics", "Synaptic Calibration"],
          description: "Align Query and Key tensor coefficients to match the optimal mathematical matrix projection, highlighting deep relational contexts.",
          scenario: "The neural agent is suffering from relational parameter decay, causing it to lose context boundaries in multi-step conversation strings.",
          instructions: "Adjust the Query, Key, and Value sliders so that they perfectly balance. To lock in attention, your combined Query + Key must exceed 1.5, and the Value slider must align exactly with the threshold range [0.75 - 0.85].",
          playgroundType: "ai_attention",
          initialState: { query: 0.2, key: 0.3, value: 0.5 },
          targetState: { qkMin: 1.5, vMin: 0.75, vMax: 0.85 }
        },
        {
          id: "syn_gradient",
          name: "Sigmoid Activation Throttling",
          difficulty: "Core Novice",
          difficultyColor: "text-emerald-700 border-emerald-200 bg-emerald-50",
          xp: 15,
          skills: ["Tensor Entrapment", "Gradient Optimization"],
          description: "Calibrate neural activation thresholds to resolve vanishing gradients in deeply nested network backpropagation layers.",
          scenario: "Backpropagation telemetry reports that feedback gradients are flatlining in hidden layer 24, rendering downstream nodes unresponsive.",
          instructions: "Modify the backoff coefficient and threshold settings. Adjust the coefficient slider to exactly 0.85 to unlock stable backpropagation throughput.",
          playgroundType: "async_engine",
          initialState: { coeff: 0.2 },
          targetState: { coeff: 0.85 }
        },
        {
          id: "syn_entropy",
          name: "Temperature Entropy Tuning",
          difficulty: "High-Stakes Master",
          difficultyColor: "text-rose-700 border-rose-200 bg-rose-50",
          xp: 35,
          skills: ["Entropy Controls", "Model Inference Calibration"],
          description: "Calibrate neural output temperature vectors to restore deterministic execution bounds in high-probability agent branches.",
          scenario: "The production routing agent is outputting hallucinated code strings, slipping out of strict JSON format rules.",
          instructions: "Calibrate Query, Key, and Value sliders. The combined Query + Key must be greater than 1.6, and the temperature Value slider must settle inside the precise low-temperature safety bracket [0.20 - 0.30].",
          playgroundType: "ai_attention",
          initialState: { query: 0.1, key: 0.1, value: 0.9 },
          targetState: { qkMin: 1.6, vMin: 0.20, vMax: 0.30 }
        }
      ]
    },
    {
      id: "contract_sec",
      title: "Cryptographic & Security Analyst",
      icon: Shield,
      role: "Security & Contract Engineer",
      color: "from-red-600 to-rose-600",
      borderColor: "border-red-200",
      accentBg: "bg-red-50 text-red-700",
      description: "Audit secure smart contract sequences, prevent logical reentrancy attacks, and sanitize input boundaries.",
      category: "it",
      missions: [
        {
          id: "sec_reentrancy",
          name: "Reentrancy Attack Prevention",
          difficulty: "High-Stakes Master",
          difficultyColor: "text-rose-700 border-rose-200 bg-rose-50",
          xp: 35,
          skills: ["Smart Contract Security", "Logical Auditing"],
          description: "Audit a logical withdraw sequence in a multi-sig vault contract and eliminate the potential for recursive call drains.",
          scenario: "A rogue agent is triggering nested callbacks in our withdraw module, siphoning vault deposits before storage balances are synchronized.",
          instructions: "Review the contract lines below. Click on the vulnerable logical statement (Line 5: the external transfer must happen AFTER state changes) to patch the vulnerability and secure the asset base.",
          playgroundType: "contract_sec",
          initialState: { vulnerabilityLine: 4 },
          targetState: { patchedLine: 4 }
        },
        {
          id: "sec_sql",
          name: "SQL Injection Auditing & Sanity",
          difficulty: "Core Novice",
          difficultyColor: "text-emerald-700 border-emerald-200 bg-emerald-50",
          xp: 15,
          skills: ["SQL Injection Sanitization", "Input Validation"],
          description: "Review express database route parameters and secure them against unsafe dynamic query string parsing.",
          scenario: "A security scanner flagged an unescaped route variable that leaks raw cryptographic user keys via trivial browser requests.",
          instructions: "Review the Node Express controller below. Click on the vulnerable database execute call (Line 3: dynamic string construction) to patch and convert it to a secure prepared statement.",
          playgroundType: "contract_sec",
          initialState: { vulnerabilityLine: 2 },
          targetState: { patchedLine: 2 }
        }
      ]
    },
    {
      id: "cloud_devops",
      title: "Cloud & DevOps Scale Architect",
      icon: Server,
      role: "Cloud Systems Engineer",
      color: "from-purple-600 to-indigo-600",
      borderColor: "border-purple-200",
      accentBg: "bg-purple-50 text-purple-700",
      description: "Scale distributed virtual environments, build resilient packet pathways, and balance system loads.",
      category: "it",
      missions: [
        {
          id: "cloud_breaker",
          name: "Circuit Breaker Latency Calibration",
          difficulty: "Mid-Level Calibrator",
          difficultyColor: "text-blue-700 border-blue-200 bg-blue-50",
          xp: 25,
          skills: ["Microservice Resiliency", "System Backoff Tuning"],
          description: "Calibrate microservice circuit breaker latency metrics to isolate transient third-party payment gateway failures.",
          scenario: "A continuous packet cascade is locking up thread resources because our service waits too long before failing on stale network connections.",
          instructions: "Adjust the backoff threshold coefficient to exactly 0.65 to isolate gateway failures and preserve internal processor loops.",
          playgroundType: "async_engine",
          initialState: { coeff: 0.1 },
          targetState: { coeff: 0.65 }
        },
        {
          id: "cloud_k8s",
          name: "Kubernetes Replica Healing",
          difficulty: "Core Novice",
          difficultyColor: "text-emerald-700 border-emerald-200 bg-emerald-50",
          xp: 15,
          skills: ["Orchestration Scaling", "Pod Lifecycle Calibration"],
          description: "Re-align pod replenishment thresholds to support rapid scale-up cycles during viral inbound user traffic spikes.",
          scenario: "Autoscaling loops are bottlenecked on slow cluster boot diagnostics. Nodes are crashing before replacement containers go live.",
          instructions: "Modify the replication backoff threshold. Adjust the coefficient slider to exactly 0.45 to optimize replenish intervals.",
          playgroundType: "async_engine",
          initialState: { coeff: 0.9 },
          targetState: { coeff: 0.45 }
        }
      ]
    },
    {
      id: "data_pipeline",
      title: "Data Pipeline & Analytics Track",
      icon: Database,
      role: "Data Systems Engineer",
      color: "from-pink-600 to-rose-600",
      borderColor: "border-pink-200",
      accentBg: "bg-pink-50 text-pink-700",
      description: "Stream high-throughput data pipelines, maintain partition integrity, and build real-time analytic backbones.",
      category: "it",
      missions: [
        {
          id: "data_kafka",
          name: "Kafka Stream Partition Balance",
          difficulty: "High-Stakes Master",
          difficultyColor: "text-rose-700 border-rose-200 bg-rose-50",
          xp: 35,
          skills: ["Distributed Queues", "Throughput Engineering"],
          description: "Calibrate active message partitioning keys to resolve severe consumer lag in downstream real-time metrics trackers.",
          scenario: "Our distributed streaming clusters are bottlenecking on partition 3, causing a 12-minute latency delay in recruiters' live dashboards.",
          instructions: "Perfect partition key balancing using sliders. Combined Query + Key must exceed 1.8, and the stream threshold Value must stay within [0.90 - 0.95].",
          playgroundType: "ai_attention",
          initialState: { query: 0.4, key: 0.4, value: 0.1 },
          targetState: { qkMin: 1.8, vMin: 0.90, vMax: 0.95 }
        }
      ]
    },
    {
      id: "it_hackathons",
      title: "IT Hackathons & Sprints",
      icon: Code,
      role: "IT & Hackathon Contender",
      color: "from-teal-600 to-emerald-600",
      borderColor: "border-teal-200",
      accentBg: "bg-teal-50 text-teal-700",
      description: "Engage in competitive coding marathons, rapid prototyping, and software engineering speed run challenges.",
      category: "it",
      missions: [
        {
          id: "it_speed_compiler",
          name: "Speed Compilation Scaling",
          difficulty: "Mid-Level Calibrator",
          difficultyColor: "text-blue-700 border-blue-200 bg-blue-50",
          xp: 25,
          skills: ["Parallel Compilation", "Cache Optimization"],
          description: "Tune compilation pipeline cache backoff coefficient to support high speed parallel processing in multi-node clusters.",
          scenario: "The collaborative hackathon compiler is throttling and queuing build tasks, raising compile latency above acceptable SLA parameters.",
          instructions: "Calibrate the cache backoff coefficient slider to exactly 0.72 to trigger hot-reloading parallel compilation threads.",
          playgroundType: "async_engine",
          initialState: { coeff: 0.1 },
          targetState: { coeff: 0.72 }
        }
      ]
    },
    {
      id: "biz_strategy",
      title: "Corporate Venture & Case Studies",
      icon: Target,
      role: "Strategic Analyst & Consultant",
      color: "from-amber-600 to-yellow-600",
      borderColor: "border-amber-200",
      accentBg: "bg-amber-50 text-amber-700",
      description: "Tackle high-priority management cases, compute optimal unit economics, and audit strategic plans.",
      category: "business",
      missions: [
        {
          id: "economics_explorer",
          name: "Economics Explorer Competition",
          difficulty: "Mid-Level Calibrator",
          difficultyColor: "text-blue-700 border-blue-200 bg-blue-50",
          xp: 25,
          skills: ["Unit Economics", "Pricing Strategy", "Financial Literacy"],
          description: "Analyze price elasticity coefficient, calculate marginal demand, and optimize revenue models to reach standard market-clearing equilibrium.",
          scenario: "Our company's latest B2B venture is facing high customer churn due to an overly aggressive multi-tiered seat model.",
          instructions: "Calibrate the price elasticity backoff coefficient to exactly 0.58 to align demand curves with subscription customer value indexes.",
          playgroundType: "async_engine",
          initialState: { coeff: 0.2 },
          targetState: { coeff: 0.58 }
        },
        {
          id: "biz_ethics_audit",
          name: "Subscription Dark Pattern Audit",
          difficulty: "High-Stakes Master",
          difficultyColor: "text-rose-700 border-rose-200 bg-rose-50",
          xp: 35,
          skills: ["Corporate Compliance", "Ethical Product Strategy"],
          description: "Audit an automated subscription pricing controller for unethical re-billing loops that violate global consumer laws.",
          scenario: "An legacy payment flow features a nested statement that repeatedly re-charges trial users after they initiate a cancellation request.",
          instructions: "Review the automated subscription billing code below. Click on the vulnerable logical statement (Line 5: executing nested call transfer before balance validation) to secure client trust.",
          playgroundType: "contract_sec",
          initialState: { vulnerabilityLine: 4 },
          targetState: { patchedLine: 4 }
        }
      ]
    },
    {
      id: "biz_growth",
      title: "Growth Marketing & Funnels",
      icon: Sliders,
      role: "Growth Marketer & PM",
      color: "from-orange-600 to-red-600",
      borderColor: "border-orange-200",
      accentBg: "bg-orange-50 text-orange-700",
      description: "Balance dynamic ad spends, maximize user conversion ratios, and scale cohort retention curves.",
      category: "business",
      missions: [
        {
          id: "biz_funnel_align",
          name: "Acquisition Funnel Alignment",
          difficulty: "High-Stakes Master",
          difficultyColor: "text-rose-700 border-rose-200 bg-rose-50",
          xp: 30,
          skills: ["Conversion Rate Tuning", "Funnel Optimization"],
          description: "Align paid advertisement spend (Q) and organic brand traction inputs (K) while preserving user retention threshold (V).",
          scenario: "High cost-per-click indexes are siphoning budget, while organic search referrals are dropping from bad metadata index alignments.",
          instructions: "Calibrate the ad spend (Query) and organic brand (Key) sliders so that their sum exceeds 1.70, and ensure user retention (Value) sits inside the safe bracket [0.80 - 0.90].",
          playgroundType: "ai_attention",
          initialState: { query: 0.3, key: 0.4, value: 0.5 },
          targetState: { qkMin: 1.70, vMin: 0.80, vMax: 0.90 }
        }
      ]
    },
    {
      id: "pixel_artisan",
      title: "UI Artisan & Pixel Engineer",
      icon: Hammer,
      role: "Frontend Developer",
      color: "from-amber-600 to-orange-600",
      borderColor: "border-amber-200",
      accentBg: "bg-amber-50 text-amber-700",
      description: "Build pristine micro-interactions, responsive high-contrast structures, and fluid layout flow coordinates.",
      category: "design",
      missions: [
        {
          id: "pix_layout",
          name: "Luxury Card Layout Calibration",
          difficulty: "Core Novice",
          difficultyColor: "text-emerald-700 border-emerald-200 bg-emerald-50",
          xp: 15,
          skills: ["CSS Flexbox Precision", "Responsive Alignment"],
          description: "Fine-tune inner padding, spacing gaps, and border-radius configurations to construct a perfectly balanced executive container.",
          scenario: "The mobile preview is suffering from dense overlapping elements, leading to layout tension and high cognitive load for recruiters.",
          instructions: "Adjust container sliders to align with Swiss design grid guidelines. To secure optimal balance: Padding must be exactly 24px, Spacing Gap must be exactly 16px, and Border Radius must be exactly 20px.",
          playgroundType: "pixel_artisan",
          initialState: { padding: 12, gap: 8, radius: 4 },
          targetState: { padding: 24, gap: 16, radius: 20 }
        },
        {
          id: "pix_spring",
          name: "Fluid Elastic Transition Spring",
          difficulty: "Mid-Level Calibrator",
          difficultyColor: "text-blue-700 border-blue-200 bg-blue-50",
          xp: 25,
          skills: ["Spring Physics", "Micro-Interactions"],
          description: "Align spring friction and stiffness constants to produce a non-blocking, premium card-reveal hover movement.",
          scenario: "The portfolio detail modal bounces aggressively, making users feel dizzy and visually breaking the clean editorial layout.",
          instructions: "Adjust CSS layouts using sliders. Force the elastic springs to stay within stable constraints: Padding must be exactly 32px, Spacing Gap must be exactly 12px, and Border Radius must be exactly 16px.",
          playgroundType: "pixel_artisan",
          initialState: { padding: 8, gap: 4, radius: 2 },
          targetState: { padding: 32, gap: 12, radius: 16 }
        }
      ]
    },
    {
      id: "ux_spatial",
      title: "Spatial UI & Immersive Design",
      icon: Award,
      role: "Spatial UX Designer",
      color: "from-purple-600 to-pink-600",
      borderColor: "border-purple-200",
      accentBg: "bg-purple-50 text-purple-700",
      description: "Establish ergonomic depths, viewport aspect structures, and attention bounding zones for hardware displays.",
      category: "design",
      missions: [
        {
          id: "spatial_viewport_gating",
          name: "Zero-G Viewport HUD Spacing",
          difficulty: "High-Stakes Master",
          difficultyColor: "text-rose-700 border-rose-200 bg-rose-50",
          xp: 35,
          skills: ["Ergonomic Sizing", "Spatial HUD Physics"],
          description: "Calibrate head-up-display padding, viewport gaps, and structural border radius curves to accommodate cognitive strain under Zero-G travel.",
          scenario: "Astronaut telemetry reveals peripheral data elements are slipping outside the user's focus plane during docking sequences.",
          instructions: "Modify spatial layouts via sliders. Set the parameters exactly: Padding to 36px, Spacing Gap to 16px, and curvature Radius to 24px.",
          playgroundType: "pixel_artisan",
          initialState: { padding: 12, gap: 8, radius: 4 },
          targetState: { padding: 36, gap: 16, radius: 24 }
        },
        {
          id: "spatial_retinal_focus",
          name: "Holographic Retinal Attention",
          difficulty: "Mid-Level Calibrator",
          difficultyColor: "text-blue-700 border-blue-200 bg-blue-50",
          xp: 25,
          skills: ["Focal Plane Alignment", "User Retinal Focus"],
          description: "Align laser intensity (Q) and focal divergence parameters (K) to balance viewer sensory load (V).",
          scenario: "Laser emission drifts are producing high visual fatigue in long simulation sprints, causing candidates to report headache artifacts.",
          instructions: "Modify laser parameters so that combined Intensity + Divergence exceeds 1.55, and calibrate sensory load (V) exactly into [0.45 - 0.55].",
          playgroundType: "ai_attention",
          initialState: { query: 0.2, key: 0.3, value: 0.8 },
          targetState: { qkMin: 1.55, vMin: 0.45, vMax: 0.55 }
        },
        {
          id: "language_explorer",
          name: "Language Explorer Competition",
          difficulty: "Mid-Level Calibrator",
          difficultyColor: "text-blue-700 border-blue-200 bg-blue-50",
          xp: 30,
          skills: ["Linguistic Spacing", "Computational Linguistics", "HUD Alignment"],
          description: "Calibrate ergonomic UI padding to support multilingual text density and computational grammar translation flow.",
          scenario: "The translation engine HUD overlap in spatial viewports is producing visual clutter for multilingual operators.",
          instructions: "Adjust the layout spacing and curvature sliders exactly: Set Padding to 32px, Spacing Gap to 12px, and curvature Radius to 16px to align text characters.",
          playgroundType: "pixel_artisan",
          initialState: { padding: 8, gap: 4, radius: 2 },
          targetState: { padding: 32, gap: 12, radius: 16 }
        }
      ]
    },
    {
      id: "bio_cybernetics",
      title: "Science & Space Exploration",
      icon: Network,
      role: "Somatic & Aerospace Specialist",
      color: "from-emerald-600 to-teal-600",
      borderColor: "border-emerald-200",
      accentBg: "bg-emerald-50 text-emerald-700",
      description: "Formulate sequence algorithms, calibrate genetic compilers, and synchronize organic neural linkages.",
      category: "biotech",
      missions: [
        {
          id: "bio_explorer",
          name: "Biology Explorer Competition",
          difficulty: "High-Stakes Master",
          difficultyColor: "text-rose-700 border-rose-200 bg-rose-50",
          xp: 40,
          skills: ["Gene Synthesis", "Somatic Base Calibration", "Life Sciences"],
          description: "Analyze CRISPR base-pair binding force factors to prevent somatic replication drift in synthetic cellular strings.",
          scenario: "CRISPR gene splicing sequences require molecular base calibration to bind cleanly to active DNA sequences.",
          instructions: "Adjust somatic force sliders. Combined Binding + Affinity sum must exceed 1.70, and genetic integration threshold (Value) must rest inside [0.68 - 0.74].",
          playgroundType: "ai_attention",
          initialState: { query: 0.4, key: 0.4, value: 0.1 },
          targetState: { qkMin: 1.70, vMin: 0.68, vMax: 0.74 }
        },
        {
          id: "galaxy_explorer",
          name: "Galaxy Explorer Competition",
          difficulty: "Mid-Level Calibrator",
          difficultyColor: "text-blue-700 border-blue-200 bg-blue-50",
          xp: 35,
          skills: ["Space Science", "Astronomy & Telemetry", "Signal Diagnostics"],
          description: "Calibrate signal feedback loops to isolate magnetic interference patterns in deep space orbital relays.",
          scenario: "A deep-space communications satellite is losing orbital signal coherence due to magnetic drift.",
          instructions: "Tune the resonance frequency coefficient slider to exactly 0.33 to stabilize communication links.",
          playgroundType: "async_engine",
          initialState: { coeff: 0.9 },
          targetState: { coeff: 0.33 }
        },
        {
          id: "earth_explorer",
          name: "Earth Explorer Competition",
          difficulty: "Mid-Level Calibrator",
          difficultyColor: "text-blue-700 border-blue-200 bg-blue-50",
          xp: 30,
          skills: ["Earth Systems", "Geology & Oceans", "Environmental Sensors"],
          description: "Balance geological sensory thresholds to verify coastal tidal waves and ocean telemetry integrity.",
          scenario: "Ecosystem telemetry reports sensor drift, preventing accurate readings of sea-level tides.",
          instructions: "Calibrate Query + Key sliders so their sum exceeds 1.55, and ensure sensory value threshold lies inside [0.45 - 0.55].",
          playgroundType: "ai_attention",
          initialState: { query: 0.2, key: 0.3, value: 0.8 },
          targetState: { qkMin: 1.55, vMin: 0.45, vMax: 0.55 }
        },
        {
          id: "geography_explorer",
          name: "Geography Explorer Competition",
          difficulty: "Core Novice",
          difficultyColor: "text-[#78A4CB] border-blue-100 bg-blue-50",
          xp: 25,
          skills: ["Geography Challenges", "Spatial Projections", "Coordinate Matching"],
          description: "Calibrate viewport aspect projections and alignment margins for spatial mapping hud elements.",
          scenario: "Topographical map projections require layout calibration to fit grid guidelines.",
          instructions: "Calibrate dimensions via sliders. Set the parameters exactly: Padding to 36px, Spacing Gap to 16px, and curvature Radius to 24px.",
          playgroundType: "pixel_artisan",
          initialState: { padding: 12, gap: 8, radius: 4 },
          targetState: { padding: 36, gap: 16, radius: 24 }
        }
      ]
    }
  ];

  // Load the selected mission from list
  const currentTrack = tracks.find(t => t.id === activeTrackId) || tracks[0];
  const activeMission = tracks.flatMap(t => t.missions).find(m => m.id === selectedMissionId) || null;

  // Initialize playground state whenever a mission changes
  useEffect(() => {
    if (activeMission) {
      setAttentionSliders(activeMission.initialState);
      setPixelSliders(activeMission.initialState);
      setPatchedLines([]);
      setBackoffCoefficient(activeMission.initialState.coeff || 0);
      setVerificationPassed(false);
      setShowCertificate(false);
      setIsVerifying(false);
      setVerificationLogs([]);
    }
  }, [selectedMissionId]);

  // Execute Simulated Pipeline Verification
  const handleVerify = () => {
    if (!activeMission) return;
    setIsVerifying(true);
    setVerificationLogs([]);
    setVerificationPassed(false);

    const logs = [
      "🔄 Initializing sandbox secure enclave...",
      "🔬 Injecting candidate code parameters...",
      "⚙️ Simulating system load telemetry...",
      "🧪 Running behavioral assertions..."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setVerificationLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        
        // Compute if passed
        let passed = false;
        if (activeMission.playgroundType === "ai_attention") {
          const sum = attentionSliders.query + attentionSliders.key;
          const vVal = attentionSliders.value;
          passed = sum >= activeMission.targetState.qkMin && vVal >= activeMission.targetState.vMin && vVal <= activeMission.targetState.vMax;
        } else if (activeMission.playgroundType === "pixel_artisan") {
          passed = pixelSliders.padding === activeMission.targetState.padding && 
                   pixelSliders.gap === activeMission.targetState.gap && 
                   pixelSliders.radius === activeMission.targetState.radius;
        } else if (activeMission.playgroundType === "contract_sec") {
          passed = patchedLines.includes(activeMission.targetState.patchedLine);
        } else if (activeMission.playgroundType === "async_engine") {
          passed = Math.abs(backoffCoefficient - activeMission.targetState.coeff) < 0.02;
        }

        if (passed) {
          setVerificationLogs(prev => [
            ...prev,
            "✅ ASSERTION PASSED: Telemetry parameters synchronized.",
            "🎖️ LEVEL CLEAR: Cryptographic authorization signature compiled.",
            "👉 Please click 'Mint Certificate' below to link this competency directly to your Career Passport."
          ]);
          setVerificationPassed(true);
        } else {
          let errorMsg = "❌ ASSERTION FAILED: Parameter drift out of bounds.";
          if (activeMission.playgroundType === "ai_attention") {
            const sum = attentionSliders.query + attentionSliders.key;
            if (sum < activeMission.targetState.qkMin) {
              errorMsg = `❌ ASSERTION FAILED: Combined Query + Key is ${(sum).toFixed(2)}, below required ${activeMission.targetState.qkMin}.`;
            } else {
              errorMsg = "❌ ASSERTION FAILED: Value threshold is outside of safety parameters.";
            }
          } else if (activeMission.playgroundType === "pixel_artisan") {
            errorMsg = `❌ ASSERTION FAILED: Swiss layout dimensions do not match the grid goal card.`;
          } else if (activeMission.playgroundType === "contract_sec") {
            errorMsg = "❌ ASSERTION FAILED: Security auditing failure. Reentrancy/Injection vector remains unpatched.";
          } else if (activeMission.playgroundType === "async_engine") {
            errorMsg = `❌ ASSERTION FAILED: Coefficient is ${backoffCoefficient.toFixed(2)}, expected ${activeMission.targetState.coeff.toFixed(2)}.`;
          }

          setVerificationLogs(prev => [
            ...prev,
            errorMsg,
            "🚫 STATUS: Verification rejected."
          ]);
          setVerificationPassed(false);
        }
        setIsVerifying(false);
      }
    }, 800);
  };

  // Bind Certificate to Passport
  const handleMintCertificate = () => {
    if (!activeMission) return;
    
    // Add to completed list
    const newCompleted = [...completedMissions, activeMission.id];
    setCompletedMissions(newCompleted);
    localStorage.setItem("nexus_completed_missions", JSON.stringify(newCompleted));

    // Update global passport stats
    try {
      const rawStats = localStorage.getItem("nexus_passport_stats");
      const defaultStats = {
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

      let currentStats = defaultStats;
      if (rawStats) {
        currentStats = JSON.parse(rawStats);
      }

      // Add skills and projects
      activeMission.skills.forEach(skill => {
        if (!currentStats.skills.includes(skill)) {
          currentStats.skills.push(skill);
        }
      });

      const certTitle = `Certified ${activeMission.name}`;
      if (!currentStats.projects.includes(certTitle)) {
        currentStats.projects.push(certTitle);
      }

      // Increment counters
      currentStats.missionsDone += 1;
      currentStats.totalMissions += 1;
      currentStats.nexusScore = Math.min(100, currentStats.nexusScore + activeMission.xp);
      if (activeMission.difficulty === "High-Stakes Master") {
        currentStats.criticalMissions += 1;
      } else {
        currentStats.dayOneChallenges += 1;
      }
      currentStats.skillsMapped = currentStats.skills.length;

      localStorage.setItem("nexus_passport_stats", JSON.stringify(currentStats));
    } catch (e) {
      console.error("Failed to sync passport stats", e);
    }

    setShowCertificate(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 text-left animate-fade-in text-white font-sans selection:bg-[#78A4CB]/20 selection:text-white">
      
      {/* Header Deck */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#78A4CB] mb-1">
            <Trophy className="w-4.5 h-4.5 text-inherit animate-bounce" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-extrabold text-[#78A4CB]">Active Competency Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight flex items-center gap-3">
            Missions & Challenges Hub 🚀
          </h2>
          <p className="text-slate-300 mt-2 text-sm font-light">
            Verify your implementation capabilities under high-stakes, realistic sandbox conditions. Pass logical simulations, earn official credentials, and mint certificates that directly load into your Career Passport.
          </p>
        </div>
        
        {/* Statistics Ring */}
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 p-4 rounded-2xl shrink-0 shadow-xl backdrop-blur-md">
          <div className="text-center">
            <span className="text-[9px] font-mono text-slate-400 uppercase block">Completed</span>
            <span className="text-2xl font-mono font-black text-white">{completedMissions.length}</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <span className="text-[9px] font-mono text-slate-400 uppercase block">XP Earned</span>
            <span className="text-2xl font-mono font-black text-emerald-400">
              {completedMissions.reduce((acc, mid) => {
                const found = tracks.flatMap(t => t.missions).find(m => m.id === mid);
                return acc + (found?.xp || 0);
              }, 0)} XP
            </span>
          </div>
        </div>
      </div>

      {activeMission === null && (
        <div className="flex flex-wrap gap-2.5 bg-white/[0.02] border border-white/10 p-2 rounded-2xl">
          {[
            { id: "all", label: "🌐 All Sectors", count: tracks.flatMap(t => t.missions).length, color: "text-[#78A4CB]" },
            { id: "it", label: "💻 IT & Software", count: tracks.filter(t => t.category === "it").flatMap(t => t.missions).length, color: "text-blue-400" },
            { id: "business", label: "📈 Business & PM", count: tracks.filter(t => t.category === "business").flatMap(t => t.missions).length, color: "text-amber-400" },
            { id: "design", label: "🎨 Design & UX", count: tracks.filter(t => t.category === "design").flatMap(t => t.missions).length, color: "text-purple-400" },
            { id: "biotech", label: "🧬 Science & BioTech", count: tracks.filter(t => t.category === "biotech").flatMap(t => t.missions).length, color: "text-emerald-400" }
          ].map(cat => {
            const isCatActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const filtered = tracks.filter(t => cat.id === "all" || t.category === cat.id);
                  if (filtered.length > 0 && !filtered.some(t => t.id === activeTrackId)) {
                    setActiveTrackId(filtered[0].id);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isCatActive 
                    ? "bg-[#78A4CB]/15 border-[#78A4CB] text-white shadow-md" 
                    : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <span className={cat.color}>{cat.label}</span>
                <span className="text-[9px] font-mono opacity-60 bg-white/10 px-1.5 py-0.5 rounded-md text-slate-300">{cat.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {activeMission === null ? (
        /* GRID OF EXPLORER COMPETITIONS AND CHALLENGES IN A HIGH-CONTRAST PAIRING */
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              COMPETITION NODE SELECTOR • ACTIVE MATCHES ({
                tracks
                  .filter(t => activeCategory === "all" || t.category === activeCategory)
                  .flatMap(t => t.missions).length
              })
            </span>
            <span className="text-[10px] font-mono text-[#78A4CB] bg-[#78A4CB]/10 border border-[#78A4CB]/20 px-2.5 py-1 rounded-lg font-bold uppercase">
              ACTIVE SECTOR: {activeCategory.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {tracks
              .filter(t => activeCategory === "all" || t.category === activeCategory)
              .flatMap(track => track.missions.map(mission => ({ ...mission, track })))
              .map((mission) => {
                const isCompleted = completedMissions.includes(mission.id);
                
                // Helper to resolve appropriate emoji per mission
                const getMissionEmoji = (id: string) => {
                  const mapping: Record<string, string> = {
                    syn_attn: "🧠",
                    syn_gradient: "⚡",
                    syn_entropy: "🎲",
                    sec_reentrancy: "🛡️",
                    sec_sql: "🧱",
                    cloud_breaker: "🔌",
                    cloud_k8s: "📦",
                    it_speed_compiler: "🛸",
                    economics_explorer: "🦌",
                    biz_funnel_align: "📈",
                    biz_ethics_audit: "⚖️",
                    pix_layout: "📐",
                    pix_spring: "🔮",
                    spatial_viewport_gating: "🕶️",
                    spatial_retinal_focus: "👁️",
                    language_explorer: "🦜",
                    bio_explorer: "🦠",
                    galaxy_explorer: "🌌",
                    earth_explorer: "🦕",
                    geography_explorer: "🦒"
                  };
                  return mapping[id] || "🏆";
                };

                // Helper to resolve specific color gradient matching screenshot
                const getCategoryLeftBg = (category: string, id: string) => {
                  if (id === "bio_explorer") return "bg-gradient-to-br from-[#1E88E5] to-[#1565C0]"; // Biology is Blue in template
                  if (id === "galaxy_explorer") return "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]"; // Space dark theme
                  if (id === "economics_explorer") return "bg-gradient-to-br from-[#8E24AA] to-[#5E35B1]"; // purple/magenta with deer
                  if (id === "language_explorer") return "bg-gradient-to-br from-[#E65100] to-[#F57C00]"; // Orange Parrot
                  if (id === "earth_explorer") return "bg-gradient-to-br from-[#2E7D32] to-[#4CAF50]"; // dinosaur Green
                  if (id === "geography_explorer") return "bg-gradient-to-br from-[#FF6F00] to-[#FFA000]"; // Giraffe golden yellow
                  
                  if (category === "it") return "bg-gradient-to-br from-[#00838F] to-[#00ACC1]"; // IT Cyan blue
                  if (category === "business") return "bg-gradient-to-br from-[#0D47A1] to-[#1565C0]"; // Corporate deep blue
                  if (category === "design") return "bg-gradient-to-br from-[#4A148C] to-[#7B1FA2]"; // Design purple
                  return "bg-gradient-to-br from-slate-700 to-slate-900";
                };

                const leftPanelBg = getCategoryLeftBg(mission.track.category, mission.id);
                const missionEmoji = getMissionEmoji(mission.id);

                return (
                  <div
                    key={mission.id}
                    className="bg-white rounded-[28px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col sm:flex-row min-h-[295px] transition-all duration-300 hover:border-slate-300/80 hover:scale-[1.005] group"
                  >
                    {/* LEFT PANEL: High impact colorful visual card branding */}
                    <div className={`${leftPanelBg} sm:w-[210px] shrink-0 flex flex-col items-center justify-between p-6 text-center relative text-white overflow-hidden`}>
                      {/* Decorative grid pattern inside the colored panel */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                      
                      {/* Curved SVG badge effect */}
                      <ExplorerBadge title={mission.name} emoji={missionEmoji} />

                      {/* CTA REGISTER NOW button inside Left Panel matching the template layout */}
                      <button
                        onClick={() => setSelectedMissionId(mission.id)}
                        className={`w-full mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/25 rounded-2xl py-3 px-3 font-mono font-black text-[10.5px] uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm cursor-pointer`}
                      >
                        {isCompleted ? "Re-Calibrate Node 🔄" : "Register Now 🚀"}
                      </button>
                    </div>

                    {/* RIGHT PANEL: High-contrast white background with deep-colored readable text */}
                    <div className="flex-grow p-6 flex flex-col justify-between text-left bg-white text-slate-800">
                      <div>
                        {/* Tagline / Subtitle */}
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <span className="text-amber-600 font-extrabold uppercase text-[10px] tracking-wider flex items-center gap-1">
                            ★ NATIONAL EXPLORER CHALLENGE
                          </span>
                          <span className="text-[10px] font-mono font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/40">
                            +{mission.xp} XP
                          </span>
                        </div>

                        {/* Title with link hover styling */}
                        <h3 className="text-[19px] font-extrabold text-slate-900 tracking-tight leading-snug uppercase mb-1.5 group-hover:text-blue-600 transition-colors">
                          {mission.name}
                        </h3>

                        {/* Role Track Indicator Badge */}
                        <span className="text-[10px] font-mono text-[#1E293B] bg-slate-100/90 border border-slate-200/80 px-2 py-1 rounded-md inline-block font-black uppercase tracking-wide mb-3">
                          ROLE: {mission.track.role}
                        </span>

                        {/* Detailed Description */}
                        <p className="text-[12px] text-slate-600 leading-relaxed font-normal mb-4 line-clamp-3">
                          {mission.description}
                        </p>
                      </div>

                      {/* Bottom Metrics Bar */}
                      <div>
                        <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-mono">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <span>Competition Mode:</span>
                            <span className="font-extrabold text-slate-800 uppercase">ONLINE</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <span>Verification:</span>
                            <span className={`font-extrabold uppercase flex items-center gap-1 ${isCompleted ? "text-emerald-600" : "text-amber-600"}`}>
                              {isCompleted ? "CLEAR ✔" : "PENDING ⏱"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2.5 text-[9px] text-slate-400 font-light leading-normal italic">
                          * Registration can ONLY be completed by a candidate with active network credentials. Results sync instantly to your verified passport node.
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
          </div>

          {/* Elegant Swiss footer note card */}
          <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/10 text-left flex gap-4 items-start shadow-xl backdrop-blur-md">
            <div className="p-3 bg-[#78A4CB]/10 border border-[#78A4CB]/20 rounded-xl text-[#78A4CB]">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure Cognitive Calibration Passport Sync</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light mt-1">
                Participating in national explorer competitions unlocks official, verifiable skill matrices bound cryptographically to your system node. High scores are indexed immediately by certified corporate talent acquisition hubs.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* EXPANDED INTERACTIVE MISSION CONTROLS & PLAYGROUND */
        <div className="flex flex-col gap-6">
          
          {/* Back Action Bar */}
          <button
            onClick={() => {
              setSelectedMissionId(null);
              setAttentionSliders({ query: 0.2, key: 0.3, value: 0.5 });
              setPixelSliders({ padding: 12, gap: 8, radius: 4 });
              setPatchedLines([]);
              setBackoffCoefficient(0);
              setVerificationLogs([]);
              setVerificationPassed(false);
              setShowCertificate(false);
            }}
            className="flex items-center gap-2 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider w-fit border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Abandon Node / Return to Deck</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT COLUMN: SCENARIO & DETAILS */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              <div className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl flex flex-col gap-4 text-left shadow-lg backdrop-blur-md">
                
                {/* Meta Header */}
                <div className="flex justify-between items-center border-b border-white/15 pb-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-4.5 h-4.5 text-[#78A4CB] animate-pulse" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Live Calibration Lab</span>
                  </div>
                  <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded border ${
                    activeMission.difficulty === "Core Novice" ? "text-emerald-400 border-emerald-500/20 bg-emerald-950/30" :
                    activeMission.difficulty === "Mid-Level Calibrator" ? "text-blue-400 border-blue-500/20 bg-blue-950/30" :
                    "text-rose-400 border-rose-500/20 bg-rose-950/30"
                  }`}>
                    {activeMission.difficulty}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{activeMission.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {activeMission.skills.map((skill, idx) => (
                      <span key={idx} className="text-[8px] font-mono text-slate-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scenario details */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">BACKGROUND CONTEXT</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-light mt-1">
                      {activeMission.scenario}
                    </p>
                  </div>

                  <div>
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">CALIBRATION OBJECTIVE</span>
                    <p className="text-xs text-slate-200 leading-relaxed font-semibold mt-1 p-3 bg-[#78A4CB]/10 border border-[#78A4CB]/20 rounded-xl">
                      {activeMission.instructions}
                    </p>
                  </div>
                </div>

              </div>

              {/* SIMULATED SYSTEM VERIFICATION TERMINAL */}
              <div className="bg-[#0B132B] border border-[#1C2541] rounded-3xl p-5 flex flex-col gap-3 font-mono flex-grow shadow-lg">
                <div className="flex items-center gap-2 border-b border-[#1C2541] pb-2">
                  <Terminal className="w-4 h-4 text-[#78A4CB]" />
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">System Compiler Logs</span>
                </div>

                <div className="flex-grow min-h-[140px] max-h-[220px] overflow-y-auto text-left text-[10px] space-y-1.5 pr-2">
                  {verificationLogs.length === 0 ? (
                    <span className="text-slate-500 italic">No compile cycles triggered. Ready for verification...</span>
                  ) : (
                    verificationLogs.map((log, idx) => (
                      <div key={idx} className={`leading-relaxed ${
                        log.startsWith("❌") ? "text-rose-400 font-semibold" : 
                        log.startsWith("✅") ? "text-emerald-400 font-bold" :
                        log.startsWith("🎖️") ? "text-amber-300 font-bold" : "text-slate-300"
                      }`}>
                        {log}
                      </div>
                    ))
                  )}
                </div>

                {/* Main Verify Buttons */}
                <div className="flex gap-2 pt-3 border-t border-[#1C2541]">
                  <button
                    disabled={isVerifying}
                    onClick={handleVerify}
                    className="flex-grow py-3 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Compiling Sandbox Core...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-slate-900" />
                        <span>Execute Verification</span>
                      </>
                    )}
                  </button>

                  {verificationPassed && (
                    <button
                      onClick={handleMintCertificate}
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse"
                    >
                      <Award className="w-4 h-4 text-white" />
                      <span>Mint Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: THE INTERACTIVE PLAYGROUND CORES */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              <div className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl text-left flex flex-col justify-between flex-grow gap-6 relative shadow-lg backdrop-blur-md">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#78A4CB]/5 rounded-full blur-2xl pointer-events-none" />

                {/* PLAYGROUND TYPE 1: AI ATTENTION ALIGNER */}
                {activeMission.playgroundType === "ai_attention" && (
                  <div className="flex flex-col gap-6 flex-grow">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">ATTENTION VECTOR VISUALIZER</span>
                      <h4 className="text-md font-bold text-white mt-0.5">Mathematical Core Alignment</h4>
                    </div>

                    {/* SVG GRAPHIC DISPLAY */}
                    <div className="h-44 bg-[#0B132B] rounded-2xl border border-[#1C2541] relative overflow-hidden flex items-center justify-center p-4">
                      {/* Grid background */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1C2541_1px,transparent_1px),linear-gradient(to_bottom,#1C2541_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-35" />
                      
                      {/* Relational attention lines */}
                      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <line 
                          x1="20%" y1="50%" x2="50%" y2="25%" 
                          stroke={attentionSliders.query > 0.5 ? "#78A4CB" : "rgba(255,255,255,0.05)"} 
                          strokeWidth={attentionSliders.query * 6} 
                          className="transition-all duration-300"
                        />
                        <line 
                          x1="20%" y1="50%" x2="50%" y2="75%" 
                          stroke={attentionSliders.key > 0.5 ? "#818cf8" : "rgba(255,255,255,0.05)"} 
                          strokeWidth={attentionSliders.key * 6} 
                          className="transition-all duration-300"
                        />
                        <line 
                          x1="50%" y1="25%" x2="80%" y2="50%" 
                          stroke={attentionSliders.value >= activeMission.targetState.vMin && attentionSliders.value <= activeMission.targetState.vMax ? "#34d399" : "#f87171"} 
                          strokeWidth={attentionSliders.value * 5} 
                          className="transition-all duration-300"
                        />
                        <line 
                          x1="50%" y1="75%" x2="80%" y2="50%" 
                          stroke={attentionSliders.value >= activeMission.targetState.vMin && attentionSliders.value <= activeMission.targetState.vMax ? "#34d399" : "#f87171"} 
                          strokeWidth={attentionSliders.value * 5} 
                          className="transition-all duration-300"
                        />
                      </svg>

                      {/* Nodes overlay */}
                      <div className="absolute left-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-[#1C2541] border border-blue-500/30 flex items-center justify-center font-mono text-[9px] font-bold text-blue-400">
                          Q,K
                        </div>
                        <span className="text-[7px] font-mono text-slate-400 uppercase">Input</span>
                      </div>

                      <div className="absolute left-[50%] top-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-[#1C2541] border border-indigo-500/30 flex items-center justify-center font-mono text-[9px] font-bold text-indigo-400">
                          Z1
                        </div>
                        <span className="text-[7px] font-mono text-slate-400 uppercase">Hidden</span>
                      </div>

                      <div className="absolute left-[50%] top-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-[#1C2541] border border-indigo-500/30 flex items-center justify-center font-mono text-[9px] font-bold text-indigo-400">
                          Z2
                        </div>
                        <span className="text-[7px] font-mono text-slate-400 uppercase">Hidden</span>
                      </div>

                      <div className="absolute right-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-[9px] font-bold transition-all ${
                          attentionSliders.value >= activeMission.targetState.vMin && attentionSliders.value <= activeMission.targetState.vMax 
                            ? "bg-emerald-950/60 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]" 
                            : "bg-rose-950/40 border-rose-500/30 text-rose-400"
                        }`}>
                          OUT
                        </div>
                        <span className="text-[7px] font-mono text-slate-400 uppercase">Output</span>
                      </div>

                      {/* Score Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#1C2541]/80 border border-[#1C2541] font-mono text-[8px] text-slate-300">
                        Sum (Q+K): <span className="font-bold text-white">{(attentionSliders.query + attentionSliders.key).toFixed(2)}</span> / {activeMission.targetState.qkMin.toFixed(2)}+
                      </div>
                    </div>

                    {/* INTERACTIVE SLIDERS */}
                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                          <span>Query Parameter Drift (Q)</span>
                          <span className="font-bold text-white">{attentionSliders.query.toFixed(2)}</span>
                        </div>
                        <input 
                          type="range" min="0" max="1" step="0.05"
                          value={attentionSliders.query} 
                          onChange={(e) => setAttentionSliders(p => ({ ...p, query: parseFloat(e.target.value) }))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#78A4CB]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                          <span>Key Relational Drift (K)</span>
                          <span className="font-bold text-white">{attentionSliders.key.toFixed(2)}</span>
                        </div>
                        <input 
                          type="range" min="0" max="1" step="0.05"
                          value={attentionSliders.key} 
                          onChange={(e) => setAttentionSliders(p => ({ ...p, key: parseFloat(e.target.value) }))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                          <span>Value Tensor Calibration Threshold (V)</span>
                          <span className={`font-bold ${attentionSliders.value >= activeMission.targetState.vMin && attentionSliders.value <= activeMission.targetState.vMax ? "text-emerald-400" : "text-amber-400"}`}>
                            {attentionSliders.value.toFixed(2)} {attentionSliders.value >= activeMission.targetState.vMin && attentionSliders.value <= activeMission.targetState.vMax ? "(Aligned)" : `(Expected range [${activeMission.targetState.vMin.toFixed(2)} - ${activeMission.targetState.vMax.toFixed(2)}])`}
                          </span>
                        </div>
                        <input 
                          type="range" min="0" max="1" step="0.01"
                          value={attentionSliders.value} 
                          onChange={(e) => setAttentionSliders(p => ({ ...p, value: parseFloat(e.target.value) }))}
                          className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* PLAYGROUND TYPE 2: PIXEL ARTISAN */}
                {activeMission.playgroundType === "pixel_artisan" && (
                  <div className="flex flex-col gap-6 flex-grow">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">PIXEL PERFECT RENDER MATRIX</span>
                      <h4 className="text-md font-bold text-white mt-0.5">Swiss Grid Layout Alignment</h4>
                    </div>

                    {/* REAL-TIME PREVIEW WINDOW */}
                    <div className="h-44 bg-[#0B132B]/50 rounded-2xl border border-white/10 flex items-center justify-center p-4 relative">
                      {/* Swiss Layout guidelines helper overlays */}
                      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t border-dashed border-white/10 pointer-events-none" />
                      <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 border-l border-dashed border-white/10 pointer-events-none" />

                      {/* Perfect target container (dotted background layout) */}
                      <div className="absolute w-[220px] h-[100px] border border-dashed border-emerald-500/30 rounded-[20px] pointer-events-none flex items-center justify-center"
                        style={{
                          borderRadius: `${activeMission.targetState.radius}px`
                        }}
                      >
                        <span className="text-[7.5px] font-mono text-emerald-400/60 uppercase tracking-widest font-extrabold">Swiss Grid Goal Frame</span>
                      </div>

                      {/* Live moving layout container */}
                      <div 
                        className="bg-white/10 border border-white/15 shadow-xl transition-all"
                        style={{
                          padding: `${pixelSliders.padding}px`,
                          borderRadius: `${pixelSliders.radius}px`,
                          width: "220px",
                          height: "100px"
                        }}
                      >
                        <div 
                          className="flex h-full items-center justify-between"
                          style={{ gap: `${pixelSliders.gap}px` }}
                        >
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white">
                            <Sliders className="w-4 h-4" />
                          </div>
                          <div className="flex-grow min-w-0 text-left">
                            <div className="h-3 bg-white/20 rounded w-4/5 mb-1.5" />
                            <div className="h-2 bg-white/10 rounded w-3/5" />
                          </div>
                        </div>
                      </div>

                      {/* Specs Overlay */}
                      <div className="absolute bottom-3 right-3 font-mono text-[7.5px] text-slate-400 space-y-0.5 text-right uppercase">
                        <div>padding: <span className={pixelSliders.padding === activeMission.targetState.padding ? "text-emerald-400 font-bold" : "text-white"}>{pixelSliders.padding}px</span> / {activeMission.targetState.padding}px</div>
                        <div>gap: <span className={pixelSliders.gap === activeMission.targetState.gap ? "text-emerald-400 font-bold" : "text-white"}>{pixelSliders.gap}px</span> / {activeMission.targetState.gap}px</div>
                        <div>radius: <span className={pixelSliders.radius === activeMission.targetState.radius ? "text-emerald-400 font-bold" : "text-white"}>{pixelSliders.radius}px</span> / {activeMission.targetState.radius}px</div>
                      </div>
                    </div>

                    {/* DYNAMIC REGULATOR CONTROLS */}
                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                          <span>Box Element Inner Padding</span>
                          <span className="font-bold text-white">{pixelSliders.padding}px</span>
                        </div>
                        <input 
                          type="range" min="8" max="40" step="1"
                          value={pixelSliders.padding} 
                          onChange={(e) => setPixelSliders(p => ({ ...p, padding: parseInt(e.target.value) }))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#78A4CB]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                          <span>Flexbox Element Gaps</span>
                          <span className="font-bold text-white">{pixelSliders.gap}px</span>
                        </div>
                        <input 
                          type="range" min="4" max="24" step="1"
                          value={pixelSliders.gap} 
                          onChange={(e) => setPixelSliders(p => ({ ...p, gap: parseInt(e.target.value) }))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#78A4CB]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                          <span>Visual Outer Border Radius</span>
                          <span className="font-bold text-white">{pixelSliders.radius}px</span>
                        </div>
                        <input 
                          type="range" min="0" max="32" step="1"
                          value={pixelSliders.radius} 
                          onChange={(e) => setPixelSliders(p => ({ ...p, radius: parseInt(e.target.value) }))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#78A4CB]"
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* PLAYGROUND TYPE 3: CRYPTOGRAPHIC SMART CONTRACT REVIEW */}
                {activeMission.playgroundType === "contract_sec" && (
                  <div className="flex flex-col gap-5 flex-grow">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">SECURE CODE ANALYSIS VENEER</span>
                      <h4 className="text-md font-bold text-white mt-0.5">Logical Vulnerability Patching</h4>
                    </div>

                    <div className="bg-[#0B132B] border border-[#1C2541] p-4 rounded-xl font-mono text-[11px] leading-relaxed relative flex-grow overflow-y-auto">
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded text-[8px] text-rose-400 uppercase tracking-wider font-bold">
                        Vulnerable Module
                      </div>

                      <div className="space-y-1">
                        {(activeMission.id === "sec_sql" ? [
                          "// Node Express API endpoint query",
                          "app.get('/api/keys', (req, res) => {",
                          "  const sql = `SELECT * FROM secret_keys WHERE uid = '${req.query.id}'`;",
                          "  db.execute(sql, (err, row) => {",
                          "    res.json(row);",
                          "  });",
                          "});"
                        ] : activeMission.id === "biz_ethics_audit" ? [
                          "// Automated Subscription Billing Loop",
                          "function processBilling(user) {",
                          "  if (user.hasActiveTrial && user.daysRemaining <= 0) {",
                          "    if (user.requestCancellationPending === true) {",
                          "      executeCardCharge(user.paymentMethod, user.subscriptionPrice); // UNLAWFUL CHARGE",
                          "    }",
                          "    user.status = 'active';",
                          "  }",
                          "}"
                        ] : [
                          "contract Vault {",
                          "  mapping(address => uint) public balances;",
                          "  function withdraw(uint _amount) public {",
                          "    require(balances[msg.sender] >= _amount);",
                          "    (bool success, ) = msg.sender.call{value: _amount}(\"\");",
                          "    require(success);",
                          "    balances[msg.sender] -= _amount;",
                          "  }",
                          "}"
                        ]).map((line, idx) => {
                          const isVulnerable = idx === activeMission.targetState.patchedLine;
                          const isPatched = patchedLines.includes(idx);
                          return (
                            <div 
                              key={idx}
                              onClick={() => {
                                if (isVulnerable) {
                                  setPatchedLines(p => p.includes(idx) ? p.filter(x => x !== idx) : [...p, idx]);
                                }
                              }}
                              className={`group flex items-start gap-4 p-1.5 rounded transition-colors ${
                                isVulnerable 
                                  ? isPatched 
                                    ? "bg-emerald-950/60 hover:bg-emerald-900/40 border border-emerald-500/20 cursor-pointer text-emerald-300"
                                    : "bg-rose-950/60 hover:bg-rose-900/40 border border-rose-500/20 cursor-pointer text-rose-300" 
                                  : "text-slate-400 hover:bg-white/[0.02]"
                              }`}
                            >
                              <span className="text-[9px] text-[#1C2541] select-none text-right w-4 font-mono">{idx + 1}</span>
                              <span className="flex-grow text-left whitespace-pre-wrap">{line}</span>
                              {isVulnerable && (
                                <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border transition-all shrink-0 ${
                                  isPatched ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-rose-500/20 border-rose-500/30 text-rose-400"
                                }`}>
                                  {isPatched ? "Patched" : "Click to Patch"}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 flex gap-2 items-start text-xs leading-relaxed text-amber-300 font-light shadow-md">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Security Review Note:</strong> {activeMission.id === "sec_sql" 
                          ? "The SQL injection attack vector is caused by inserting raw query arguments directly into command strings. Click Line 3 to patch it to a prepared statement placeholders." 
                          : activeMission.id === "biz_ethics_audit"
                          ? "Unethical billing loop executes credit card charges despite explicit cancellation requests. Click Line 5 to deactivate this unauthorized charge."
                          : "The reentrancy attack vector is caused by violating the Checks-Effects-Interactions pattern. Click Line 5 to run State Balance updates before the transfer execution."}
                      </span>
                    </div>

                  </div>
                )}

                {/* PLAYGROUND TYPE 4: GRADIENT DECAY THROTTLING */}
                {activeMission.playgroundType === "async_engine" && (
                  <div className="flex flex-col gap-6 flex-grow">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">LAYER TELEMETRY INTEGRATOR</span>
                      <h4 className="text-md font-bold text-white mt-0.5">Activation Threshold Adjuster</h4>
                    </div>

                    {/* DYNAMIC BACKPROP CHART */}
                    <div className="h-44 bg-[#0B132B] rounded-2xl border border-[#1C2541] relative overflow-hidden flex items-center justify-center p-4">
                      {/* Plot grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-35" />
                      
                      {/* Reference baseline */}
                      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-700 pointer-events-none" />
                      
                      {/* Visual decay wave */}
                      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d={(() => {
                            const pts = [];
                            const amplitude = Math.abs(backoffCoefficient - activeMission.targetState.coeff) < 0.02 ? 40 : 15;
                            const noise = Math.abs(backoffCoefficient - activeMission.targetState.coeff) < 0.02 ? 1.5 : 4.5;
                            for (let x = 0; x <= 320; x += 5) {
                              const rad = (x / 320) * Math.PI * noise;
                              const y = 90 + Math.sin(rad * 4) * amplitude * Math.exp(-x/150);
                              pts.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
                            }
                            return pts.join(' ');
                          })()} 
                          fill="none" 
                          stroke={Math.abs(backoffCoefficient - activeMission.targetState.coeff) < 0.02 ? "#34d399" : "#f59e0b"} 
                          strokeWidth="2" 
                          className="transition-all duration-300"
                        />
                      </svg>

                      {/* Threshold Goal Line Overlay */}
                      <div className="absolute inset-x-0 h-0.5 bg-emerald-500/20 border-t border-dashed border-emerald-500/40" style={{ top: "45%" }} />

                      <div className="absolute top-3 left-3 bg-black/60 border border-white/5 px-2.5 py-1 rounded font-mono text-[8.5px] text-slate-300">
                        Signal Calibration Rate: <span className={`font-bold ${Math.abs(backoffCoefficient - activeMission.targetState.coeff) < 0.02 ? "text-emerald-400" : "text-amber-400"}`}>{Math.abs(backoffCoefficient - activeMission.targetState.coeff) < 0.02 ? "0.00% (OPTIMAL BOUNDS)" : `${(Math.abs(backoffCoefficient - activeMission.targetState.coeff) * 100).toFixed(1)}% (DIVERGENT FLUCTUATION)`}</span>
                      </div>
                    </div>

                    {/* Coefficient slider */}
                    <div>
                      <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                        <span>Activation / Threshold Coefficient</span>
                        <span className={`font-bold ${Math.abs(backoffCoefficient - activeMission.targetState.coeff) < 0.02 ? "text-emerald-400" : "text-amber-400"}`}>
                          {backoffCoefficient.toFixed(2)} {Math.abs(backoffCoefficient - activeMission.targetState.coeff) < 0.02 ? "(Target Matched)" : `(Target: ${activeMission.targetState.coeff.toFixed(2)})`}
                        </span>
                      </div>
                      <input 
                        type="range" min="0" max="1" step="0.01"
                        value={backoffCoefficient} 
                        onChange={(e) => setBackoffCoefficient(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#78A4CB]"
                      />
                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* OFFICIAL VERIFIED CREDENTIAL PREVIEW POPUP MODAL */}
      <AnimatePresence>
        {showCertificate && activeMission && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0B132B]/95 border border-white/15 rounded-[32px] p-8 max-w-lg w-full text-center relative shadow-2xl overflow-hidden backdrop-blur-md"
            >
              {/* Geometric Border Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#78A4CB]/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#78A4CB] to-transparent" />

              {/* Success Badge Banner */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <ShieldCheck className="w-8 h-8 animate-bounce" />
              </div>

              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-2">OFFICIAL COMPLIANCE PASSPORT SECURE SYNC</span>
              <h3 className="text-2xl font-black text-white tracking-tight leading-none">Capability Certificate Minted</h3>
              <p className="text-xs text-slate-300 mt-2 font-light leading-relaxed">
                The validated parameter node for <strong>{activeMission.name}</strong> was locked and authorized. The credential hash has synced to your primary Verified Career Passport successfully.
              </p>

              {/* Physical styled Certificate layout */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 my-6 text-left relative overflow-hidden shadow-2xl">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#78A4CB]/5 rounded-full blur-xl" />
                
                <div className="flex justify-between items-start mb-4 border-b border-white/15 pb-3">
                  <div>
                    <span className="text-[7px] font-mono text-slate-400 uppercase block">CREDENTIAL TOKEN HASH</span>
                    <span className="text-[9px] font-mono text-white font-bold block">NX-CRED-{activeMission.id.toUpperCase()}</span>
                  </div>
                  <Award className="w-7 h-7 text-amber-500 shrink-0" />
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[7.5px] font-mono text-slate-400 uppercase block">HOLDER</span>
                    <span className="text-xs text-slate-100 font-extrabold uppercase font-sans tracking-wide block">Candidate Node (Authenticated Sync)</span>
                  </div>

                  <div>
                    <span className="text-[7.5px] font-mono text-slate-400 uppercase block">COMPETENCY CONFERRED</span>
                    <span className="text-sm text-[#78A4CB] font-black uppercase font-sans tracking-tight block">
                      {activeMission.name} Specialist
                    </span>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <span className="text-[7.5px] font-mono text-slate-400 uppercase block">DECENTRALIZED ANCHOR</span>
                      <span className="text-[8px] font-mono text-emerald-400 block font-bold">NX-SYS-VERIFIED • SECURE</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[7px] font-mono text-slate-400 uppercase block">DATE REGISTERED</span>
                      <span className="text-[8.5px] font-mono text-slate-100 block font-bold">JULY 18, 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowCertificate(false);
                    setSelectedMissionId(null);
                  }}
                  className="py-3.5 bg-[#78A4CB] hover:bg-[#5D8EB7] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <Check className="w-4 h-4 text-white" />
                  <span>Seal Node & Continue</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
