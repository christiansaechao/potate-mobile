import { useState } from "react";
import { View } from "react-native";
import { Bed, Clock, Coffee, User } from "lucide-react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { SquishyButton } from "../ui/SquishyButton";

// Components
import { ThemeSelector } from "@/components/potato/ThemeSelector";
import Divider from "../ui/divider";
import { CustomText } from "../custom";
import { Row } from "./Row";

// Constants
import { DEFAULT_TIMES, SETTINGS_OPTIONS } from "@/constants/constants";
import { COLORS, THEMES } from "@/constants/theme";

// Hooks
import { useTheme } from "@/hooks/context-hooks/useTheme";
import { useUserDefaults } from "@/hooks/context-hooks/useUserDefaults";

// Helpers & Types
import { generateMockData, resetData } from "@/lib/dev-utils";
import { IUserContext } from "@/types/settings.types";

const DEV = false;

export const SettingsPage = ({ onSave }: { onSave?: () => void }) => {
  // --- Hooks ---

  const {
    name,
    email,
    focus_duration,
    short_break_duration,
    long_break_duration,
    weekly_goal,
    weekly_focus_time_goal,
    updateUser,
  } = useUserDefaults();
  const { theme, setTheme, mode } = useTheme();

  // --- Constants ---

  const backgroundColor = THEMES[theme][mode];
  const color = COLORS[theme];

  // --- Handlers ---

  const handleAutoSave = async (newUser: Partial<IUserContext>) => {
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
        elevation: 6,
      }}
      className={`${backgroundColor} transition-colors duration-300`}
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

      <ThemeSelector currentTheme={theme} onSelect={setTheme} />

      <Divider />

      {/* Focus Timer */}
      <View style={{ marginTop: 18 }}>
        <CustomText
          style={{
            fontSize: 24,
            lineHeight: 30,
            textAlign: "center",
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
            state={focus_duration || DEFAULT_TIMES.FOCUS}
            setState={(val: number) =>
              handleAutoSave({
                focus_duration: val,
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
            state={short_break_duration || DEFAULT_TIMES.SHORT_BREAK}
            setState={(val: number) =>
              handleAutoSave({
                short_break_duration: val,
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
            state={long_break_duration || DEFAULT_TIMES.LONG_BREAK}
            setState={(val: number) =>
              handleAutoSave({
                long_break_duration: val,
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
            textAlign: "center",
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
            state={weekly_goal || 5} // 5 is default
            setState={(val: number) =>
              handleAutoSave({
                weekly_goal: val,
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
            state={weekly_focus_time_goal || 7200} // 7200 is defualt
            setState={(val: number) =>
              handleAutoSave({
                weekly_focus_time_goal: val,
              })
            }
            options={SETTINGS_OPTIONS.WEEKLY_FOCUS_TIME_GOAL}
          />
        </View>
      </View>

      {DEV && (
        <>
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
        </>
      )}
    </View>
  );
};
