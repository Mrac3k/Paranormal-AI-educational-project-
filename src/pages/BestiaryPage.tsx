import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Lock, Camera, Cpu, UnlockIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StaticNoise } from "../components/StaticNoise";
import { Header } from "../components/Header";
import { BestiaryCard } from "../components/BestiaryCard";
import { CreatureModal } from "../components/CreatureModal";
import { creatures, categories, dangerLabels } from "../data/bestiary";
import type { Category, Creature, DangerLevel } from "../data/bestiary";

export function BestiaryPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [search, setSearch] = useState("");
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [dangerFilter, setDangerFilter] = useState<DangerLevel | "ALL">("ALL");

  // Periodic glitch effect every ~10 seconds on grid container
  useEffect(() => {
    const grid = document.getElementById("bestiary-grid");
    const interval = setInterval(() => {
      grid?.classList.add("grid-glitching");
      setTimeout(() => grid?.classList.remove("grid-glitching"), 400);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    return creatures.filter((c) => {
      const matchesCategory = activeCategory === "ALL" || c.entityClass.includes(activeCategory);
      const matchesDanger = dangerFilter === "ALL" || c.dangerLevel === dangerFilter;
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.includes(search) ||
        c.tagline.toLowerCase().includes(search.toLowerCase()) ||
        c.quote.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesDanger && matchesSearch;
    });
  }, [activeCategory, search, dangerFilter]);

  const stats = {
    total: creatures.length,
    unlocked: creatures.filter((c) => c.unlocked).length,
    locked: creatures.filter((c) => !c.unlocked).length,
    omega: creatures.filter((c) => c.dangerLevel === "Ω").length,
  };

  const unlockedCount = creatures.filter((c) => c.unlocked).length;
  const lockedCount = creatures.length - unlockedCount;

  return (
    <div className="relative min-h-screen bg-black">
      <StaticNoise opacity={0.05} />
      <Header />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-28">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 font-terminal text-sm text-neutral-400 transition-colors hover:text-red-500"
        >
          <ArrowLeft className="h-4 w-4" /> RETURN_TO_MAINFRAME
        </button>

        {/* Header Panel */}
        <div className="retro-window mb-6">
          <div className="retro-window-header flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-cooper text-2xl uppercase tracking-wide text-white sm:text-3xl">
                PARANORMAL ARCHIVE
              </h1>
              <div className="font-terminal text-sm text-red-500">[DATABASE v.0.9.4]</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-sm border border-green-900/50 bg-green-950/20 px-3 py-1.5">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                <span className="font-terminal text-xs text-green-500">CONNECTED</span>
              </div>
              <div className="flex items-center gap-2 rounded-sm border border-red-900/50 bg-red-950/20 px-3 py-1.5">
                <Lock className="h-3.5 w-3.5 text-red-500" />
                <span className="font-terminal text-xs text-red-500">ENCRYPTED</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-terminal text-lg text-red-500">
                {`>`}
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ENTER ENTITY NAME..."
                className="w-full border border-neutral-800 bg-black py-3 pl-8 pr-4 font-terminal text-lg text-white placeholder-neutral-700 focus:border-red-500 focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="retro-window p-3 text-center">
            <div className="font-terminal text-xs text-neutral-500">TOTAL RECORDS</div>
            <div className="font-cooper text-2xl text-white">{stats.total}</div>
          </div>
          <div className="retro-window p-3 text-center">
            <div className="font-terminal text-xs text-green-500">UNLOCKED</div>
            <div className="font-cooper text-2xl text-green-500">{stats.unlocked}</div>
          </div>
          <div className="retro-window p-3 text-center">
            <div className="font-terminal text-xs text-red-500">LOCKED</div>
            <div className="font-cooper text-2xl text-red-500">{stats.locked}</div>
          </div>
          <div className="retro-window p-3 text-center">
            <div className="font-terminal text-xs text-purple-500">CLASS Ω</div>
            <div className="font-cooper text-2xl text-purple-500">{stats.omega}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="retro-window mb-6">
          <div className="retro-window-header">
            <span className="font-terminal text-xs text-neutral-400">FILTER PROTOCOLS</span>
          </div>
          <div className="p-4">
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`retro-toggle px-3 py-2 text-sm ${activeCategory === cat.id ? "active" : ""}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between font-terminal text-xs text-neutral-500">
                <span>DANGER LEVEL</span>
                <span>{dangerFilter === "ALL" ? "ALL LEVELS" : `${dangerFilter} — ${dangerLabels[dangerFilter].label}`}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setDangerFilter("ALL")}
                  className={`retro-toggle px-3 py-1.5 text-xs ${dangerFilter === "ALL" ? "active" : ""}`}
                >
                  ALL
                </button>
                {(["I", "II", "III", "IV", "V", "Ω"] as DangerLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDangerFilter(level)}
                    className={`retro-toggle px-3 py-1.5 text-xs ${dangerFilter === level ? "active" : ""}`}
                    style={dangerFilter === level ? { backgroundColor: dangerLabels[level].color, borderColor: dangerLabels[level].color } : {}}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How Data is Collected */}
        <div className="retro-window mb-6">
          <div className="retro-window-header">
            <span className="font-terminal text-xs text-amber-500">LIVE ARCHIVE PROTOCOL</span>
          </div>
          <div className="p-4">
            <p className="mb-4 font-terminal text-lg leading-relaxed text-neutral-300">
              «Бестиарий не готов. Он заполняется вами. Каждая запись — результат полевого исследования.
              Чем больше вы снимаете, тем полнее становится база знаний.»
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3 rounded-sm border border-neutral-800 bg-black/50 p-3">
                <Camera className="h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <div className="font-terminal text-sm text-white">01. DETECTION</div>
                  <div className="font-terminal text-xs text-neutral-500">Камера фиксирует аномалию</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-sm border border-neutral-800 bg-black/50 p-3">
                <Cpu className="h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <div className="font-terminal text-sm text-white">02. ANALYSIS</div>
                  <div className="font-terminal text-xs text-neutral-500">ИИ обрабатывает данные</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-sm border border-neutral-800 bg-black/50 p-3">
                <UnlockIcon className="h-5 w-5 shrink-0 text-green-500" />
                <div>
                  <div className="font-terminal text-sm text-white">03. UNLOCK</div>
                  <div className="font-terminal text-xs text-neutral-500">Карточка заполняется в профиле</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                id="bestiary-grid"
                layout
                key="grid"
                className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3"
                style={{ position: "relative" }}
              >
                {filtered.map((creature) => (
                  <BestiaryCard
                    key={creature.id}
                    creature={creature}
                    onClick={() => setSelectedCreature(creature)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                <div className="font-terminal text-lg text-neutral-500">NO RECORDS FOUND</div>
                <button
                  onClick={() => {
                    setActiveCategory("ALL");
                    setDangerFilter("ALL");
                    setSearch("");
                  }}
                  className="mt-3 font-terminal text-sm text-red-500 hover:underline"
                >
                  RESET_FILTERS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-10 retro-window p-6 text-center">
          <div className="mb-2 font-terminal text-lg text-neutral-400">
            В базе данных содержится {creatures.length}+ записей. Доступно только {unlockedCount}. Заблокировано: {lockedCount}.
          </div>
          <button
            onClick={() => navigate("/?pricing")}
            className="btn-red mb-3 px-8 py-4 text-sm tracking-widest"
          >
            ПОЛУЧИТЬ ПОЛНЫЙ ДОСТУП
          </button>
          <div className="font-terminal text-xs text-neutral-600">
            Требуется подписка Investigator или Keeper.
          </div>
        </div>
      </div>

      <CreatureModal
        creature={selectedCreature}
        isOpen={!!selectedCreature}
        onClose={() => setSelectedCreature(null)}
        onUnlock={() => {
          navigate("/?pricing");
        }}
      />
    </div>
  );
}
