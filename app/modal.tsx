import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { CustomText, CustomView } from "@/components/custom";

export default function ModalScreen() {
  return (
    <CustomView style={styles.container}>
      <CustomText>This is a modal</CustomText>
      <Link href="/" dismissTo style={styles.link}>
        <CustomText>Go to home screen</CustomText>
      </Link>
    </CustomView>
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
