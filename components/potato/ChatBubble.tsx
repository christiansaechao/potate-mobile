import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, Text, View } from "react-native";

interface ChatBubbleProps {
  text: string;
  visible: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ text, visible }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

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

  if (!visible || !text) return null;

  const scale = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.04],
  });

  return (
    <View className="items-center mb-4">
      <Animated.View
        className="
          relative bg-white border-4 border-gray-800 rounded-2xl
          p-4 max-w-xs items-center
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
          {text}
        </Text>

        {/* Tail outer */}
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

        {/* Tail inner */}
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
      </Animated.View>
    </View>
  );
};
