import { THEMES } from "@/constants/constants";
import { useTheme } from "@/hooks/useTheme";

import { Sections } from "@/components/settings/Sections";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  goalsProductivityFields,
  timerSessionFields,
  userSettingsFields,
} from "../../constants/settings";

export default function Settings() {
  const { theme, mode } = useTheme();

  const backgroundColor = THEMES[theme][mode];

  return (
    <SafeAreaView
      className={`flex-1 transition-colors duration-300 ${backgroundColor}`}
      edges={["top"]}
    >
      <View className="py-12 h-screen px-4">
        <Sections SectionTitle="User Settings" fields={userSettingsFields} />
        <Sections SectionTitle="Timer & Session" fields={timerSessionFields} />
        <Sections
          SectionTitle="Goals & Productivity"
          fields={goalsProductivityFields}
        />
      </View>
    </SafeAreaView>
  );
}
