import React from "react";
import { Pressable, View } from "react-native";

import { useTheme } from "@/hooks/context-hooks/useTheme";
import { PickerProps } from "@/types/settings.types";
import { Colors } from "../../constants/theme";
import { CustomText } from "../custom";
import { GenericDropdown } from "./GenericDropdown";

// --- Types ---

interface RowProps<T> extends PickerProps<T> {
  icon: React.ReactNode;
  label: string;
}

export const Row = <T,>({
  icon,
  label,
  state,
  options,
  setState,
}: RowProps<T>) => {
  // --- Hooks ---

  const { theme } = useTheme();

  // --- Constants ---

  const color = Colors[theme];

  // --- Render ---

  return (
    <Pressable
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          marginBottom: 10,
        }}
      >
        <View
          style={{ backgroundColor: color.text }}
          className="p-2 rounded-full"
        >
          {icon}
        </View>
        <CustomText
          style={{
            fontSize: 18,
            lineHeight: 36,
            textAlignVertical: "center",
          }}
        >
          {label}
        </CustomText>
      </View>

      <GenericDropdown state={state} setState={setState} options={options} />
    </Pressable>
  );
};
