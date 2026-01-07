import React from "react";
import { Text, View } from "react-native";
import { SquishyButton } from "../ui/SquishyButton";

import { THEMES } from "../../constants/constants";
import { AppTheme } from "../../types/types";
import { CustomText } from "../custom";

// --- Types ---

interface ThemeSelectorProps {
  currentTheme: AppTheme;
  onSelect: (theme: AppTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelect,
}) => {
  // --- Constants ---

  const themeKeys = Object.keys(THEMES) as AppTheme[];

  // --- Render ---

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
            <SquishyButton
              key={t}
              onPress={() => onSelect(t)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: isActive ? "white" : "rgba(0,0,0,0.2)",
              }}
            >
              <Text
                className={`text-xs font-bold uppercase ${
                  isActive ? "text-black" : "text-white"
                }`}
              >
                {t}
              </Text>
            </SquishyButton>
          );
        })}
      </View>
    </View>
  );
};
