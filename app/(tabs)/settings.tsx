import { Sections } from "@/components/settings/Sections";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomView } from "../../components/custom";
import {
  goalsProductivityFields,
  timerSessionFields,
  userSettingsFields,
} from "../../constants/settings";

export default function Settings() {
  return (
<<<<<<< HEAD
    <SafeAreaView className="flex-1 pb-24">
      <ThemedView>
        <ThemedText className="text-3xl text-center">
          Timer & Session
        </ThemedText>
        <Row
          name="name"
          icon={<FontAwesome5 name="user" size={24} />}
          value="Akhilan"
=======
    <SafeAreaView>
      <CustomView className={"h-screen py-12 px-4 mb-4 rounded-lg flex gap-8"}>
        <Sections SectionTitle="User Settings" fields={userSettingsFields} />
        <Sections SectionTitle="Timer & Session" fields={timerSessionFields} />
        <Sections
          SectionTitle="Goals & Productivity"
          fields={goalsProductivityFields}
>>>>>>> main
        />
      </CustomView>
    </SafeAreaView>
  );
}
