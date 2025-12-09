import React from "react";
import { CustomText, CustomView } from "../custom";

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
    <CustomView className="flex-row justify-between items-center py-4">
      <CustomView className={"flex-row justify-center items-center gap-2"}>
        <CustomText className="min-w-12">{icon}</CustomText>
        <CustomText className="text-xl">{name}</CustomText>
      </CustomView>
      <CustomText>{value}</CustomText>
    </CustomView>
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
    <CustomView className="flex gap-2">
      <CustomText className="text-3xl text-center underline">{SectionTitle}</CustomText>
      <CustomView>
        {fields.map((field, index) => (
          <Fields
            key={index}
            name={field.name}
            icon={field.icon}
            value={field.value}
          />
        ))}
      </CustomView>
    </CustomView>
  );
};
