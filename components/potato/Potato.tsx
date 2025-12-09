import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Image } from "react-native";
import { FallBackPotato } from "./FallBackPotato";

interface PotatoProps {
  mood: "happy" | "angry" | "sleepy" | "chaotic" | "cool";
  isAnimating: boolean; // still accepted, but no longer gates animation
  health: number; // 0-100
}

export const Potato: React.FC<PotatoProps> = ({
  mood,
  isAnimating,
  health,
}) => {
  const [imgError, setImgError] = useState(false);

  // Base Images
  const Loaded = require("../../app/assets/images/1.png");
  const Regular = require("../../app/assets/images/2.png");
  const Rotting = require("../../app/assets/images/3.png");
  const Bad = require("../../app/assets/images/4.png");

  // Animated Videos/GIFS
  const LoadedAnim = require("../../app/assets/videos/potato.gif");

  // Determine image based on health
  const imageSource = useMemo(() => {
    if (health >= 90) return Loaded;
    if (health >= 80) return Regular;
    if (health >= 40) return Rotting;
    return Bad;
  }, [health, Loaded, Regular, Rotting, Bad]);

  useEffect(() => setImgError(false), [imageSource]);

  /**
   * Animated values (always running)
   */
  const breathe = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;

  // Start all loops once; never reset; never restart on mood change
  useEffect(() => {
    const breatheLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    const shakeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shake, {
          toValue: 1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: -1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 0,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    breatheLoop.start();
    floatLoop.start();
    shakeLoop.start();

    return () => {
      breatheLoop.stop();
      floatLoop.stop();
      shakeLoop.stop();
    };
  }, [breathe, float, shake]);

  const breatheScale = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const floatY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  const shakeX = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-4, 4],
  });

  // Just pick which running animation to show
  const animatedStyle =
    mood === "chaotic" || mood === "angry"
      ? { transform: [{ translateX: shakeX }] }
      : mood === "happy" || mood === "cool"
        ? { transform: [{ translateY: floatY }] }
        : { transform: [{ scale: breatheScale }] };

  return (
    <Animated.View className="w-40 h-40" style={animatedStyle}>
      {imgError ? (
        <FallBackPotato mood={mood} health={health} />
      ) : (
        <Image
          source={LoadedAnim}
          style={{ width: 150, height: 150 }} // You must specify width and height
        />
      )}
    </Animated.View>
  );
};

// This is the original base image rendering code, keep it here for reference if we decide not to use the animations
// <Image
//   key={String(imageSource)}
//   source={imageSource}
//   resizeMode="contain"
//   className="w-full h-full"
//   onError={() => setImgError(true)}
//   style={{
//     opacity: health < 40 ? 0.85 : 1,
//   }}
// />
