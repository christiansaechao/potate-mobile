import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Image } from "react-native";
import Svg, { Circle, G, Line, Path, Rect } from "react-native-svg";

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

  const Loaded = require("../../app/assets/images/1.png");
  const Regular = require("../../app/assets/images/2.png");
  const Rotting = require("../../app/assets/images/3.png");
  const Bad = require("../../app/assets/images/4.png");

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

  const renderFallbackPotato = () => {
    const isMad = mood === "angry" || mood === "chaotic" || health < 40;
    const isCool = mood === "cool";

    return (
      <Svg viewBox="0 0 200 200" width="100%" height="100%">
        <Path
          d="M40,120 Q30,180 100,190 Q170,180 160,120 Q170,50 100,40 Q30,50 40,120"
          fill={health < 40 ? "#8D6E63" : "#D7CCC8"}
          stroke="#5D4037"
          strokeWidth={4}
        />
        <Circle cx={60} cy={80} r={3} fill="#A1887F" opacity={0.5} />
        <Circle cx={130} cy={140} r={4} fill="#A1887F" opacity={0.5} />
        <Circle cx={150} cy={90} r={2} fill="#A1887F" opacity={0.5} />

        {/* Face */}
        <G transform="translate(0, 10)">
          {isCool ? (
            <>
              <Rect x={55} y={75} width={40} height={20} rx={5} fill="black" />
              <Rect x={105} y={75} width={40} height={20} rx={5} fill="black" />
              <Line
                x1={95}
                y1={85}
                x2={105}
                y2={85}
                stroke="black"
                strokeWidth={3}
              />
            </>
          ) : (
            <>
              <Circle cx={70} cy={85} r={isMad ? 4 : 6} fill="#3E2723" />
              <Circle cx={130} cy={85} r={isMad ? 4 : 6} fill="#3E2723" />
            </>
          )}

          {/* Mouth */}
          {health < 30 ? (
            <Path
              d="M80,130 Q100,120 120,130"
              fill="none"
              stroke="#3E2723"
              strokeWidth={3}
            />
          ) : isMad ? (
            <Path
              d="M85,135 Q100,125 115,135"
              fill="none"
              stroke="#3E2723"
              strokeWidth={3}
            />
          ) : (
            <Path
              d="M85,125 Q100,140 115,125"
              fill="none"
              stroke="#3E2723"
              strokeWidth={3}
            />
          )}

          {health > 80 && (
            <>
              <Circle cx={60} cy={100} r={5} fill="#FFAB91" opacity={0.6} />
              <Circle cx={140} cy={100} r={5} fill="#FFAB91" opacity={0.6} />
            </>
          )}
        </G>
      </Svg>
    );
  };

  return (
    <Animated.View className="w-40 h-40" style={animatedStyle}>
      {imgError ? (
        renderFallbackPotato()
      ) : (
        <Image
          key={String(imageSource)}
          source={imageSource}
          resizeMode="contain"
          className="w-full h-full"
          onError={() => setImgError(true)}
          style={{
            opacity: health < 40 ? 0.85 : 1,
          }}
        />
      )}
    </Animated.View>
  );
};
