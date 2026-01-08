import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/theme";
import { useTheme } from "@/hooks/context-hooks/useTheme";

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  // --- Hooks ---

  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const tabBar = COLORS[theme].tabBar;

  // --- Render ---

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.tabBar, { backgroundColor: tabBar }]}>
        <BlurView intensity={60} style={StyleSheet.absoluteFill} />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              if (process.env.EXPO_OS === "ios") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabButton
              key={route.key}
              isFocused={isFocused}
              options={options}
              onPress={onPress}
              onLongPress={onLongPress}
              routeName={route.name}
            />
          );
        })}
      </View>
    </View>
  );
}

// --- Subcomponents ---

function TabButton({
  isFocused,
  options,
  onPress,
  onLongPress,
}: {
  isFocused: boolean;
  options: any;
  onPress: () => void;
  onLongPress: () => void;
  routeName: string;
}) {
  const icon = options.tabBarIcon?.({
    focused: isFocused,
    color: isFocused ? "#fff" : "rgba(255, 255, 255, 0.6)",
    size: 24,
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabButton, isFocused && styles.tabButtonFocused]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  tabBar: {
    overflow: "hidden",
    flexDirection: "row",
    borderRadius: 35,
    paddingVertical: 6,
    justifyContent: "space-around",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    height: 45,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  tabButtonFocused: {},
});
