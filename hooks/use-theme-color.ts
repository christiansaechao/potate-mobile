/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof (typeof Colors)["default"] & keyof (typeof Colors)["dark"]
) {
  const { theme } = useTheme();
  // Map 'default' to 'light' for prop lookup, other themes might not have overrides
  const propKey = theme === "default" ? "light" : theme;
  const colorFromProps = props[propKey as keyof typeof props];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
