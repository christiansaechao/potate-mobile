/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { COLORS } from "../constants/theme";
import { useTheme } from "../hooks/context-hooks/useTheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof (typeof COLORS)["default"] & keyof (typeof COLORS)["dark"]
) {
  const { theme } = useTheme();
  // Map 'default' to 'light' for prop lookup, other themes might not have overrides
  const propKey = theme === "default" ? "light" : theme;
  const colorFromProps = props[propKey as keyof typeof props];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return COLORS[theme][colorName];
  }
}
