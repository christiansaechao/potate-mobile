import { View, Text } from "react-native";

export const Welcome = () => {
  return (
    <View className="items-center space-y-4">
      <Text className="text-4xl font-bold text-orange-900 text-center">
        Welcome to Potate
      </Text>
      <Text className="text-lg text-orange-700 text-center">
        Your little friend to keep you on track with your tasks.
      </Text>
    </View>
  );
};
