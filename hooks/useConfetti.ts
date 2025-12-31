import { useState, useEffect, useRef } from "react";

export const useConfetti = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerConfetti = () => {
    // restart if already showing
    setShowConfetti(false);

    requestAnimationFrame(() => {
      setShowConfetti(true);

      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
      confettiTimerRef.current = setTimeout(() => {
        setShowConfetti(false);
        confettiTimerRef.current = null;
      }, 1500); // duration you want
    });
  };

  useEffect(() => {
    return () => {
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
    };
  }, []);

  return { showConfetti, triggerConfetti };
};
