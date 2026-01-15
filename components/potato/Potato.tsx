import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Image } from "react-native";
import { FallBackPotato } from "./FallBackPotato";

// --- Types ---

interface PotatoProps {
  mood: "happy" | "angry" | "sleepy" | "chaotic" | "cool";
  isAnimating: boolean; // still accepted, but no longer gates animation
  health: number; // 0-100
}

export const Potato: React.FC<PotatoProps> = ({ health }) => {
  // --- State & Hooks ---

  const [imgError, setImgError] = useState(false);

  // --- Constants & Assets ---

  // Base Images
  const Loaded = require("../../assets/images/Baked_Potate.gif");
  const Regular = require("../../assets/images/basic1.gif");
  const Rotting = require("../../assets/images/default_stinky_animation-trans.gif");
  const Bad = require("../../assets/images/4.png");

  // Animated Videos/GIFS
  // const LoadedAnim = require("../../app/assets/videos/potato.gif"); // Unused currently?

  // --- Animation Refs ---

  const breathe = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;

  // --- Derived State ---

  // Determine image based on health
  const imageSource = useMemo(() => {
    if (health >= 99) return Loaded;
    if (health >= 80) return Regular;
    if (health >= 40) return Rotting;
    return Bad;
  }, [health, Loaded, Regular, Rotting, Bad]);

  // --- Effects ---

  useEffect(() => setImgError(false), [imageSource]);

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

  // --- Interpolations ---

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

  return (
    <Animated.View className="w-40 h-40">
      {!imgError && (
        <Image
          key={String(imageSource)}
          source={imageSource}
          onError={() => setImgError(true)}
          style={{
            width: 170,
            height: 170,
            transform: [{ translateX: -16 }, { translateY: 11 }],
          }}
        />
      )}
    </Animated.View>
  );
};
