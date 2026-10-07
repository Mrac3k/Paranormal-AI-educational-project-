import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LandingPage } from "./pages/LandingPage";
import { BestiaryPage } from "./pages/BestiaryPage";
import { DemoPage } from "./pages/DemoPage";
import { Header } from "./components/Header";
import { OrderModal } from "./components/OrderModal";
import { ToastContainer } from "./components/Toast";
import { useToast } from "./hooks/useToast";
import { useGlobalClickSound } from "./hooks/useGlobalClickSound";
import type { ToastType } from "./components/Toast";

function AppContent() {
  const location = useLocation();
  const { toasts, addToast, removeToast } = useToast();
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderTier, setOrderTier] = useState("Investigator");

  useGlobalClickSound();

  useEffect(() => {
    document.body.classList.add("scanlines");
    return () => document.body.classList.remove("scanlines");
  }, []);

  const openOrder = (tier = "Investigator") => {
    setOrderTier(tier);
    setOrderOpen(true);
  };

  const handleToast = (message: string, type: ToastType = "info") => {
    addToast(message, type);
  };

  return (
    <>
      <Header onConnect={() => openOrder("Investigator")} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LandingPage onOpenOrder={openOrder} onToast={handleToast} />
              </motion.div>
            }
          />
          <Route
            path="/bestiary"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BestiaryPage />
              </motion.div>
            }
          />
          <Route
            path="/demo"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DemoPage />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} defaultTier={orderTier} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

export default function App() {
  return <AppContent />;
}
