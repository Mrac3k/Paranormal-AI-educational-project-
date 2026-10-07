import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  BookOpen,
  Shield,
  Zap,
  Radio,
  Cpu,
  ChevronRight,
  AlertTriangle,
  RefreshCw,
  Lock,
  Share2,
  MessageCircle,
  Globe,
} from "lucide-react";
import { StaticNoise } from "../components/StaticNoise";
import { TypewriterText } from "../components/TypewriterText";
import { GlitchText } from "../components/GlitchText";
import { WorldMap } from "../components/WorldMap";
import { PricingCard } from "../components/PricingCard";
import { TestimonialLog } from "../components/TestimonialLog";
import { CameraMockup } from "../components/CameraMockup";
import { SkullLogo } from "../components/SkullLogo";
import { Header } from "../components/Header";
import type { ToastType } from "../components/Toast";

interface LandingPageProps {
  onOpenOrder: (tier?: string) => void;
  onToast: (message: string, type?: ToastType) => void;
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="label-mono mb-3">{label}</div>
      <h2 className="max-w-3xl font-serif text-3xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export function LandingPage({ onOpenOrder, onToast }: LandingPageProps) {
  const navigate = useNavigate();
  const [typewriterDone, setTypewriterDone] = useState(false);

  const handleDemo = () => {
    onToast("Запуск DEMO-протокола...", "info");
    setTimeout(() => navigate("/demo"), 400);
  };

  const handleBestiary = () => {
    onToast("Открытие Цифрового Бестиария", "info");
    setTimeout(() => navigate("/bestiary"), 300);
  };

  return (
    <div className="relative min-h-screen bg-[#050505]">
      <StaticNoise opacity={0.055} />
      <Header />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-8">
        <div className="crt-vignette pointer-events-none absolute inset-0 z-10" />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[15%] z-0 h-[45vh] w-auto -translate-x-1/2 opacity-30 sm:top-[18%] sm:h-[50vh] md:top-1/4 md:h-[55vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 2 }}
        >
          <svg viewBox="0 0 120 220" className="h-full w-auto text-red-700" preserveAspectRatio="xMidYMid meet">
            <path
              d="M60 10 C45 10 35 22 35 38 C35 48 40 56 48 61 L48 70 C48 70 30 78 25 95 C20 112 18 145 20 170 C22 190 28 210 28 210 L42 210 L42 160 C42 160 50 155 60 155 C70 155 78 160 78 160 L78 210 L92 210 C92 210 98 190 100 170 C102 145 100 112 95 95 C90 78 72 70 72 70 L72 61 C80 56 85 48 85 38 C85 22 75 10 60 10 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        <div className="relative z-20 mx-auto w-full max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-3 sm:mb-4 font-mono text-[10px] tracking-[0.2em] text-red-500 sm:text-xs"
          >
            SYSTEM INITIALIZED // ANOMALY DETECTED
          </motion.div>

          <h1 className="animate-flicker mb-4 sm:mb-6 font-serif text-5xl font-black uppercase tracking-wider text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            <span className="block">
              <GlitchText text="PARANORMAL" />
            </span>
            <span className="block text-red-500">
              <GlitchText text="AI" />
            </span>
          </h1>

