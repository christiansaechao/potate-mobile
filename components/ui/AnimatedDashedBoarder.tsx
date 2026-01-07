import React, { useEffect, useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Rect } from "react-native-svg";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { COLORS } from "@/constants/theme";
import { useTheme } from "@/hooks/context-hooks/useTheme";

// --- Constants & Types ---

const AnimatedRect = Animated.createAnimatedComponent(Rect);

type AnimatedDashedBorderProps = {
  children: React.ReactNode;
  padding?: number;
  radius?: number;
  strokeWidth?: number;
  dash?: number;
  gap?: number;
  duration?: number;
};

export default function AnimatedDashedBorder({
  children,
  padding = 16,
  radius = 14,
  strokeWidth = 4,
  dash = 10,
  gap = 8,
  duration = 900,
}: AnimatedDashedBorderProps) {
  // --- State & Hooks ---

  const [size, setSize] = useState({ width: 0, height: 0 });
  const dashOffset = useSharedValue(0);
  const { theme } = useTheme();

  // --- Derived State ---

  const dashCycle = dash + gap;
  const strokeColor = COLORS[theme].text;

  // --- Effects ---

  useEffect(() => {
    dashOffset.value = withRepeat(
      withTiming(dashCycle, { duration, easing: Easing.linear }),
      -1,
      false
    );
  }, [dashCycle, duration, dashOffset]);

  // --- Animations ---

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  // --- Handlers ---

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  // --- Render ---

  return (
    <View onLayout={onLayout} style={{ position: "relative" }}>
      {/* Content */}
      <View style={{ padding }}>{children}</View>

      {/* Animated border */}
      {size.width > 0 && size.height > 0 && (
        <Svg
          pointerEvents="none"
          width={size.width}
          height={size.height}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <AnimatedRect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={size.width - strokeWidth}
            height={size.height - strokeWidth}
            rx={radius}
            ry={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${gap}`}
            animatedProps={animatedProps}
          />
        </Svg>
      )}
    </View>
  );
}
