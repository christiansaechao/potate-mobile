import React from "react";
import { View } from "react-native";

import { CustomText } from "@/components/custom/custom-text";

export const SettingsHeader = () => {
  return (
    <View style={{ paddingTop: 10, paddingBottom: 10 }}>
      <CustomText
        className="text-6xl text-center"
        style={{
          height: 96,
          lineHeight: 96,
          textAlign: "center",
        }}
      >
        Settings
      </CustomText>

      <CustomText
        style={{
          fontSize: 18,
          lineHeight: 22,
          textAlign: "center",
        }}
      >
        Keep growing, little spud ✨
      </CustomText>
    </View>
  );
};
