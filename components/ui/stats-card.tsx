import { View, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { AnimatedNumber } from "./AnimatedNumber";
import { CustomText } from "../custom";

const StatCard = ({
  label,
  stats,
}: {
  label: string;
  stats: string | number;
  backgroundColor: string;
}) => {
  // --- Animations ---

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // --- Render ---

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.96))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View style={animatedStyle}>
        <View className="flex-row justify-between items-center">
          <CustomText className="text-2xl leading-8" style={{ lineHeight: 36 }}>
            {label}
          </CustomText>
          <CustomText
            className="flex-1 text-xl text-gray-400 mx-2"
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            · · · · · · · · · · · · · · · · · · · · · · · · · ·
          </CustomText>
          {typeof stats === "number" ? (
            <AnimatedNumber
              value={stats}
              style={{ fontSize: 24, lineHeight: 36, fontFamily: "Nunito" }}
              className="text-2xl font-semibold leading-8"
            />
          ) : (
            <CustomText className="text-2xl font-semibold leading-8">
              {stats}
            </CustomText>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default StatCard;
