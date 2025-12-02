import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Dimensions } from "react-native";

interface Particle {
  id: number;
  x: number;      // px
  y: number;      // px
  color: string;
  rotation: number;
  scale: number;
  speedX: number; // px per frame-ish
  speedY: number; // px per frame-ish
}

export const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const { width, height } = Dimensions.get("window");
    const colors = ["#FFD700", "#FF6347", "#00BFFF", "#32CD32", "#FF69B4"];

    // spawn
    const initial: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      initial.push({
        id: i,
        x: width / 2,
        y: height / 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        speedX: (Math.random() - 0.5) * 8,      // horizontal spread
        speedY: (Math.random() - 1.2) * 10,     // upward burst
      });
    }
    setParticles(initial);

    let last = Date.now();

    const tick = () => {
      const now = Date.now();
      const dt = Math.min(2, (now - last) / 16); // normalize to ~60fps steps
      last = now;

      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.speedX * dt,
            y: p.y + p.speedY * dt,
            rotation: p.rotation + 10 * dt,
            speedY: p.speedY + 0.35 * dt, // gravity
          }))
          .filter(p => p.y < height + 60) // remove if off bottom
      );

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <View className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map(p => (
        <Animated.View
          key={p.id}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: 12,
            height: 12,
            backgroundColor: p.color,
            borderRadius: 2,
            transform: [
              { rotate: `${p.rotation}deg` },
              { scale: p.scale },
            ],
          }}
        />
      ))}
    </View>
  );
};
