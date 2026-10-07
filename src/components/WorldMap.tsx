import { useState } from "react";
import { motion } from "framer-motion";

interface Anomaly {
  id: string;
  x: number;
  y: number;
  class: string;
  time: string;
  city: string;
}

// Real world coordinate mapping on 1000x500 projection
const anomalies: Anomaly[] = [
  { id: "a1", x: 220, y: 140, class: "CLASS 4 SHADOW", time: "2 MIN AGO", city: "NEW YORK, USA" },
  { id: "a2", x: 490, y: 120, class: "CLASS 2 ORB", time: "7 MIN AGO", city: "LONDON, UK" },
  { id: "a3", x: 520, y: 235, class: "CLASS 5 POLTERGEIST", time: "12 MIN AGO", city: "LAGOS, NG" },
  { id: "a4", x: 850, y: 150, class: "CLASS 3 APPARITION", time: "4 MIN AGO", city: "TOKYO, JP" },
  { id: "a5", x: 790, y: 280, class: "CLASS 1 ECTOPLASM", time: "19 MIN AGO", city: "JAKARTA, ID" },
  { id: "a6", x: 330, y: 360, class: "CLASS 4 SHADOW", time: "9 MIN AGO", city: "SÃO PAULO, BR" },
  { id: "a7", x: 140, y: 100, class: "CLASS 2 ORB", time: "23 MIN AGO", city: "VANCOUVER, CA" },
  { id: "a8", x: 560, y: 200, class: "CLASS 3 APPARITION", time: "31 MIN AGO", city: "CAIRO, EG" },
  { id: "a9", x: 620, y: 105, class: "CLASS 4 SHADOW", time: "14 MIN AGO", city: "MOSCOW, RU" },
  { id: "a10", x: 910, y: 380, class: "CLASS 2 ORB", time: "28 MIN AGO", city: "SYDNEY, AU" },
  { id: "a11", x: 585, y: 175, class: "CLASS 5 DEMON", time: "1 MIN AGO", city: "ISTANBUL, TR" },
  { id: "a12", x: 750, y: 210, class: "CLASS 3 MIMIC", time: "5 MIN AGO", city: "MUMBAI, IN" },
  { id: "a13", x: 430, y: 150, class: "CLASS 4 BIO", time: "11 MIN AGO", city: "PARIS, FR" },
  { id: "a14", x: 180, y: 180, class: "CLASS 2 HABITAT", time: "17 MIN AGO", city: "MEXICO CITY, MX" },
  { id: "a15", x: 680, y: 300, class: "CLASS Ω UNKNOWN", time: "8 MIN AGO", city: "CAPE TOWN, ZA" },
];

const hub = { x: 585, y: 175 };

const connections: [string, string][] = [
  ["hub", "a1"], ["hub", "a2"], ["hub", "a3"], ["hub", "a4"],
  ["hub", "a5"], ["hub", "a6"], ["hub", "a7"], ["hub", "a8"],
  ["hub", "a9"], ["hub", "a10"], ["hub", "a11"], ["hub", "a12"],
  ["a2", "a9"], ["a4", "a9"], ["a4", "a5"], ["a1", "a7"],
  ["a3", "a8"], ["a6", "a8"], ["a12", "a5"], ["a13", "a2"],
];

function getPoint(id: string) {
  if (id === "hub") return hub;
  return anomalies.find((a) => a.id === id)!;
}

