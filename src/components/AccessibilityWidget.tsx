"use client";

import { useState, useEffect } from "react";
import { Settings, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSizeRatio, setFontSizeRatio] = useState(1);

  // Apply font size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSizeRatio * 100}%`;
  }, [fontSizeRatio]);

  const handleIncreaseText = () => setFontSizeRatio((prev) => Math.min(prev + 0.1, 1.5));
  const handleDecreaseText = () => setFontSizeRatio((prev) => Math.max(prev - 0.1, 0.8));
  const handleReset = () => {
    setFontSizeRatio(1);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-ngo-card border border-ngo-border shadow-2xl rounded-2xl p-4 w-64 mb-2"
            role="dialog"
            aria-label="Accessibility Settings"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-ngo-primary">Accessibility</h2>
              <button
                onClick={handleReset}
                className="text-sm text-ngo-secondary hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 rounded"
                aria-label="Reset settings"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-ngo-muted">Text Size</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleDecreaseText}
                    className="flex-1 flex justify-center items-center py-2 bg-ngo-stone hover:bg-ngo-secondary-subtle text-ngo-primary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50"
                    aria-label="Decrease text size"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    onClick={handleIncreaseText}
                    className="flex-1 flex justify-center items-center py-2 bg-ngo-stone hover:bg-ngo-secondary-subtle text-ngo-primary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50"
                    aria-label="Increase text size"
                  >
                    <ZoomIn size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-ngo-primary hover:bg-ngo-primary-light text-ngo-cream p-3 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ngo-secondary/50 focus:ring-offset-2"
        aria-label="Toggle accessibility menu"
        aria-expanded={isOpen}
      >
        <Settings size={24} />
      </button>
    </div>
  );
}
