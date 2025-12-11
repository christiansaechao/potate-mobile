import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function FloatingTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <View style={styles.tabBar}>
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
        paddingHorizontal: 20,
    },
    tabBar: {
        flexDirection: "row",
        backgroundColor: "#1a1a1a",
        borderRadius: 60,
        paddingHorizontal: 25,
        paddingVertical: 10,
        justifyContent: "space-between",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    tabButton: {
        width: 100,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#2a2a2a",
        justifyContent: "center",
        alignItems: "center",
    },
    tabButtonFocused: {
        backgroundColor: "#3a3a3a",
    },
});
