import { THEMES } from "@/constants/constants";
import { useTheme } from "@/hooks/useTheme";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CalendarProps = {
  markedDates: string[];
};

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

export default function Calendar({ markedDates }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { theme, mode } = useTheme();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (direction: -1 | 1) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];

  // Fill empty slots for previous month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Fill days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isMarked = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return markedDates.includes(dateString);
  };

  // Theme colors
  const textColor =
    THEMES[theme][mode] === "bg-white" ? "text-black" : "text-white";
  const iconColor = THEMES[theme][mode] === "bg-white" ? "black" : "white";

  // Navigation Logic
  const currentMonthIndex = year * 12 + month;
  const today = new Date();
  const todayMonthIndex = today.getFullYear() * 12 + today.getMonth();

  let minIndex = todayMonthIndex;
  let maxIndex = todayMonthIndex;

  if (markedDates.length > 0) {
    const indices = markedDates.map((d) => {
      const [y, m] = d.split("-").map(Number);
      return y * 12 + (m - 1);
    });
    minIndex = Math.min(...indices, todayMonthIndex);
    maxIndex = Math.max(...indices, todayMonthIndex);
  }

  const canGoPrev = currentMonthIndex > minIndex;
  const canGoNext = currentMonthIndex < maxIndex;

  return (
    <View className="p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity
          onPress={() => changeMonth(-1)}
          className={`p-2 ${!canGoPrev ? "opacity-30" : ""}`}
          disabled={!canGoPrev}
        >
          <ChevronLeft size={24} color={iconColor} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${textColor}`}>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </Text>
        <TouchableOpacity
          onPress={() => changeMonth(1)}
          className={`p-2 ${!canGoNext ? "opacity-30" : ""}`}
          disabled={!canGoNext}
        >
          <ChevronRight size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      {/* Days of Week */}
      <View className="flex-row justify-between mb-2">
        {DAYS_OF_WEEK.map((day, index) => (
          <Text
            key={index}
            className={`w-[14%] text-center font-bold ${textColor} opacity-60`}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Days Grid */}
      <View className="flex-row flex-wrap">
        {days.map((day, index) => {
          if (day === null) {
            return <View key={index} className="w-[14%] aspect-square" />;
          }

          const marked = isMarked(day);

          return (
            <View
              key={index}
              className="w-[14%] aspect-square items-center justify-center"
            >
              <View
                className={`w-8 h-8 items-center justify-center rounded-full ${
                  marked ? "bg-orange-500" : ""
                }`}
              >
                <Text
                  className={`text-center ${
                    marked ? "text-white font-bold" : textColor
                  }`}
                >
                  {day}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
