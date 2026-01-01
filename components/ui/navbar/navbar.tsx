import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabButton } from "./TabButton";
import { PotatoButton } from "./PotatoButton";

export function Navbar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const homeIndex = state.routes.findIndex((r) => r.name === "index");

  const isOnHome = state.index === homeIndex;

  // All tabs EXCEPT home
  const tabs = state.routes.filter((r) => r.name !== "index");

  // Split tabs to insert potato in the middle
  const mid = Math.floor(tabs.length / 2);
  const leftTabs = tabs.slice(0, mid);
  const rightTabs = tabs.slice(mid);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        <BlurView intensity={60} style={StyleSheet.absoluteFill} />
        {/* LEFT TABS */}
        {leftTabs.map((route) => {
          const index = state.routes.findIndex((r) => r.key === route.key);
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          return (
            <TabButton
              key={route.key}
              isFocused={isFocused}
              options={options}
              onPress={() => {
                if (!isFocused) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  navigation.navigate(route.name);
                }
              }}
              onLongPress={() =>
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                })
              }
            />
          );
        })}
        <PotatoButton
          isFocused={isOnHome}
          onPress={() => {
            if (!isOnHome) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.navigate("index");
            }
          }}
        />

        {rightTabs.map((route) => {
          const index = state.routes.findIndex((r) => r.key === route.key);
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          return (
            <TabButton
              key={route.key}
              isFocused={isFocused}
              options={options}
              onPress={() => {
                if (!isFocused) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  navigation.navigate(route.name);
                }
              }}
              onLongPress={() =>
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                })
              }
            />
          );
        })}
      </View>
    </View>
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
    backgroundColor: "rgba(40,40,40,0.75)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
