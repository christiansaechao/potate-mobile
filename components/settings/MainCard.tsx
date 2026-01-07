import { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { Bed, Clock, Coffee, User } from "lucide-react-native";
import * as Haptics from "expo-haptics";

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

export const MainCard = () => {
  // --- Hooks ---

  const {
    name,
    email,
    FOCUS,
    SHORT_BREAK,
    LONG_BREAK,
    vibration: userVibration,
    weekly_goal,
    updateUser,
  } = useUserDefaults();
  const { theme, setTheme, mode } = useTheme();
  const { showConfetti, triggerConfetti } = useConfetti();

  // --- State ---

  const [pomodoro, setPomodoro] = useState(FOCUS);
  const [shortBreak, setShortBreak] = useState(SHORT_BREAK);
  const [longBreak, setLongBreak] = useState(LONG_BREAK);
  const [weeklyGoal, setWeeklyGoal] = useState(weekly_goal);
  const [vibration, setVibration] = useState(userVibration === 1);

  // --- Constants ---

  const backgroundColor = THEMES[theme][mode];
  const color = Colors[theme];

  // --- Effects ---

  useEffect(() => {
    setPomodoro(FOCUS);
    setShortBreak(SHORT_BREAK);
    setLongBreak(LONG_BREAK);
    setWeeklyGoal(weekly_goal);
    setVibration(Boolean(userVibration));
  }, [FOCUS, SHORT_BREAK, LONG_BREAK, weekly_goal, userVibration]);

  // --- Handlers ---

  async function handleSaveSettings() {
    const { success, data } = await UserOps.updateUserSettings({
      name: name,
      email: email,
      focus_duration: pomodoro,
      short_break_duration: shortBreak,
      long_break_duration: longBreak,
      weekly_goal: weeklyGoal,
      vibration: vibration ? 1 : 0,
    });

    if (!success)
      throw new Error("There was an issue when trying to save user data");

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    triggerConfetti();

    // Map the database response to IUserContext format
    const mappedUser: IUserContext = {
      name: data.name,
      email: data.email,
      FOCUS: data.focus_duration,
      SHORT_BREAK: data.short_break_duration,
      LONG_BREAK: data.long_break_duration,
      vibration: data.vibration === 1 ? 1 : 0,
      weekly_goal: data.weekly_goal,
      exp: data.exp,
      level: data.level,
    };

    // Ensure updateUser exists before calling it
    if (updateUser) {
      updateUser(mappedUser);
    } else {
      console.error("updateUser is not available");
    }
  }

  // --- Render ---

  return (
    <View
      style={{
        borderRadius: 28,
        padding: 18,
        marginTop: 18,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
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
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            padding: 16,
          }}
        >
          <Row
            icon={<Clock color={color.buttonIconColor} size={24} />}
            label="Pomodoro Length"
            state={pomodoro}
            setState={setPomodoro}
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
            state={shortBreak}
            setState={setShortBreak}
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
            state={longBreak}
            setState={setLongBreak}
            options={SETTINGS_OPTIONS.LONG_BREAK}
          />
        </View>
      </View>

      <Divider />

      <ThemeSelector currentTheme={theme} onSelect={setTheme} />

      <Divider />

      {/* Save */}
      <Pressable
        onPress={() => handleSaveSettings()}
        style={{
          backgroundColor: "#7FD7BE",
          borderRadius: 999,
          paddingVertical: 18,
          marginTop: 18,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomText
          style={{
            fontSize: 24,
            lineHeight: 30,
          }}
        >
          Save Changes
        </CustomText>
      </Pressable>
      <Pressable
        onPress={resetData}
        style={{
          backgroundColor: "#7FD7BE",
          borderRadius: 999,
          paddingVertical: 18,
          marginTop: 18,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomText
          style={{
            fontSize: 24,
            lineHeight: 30,
          }}
        >
          Reset Data (dev)
        </CustomText>
      </Pressable>

      <Pressable
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
      >
        <CustomText
          style={{
            fontSize: 24,
            lineHeight: 30,
          }}
        >
          Generate Data (dev)
        </CustomText>
      </Pressable>
      {showConfetti && <Confetti />}
    </View>
  );
};
