import { CustomText } from "@/components/custom";
import { Row } from "@/components/settings/Row";
import { C, styles } from "@/components/settings/Styles";
import { useTheme } from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { Bed, Bell, Clock, Coffee, Target, User } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Switch, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { DEFAULT_TIMES, SETTINGS_OPTIONS } from "@/constants/constants";
import { TimerMode } from "@/types/types";

export default function Settings() {
  const { theme, mode } = useTheme();
  const insets = useSafeAreaInsets();
  const [pomodoro, setPomodoro] = useState<number>(DEFAULT_TIMES[TimerMode.FOCUS]);
  const [shortBreak, setShortBreak] = useState<number>(DEFAULT_TIMES[TimerMode.SHORT_BREAK]);
  const [longBreak, setLongBreak] = useState<number>(DEFAULT_TIMES[TimerMode.LONG_BREAK]);
  const [vibration, setVibration] = useState(true);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: insets.bottom + 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerWrap}>
          <CustomText
            className="text-6xl text-center"
            style={[{ height: 96, lineHeight: 96 }, styles.title]}
          >
            Settings
          </CustomText>
          <CustomText style={styles.subtitle}>
            Make your focus time cozy ✨
          </CustomText>
        </View>

        {/* Outer big rounded card (everything inside like the mock) */}
        <View style={styles.outerCard}>
          {/* Profile */}
          <View style={{ alignItems: "center" }}>
            <View style={styles.profileAvatar}>
              <User color={C.accentText} size={40} />
            </View>
            <CustomText style={styles.name}>Akhilan</CustomText>
            <CustomText style={styles.email}>test@email.com</CustomText>
          </View>

          {/* Focus Timer panel */}
          <View style={{ marginTop: 18 }}>
            <CustomText style={styles.sectionTitle}>Focus Timer</CustomText>

            <View style={styles.panel}>
              <Row
                icon={<Clock color={C.icon} size={24} />}
                label="Pomodoro Length"
                value={`${pomodoro} min`}
                styles={styles}
                state={pomodoro}
                setState={setPomodoro}
                options={SETTINGS_OPTIONS.POMODORO}
              />
              <View style={styles.divider} />
              <Row
                icon={<Coffee color={C.icon} size={24} />}
                label="Short Break"
                value={`${shortBreak} min`}
                styles={styles}
                state={shortBreak}
                setState={setShortBreak}
                options={SETTINGS_OPTIONS.SHORT_BREAK}
              />
              <View style={styles.divider} />
              <Row
                styles={styles}
                icon={<Bed color={C.icon} size={24} />}
                label="Long Break"
                value={`${longBreak} min`}
                state={longBreak}
                setState={setLongBreak}
                options={SETTINGS_OPTIONS.LONG_BREAK}
              />
              <View style={styles.divider} />
            </View>
          </View>

          {/* Vibration row */}
          <View style={styles.prefRow}>
            <View style={styles.left}>
              <Bell color={C.icon} size={24} />
              <CustomText style={styles.label}>Vibration</CustomText>
            </View>

            <Switch
              value={vibration}
              onValueChange={setVibration}
              trackColor={{ false: "rgba(255,255,255,0.18)", true: C.accent }}
              thumbColor={"#F2F6FB"}
            />
          </View>

          {/* Weekly goal row (like the mock’s “Weekly Goal 20 Pomodo”) */}
          <View style={styles.weeklyRow}>
            <View style={styles.left}>
              <Target color={C.icon} size={24} />
              <CustomText style={styles.label}>Weekly Goal</CustomText>
            </View>

            <View style={styles.weeklyRight}>
              <CustomText style={styles.weeklyValue}>20 Pomodo</CustomText>
            </View>
          </View>

          {/* Save */}
          <Pressable style={styles.save}>
            <CustomText style={styles.saveText}>Save Changes</CustomText>
          </Pressable>
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
