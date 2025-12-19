import { PickerProps } from "@/types/settings.types";
import { Pressable, View } from "react-native";
import { CustomText } from "../custom";
import { GenericDropdown } from "./GenericDropdown";

import { useTheme } from "@/hooks/useTheme";
import { THEMES } from "@/constants/constants";
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
  const { theme, mode } = useTheme();
  const backgroundColor = THEMES[theme][mode];
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
        className={`${backgroundColor}`}
      >
        {icon}
        <CustomText
          style={{
            fontSize: 18,
            lineHeight: 22,
          }}
        >
          {label}
        </CustomText>
      </View>

      <GenericDropdown
        state={state}
        setState={setState}
        options={options}
      />
    </Pressable>
  );
};
