import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import { TimerMode, TimerState } from "../../types/types";
import { ChatBubble } from "./ChatBubble";
import PotatoSprite from "./PotatoAnimate";

type PotatoAreaProps = {
  quote: { text: string };
  mood: "happy" | "angry" | "sleepy" | "chaotic" | "cool";
  state: TimerState;
  health: number;
  fetchWisdom: (mode: TimerMode, state: TimerState, health: number) => void;
  mode: TimerMode;
};

export const PotatoArea: React.FC<PotatoAreaProps> = ({
  quote,
  mood,
  state,
  health,
  fetchWisdom,
  mode,
}) => {
  const bounce = useRef(new Animated.Value(0)).current;

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

  const bounceY = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View className="relative h-72 w-full flex-col items-center justify-end pb-4">
      {/* Chat bubble pinned to top */}
      <View className="absolute top-0 w-full z-20">
        <ChatBubble text={quote.text} visible={true} />
      </View>

      {/* Potato + click area */}
      <Pressable
        onPress={() => fetchWisdom(mode, state, health)}
        className="z-10 active:scale-105"
        hitSlop={10}
      >
        <PotatoSprite />
        {/* <Animated.View
          style={
            state === TimerState.COMPLETED
              ? { transform: [{ translateY: bounceY }] }
              : undefined
          }
        >
          <Potato
            mood={mood}
            isAnimating={state === TimerState.RUNNING}
            health={health}
          />
        </Animated.View> */}
      </Pressable>
    </View>
  );
};
