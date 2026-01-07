import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function AnimatedScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- Hooks ---

  const isFocused = useIsFocused();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  // --- Effects ---

  useEffect(() => {
    if (isFocused) {
      opacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      });

      translateY.value = withTiming(0, {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [isFocused]);

  // --- Styles ---

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  // --- Render ---

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
