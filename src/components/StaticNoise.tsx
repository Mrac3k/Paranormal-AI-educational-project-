import { useEffect, useRef } from "react";

export function StaticNoise({ opacity = 0.06 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    let animationId: number;
    let isActive = true;
    let frameSkip = 0;

    const resize = () => {
      // Render at half resolution for performance, stretch via CSS
      canvas.width = Math.max(1, Math.floor(window.innerWidth / 2));
      canvas.height = Math.max(1, Math.floor(window.innerHeight / 2));
    };

    const render = () => {
      if (!isActive) return;
      frameSkip++;
      // Limit to ~20fps to save battery on mobile
      if (frameSkip % 3 !== 0) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        const r = Math.random();
        if (r < 0.05) {
          buffer32[i] = 0xffffffff;
        } else if (r < 0.08) {
          buffer32[i] = 0xff1a1a1a;
        }
      }

      ctx.putImageData(idata, 0, 0);
      animationId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      style={{ opacity, mixBlendMode: "overlay", imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
