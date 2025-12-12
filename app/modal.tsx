import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { CustomText } from "@/components/custom";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <CustomText>This is a modal</CustomText>
      <Link href="/" dismissTo style={styles.link}>
        <CustomText>Go to home screen</CustomText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
