import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText, CustomView } from "../../components/custom";
export default function Settings() {

  return (
    <SafeAreaView>
      <CustomView className={"p-4 mb-4 rounded-lg"}>
        <CustomText className="text-3xl text-center">
          Timer & Session
        </CustomText>
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
      </CustomView>
      <CustomView>
        <CustomText className="text-3xl text-center">
          Goals And Productivity
        </CustomText>
      </CustomView>
      <CustomView>
        <CustomText className="text-3xl text-center">Notifications</CustomText>
      </CustomView>
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
    <CustomView className="flex-row justify-between items-center py-4">
      <CustomText className={"flex-row items-center gap-2"}>
        {icon} {name}
      </CustomText>
      <CustomText>{value}</CustomText>
    </CustomView>
  );
};
