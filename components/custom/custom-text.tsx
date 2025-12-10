import { Text, type TextProps } from "react-native";
import { Colors } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";

export function CustomText({ className, ...rest }: TextProps) {
  const { theme } = useTheme();
  const color = Colors[theme];

  return <Text style={{ color: color.text }} className={className} {...rest} />;
}
