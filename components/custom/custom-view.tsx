import { View, type ViewProps } from "react-native";
import { HEX_THEMES } from "../../constants/constants";
import { useTheme } from "../../hooks/useTheme";

export function CustomView({ style, ...otherProps }: ViewProps) {
  const { theme } = useTheme();
  const backgroundColor = HEX_THEMES[theme]["FOCUS"];

  return <View style={{ backgroundColor: backgroundColor }} {...otherProps} />;
}
