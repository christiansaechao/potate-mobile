import React, { useEffect, useState } from "react";
import { View, ScrollView, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "@/components/custom";
import { THEMES } from "@/constants/constants";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/context-hooks/useTheme";
import AnimatedScreen from "@/components/ui/AnimatedScreen";
import {
  ACHIEVEMENT_DEFS,
  achievementOps,
  AchievementDef,
} from "@/lib/achievements";
import { useUserDefaults } from "@/hooks/context-hooks/useUserDefaults";
import { calculateLevel } from "@/lib/leveling";
import { Lock } from "lucide-react-native";

export default function TrophyCase() {
  const { theme, mode } = useTheme();
  const { exp } = useUserDefaults();
  const level = calculateLevel(exp);
  const color = Colors[theme];
  const backgroundColor = THEMES[theme][mode];

  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    achievementOps.getUnlocked().then((unlocked) => {
      setUnlockedIds(new Set(unlocked.map((a) => a.achievement_id)));
    });
  }, []);

  const renderBadge = ({ item }: { item: AchievementDef }) => {
    const isUnlocked = unlockedIds.has(item.id);

    return (
      <View
        style={{
          width: "33.33%",
          padding: 8,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: isUnlocked ? color.buttonColor : "#e0e0e0",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
            borderWidth: 2,
            borderColor: isUnlocked ? color.tint : "#bdbdbd",
            opacity: isUnlocked ? 1 : 0.6,
            position: "relative",
          }}
        >
          <CustomText style={{ fontSize: 32 }}>{item.icon}</CustomText>
          {!isUnlocked && (
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Lock size={20} color="white" />
            </View>
          )}
        </View>
        <CustomText
          style={{
            fontSize: 12,
            textAlign: "center",
            fontWeight: "bold",
            color: isUnlocked ? color.text : "#9e9e9e",
          }}
        >
          {item.title}
        </CustomText>
        <CustomText
          style={{
            fontSize: 10,
            textAlign: "center",
            color: isUnlocked ? color.text : "#bdbdbd",
            marginTop: 2,
          }}
          numberOfLines={2}
        >
          {item.description}
        </CustomText>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1 }}
      className={`${backgroundColor}`}
    >
      <AnimatedScreen>
        <View style={{ padding: 24 }}>
          <CustomText
            style={{ fontSize: 32, fontWeight: "bold", marginBottom: 8 }}
          >
            Trophy Case
          </CustomText>
          <CustomText style={{ fontSize: 16, opacity: 0.7, marginBottom: 24 }}>
            Your spud-tacular achievements and milestones.
          </CustomText>

          <FlatList
            data={ACHIEVEMENT_DEFS}
            keyExtractor={(item) => item.id}
            renderItem={renderBadge}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </AnimatedScreen>
    </SafeAreaView>
  );
}
