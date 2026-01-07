import { Text, type TextProps } from "react-native";

import { COLORS } from "../../constants/theme";
import { useTheme } from "@/hooks/context-hooks/useTheme";

export function CustomText({ style, className, ...rest }: TextProps) {
  const { theme } = useTheme();

  const color = COLORS[theme];

  return (
    <Text
      style={[{ color: color.text, fontFamily: "Baloo" }, style]}
      className={className}
      {...rest}
    />
  );
}
