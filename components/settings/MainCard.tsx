import { useState } from "react";
import { View } from "react-native";
import { Bed, Clock, Coffee, User } from "lucide-react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { SquishyButton } from "../ui/SquishyButton";

// Components
import { ThemeSelector } from "@/components/potato/ThemeSelector";
import { Confetti } from "../potato/Confetti";
import Divider from "../ui/divider";
import { CustomText } from "../custom";
import { Row } from "./Row";

// Constants
import { SETTINGS_OPTIONS, THEMES } from "@/constants/constants";
import { Colors } from "@/constants/theme";

// Hooks
import { useTheme } from "@/hooks/context-hooks/useTheme";
import { useUserDefaults } from "@/hooks/context-hooks/useUserDefaults";
import { useConfetti } from "@/hooks/useConfetti";

// Helpers & Types
import { generateMockData, resetData } from "@/lib/dev-utils";
import UserOps from "@/lib/settings";
import { IUserContext } from "@/types/settings.types";

export const MainCard = ({ onSave }: { onSave?: () => void }) => {
  // --- Hooks ---

  const {
    name,
    email,
    FOCUS,
    SHORT_BREAK,
    LONG_BREAK,
    vibration,
    weekly_goal,
    weekly_focus_time_goal,
    updateUser,
    theme: userTheme,
    ...userData
  } = useUserDefaults();
  const { theme, setTheme, mode } = useTheme();
  const { showConfetti, triggerConfetti } = useConfetti();

  // --- State ---

  // --- Constants ---

  const backgroundColor = THEMES[theme][mode];
  const color = Colors[theme];

  // --- Handlers ---

  const handleAutoSave = async (newUser: IUserContext) => {
    await updateUser(newUser);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (onSave) onSave();
  };

  // --- Render ---

  return (
    <View
      style={{
        borderRadius: 28,
        padding: 18,
        marginTop: 18,
        // shadowColor: "#000",
        // shadowOpacity: 0.25,
        // shadowRadius: 18,
        // shadowOffset: { width: 0, height: 10 },
        elevation: 6,
      }}
      className={`${backgroundColor}`}
    >
      {/* Profile */}
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: "#7FD7BE",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
          className={`${backgroundColor}`}
        >
          <User color="#1F2A35" size={40} />
        </View>

        <CustomText
          style={{
            fontSize: 28,
            lineHeight: 34,
          }}
        >
          {name}
        </CustomText>

        <CustomText
          style={{
            fontSize: 16,
            lineHeight: 20,

            marginTop: 2,
          }}
        >
          {email}
        </CustomText>
      </View>

      <Divider />

      {/* Focus Timer */}
      <View style={{ marginTop: 18 }}>
        <CustomText
          style={{
            fontSize: 24,
            lineHeight: 30,

            marginBottom: 12,
          }}
        >
          Focus Timer
        </CustomText>

        <View
          style={{
            padding: 16,
          }}
        >
          <Row
            icon={<Clock color={color.buttonIconColor} size={24} />}
            label="Pomodoro Length"
            state={FOCUS}
            setState={(val: number) =>
              handleAutoSave({
                ...userData,
                FOCUS: val,
                SHORT_BREAK,
                LONG_BREAK,
                vibration,
                weekly_goal,
                weekly_focus_time_goal,
                theme: userTheme,
                name,
                email,
              })
            }
            options={SETTINGS_OPTIONS.POMODORO}
          />

          <View
            style={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          />

          <Row
            icon={<Coffee color={color.buttonIconColor} size={24} />}
            label="Short Break"
            state={SHORT_BREAK}
            setState={(val: number) =>
              handleAutoSave({
                ...userData,
                FOCUS,
                SHORT_BREAK: val,
                LONG_BREAK,
                vibration,
                weekly_goal,
                weekly_focus_time_goal,
                theme: userTheme,
                name,
                email,
              })
            }
            options={SETTINGS_OPTIONS.SHORT_BREAK}
          />

          <View
            style={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          />

          <Row
            icon={<Bed color={color.buttonIconColor} size={24} />}
            label="Long Break"
            state={LONG_BREAK}
            setState={(val: number) =>
              handleAutoSave({
                ...userData,
                FOCUS,
                SHORT_BREAK,
                LONG_BREAK: val,
                vibration,
                weekly_goal,
                weekly_focus_time_goal,
                theme: userTheme,
                name,
                email,
              })
            }
            options={SETTINGS_OPTIONS.LONG_BREAK}
          />
        </View>
      </View>

      <Divider />

      {/* Goals */}
      <View style={{ marginTop: 18 }}>
        <CustomText
          style={{
            fontSize: 24,
            lineHeight: 30,

            marginBottom: 12,
          }}
        >
          Goals
        </CustomText>

        <View
          style={{
            padding: 16,
          }}
        >
          <Row
            icon={<User color={color.buttonIconColor} size={24} />}
            label="Weekly Session Goal"
            state={weekly_goal}
            setState={(val: number) =>
              handleAutoSave({
                ...userData,
                FOCUS,
                SHORT_BREAK,
                LONG_BREAK,
                vibration,
                weekly_goal: val,
                weekly_focus_time_goal,
                theme: userTheme,
                name,
                email,
              })
            }
            options={SETTINGS_OPTIONS.WEEKLY_GOAL}
          />

          <View
            style={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          />

          <Row
            icon={<Clock color={color.buttonIconColor} size={24} />}
            label="Weekly Focus Goal"
            state={weekly_focus_time_goal}
            setState={(val: number) =>
              handleAutoSave({
                ...userData,
                FOCUS,
                SHORT_BREAK,
                LONG_BREAK,
                vibration,
                weekly_goal,
                weekly_focus_time_goal: val,
                theme: userTheme,
                name,
                email,
              })
            }
            options={SETTINGS_OPTIONS.WEEKLY_FOCUS_TIME_GOAL}
          />
        </View>
      </View>

      <Divider />

      <ThemeSelector currentTheme={theme} onSelect={setTheme} />

      <Divider />

      <SquishyButton
        onPress={resetData}
        style={{
          backgroundColor: "#7FD7BE",
          borderRadius: 999,
          paddingVertical: 18,
          marginTop: 18,
          alignItems: "center",
          justifyContent: "center",
        }}
        scaleTo={0.97}
      >
        <CustomText
          style={{
            fontSize: 24,
            lineHeight: 30,
          }}
        >
          Reset Data (dev)
        </CustomText>
      </SquishyButton>

      <SquishyButton
        onPress={async () => {
          const { success } = await generateMockData();
          if (success) {
            alert("Mock data generated!");
          } else {
            alert("Failed to generate data");
          }
        }}
        style={{
          backgroundColor: "#7FD7BE",
          borderRadius: 999,
          paddingVertical: 18,
          marginTop: 18,
          alignItems: "center",
          justifyContent: "center",
        }}
        scaleTo={0.97}
      >
        <CustomText
          style={{
            fontSize: 24,
            lineHeight: 30,
          }}
        >
          Generate Data (dev)
        </CustomText>
      </SquishyButton>
      {showConfetti && <Confetti />}
    </View>
  );
};
