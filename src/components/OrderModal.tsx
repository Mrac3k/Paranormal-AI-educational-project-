import { useState } from "react";
import { Modal } from "./Modal";
import { Check, Lock, CreditCard, Truck } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: string;
}

export function OrderModal({ isOpen, onClose, defaultTier = "Investigator" }: OrderModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [tier, setTier] = useState(defaultTier);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setEmail("");
      setLoading(false);
    }, 300);
  };

  const prices: Record<string, string> = {
    Observer: "$9/мес",
    Investigator: "$199 + $19/мес",
    Keeper: "$499 + $39/мес",
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="АКТИВАЦИЯ ДОСТУПА" maxWidth="max-w-md">
      {step === "form" ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-mono mb-2 block">УРОВЕНЬ ДОСТУПА</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full border border-red-900/50 bg-black p-3 font-mono text-sm text-white focus:border-red-500 focus:outline-none"
            >
              <option value="Observer">Observer — $9/мес</option>
              <option value="Investigator">Investigator — $199 + $19/мес</option>
              <option value="Keeper">Keeper — $499 + $39/мес</option>
            </select>
          </div>

          <div>
            <label className="label-mono mb-2 block">EMAIL ОПЕРАТОРА</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@paranormal.ai"
              className="w-full border border-red-900/50 bg-black p-3 font-mono text-sm text-white placeholder-neutral-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="rounded-sm border border-red-900/30 bg-red-950/10 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-400">Выбрано:</span>
              <span className="font-mono text-sm font-bold text-white">{tier}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-400">Стоимость:</span>
              <span className="font-mono text-lg font-bold text-red-500">{prices[tier]}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500">
              <CreditCard className="h-3 w-3" /> Безопасная оплата через шифрованный канал
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500">
              <Truck className="h-3 w-3" /> Доставка устройства от 5 рабочих дней
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500">
              <Lock className="h-3 w-3" /> Доступ к сети активируется мгновенно
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-red w-full py-4 text-sm tracking-widest disabled:opacity-50"
          >
            {loading ? "ОБРАБОТКА..." : "ОФОРМИТЬ ПРЕДЗАКАЗ"}
          </button>
        </form>
      ) : (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20">
            <Check className="h-8 w-8 text-red-500" />
          </div>
          <h4 className="mb-2 font-serif text-2xl font-bold text-white">ДОСТУП ПОДТВЕРЖДЁН</h4>
          <p className="mb-6 font-mono text-sm text-neutral-400">
            На {email} отправлены инструкции по активации. Добро пожаловать в сеть, оператор.
          </p>
          <button onClick={handleClose} className="btn-outline px-6 py-3 text-xs">
            ВЕРНУТЬСЯ НА САЙТ
          </button>
        </div>
      )}
    </Modal>
  );
}
