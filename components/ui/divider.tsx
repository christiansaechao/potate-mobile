import { View } from "react-native";
import { useTheme } from "@/hooks/context-hooks/useTheme";
import { COLORS } from "@/constants/constants";

export default function Divider({
  opacity = 0.5,
  thickness = 1,
  marginVertical = 20,
  inset = 0,
}) {
  const { theme } = useTheme();
  const dividerColor = COLORS[theme].text;
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
