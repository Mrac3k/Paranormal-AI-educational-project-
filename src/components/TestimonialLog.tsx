interface TestimonialLogProps {
  logNumber: string;
  user: string;
  role: string;
  content: string;
}

export function TestimonialLog({ logNumber, user, role, content }: TestimonialLogProps) {
  return (
    <div className="terminal-box relative rounded-sm p-6">
      <div className="absolute -top-3 left-4 bg-black px-2 font-mono text-[10px] text-red-500">
        LOG #{logNumber} // ENCRYPTED
      </div>
      <div className="mb-4 flex items-center justify-between border-b border-red-900/20 pb-3">
        <div>
          <div className="font-serif text-lg font-bold text-white">{user}</div>
          <div className="text-xs text-neutral-500">{role}</div>
        </div>
        <div className="font-mono text-[10px] text-red-500/70">VERIFIED</div>
      </div>
      <p className="font-mono text-sm leading-relaxed text-neutral-300">{content}</p>
    </div>
  );
}
