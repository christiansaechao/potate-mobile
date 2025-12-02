import { Image, Volume2, VolumeX } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type HeaderProps = {
  isSound: boolean;
  toggleSound: () => void;
  openThemes: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  isSound,
  toggleSound,
  openThemes,
}) => (
  <View className="w-full max-w-md flex-row justify-between items-center z-20">
    <Text className="text-2xl font-black text-white tracking-wider">
      POTATODORO
    </Text>

    <View className="flex-row gap-2">
      <Pressable
        onPress={openThemes}
        className="p-2 bg-white/20 rounded-full active:opacity-70"
        hitSlop={8}
      >
        <Image size={18} color="white" />
      </Pressable>

      <Pressable
        onPress={toggleSound}
        className="p-2 bg-white/20 rounded-full active:opacity-70"
        hitSlop={8}
      >
        {isSound ? (
          <Volume2 size={18} color="white" />
        ) : (
          <VolumeX size={18} color="white" />
        )}
      </Pressable>
    </View>
  </View>
);
