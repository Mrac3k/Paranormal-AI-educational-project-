import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Scan, AlertTriangle, Camera, Power } from "lucide-react";
import { StaticNoise } from "../components/StaticNoise";
import { Header } from "../components/Header";
import { SimulatedCamera } from "../components/SimulatedCamera";
import { creatures } from "../data/bestiary";
import type { Creature } from "../data/bestiary";

export function DemoPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState<Creature | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
      setError("");
      addLog("Камера активирована. Ожидание сигнала...");
    } catch (err) {
      setError("Доступ к камере запрещён. Используется симуляция сенсоров.");
      setCameraOn(true);
      addLog("Симуляция сенсоров запущена.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
    setDetected(null);
    addLog("Камера отключена.");
  };

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [msg, ...prev].slice(0, 6));
  }, []);

  const runScan = () => {
    if (!cameraOn) return;
    setScanning(true);
    setDetected(null);
    addLog("Сканирование окружения...");

    setTimeout(() => {
      const found = creatures[Math.floor(Math.random() * creatures.length)];
      setDetected(found);
      setScanning(false);
      addLog(`ОБНАРУЖЕНО: ${found.name} [${found.dangerLevel}]`);
    }, 2000);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // HUD overlay animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Crosshair
      ctx.strokeStyle = "rgba(255, 26, 26, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w / 2, 20);
      ctx.lineTo(w / 2, h - 20);
      ctx.moveTo(20, h / 2);
      ctx.lineTo(w - 20, h / 2);
      ctx.stroke();

      // Corners
      ctx.strokeStyle = "rgba(255, 26, 26, 0.6)";
      const corner = 24;
      ctx.beginPath();
      ctx.moveTo(12, 12 + corner);
      ctx.lineTo(12, 12);
      ctx.lineTo(12 + corner, 12);
      ctx.moveTo(w - 12, 12 + corner);
      ctx.lineTo(w - 12, 12);
      ctx.lineTo(w - 12 - corner, 12);
      ctx.moveTo(12, h - 12 - corner);
      ctx.lineTo(12, h - 12);
      ctx.lineTo(12 + corner, h - 12);
      ctx.moveTo(w - 12, h - 12 - corner);
      ctx.lineTo(w - 12, h - 12);
      ctx.lineTo(w - 12 - corner, h - 12);
      ctx.stroke();

      // Scanning box
      if (scanning) {
        const t = Date.now() / 1000;
        const y = ((t * 100) % (h - 40)) + 20;
        ctx.fillStyle = "rgba(255, 26, 26, 0.1)";
        ctx.fillRect(20, y - 2, w - 40, 4);
        ctx.strokeStyle = "rgba(255, 26, 26, 0.6)";
        ctx.strokeRect(w / 2 - 60, h / 2 - 60, 120, 120);
      }

      // Detection box
      if (detected && !scanning) {
        ctx.strokeStyle = "#ff1a1a";
        ctx.lineWidth = 2;
        ctx.strokeRect(w / 2 - 80, h / 2 - 100, 160, 200);
        ctx.fillStyle = "#ff1a1a";
        ctx.font = "12px 'Space Mono', monospace";
        ctx.fillText(`ANOMALY: ${detected.name.toUpperCase()}`, w / 2 - 75, h / 2 - 110);
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [scanning, detected]);

  return (
    <div className="relative min-h-screen bg-[#050505]">
      <StaticNoise opacity={0.04} />
      <Header />

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-28">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 font-mono text-xs text-neutral-400 transition-colors hover:text-red-500"
        >
          <ArrowLeft className="h-4 w-4" /> НАЗАД К ЛЕНДИНГУ
        </button>

        <div className="mb-8">
          <div className="label-mono mb-2">DEMO // P-AI CAMERA</div>
          <h1 className="font-serif text-4xl font-bold uppercase text-white md:text-6xl">
            Попробуй протокол в деле
          </h1>
          <p className="mt-3 max-w-2xl font-mono text-sm text-neutral-400">
            Активируй камеру и запусти сканирование. Симулятор покажет, как ИИ выделяет аномалии в
            реальном времени.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-red-900/30 bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 h-full w-full object-cover ${cameraOn ? "opacity-60" : "opacity-0"}`}
              />
              {!cameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center">
                    <Camera className="mx-auto mb-3 h-12 w-12 text-red-900" />
                    <p className="font-mono text-sm text-neutral-500">Камера не активна</p>
                  </div>
                </div>
              )}
              {cameraOn && error && <SimulatedCamera />}
              <canvas
                ref={canvasRef}
                width={640}
                height={360}
                className="absolute inset-0 h-full w-full"
              />

              {error && (
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-sm bg-red-950/80 px-3 py-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="font-mono text-[10px] text-red-200">{error}</span>
                </div>
              )}

              <div className="absolute right-4 top-4 font-mono text-xs text-red-500">
                {cameraOn ? "LIVE" : "OFFLINE"}
              </div>

              {scanning && (
                <div className="absolute bottom-4 left-4 animate-pulse font-mono text-xs text-red-500">
                  SCANNING...
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {!cameraOn ? (
                <button onClick={startCamera} className="btn-red flex items-center gap-2 px-6 py-3 text-xs">
                  <Power className="h-4 w-4" /> ВКЛЮЧИТЬ КАМЕРУ
                </button>
              ) : (
                <>
                  <button
                    onClick={runScan}
                    disabled={scanning}
                    className="btn-red flex items-center gap-2 px-6 py-3 text-xs disabled:opacity-50"
                  >
                    <Scan className="h-4 w-4" /> {scanning ? "СКАНИРОВАНИЕ..." : "СКАНИРОВАТЬ"}
                  </button>
                  <button onClick={stopCamera} className="btn-outline px-6 py-3 text-xs">
                    ОТКЛЮЧИТЬ
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="terminal-box rounded-sm p-4">
              <div className="label-mono mb-3">СИСТЕМНЫЙ ЛОГ</div>
              <div className="space-y-2">
                {log.length === 0 && (
                  <div className="font-mono text-xs text-neutral-600">Ожидание активации...</div>
                )}
                {log.map((entry, i) => (
                  <div key={i} className="border-l-2 border-red-900/30 pl-2 font-mono text-xs text-neutral-400">
                    {entry}
                  </div>
                ))}
              </div>
            </div>

            {detected && (
              <div className="terminal-box rounded-sm border-red-600/40 p-4">
                <div className="label-mono mb-2">ОБНАРУЖЕНА УГРОЗА</div>
                <div className="mb-1 font-serif text-xl font-bold text-white">{detected.name}</div>
                <div className="mb-3 font-mono text-xs text-red-400">{detected.dangerLevel}</div>
                <p className="mb-4 font-mono text-xs leading-relaxed text-neutral-400">
                  {detected.tagline}
                </p>
                <button
                  onClick={() => navigate("/bestiary")}
                  className="btn-outline w-full py-2 text-[10px]"
                >
                  ОТКРЫТЬ В БЕСТИАРИИ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
