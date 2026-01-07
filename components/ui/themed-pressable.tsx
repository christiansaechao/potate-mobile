import { Pressable, type PressableProps } from "react-native";

import { useThemeColor } from "../../hooks/use-theme-color";

// --- Types ---

export type PressableTextProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedPressable({
  style,
  lightColor,
  darkColor,
  type = "default",
  className,
  ...rest
}: PressableTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Pressable
      style={[{ backgroundColor: color }]}
      className={className}
      {...rest}
    />
  );
}
