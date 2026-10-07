import { Check, Lock } from "lucide-react";

interface PricingCardProps {
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
  onCtaClick?: () => void;
}

export function PricingCard({
  tier,
  price,
  period,
  description,
  features,
  highlighted = false,
  badge,
  cta,
  onCtaClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-sm border p-6 transition-all duration-300 ${
        highlighted
          ? "border-red-600 bg-red-950/15 shadow-[0_0_40px_rgba(255,26,26,0.15)]"
          : "border-red-900/30 bg-black/50 hover:border-red-700/50"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black">
          {badge}
        </div>
      )}

      <div className="mb-4 flex items-center gap-2">
        <Lock className="h-4 w-4 text-red-500" />
        <span className="label-mono">{tier}</span>
      </div>

      <div className="mb-2 font-serif text-4xl font-bold text-white">{price}</div>
      {period && <div className="mb-4 text-xs text-neutral-500">{period}</div>}

      <p className="mb-6 text-sm leading-relaxed text-neutral-400">{description}</p>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCtaClick}
        className={`w-full py-3 text-sm uppercase tracking-widest ${
          highlighted ? "btn-red" : "btn-outline"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
