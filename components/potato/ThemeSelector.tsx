import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import { THEMES } from "../../constants/constants";
import { AppTheme } from "../../types/types";

interface ThemeSelectorProps {
  visible: boolean;
  currentTheme: AppTheme;
  onSelect: (theme: AppTheme) => void;
  onClose: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  visible,
  currentTheme,
  onSelect,
  onClose,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    if (!visible) return;

    opacity.setValue(0);
    translateY.setValue(-10);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, opacity, translateY]);

  if (!visible) return null;

  const themeKeys = Object.keys(THEMES) as AppTheme[];

  return (
    <Pressable
      onPress={onClose}
      className="absolute top-0 left-0 w-full h-full z-50"
    >
      <Animated.View
        className="absolute top-0 left-0 w-full bg-black/40 p-4 rounded-2xl border border-white/10"
        style={{
          opacity,
          transform: [{ translateY }],
        }}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <Text className="text-white text-xs font-bold mb-3 text-center uppercase tracking-widest">
            Theme
          </Text>

          {/* Theme Grid */}
          <View className="flex-row justify-around flex-wrap gap-2">
            {themeKeys.map((t) => {
              const isActive = currentTheme === t;

              return (
                <Pressable
                  key={t}
                  onPress={() => {
                    onSelect(t);
                    onClose();
                  }}
                  className={`px-3 py-2 rounded-xl ${
                    isActive ? "bg-white scale-110" : "bg-black/20"
                  } active:opacity-80`}
                  hitSlop={6}
                >
                  <Text
                    className={`text-xs font-bold uppercase ${
                      isActive ? "text-black" : "text-white"
                    }`}
                  >
                    {t}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Close Button */}
          <View className="items-center mt-4">
            <Pressable
              onPress={onClose}
              className="px-4 py-1 bg-white/20 border border-white/10 rounded-lg active:opacity-80"
              hitSlop={6}
            >
              <Text className="text-white text-xs">Close</Text>
            </Pressable>
          </View>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
};
