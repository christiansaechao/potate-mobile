import { CustomText } from "@/components/custom";
import { Row } from "@/components/settings/Row";
import { useTheme } from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { Bed, Bell, Clock, Coffee, Target, User } from "lucide-react-native";
import { useState } from "react";
import { THEMES } from "@/constants/constants";
import { Pressable, ScrollView, Switch, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { DEFAULT_TIMES, SETTINGS_OPTIONS } from "@/constants/constants";
import { TimerMode } from "@/types/types";

export default function Settings() {
  const insets = useSafeAreaInsets();

  const [pomodoro, setPomodoro] = useState(DEFAULT_TIMES[TimerMode.FOCUS]);
  const [shortBreak, setShortBreak] = useState(
    DEFAULT_TIMES[TimerMode.SHORT_BREAK],
  );
  const [longBreak, setLongBreak] = useState(
    DEFAULT_TIMES[TimerMode.LONG_BREAK],
  );
  const [vibration, setVibration] = useState(true);
  const { theme, mode } = useTheme();
  const backgroundColor = THEMES[theme][mode];

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1 }}
      className={`transition-colors duration-300 ${backgroundColor}`}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {/* Header */}
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <CustomText
            className="text-6xl text-center"
            style={{
              height: 96,
              lineHeight: 96,
              textAlign: "center",
            }}
          >
            Settings
          </CustomText>

          <CustomText
            style={{
              fontSize: 18,
              lineHeight: 22,
              textAlign: "center",
            }}
          >
            Make your focus time cozy ✨
          </CustomText>
        </View>

        {/* Main Card */}
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
              Akhilan
            </CustomText>

            <CustomText
              style={{
                fontSize: 16,
                lineHeight: 20,

                marginTop: 2,
              }}
            >
              test@email.com
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
                icon={<Clock color="#EAF0F7" size={24} />}
                label="Pomodoro Length"
                value={`${pomodoro} min`}
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
                icon={<Coffee color="#EAF0F7" size={24} />}
                label="Short Break"
                value={`${shortBreak} min`}
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
                icon={<Bed color="#EAF0F7" size={24} />}
                label="Long Break"
                value={`${longBreak} min`}
                state={longBreak}
                setState={setLongBreak}
                options={SETTINGS_OPTIONS.LONG_BREAK}
              />
            </View>
          </View>

          {/* Vibration */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#2B3545",
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
              className={`${backgroundColor}`}
            >
              <Bell color="#EAF0F7" size={24} />
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
              backgroundColor: "#2B3545",
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
              <Target color="#EAF0F7" size={24} />
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
              20 Pomodo
            </CustomText>
          </View>

          {/* Save */}
          <Pressable
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
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