          <div className="mx-auto mb-6 sm:mb-8 max-w-xl px-2 font-mono text-sm leading-relaxed text-neutral-300 sm:text-base md:max-w-2xl">
            {typewriterDone ? (
              <>
                Увидь невидимое. Докажи невозможное.
                <br className="hidden sm:block" />
                Первая экосистема поиска аномалий на базе ИИ.
              </>
            ) : (
              <TypewriterText
                text="Увидь невидимое. Докажи невозможное. Первая экосистема поиска аномалий на базе ИИ."
                speed={35}
                onComplete={() => setTypewriterDone(true)}
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col items-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => onOpenOrder("Investigator")}
              className="btn-red w-full max-w-xs px-6 py-3 text-xs tracking-widest sm:w-auto sm:px-8 sm:py-4 sm:text-sm md:text-base"
            >
              ПОДКЛЮЧИТЬСЯ К СЕТИ
            </button>
            <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Уже 10,000+ исследователей в сети
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 sm:bottom-8"
        >
          <div className="flex flex-col items-center gap-1 sm:gap-2 font-mono text-[10px] text-neutral-600">
            <span>SCROLL FOR DATA</span>
            <ChevronRight className="h-4 w-4 rotate-90 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading label="ПРОБЛЕМА // AGITATION" title="Аналоговые инструменты больше не видят сигнал" />
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <FadeIn delay={0.1}>
              <div className="terminal-box h-full rounded-sm p-8">
                <div className="mb-6 flex items-center gap-3">
                  <Radio className="h-6 w-6 text-neutral-500" />
                  <h3 className="font-serif text-2xl font-bold text-neutral-500">ДО</h3>
                </div>
                <ul className="space-y-4 font-mono text-sm text-neutral-500">
                  <li className="flex gap-3">
                    <span className="text-red-900">✕</span>
                    Детекторы ЭМП срабатывают на бытовую технику
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-900">✕</span>
                    Диктофоны записывают каждый шорох как «голос»
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-900">✕</span>
                    Данные невозможно верифицировать и сравнить
                  </li>
                </ul>
                <div className="mt-8 h-24 w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#1a1a1a_2px,#1a1a1a_4px)] opacity-60" />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="terminal-box h-full rounded-sm border-red-600/40 p-8">
                <div className="mb-6 flex items-center gap-3">
                  <Cpu className="h-6 w-6 text-red-500" />
                  <h3 className="font-serif text-2xl font-bold text-white">ПОСЛЕ</h3>
                </div>
                <ul className="space-y-4 font-mono text-sm text-neutral-300">
                  <li className="flex gap-3">
                    <span className="text-red-500">✓</span>
                    ИИ фильтрует 97% ложных срабатываний
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500">✓</span>
                    Computer Vision фиксирует паттерны вне видимого спектра
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500">✓</span>
                    Каждое событие сверяется с глобальной базой данных
                  </li>
                </ul>
                <div className="mt-8 h-24 w-full rounded-sm bg-gradient-to-r from-red-900/20 via-red-600/20 to-red-900/20" />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <p className="mx-auto mt-12 max-w-3xl text-center font-mono text-base leading-relaxed text-neutral-400 md:text-lg">
              Вы ищете призраков в аналоговом мире, пока они прячутся в цифровом шуме.
              <span className="text-red-500"> Paranormal AI</span> переводит охоту на новый уровень — с
              машинным зрением, нейросетевой фильтрацией и закрытой сетью свидетелей.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading label="РЕШЕНИЕ // PRODUCT" title="Первое устройство, которое видит то, что скрыто" />
          </FadeIn>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn delay={0.1}>
              <CameraMockup />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <button
                  onClick={handleBestiary}
                  className="group flex w-full gap-5 text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-red-900/50 bg-red-950/20 transition-colors group-hover:border-red-500/50">
                    <Eye className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-serif text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                      COMPUTER VISION
                    </h3>
                    <p className="font-mono text-sm leading-relaxed text-neutral-400">
                      Алгоритмы на базе нейросети анализируют каждый кадр в реальном времени, отсекая шум и
                      выделяя только аномальные паттерны.
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleBestiary}
                  className="group flex w-full gap-5 text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-red-900/50 bg-red-950/20 transition-colors group-hover:border-red-500/50">
                    <BookOpen className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-serif text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                      DIGITAL BESTIARY
                    </h3>
                    <p className="font-mono text-sm leading-relaxed text-neutral-400">
                      Цифровой Бестиарий с классификацией сущностей. Обновляется по мере поступления новых
                      данных из полевых исследований. Нажми, чтобы открыть.
                    </p>
                  </div>
                </button>

