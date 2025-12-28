import { useTheme } from "@/hooks/useTheme";
import { PickerProps } from "@/types/settings.types";
import { Pressable, View } from "react-native";
import { Colors } from "../../constants/theme";
import { CustomText } from "../custom";
import { GenericDropdown } from "./GenericDropdown";

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
  const { theme } = useTheme();

  const color = Colors[theme];
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
        className="transition-colors duration-300"
      >
        <View
          style={{ backgroundColor: color.text }}
          className="p-2 rounded-full transition-colors duration-200"
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
