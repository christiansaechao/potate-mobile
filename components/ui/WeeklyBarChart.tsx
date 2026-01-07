import { useMemo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import { CustomText } from "../custom";

interface WeeklyBarChartProps {
  dailyStats: Record<
    string,
    { focus: number; shortBreak: number; longBreak: number }
  >;
  themeColor: string;
}

export function WeeklyBarChart({
  dailyStats,
  themeColor,
}: WeeklyBarChartProps) {
  const chartData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const data = [];

    // Get last 7 days ending with today
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      const stats = dailyStats[dateStr] || { focus: 0 };
      const dayLabel = days[d.getDay()];

      // Convert seconds to minutes for the chart height
      const minutes = Math.floor(stats.focus / 60);

      data.push({
        label: dayLabel,
        value: minutes,
        shortDate: `${d.getMonth() + 1}/${d.getDate()}`,
      });
    }
    return data;
  }, [dailyStats]);

  const maxValue = Math.max(...chartData.map((d) => d.value), 60); // Min 60 mins for scale

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Last 7 Days (Focus Minutes)</CustomText>
      <View style={styles.chartContainer}>
        {chartData.map((item, index) => {
          const heightPercentage = Math.min((item.value / maxValue) * 100, 100);

          return (
            <Bar
              key={index}
              heightPercentage={heightPercentage}
              themeColor={themeColor}
              label={item.label}
              delay={index * 100}
            />
          );
        })}
      </View>
    </View>
  );
}

function Bar({
  heightPercentage,
  themeColor,
  label,
  delay,
}: {
  heightPercentage: number;
  themeColor: string;
  label: string;
  delay: number;
}) {
  const height = useSharedValue(0);

  useEffect(() => {
    // Start animation on mount with delay
    height.value = withDelay(
      delay,
      withSpring(heightPercentage, { damping: 18, stiffness: 80 })
    );
  }, [heightPercentage, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: `${height.value}%`,
      opacity: 0.8,
    };
  });

  return (
    <View style={styles.column}>
      <View style={styles.barContainer}>
        <Animated.View
          style={[styles.bar, { backgroundColor: themeColor }, animatedStyle]}
        />
      </View>
      <CustomText style={styles.label}>{label}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    opacity: 0.8,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
  },
  column: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
    gap: 8,
  },
  barContainer: {
    flex: 1,
    width: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 4,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    borderRadius: 4,
    minHeight: 4, // Make sure even 0 is visible as a tiny dot
  },
  label: {
    fontSize: 12,
    opacity: 0.6,
  },
});
