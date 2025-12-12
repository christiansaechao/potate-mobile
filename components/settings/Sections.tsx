import { View } from "react-native";
import { CustomText } from "../custom";

const Fields = ({
  name,
  icon,
  value,
}: {
  name: string;
  icon: any;
  value: any;
}) => {
  return (
    <View className="flex-row justify-between items-center py-4">
      <View className={"flex-row justify-center items-center gap-2"}>
        <CustomText className="text-center min-w-12">{icon}</CustomText>
        <CustomText className="text-center text-xl">{name}</CustomText>
      </View>
      <CustomText>{value}</CustomText>
    </View>
  );
};

interface SectionsProps {
  SectionTitle?: string;
  fields: {
    name: string;
    icon: any;
    value: any;
  }[];
}

export const Sections = ({ SectionTitle, fields }: SectionsProps) => {
  return (
    <View className="flex gap-2">
      <CustomText className="text-3xl text-center underline">
        {SectionTitle}
      </CustomText>
      <View>
        {fields.map((field, index) => (
          <Fields
            key={index}
            name={field.name}
            icon={field.icon}
            value={field.value}
          />
        ))}
      </View>
    </View>
  );
};
