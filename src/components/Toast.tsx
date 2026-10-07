import { useEffect } from "react";
import { X, AlertCircle, CheckCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-4 w-4 text-green-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  info: <Info className="h-4 w-4 text-blue-400" />,
};

export function Toast({ message, type = "info", onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="terminal-box pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-sm p-4 shadow-[0_0_30px_rgba(255,26,26,0.15)]">
      {icons[type]}
      <div className="flex-1">
        <p className="font-mono text-sm text-neutral-200">{message}</p>
      </div>
      <button onClick={onClose} className="text-neutral-500 hover:text-white">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, removeToast }: { toasts: { id: string; message: string; type: ToastType }[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-[300] flex flex-col gap-3 p-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}
