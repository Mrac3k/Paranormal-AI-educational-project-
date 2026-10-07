import { useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [hover, setHover] = useState(false);

  return (
    <span
      className={`glitch inline-block ${className} ${hover ? "animate-[glitch_0.3s_ease-in-out]" : ""}`}
      data-text={text}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onAnimationEnd={() => setHover(false)}
    >
      {text}
    </span>
  );
}
