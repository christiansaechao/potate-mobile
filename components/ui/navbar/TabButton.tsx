import { Pressable, StyleSheet } from "react-native";

type Props = {
  isFocused: boolean;
  options: any;
  onPress: () => void;
  onLongPress: () => void;
};

export function TabButton({ isFocused, options, onPress, onLongPress }: Props) {
  const icon = options.tabBarIcon?.({
    focused: isFocused,
    color: isFocused ? "#ffffff" : "rgba(255,255,255,0.6)",
    size: 24,
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabButton, isFocused && styles.focused]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    width: 100,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  focused: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});
