import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, View } from "react-native";

import { TimerMode, TimerState } from "../../types/types";
import { ChatBubble } from "./ChatBubble";
import { Potato } from "./Potato";

// --- Types ---

type PotatoAreaProps = {
  quote: { text: string };
  mood: "happy" | "angry" | "sleepy" | "chaotic" | "cool"; // currently unused by PotatoSprite but kept for API
  state: TimerState;
  health: number; // currently unused by PotatoSprite but kept for API
  fetchWisdom: (mode: TimerMode, state: TimerState, health: number) => void;
  mode: TimerMode;
};

export const PotatoArea: React.FC<PotatoAreaProps> = ({
  quote,
  state,
  health,
  fetchWisdom,
  mode,
}) => {
  // --- Refs ---

  const bounce = useRef(new Animated.Value(0)).current;

  // --- Effects ---

  useEffect(() => {
    bounce.setValue(0);

    if (state !== TimerState.COMPLETED) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [state, bounce]);

  // --- Interpolations ---

  const bounceY = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  // --- Render ---

  return (
    <View className="relative w-full flex-col items-center justify-end">
      {/* Chat bubble pinned to top */}
      <View className="w-full">
        <ChatBubble text={quote.text} visible={true} />
      </View>

      {/* Potato + click area */}
      <Pressable
        onPress={() => fetchWisdom(mode, state, health)}
        className="z-10 active:scale-105"
        hitSlop={10}
      >
        <Potato health={health} />
      </Pressable>
    </View>
  );
};
