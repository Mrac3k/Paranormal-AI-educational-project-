import { useEffect, useRef } from "react";

export function SimulatedCamera() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const draw = () => {
      t += 0.02;
      const w = canvas.width;
      const h = canvas.height;

      // Dark background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      // Noise
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.03) {
          const val = Math.random() * 40;
          data[i] = val;
          data[i + 1] = 0;
          data[i + 2] = 0;
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      // Pulsing silhouette
      const cx = w / 2;
      const cy = h / 2 + Math.sin(t) * 10;
      const scale = 0.6 + Math.sin(t * 0.7) * 0.05;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.fillStyle = "rgba(255, 26, 26, 0.15)";
      ctx.beginPath();
      ctx.moveTo(0, -80);
      ctx.bezierCurveTo(40, -80, 60, -40, 50, 0);
      ctx.bezierCurveTo(70, 20, 70, 80, 30, 120);
      ctx.lineTo(-30, 120);
      ctx.bezierCurveTo(-70, 80, -70, 20, -50, 0);
      ctx.bezierCurveTo(-60, -40, -40, -80, 0, -80);
      ctx.fill();
      ctx.restore();

      // Scanlines
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={360}
      className="absolute inset-0 h-full w-full"
    />
  );
}
