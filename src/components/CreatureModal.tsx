import { Modal } from "./Modal";
import { classLabels, dangerLabels } from "../data/bestiary";
import type { Creature, DangerLevel } from "../data/bestiary";
import { Skull, Target, Shield, Eye, Activity, Lock } from "lucide-react";

interface CreatureModalProps {
  creature: Creature | null;
  isOpen: boolean;
  onClose: () => void;
  onUnlock?: () => void;
}

export function CreatureModal({ creature, isOpen, onClose, onUnlock }: CreatureModalProps) {
  if (!creature) return null;

  const dangerInfo = dangerLabels[creature.dangerLevel];

  if (!creature.unlocked) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="ACCESS DENIED" maxWidth="max-w-md">
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-600 bg-red-950/20">
            <Lock className="h-8 w-8 text-red-500" />
          </div>
          <h4 className="mb-2 font-cooper text-2xl font-bold text-white">ENTITY #{creature.code}</h4>
          <p className="mb-2 font-terminal text-lg text-red-500">CLASSIFIED</p>
          <p className="mb-6 font-terminal text-sm text-neutral-400">
            Данная запись защищена протоколом безопасности. Для просмотра требуется подписка
            Investigator или выше.
          </p>
          <button onClick={onUnlock} className="btn-red w-full py-3 text-sm tracking-widest">
            РАЗБЛОКИРОВАТЬ ДОСТУП
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ENTITY FILE // UNLOCKED" maxWidth="max-w-2xl">
      <div className="space-y-5">
        <div className="retro-window-header mb-4 -mt-2 -mx-6 flex items-center justify-between">
          <span className="font-terminal text-sm text-green-500">● CONNECTED // ENCRYPTED</span>
          <span className="font-terminal text-xs text-neutral-500">{creature.code}.DAT</span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border-2" style={{ borderColor: dangerInfo.color }}>
            <Skull className="h-10 w-10" style={{ color: dangerInfo.color }} />
          </div>
          <div className="flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              {creature.entityClass.map((cls) => (
                <span
                  key={cls}
                  className="rounded-sm border px-2 py-0.5 font-terminal text-xs"
                  style={{ borderColor: dangerInfo.color, color: dangerInfo.color }}
                >
                  {classLabels[cls].icon} CLASS {cls}
                </span>
              ))}
            </div>
            <h2 className="font-cooper text-3xl font-bold uppercase text-white">{creature.name}</h2>
            <div className="font-terminal text-lg italic text-neutral-500">{creature.tagline}</div>
            <div className="mt-2 font-terminal text-base" style={{ color: dangerInfo.color }}>
              «{creature.quote}»
            </div>
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between font-terminal text-sm">
            <span className="text-neutral-500">DANGER METER</span>
            <span style={{ color: dangerInfo.color }}>
              {creature.dangerLevel} — {dangerInfo.label}
            </span>
          </div>
          <DangerMeter level={creature.dangerLevel} />
        </div>

        <div className="rounded-sm border border-neutral-800 bg-black/50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Eye className="h-4 w-4 text-red-500" />
            <span className="font-terminal text-xs text-red-500">FILE CONTENTS</span>
          </div>
          <p className="font-terminal text-lg leading-relaxed text-neutral-300">{creature.lore}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-neutral-800 bg-black/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-amber-500" />
              <span className="font-terminal text-xs text-amber-500">FIRST SIGNS</span>
            </div>
            <ul className="space-y-1">
              {creature.firstSigns.map((sign, i) => (
                <li key={i} className="flex gap-2 font-terminal text-base text-neutral-400">
                  <span className="text-red-500">{String(i + 1).padStart(2, "0")}.</span>
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-neutral-800 bg-black/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="font-terminal text-xs text-green-500">WEAKNESSES</span>
            </div>
            <ul className="space-y-1">
              {creature.weaknesses.map((weakness, i) => (
                <li key={i} className="flex gap-2 font-terminal text-base text-neutral-400">
                  <span className="text-red-500">+</span>
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-sm border border-neutral-800 bg-black/50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-red-500" />
            <span className="font-terminal text-xs text-red-500">KNOWN VARIANTS</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {creature.variants.map((variant, i) => (
              <div key={i} className="border border-neutral-800 bg-black p-3">
                <div className="mb-1 font-cooper text-sm font-bold text-white">{variant.name}</div>
                <div className="font-terminal text-sm leading-relaxed text-neutral-500">
                  {variant.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
          <div className="font-terminal text-sm text-neutral-500">
            LAST DETECTED: <span className="text-white">{creature.lastDetected}</span>
          </div>
          <div className="font-terminal text-sm text-neutral-500">
            DETECTIONS: <span style={{ color: dangerInfo.color }}>{creature.detectionCount.toLocaleString("ru")}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function DangerMeter({ level }: { level: DangerLevel }) {
  const levels: DangerLevel[] = ["I", "II", "III", "IV", "V", "Ω"];
  const activeIndex = levels.indexOf(level);

  return (
    <div className="flex gap-1">
      {levels.map((l, i) => {
        const info = dangerLabels[l];
        const isActive = i <= activeIndex;
        return (
          <div key={l} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`danger-segment w-full rounded-sm ${isActive ? "active" : ""}`}
              style={{
                height: "16px",
                backgroundColor: isActive ? info.color : "#1a1a1a",
                boxShadow: isActive ? `0 0 12px ${info.color}` : "none",
                opacity: isActive ? 1 : 0.3,
              }}
            />
            <span className="font-terminal text-[10px]" style={{ color: isActive ? info.color : "#444" }}>
              {l}
            </span>
          </div>
        );
      })}
    </div>
  );
}
