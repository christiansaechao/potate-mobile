import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText, ThemedView } from "../../components";

export default function Settings() {
  return (
    <SafeAreaView>
      <ThemedView>
        <ThemedText className="text-3xl text-center">
          Timer & Session
        </ThemedText>
        <Row
          name="name"
          icon={<FontAwesome5 name="user" size={24} />}
          value="Akhilan"
        />
        <Row
          name="email"
          icon={<FontAwesome5 name="user" size={24} />}
          value="Akhilan"
        />
        <Row
          name="pomodoro duration"
          icon={<FontAwesome5 name="user" size={24} />}
          value="Akhilan"
        />
        <Row
          name="short break duration"
          icon={<FontAwesome5 name="user" size={24} />}
          value="Akhilan"
        />
        <Row
          name="long break duration"
          icon={<FontAwesome5 name="user" size={24} />}
          value="Akhilan"
        />
        <Row
          name="vibration"
          icon={<FontAwesome5 name="user" size={24} />}
          value="Akhilan"
        />
        <Row
          name="weekly goal"
          icon={<FontAwesome5 name="user" size={24} />}
          value="Akhilan"
        />
      </ThemedView>
      <ThemedView>
        <ThemedText className="text-3xl text-center">
          Goals And Productivity
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText className="text-3xl text-center">Notifications</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const Row = ({
  name,
  icon,
  value,
}: {
  name: string;
  icon: any;
  value: any;
}) => {
  return (
    <ThemedView className="flex-row justify-between items-center py-4">
      <ThemedText>
        {icon} {name}
      </ThemedText>
      <ThemedText className="text-black">{value}</ThemedText>
    </ThemedView>
  );
};
