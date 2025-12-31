import { View, Pressable } from "react-native";
import { CustomText } from "../custom";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const StatCard = ({
  label,
  stats,
}: {
  label: string;
  stats: string | number;
  backgroundColor: string;
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

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
          <CustomText className="text-2xl font-semibold leading-8">
            {stats}
          </CustomText>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default StatCard;
