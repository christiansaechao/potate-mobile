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
        <SafeAreaView>
            <CustomView className={"h-screen py-12 px-4 mb-4 rounded-lg flex gap-8"}>
                <Sections SectionTitle="User Settings" fields={userSettingsFields} />
                <Sections SectionTitle="Timer & Session" fields={timerSessionFields} />
                <Sections
                    SectionTitle="Goals & Productivity"
                    fields={goalsProductivityFields}
                />
            </CustomView>
        </SafeAreaView>
    );
}
