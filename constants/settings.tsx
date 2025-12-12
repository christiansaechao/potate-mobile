import { FontAwesome5 } from "@expo/vector-icons";

export const userSettingsFields = [
  {
    name: "Name",
    icon: <FontAwesome5 name="user" size={24} />,
    value: "Akhilan",
  },
  {
    name: "Email",
    icon: <FontAwesome5 name="envelope" size={24} />,
    value: "test@email.com",
  },
];

export const timerSessionFields = [
  {
    name: "Pomodoro Duration",
    icon: <FontAwesome5 name="clock" size={24} />,
    value: "25 mins",
  },
  {
    name: "Short Break Duration",
    icon: <FontAwesome5 name="coffee" size={24} />,
    value: "5 mins",
  },
  {
    name: "Long Break Duration",
    icon: <FontAwesome5 name="bed" size={24} />,
    value: "15 mins",
  },
  {
    name: "Vibration",
    icon: <FontAwesome5 name="bell" size={24} />,
    value: "On",
  },
];

export const goalsProductivityFields = [
  {
    name: "Weekly Goal",
    icon: <FontAwesome5 name="bullseye" size={24} />,
    value: "20 pomodoros",
  },
];

export default {
  userSettingsFields,
  timerSessionFields,
  goalsProductivityFields,
};
