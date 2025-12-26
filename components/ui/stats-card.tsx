import { View } from "react-native";
import { CustomText } from "../custom";
const StatCard = ({
  label,
  stats,
  backgroundColor,
}: {
  label: string;
  stats: string | number;
  backgroundColor: string;
}) => (
  <View
    className={`flex-row justify-between items-center  rounded-xl px-4 py-2 shadow-md elevation-3 ${backgroundColor}`}
  >
    <CustomText className="text-2xl leading-8 " style={{ lineHeight: 36 }}>
      {label}
    </CustomText>
    <CustomText className="text-2xl font-semibold leading-8">
      {stats}
    </CustomText>
  </View>
);

export default StatCard;
