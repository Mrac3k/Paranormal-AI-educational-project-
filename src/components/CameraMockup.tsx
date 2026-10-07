import { motion } from "framer-motion";

export function CameraMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Device body */}
      <div className="relative rounded-lg border border-neutral-700 bg-neutral-900 p-3 shadow-2xl">
        {/* Top bar */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] text-neutral-400">P-AI v2.1 // RECORDING</span>
          </div>
          <div className="font-mono text-[10px] text-red-500">LIVE</div>
        </div>

        {/* Screen */}
        <div className="relative aspect-video overflow-hidden rounded-sm bg-black">
          {/* HUD overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,26,26,0.08),transparent_70%)]" />

          {/* Crosshair */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 180">
            <line x1="160" y1="20" x2="160" y2="160" stroke="rgba(255,26,26,0.3)" strokeWidth="0.5" />
            <line x1="80" y1="90" x2="240" y2="90" stroke="rgba(255,26,26,0.3)" strokeWidth="0.5" />
            <circle cx="160" cy="90" r="40" fill="none" stroke="rgba(255,26,26,0.4)" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="160" cy="90" r="4" fill="#ff1a1a" className="animate-pulse" />
          </svg>

          {/* Target info */}
          <div className="absolute left-3 top-3 font-mono text-[10px] leading-tight text-red-400">
            <div>TARGET: UNKNOWN</div>
            <div>CONFIDENCE: 94.7%</div>
            <div>CLASS: SHADOW</div>
          </div>

          <div className="absolute bottom-3 right-3 font-mono text-[10px] text-neutral-500">
            ISO 6400 | 1/15s | f/1.8
          </div>

          {/* Detection box */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-20 w-16 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-red-500/60"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute -top-4 left-0 bg-red-600 px-1 font-mono text-[8px] text-black">ANOMALY</div>
          </motion.div>
        </div>

        {/* Bottom controls */}
        <div className="mt-3 flex items-center justify-between">
          <div className="h-8 w-8 rounded-full border border-neutral-600 bg-neutral-800" />
          <div className="font-mono text-[10px] text-neutral-500">AI PROCESSING ACTIVE</div>
          <div className="flex gap-1">
            <div className="h-2 w-6 bg-red-600" />
            <div className="h-2 w-6 bg-red-900" />
          </div>
        </div>
      </div>

      {/* Decorative reflection */}
      <div className="absolute -bottom-4 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-[50%] bg-red-600/10 blur-xl" />
    </div>
  );
}
