import { View } from "react-native";

export default function Divider({
  color = "#FFFFFF",
  opacity = 0.12,
  thickness = 1,
  marginVertical = 20,
  inset = 0,
}) {
  return (
    <View
      style={{
        height: thickness,
        backgroundColor: color,
        opacity,
        marginVertical,
        marginLeft: inset,
        marginRight: inset,
        borderRadius: 999,
      }}
    />
  );
}