                <div className="group flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-red-900/50 bg-red-950/20 transition-colors group-hover:border-red-500/50">
                    <Shield className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-serif text-xl font-bold text-white">SECURE COMMUNITY</h3>
                    <p className="font-mono text-sm leading-relaxed text-neutral-400">
                      Закрытый протокол обмена данными. Только верифицированные участники сети получают доступ
                      к сырым материалам и координатам.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDemo}
                  className="flex w-full items-center gap-3 rounded-sm border border-red-900/30 bg-red-950/10 p-4 text-left transition-colors hover:border-red-600/40"
                >
                  <Zap className="h-5 w-5 text-red-500" />
                  <span className="font-mono text-sm text-neutral-300">
                    <strong className="text-white">Plug & Play.</strong> Включил камеру — получил доступ.
                    Попробуй DEMO прямо сейчас.
                  </span>
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* LIVE MAP */}
      <section id="map" className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading label="СЕТЬ // LIVE MAP" title="GLOBAL DETECTION NETWORK" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <WorldMap />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row">
              <p className="max-w-xl text-center font-mono text-sm text-neutral-400 md:text-left">
                Красные точки — места последних зафиксированных аномалий. Линии связи показывают активность
                исследователей в режиме реального времени.
              </p>
              <button
                onClick={() => onToast("Лента детекций доступна для подписчиков", "info")}
                className="btn-outline px-6 py-3 text-xs"
              >
                СМОТРЕТЬ ЛЕНТУ В РЕАЛЬНОМ ВРЕМЕНИ
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="label-mono mb-3">УРОВНИ ДОСТУПА // PRICING</div>
              <h2 className="mx-auto max-w-3xl font-serif text-3xl font-bold uppercase text-white md:text-5xl">
                Выбери свой уровень допуска
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            <FadeIn delay={0.1}>
              <PricingCard
                tier="Observer"
                price="$9"
                period="/ месяц"
                description="Только программный доступ. Для тех, кто хочет наблюдать за сетью и изучать архивы."
                features={[
                  "Доступ к карте аномалий",
                  "Базовый ИИ-анализ фото",
                  "Чтение общего бестиария",
                  "Еженедельный дайджест",
                ]}
                cta="АКТИВИРОВАТЬ"
                onCtaClick={() => onOpenOrder("Observer")}
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <PricingCard
                tier="Investigator"
                price="$199"
                period="+ $19 / месяц"
                description="Полевой комплект: камера P-AI + полная подписка. Для активных исследователей."
                features={[
                  "Камера Paranormal AI v2",
                  "Полный доступ к сети",
                  "Распознавание классов сущностей",
                  "Приоритетная загрузка данных",
                  "Закрытый комьюнити-канал",
                ]}
                highlighted
                badge="Выбор большинства"
                cta="ОФОРМИТЬ ПРЕДЗАКАЗ"
                onCtaClick={() => onOpenOrder("Investigator")}
              />
            </FadeIn>

            <FadeIn delay={0.3}>
              <PricingCard
                tier="Keeper"
                price="$499"
                period="+ $39 / месяц"
                description="VIP-доступ для архивариусов и лидеров локальных отрядов."
                features={[
                  "Всё из Investigator",
                  "Персональная поддержка 24/7",
                  "Эксклюзивный мерч",
                  "Ранний доступ к новым главам Бестиария",
                  "Возможность верификации чужих находок",
                ]}
                cta="ПОДАТЬ ЗАЯВКУ"
                onCtaClick={() => onOpenOrder("Keeper")}
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-10 text-center font-mono text-xs text-neutral-500">
              <RefreshCw className="mb-1 inline h-3 w-3" /> Все тарифы включают обновления платформы.
              Отмена подписки в любой момент.
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="logs" className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading label="ЛОГИ // SOCIAL PROOF" title="Расшифровки из полевых отрядов" />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            <FadeIn delay={0.1}>
              <TestimonialLog
                logNumber="402"
                user="Алексей В."
                role="Профессиональный паранормальный исследователь"
                content="Камера зафиксировала сущность класса Тень на заброшенном заводе. ИИ распознал паттерн движения, который мы раньше списывали на блики. Теперь у нас есть объективные данные."
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <TestimonialLog
                logNumber="718"
                user="Марина К."
                role="Любитель хорроров и ночных эфиров"
                content="Сначала купила ради атмосферы. Но когда система сама выделила фигуру за спиной во время стрима — я больше не сплю с выключенным светом. Это работает."
              />
            </FadeIn>

            <FadeIn delay={0.3}>
              <TestimonialLog
                logNumber="856"
                user="Джордан Т."
                role="Коллекционер оккультных девайсов"
                content="В коллекции десятки гаджетов: от детекторов ЭМП до термометров. Paranormal AI — единственный, который даёт не цифры, а интерпретацию. Бестиарий стал моей новой одержимостью."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="relative overflow-hidden border-t border-red-900/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="crt-vignette pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <SkullLogo className="mx-auto mb-8 h-32 w-32 text-red-600" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mb-4 font-mono text-xs tracking-[0.3em] text-red-500">
              <AlertTriangle className="mb-2 inline h-4 w-4" /> SYSTEM WARNING
            </div>
            <h2 className="mb-6 font-serif text-3xl font-bold uppercase text-white md:text-5xl">
              Игнорирование предупреждения не отменит контакт
            </h2>
            <p className="mx-auto mb-10 max-w-xl font-mono text-sm text-neutral-400">
              Хэллоуин близко. Камеры расходятся партиями. Подключись к сети до того, как количество
              предзаказов ограничит доступ.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => onOpenOrder("Investigator")}
                className="btn-red px-8 py-4 text-sm tracking-widest"
              >
                ОФОРМИТЬ ПРЕДЗАКАЗ
              </button>
              <button onClick={handleDemo} className="btn-outline px-8 py-4 text-sm tracking-widest">
                ПОПРОБОВАТЬ DEMO
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-red-900/20 pt-8 font-mono text-[10px] text-neutral-500">
              <span className="flex items-center gap-2">
                <Lock className="h-3 w-3" /> Гарантия возврата 14 дней
              </span>
              <span>SSL-шифрование платежей</span>
              <span>Доставка по всему миру</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-red-900/20 pt-8 md:flex-row">
              <div className="font-serif text-lg font-black tracking-widest text-white">
                PARANORMAL <span className="text-red-500">AI</span>
              </div>

              <div className="flex gap-6">
                <button
                  onClick={() => onToast("Ссылка скопирована", "success")}
                  className="text-neutral-500 transition-colors hover:text-red-500"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onToast("Канал поддержки открыт", "info")}
                  className="text-neutral-500 transition-colors hover:text-red-500"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onToast("Переключение региона", "info")}
                  className="text-neutral-500 transition-colors hover:text-red-500"
                >
                  <Globe className="h-5 w-5" />
                </button>
              </div>

              <div className="flex gap-4 font-mono text-[10px] text-neutral-600">
                <button onClick={() => onToast("Политика конфиденциальности", "info")} className="hover:text-red-500">
                  Политика конфиденциальности
                </button>
                <button onClick={() => onToast("Условия использования", "info")} className="hover:text-red-500">
                  Условия использования
                </button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-8 font-mono text-[10px] text-neutral-700">
              © 2026 PARANORMAL AI. Все протоколы защищены.
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
