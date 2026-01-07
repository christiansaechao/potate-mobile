import { View } from "react-native";

import { COLORS } from "@/constants/theme";
import { useTheme } from "@/hooks/context-hooks/useTheme";

export default function Divider({
  opacity = 0.5,
  thickness = 1,
  marginVertical = 20,
  inset = 0,
}) {
  // --- Hooks ---

  const { theme } = useTheme();

  // --- Constants ---

  const dividerColor = COLORS[theme].text;

  // --- Render ---

  return (
    <View
      style={{
        height: thickness,
        backgroundColor: dividerColor,
        opacity,
        marginVertical,
        marginLeft: inset,
        marginRight: inset,
        borderRadius: 999,
      }}
    />
  );
}
