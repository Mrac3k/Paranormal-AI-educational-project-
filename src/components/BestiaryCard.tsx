import { motion } from "framer-motion";
import { Lock, Eye, AlertTriangle, HelpCircle } from "lucide-react";
import { classLabels, dangerLabels } from "../data/bestiary";
import type { Creature } from "../data/bestiary";

interface BestiaryCardProps {
  creature: Creature;
  onClick: () => void;
}

export function BestiaryCard({ creature, onClick }: BestiaryCardProps) {
  if (!creature.unlocked) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={onClick}
        className="entity-card-locked magnetic-border flex h-full min-h-[240px] flex-col rounded-sm p-4 transition-all cursor-pointer"
      >
        <div className="mb-3 flex items-center justify-between border-b border-red-900/20 pb-2">
          <div className="font-terminal text-lg text-red-500/50">ENTITY #{creature.code}</div>
          <Lock className="h-4 w-4 text-red-500/50" />
        </div>

        <div className="mb-4 flex flex-1 items-center justify-center">
          <div className="relative h-24 w-20 overflow-hidden rounded-sm bg-black">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#1a1a1a_2px,#1a1a1a_4px)] opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <HelpCircle className="h-10 w-10 text-red-900/40" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-red-900/20 blur-[2px]" />
          <div className="h-3 w-1/2 rounded bg-red-900/10 blur-[1px]" />
          <div className="h-3 w-2/3 rounded bg-red-900/10 blur-[1px]" />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-red-900/20 pt-3">
          <span className="font-terminal text-xs text-red-500/60">CLASSIFIED</span>
          <span className="font-terminal text-xs text-red-500/60">???</span>
        </div>
      </motion.div>
    );
  }

  const dangerInfo = dangerLabels[creature.dangerLevel];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="magnetic-border retro-window flex h-full min-h-[280px] cursor-pointer flex-col rounded-sm border border-neutral-800 bg-[#050505] transition-colors hover:border-red-600/40"
    >
      <div className="retro-window-header flex items-center justify-between">
        <span className="font-terminal text-sm text-red-500">#{creature.code}</span>
        <div className="flex items-center gap-2">
          <span className="font-terminal text-xs text-neutral-500">{creature.lastDetected}</span>
          <Eye className="h-3.5 w-3.5 text-green-500" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="font-cooper text-xl font-bold uppercase text-white">{creature.name}</h3>
            <div className="font-terminal text-sm text-neutral-500">{creature.tagline}</div>
          </div>
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
            style={{ borderColor: dangerInfo.color, color: dangerInfo.color }}
          >
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-1">
          {creature.entityClass.map((cls) => {
            const clsInfo = classLabels[cls];
            return (
              <span
                key={cls}
                className="border border-neutral-700 bg-black px-2 py-0.5 font-terminal text-xs text-neutral-300"
              >
                {clsInfo.icon} {cls}
              </span>
            );
          })}
        </div>

        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between font-terminal text-xs">
            <span className="text-neutral-500">DANGER LEVEL</span>
            <span style={{ color: dangerInfo.color }}>{creature.dangerLevel}</span>
          </div>
          <DangerMeter level={creature.dangerLevel} compact />
        </div>

        <p className="mb-4 font-terminal text-base leading-tight text-neutral-400">
          «{creature.quote}»
        </p>

        <button className="btn-red mt-auto w-full py-2 text-xs tracking-widest">
          VIEW FULL FILE
        </button>
      </div>
    </motion.div>
  );
}

function DangerMeter({ level, compact = false }: { level: import("../data/bestiary").DangerLevel; compact?: boolean }) {
  const levels: import("../data/bestiary").DangerLevel[] = ["I", "II", "III", "IV", "V", "Ω"];
  const activeIndex = levels.indexOf(level);

  return (
    <div className="flex gap-0.5">
      {levels.map((l, i) => {
        const info = dangerLabels[l];
        const isActive = i <= activeIndex;
        return (
          <div
            key={l}
            className={`danger-segment flex-1 rounded-sm ${isActive ? "active" : ""}`}
            style={{
              height: compact ? "6px" : "12px",
              backgroundColor: isActive ? info.color : "#1a1a1a",
              boxShadow: isActive ? `0 0 8px ${info.color}` : "none",
              opacity: isActive ? 1 : 0.3,
            }}
          />
        );
      })}
    </div>
  );
}
