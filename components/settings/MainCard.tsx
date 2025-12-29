import { View, Pressable, Switch } from "react-native";
import { Bed, Bell, Clock, Coffee, Target, User } from "lucide-react-native";

// Components
import { CustomText } from "../custom";
import { Row } from "./Row";
import { ThemeSelector } from "@/components/potato/ThemeSelector";

// constants
import { SETTINGS_OPTIONS, THEMES } from "@/constants/constants";
import { Colors } from "@/constants/theme";

// hooks
import { useTheme } from "@/hooks/context-hooks/useTheme";

// helper functions
import { generateMockData, resetData } from "@/lib/dev-utils";
import { IUserContext } from "@/types/settings.types";
import UserOps from "@/lib/settings";

interface IMainCard {
  user: IUserContext;
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  weeklyGoal: number;
  vibration: boolean;
  setPomodoro: React.Dispatch<React.SetStateAction<number>>;
  setShortBreak: React.Dispatch<React.SetStateAction<number>>;
  setLongBreak: React.Dispatch<React.SetStateAction<number>>;
  setVibration: React.Dispatch<React.SetStateAction<boolean>>;
  setWeeklyGoal: React.Dispatch<React.SetStateAction<number>>;
}

export const MainCard = ({
  user,
  pomodoro,
  shortBreak,
  longBreak,
  weeklyGoal,
  vibration,
  setPomodoro,
  setShortBreak,
  setLongBreak,
  setVibration,
  setWeeklyGoal,
}: IMainCard) => {
  const { theme, setTheme, mode } = useTheme();
  const backgroundColor = THEMES[theme][mode];
  const color = Colors[theme];

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
          {user.name}
        </CustomText>

        <CustomText
          style={{
            fontSize: 16,
            lineHeight: 20,

            marginTop: 2,
          }}
        >
          {user.email}
        </CustomText>
      </View>

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

      <ThemeSelector currentTheme={theme} onSelect={setTheme} />

      {/* Vibration */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 22,
          paddingHorizontal: 16,
          paddingVertical: 14,
          marginTop: 14,
        }}
        className={`${backgroundColor}`}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{ backgroundColor: color.text }}
            className="p-2 rounded-full"
          >
            <Bell color={color.buttonIconColor} size={24} />
          </View>
          <CustomText
            style={{
              fontSize: 18,
              lineHeight: 22,
            }}
          >
            Vibration
          </CustomText>
        </View>

        <Switch
          value={vibration}
          onValueChange={setVibration}
          trackColor={{
            false: "rgba(255,255,255,0.18)",
            true: "#7FD7BE",
          }}
          thumbColor="#F2F6FB"
        />
      </View>

      {/* Weekly Goal */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 22,
          paddingHorizontal: 16,
          paddingVertical: 16,
          marginTop: 14,
        }}
        className={`${backgroundColor}`}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
          className={`${backgroundColor}`}
        >
          <View
            style={{ backgroundColor: color.text }}
            className="p-2 rounded-full"
          >
            <Target color={color.buttonIconColor} size={24} />
          </View>
          <CustomText
            style={{
              fontSize: 18,
              lineHeight: 22,
            }}
          >
            Weekly Goal
          </CustomText>
        </View>

        <CustomText
          style={{
            fontSize: 18,
            lineHeight: 22,
          }}
        >
          {weeklyGoal}
        </CustomText>
      </View>

      {/* Save */}
      <Pressable
        onPress={() =>
          UserOps.updateUserSettings({
            name: user.name,
            email: user.email,
            focus_duration: pomodoro,
            short_break_duration: shortBreak,
            long_break_duration: longBreak,
            weekly_goal: weeklyGoal,
            vibration,
          })
        }
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
    </View>
  );
};
