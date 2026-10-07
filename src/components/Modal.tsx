import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`terminal-box relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-sm p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-500 transition-colors hover:text-red-500"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {title && (
          <div className="mb-6 border-b border-red-900/30 pb-3">
            <h3 className="font-serif text-2xl font-bold text-white">{title}</h3>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
