import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { CustomText } from "../custom";
import { AchievementDef } from "@/lib/achievements";
import { RARITY_COLORS } from "@/constants/theme";

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
          <CustomText
            style={[styles.title, { color: RARITY_COLORS[achievement.rarity] }]}
          >
            {achievement.title}
          </CustomText>
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
    padding: 24,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    borderWidth: 3,
    borderColor: "#FFA000",
  },
  icon: {
    fontSize: 54,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  unlocked: {
    fontSize: 12,
    fontWeight: "900",
    color: "#5D4037",
    letterSpacing: 2,
    marginBottom: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 20,
  },
});
