import React, { useState, useEffect, useRef } from "react";
import { Animated, Easing, Platform, Text, View } from "react-native";

// --- Types ---

interface ChatBubbleProps {
  text: string;
  visible: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ text, visible }) => {
  // --- State & Refs ---

  const bounceAnim = useRef(new Animated.Value(0)).current;
  const [displayed, setDisplayed] = useState("");
  const [showTail, setShowTail] = useState(false);

  // --- Effects ---

  useEffect(() => {
    let i = 0;
    setDisplayed(""); // reset when new text comes in

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));

      if (i === 30) setShowTail(true);

      if (i >= text.length) clearInterval(interval);
    }, 40);

    return () => {
      setShowTail(false);
      clearInterval(interval);
    };
  }, [text]);

  useEffect(() => {
    if (!visible || !text) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 450,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [visible, text, bounceAnim]);

  // --- Render ---

  if (!visible || !text) return null;

  const scale = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.04],
  });

  return (
    <View className="items-center">
      <Animated.View
        className="
          relative bg-white border-2 border-gray-800 rounded-2xl
          p-4 items-center
        "
        style={{
          transform: [{ scale }],
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOpacity: 0.8,
              shadowRadius: 0,
              shadowOffset: { width: 4, height: 4 },
            },
            android: { elevation: 6 },
          }),
        }}
      >
        <Text
          style={{ fontFamily: "Baloo" }}
          className="text-gray-800 font-bold text-center text-lg leading-snug"
        >
          {displayed}
        </Text>
        {showTail && (
          <>
            <View
              style={{
                position: "absolute",
                bottom: -15,
                left: "50%",
                marginLeft: -10,
                width: 0,
                height: 0,
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderTopWidth: 15,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderTopColor: "#1F2937", // gray-800
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: -11,
                left: "50%",
                marginLeft: -6,
                width: 0,
                height: 0,
                borderLeftWidth: 6,
                borderRightWidth: 6,
                borderTopWidth: 11,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderTopColor: "#FFFFFF",
              }}
            />
          </>
        )}
      </Animated.View>
    </View>
  );
};
