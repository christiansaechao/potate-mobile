import { useTheme } from "@/hooks/useTheme";
import { Image, Volume2, VolumeX } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { ThemedPressable } from "../themed-pressable";
import { ThemedText } from "../themed-text";

type HeaderProps = {
  isSound: boolean;
  toggleSound: () => void;
  openThemes: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  isSound,
  toggleSound,
  openThemes,
}) => {
  const { colors } = useTheme();

  return (
    <View className="w-full max-w-md flex-row justify-between items-center z-20">
      <ThemedText className="text-2xl font-bold tracking-wider">
        POTATODORO
      </ThemedText>

      <View className="flex-row gap-2">
        <ThemedPressable
          onPress={openThemes}
          className="p-2 bg-white/20 rounded-full active:opacity-70"
          hitSlop={8}
        >
          <Image size={18} color={colors.buttonIconColor} />
        </ThemedPressable>

        <ThemedPressable
          onPress={toggleSound}
          className="p-2 bg-white/20 rounded-full active:opacity-70"
          hitSlop={8}
        >
          {isSound ? (
            <Volume2 size={18} color={colors.buttonIconColor} />
          ) : (
            <VolumeX size={18} color={colors.buttonIconColor} />
          )}
        </ThemedPressable>
      </View>
    </View>
  );
};
