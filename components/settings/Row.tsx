import { PickerProps } from "@/types/settings.types";
import { Pressable, View } from "react-native";
import { CustomText } from "../custom";
import { GenericDropdown } from "./GenericDropdown";

interface RowProps<T> extends PickerProps<T> {
  icon: React.ReactNode;
  label: string;
  value: string;
  styles: any;
}

export const Row = <T,>({
  icon,
  label,
  styles,
  state,
  options,
  setState,
}: RowProps<T>) => (
  <Pressable style={styles.row}>
    <View style={styles.left}>
      {icon}
      <CustomText style={styles.label}>{label}</CustomText>
    </View>
    <GenericDropdown state={state} setState={setState} options={options} />
  </Pressable>
);
