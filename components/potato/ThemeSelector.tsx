import React from "react";
import { Pressable, Text, View } from "react-native";
import { THEMES } from "../../constants/constants";
import { AppTheme } from "../../types/types";
import { CustomText } from "../custom";

interface ThemeSelectorProps {
  currentTheme: AppTheme;
  onSelect: (theme: AppTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelect,
}) => {
  const themeKeys = Object.keys(THEMES) as AppTheme[];

  return (
    <View className="w-full p-4 rounded-2xl">
      <CustomText className="text-2xl font-bold mb-3 text-center uppercase tracking-widest">
        Theme
      </CustomText>

      {/* Theme Grid */}
      <View className="flex-row justify-around flex-wrap gap-2">
        {themeKeys.map((t) => {
          const isActive = currentTheme === t;

          return (
            <Pressable
              key={t}
              onPress={() => onSelect(t)}
              className={`px-3 py-2 rounded-xl ${
                isActive ? "bg-white" : "bg-black/20"
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
    </View>
  );
};
