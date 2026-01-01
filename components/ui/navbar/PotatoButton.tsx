import { Image, Pressable, StyleSheet } from "react-native";

type Props = {
  onPress: () => void;
  isFocused: boolean;
};

export function PotatoButton({ onPress, isFocused }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isFocused && styles.focused]}
    >
      <Image
        source={require("@/assets/images/2.png")}
        style={styles.potato}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  focused: {
    transform: [{ scale: 1.1 }],
  },
  potato: {
    width: 50,
    height: 50,
  },
});