export function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 1000 / rect.width;
    const scaleY = 500 / rect.height;
    setMousePos({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
  };

  return (
    <div id="world-map-container" className="relative w-full overflow-hidden rounded-sm border border-red-900/30 bg-black/90">
      <div className="absolute left-4 top-3 z-10">
        <div className="label-mono">LIVE FEED // GLOBAL SENSORS ONLINE</div>
        <div className="mt-1 font-mono text-xs text-neutral-400">
          ACTIVE NODES: <span className="text-red-500">10,847</span> | DETECTIONS 24H: <span className="text-red-500">3,291</span>
        </div>
      </div>

      <svg
        viewBox="0 0 1000 500"
        className="h-auto w-full"
        style={{ minHeight: "300px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff1a1a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff1a1a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="landGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#151515" />
          </radialGradient>
        </defs>

        {/* World map landmasses */}
        <g fill="url(#landGlow)" stroke="#3a3a3a" strokeWidth="0.6" opacity="0.95">
          {/* North America */}
          <path d="M80,45 C100,35 140,30 170,38 C200,45 230,65 250,90 C265,110 270,135 265,155 C260,175 245,190 225,198 C205,205 180,202 160,192 C140,182 120,168 105,150 C90,132 78,112 72,92 C66,72 70,55 80,45 Z" />
          <path d="M60,85 C75,80 90,88 95,105 C98,118 90,130 78,135 C65,140 52,132 48,118 C45,105 50,90 60,85 Z" />
          <path d="M235,48 C250,42 270,45 280,58 C288,70 285,85 275,92 C262,100 245,95 238,82 C232,70 230,55 235,48 Z" />

          {/* South America */}
          <path d="M270,235 C295,225 320,232 335,255 C350,280 358,315 355,350 C352,385 340,415 322,435 C305,452 282,458 265,448 C250,438 242,415 242,388 C242,360 248,332 252,305 C255,280 252,258 260,245 C263,239 266,236 270,235 Z" />

          {/* Europe */}
          <path d="M455,95 C475,88 500,88 515,98 C528,108 535,125 530,140 C525,152 512,160 498,158 C485,156 472,150 460,142 C448,135 440,125 440,112 C441,102 448,97 455,95 Z" />
          <path d="M475,72 C488,68 502,72 508,82 C512,90 508,100 500,105 C490,110 478,106 472,98 C467,88 468,78 475,72 Z" />
          <path d="M430,105 C438,102 445,108 448,115 C450,122 446,128 438,130 C430,132 423,126 422,118 C422,112 425,107 430,105 Z" />

          {/* Africa */}
          <path d="M455,175 C480,168 510,175 530,198 C548,222 558,258 555,295 C552,332 538,368 518,395 C502,415 478,428 455,432 C432,435 412,425 400,405 C388,385 384,358 388,330 C392,302 398,275 405,248 C412,222 420,198 432,185 C440,177 448,174 455,175 Z" />

          {/* Asia */}
          <path d="M545,115 C585,100 640,92 690,100 C740,108 785,125 820,152 C848,175 862,208 858,242 C855,268 840,290 818,302 C795,314 768,316 745,308 C722,300 704,284 692,264 C682,246 680,228 688,212 C695,198 708,188 720,182 C730,176 735,170 730,160 C725,150 712,142 692,138 C672,134 650,135 630,140 C610,145 590,148 572,144 C555,140 542,132 532,122 C540,118 543,116 545,115 Z" />
          <path d="M700,245 C720,238 742,245 755,265 C768,285 765,312 752,332 C740,348 720,352 705,342 C690,332 684,312 688,290 C692,270 696,250 700,245 Z" />
          <path d="M845,175 C858,170 872,175 878,188 C882,198 878,210 868,216 C856,222 844,216 838,205 C834,194 838,182 845,175 Z" />
          <path d="M875,155 C885,152 895,158 898,168 C900,176 895,184 886,188 C876,190 868,184 865,175 C864,166 868,158 875,155 Z" />

          {/* Australia */}
          <path d="M800,330 C835,322 870,330 890,355 C910,380 915,415 902,442 C890,465 862,478 832,476 C802,474 778,458 768,432 C758,406 762,375 778,352 C788,338 795,332 800,330 Z" />

          {/* Southeast Asia islands */}
          <path d="M785,295 C795,292 805,298 808,308 C810,316 805,324 796,326 C786,328 778,322 776,312 C776,304 780,298 785,295 Z" />
          <path d="M815,300 C825,298 832,304 835,312 C836,320 830,326 822,326 C814,326 808,320 808,312 C809,306 812,302 815,300 Z" />
        </g>

        {/* Connection lines radiating from hub */}
        {connections.map(([from, to], i) => {
          const p1 = getPoint(from);
          const p2 = getPoint(to);
          const midX = (p1.x + p2.x) / 2 + (Math.sin(i * 1.3) * 35);
          const midY = (p1.y + p2.y) / 2 + (Math.cos(i * 1.1) * 35);
          return (
            <motion.path
              key={i}
              d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.12, 0.6, 0.12] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: i * 0.12 }}
            />
          );
        })}

        {/* Central hub pulse */}
        <circle cx={hub.x} cy={hub.y} r="22" fill="rgba(255,26,26,0.08)" className="animate-pulse-red" />
        <circle cx={hub.x} cy={hub.y} r="8" fill="#ff1a1a" filter="url(#glow)" />
        <circle cx={hub.x} cy={hub.y} r="3" fill="#fff" />

        {/* Anomaly points */}
        {anomalies.map((a) => (
          <g
            key={a.id}
            onMouseEnter={() => setHovered(a.id)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <circle cx={a.x} cy={a.y} r="16" fill="rgba(255,26,26,0.06)" className="animate-pulse-red" />
            <circle cx={a.x} cy={a.y} r="6" fill="#ff1a1a" filter="url(#glow)" />
            <circle cx={a.x} cy={a.y} r="2.5" fill="#fff" />
          </g>
        ))}

        {/* Tooltip */}
        {hovered && (
          <foreignObject
            x={Math.min(Math.max(mousePos.x + 14, 8), 760)}
            y={Math.min(Math.max(mousePos.y + 14, 8), 390)}
            width="220"
            height="90"
          >
            <div className="terminal-box rounded-sm p-3 text-xs">
              <div className="mb-1 text-[10px] text-red-500">
                {anomalies.find((a) => a.id === hovered)?.city}
              </div>
              <div className="font-bold text-white">
                DETECTION: {anomalies.find((a) => a.id === hovered)?.class}
              </div>
              <div className="mt-1 text-neutral-400">
                TIME: {anomalies.find((a) => a.id === hovered)?.time}
              </div>
            </div>
          </foreignObject>
        )}
      </svg>

      <div className="absolute bottom-3 right-4 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        <span className="font-mono text-[10px] text-neutral-400">LIVE // UPDATING</span>
      </div>
    </div>
  );
}
