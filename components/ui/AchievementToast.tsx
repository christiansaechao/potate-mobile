import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { CustomText } from "../custom";
import { AchievementDef } from "@/lib/achievements";

export const AchievementToast = ({
  achievement,
}: {
  achievement: AchievementDef;
}) => {
  return (
    <Animated.View
      entering={FadeInUp.springify()}
      exiting={FadeOutUp}
      style={styles.container}
    >
      <View style={styles.content}>
        <CustomText style={styles.icon}>{achievement.icon}</CustomText>
        <View style={styles.textContainer}>
          <CustomText style={styles.unlocked}>ACHIEVEMENT UNLOCKED!</CustomText>
          <CustomText style={styles.title}>{achievement.title}</CustomText>
          <CustomText style={styles.description}>
            {achievement.description}
          </CustomText>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 10000,
    elevation: 10,
  },
  content: {
    backgroundColor: "#FFD700", // Gold
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderWidth: 2,
    borderColor: "#FFA000",
  },
  icon: {
    fontSize: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  unlocked: {
    fontSize: 10,
    fontWeight: "900",
    color: "#5D4037",
    letterSpacing: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  description: {
    fontSize: 12,
    color: "#4B5563",
  },
});
