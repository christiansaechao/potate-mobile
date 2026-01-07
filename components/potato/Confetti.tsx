import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions } from "react-native";

// --- Types ---

type ConfettiParticle = {
  id: number;
  color: string;
  scale: number;
  pos: Animated.ValueXY;
  rotation: Animated.Value;
};

export const Confetti: React.FC = () => {
  // --- Constants ---

  const { width, height } = Dimensions.get("window");
  const colors = ["#FFD700", "#FF6347", "#00BFFF", "#32CD32", "#FF69B4"];

  // --- Refs ---

  const particles = useRef<ConfettiParticle[]>(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: Math.random() * 0.6 + 0.4,
      pos: new Animated.ValueXY({ x: width / 2, y: height / 2 }),
      rotation: new Animated.Value(0),
    }))
  ).current;

  // --- Effects ---

  useEffect(() => {
    const animations = particles.map((p) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 220 + 120;

      const burstX = Math.cos(angle) * radius;
      const burstY = Math.sin(angle) * radius;

      const driftX = burstX * 0.4; // more sideways drift = more natural
      const fallY = height + 900;

      return Animated.parallel([
        Animated.sequence([
          Animated.timing(p.pos, {
            toValue: { x: width / 2 + burstX, y: height / 2 + burstY },
            duration: 550,
            useNativeDriver: true,
          }),
          Animated.timing(p.pos, {
            toValue: { x: width / 2 + burstX + driftX, y: fallY },
            duration: 1700,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(p.rotation, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.stagger(6, animations).start();
  }, []);

  // --- Render ---

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
      }}
    >
      {particles.map((p) => {
        const rotate = p.rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "720deg"],
        });

        return (
          <Animated.View
            key={p.id}
            style={{
              position: "absolute",
              width: 12,
              height: 12,
              backgroundColor: p.color,
              borderRadius: 3,
              transform: [
                { translateX: p.pos.x },
                { translateY: p.pos.y },
                { rotate },
                { scale: p.scale },
              ],
            }}
          />
        );
      })}
    </View>
  );
};
