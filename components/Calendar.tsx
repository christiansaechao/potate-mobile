import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

import { COLORS, HEX_THEMES, THEMES } from "@/constants/theme";
import { useTheme } from "@/hooks/context-hooks/useTheme";
import { formatTime } from "@/lib/helper";
import { CustomText } from "./custom";

// --- Types ---

type CalendarProps = {
  markedDates: string[];
  dailyStats?: Record<
    string,
    { focus: number; shortBreak: number; longBreak: number }
  >;
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
};

// --- Constants ---

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

export default function Calendar({
  markedDates,
  dailyStats,
  selectedDate,
  onSelectDate,
}: CalendarProps) {
  // --- State & Hooks ---

  const [currentDate, setCurrentDate] = useState(new Date());
  const { theme, mode } = useTheme();

  // --- Helpers ---

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
    onSelectDate(null); // Close tooltip on month change
  };

  const isMarked = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return markedDates.includes(dateString);
  };

  const handleDayPress = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    if (selectedDate === dateString) {
      onSelectDate(null);
    } else if (markedDates.includes(dateString)) {
      onSelectDate(dateString);
    }
  };

  // --- Derived State ---

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

  // Theme colors
  const ThemeColor = THEMES[theme][mode];
  const AccentColor = COLORS[theme].text;
  const BorderThemeColor = HEX_THEMES[theme][mode];

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

  // --- Render ---

  return (
    <View className="z-50">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity
          onPress={() => changeMonth(-1)}
          className={`p-2 ${!canGoPrev ? "opacity-30" : ""}`}
          disabled={!canGoPrev}
        >
          <ChevronLeft size={24} color={AccentColor} />
        </TouchableOpacity>
        <CustomText className={`text-xl font-bold ${ThemeColor}`}>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </CustomText>
        <TouchableOpacity
          onPress={() => changeMonth(1)}
          className={`p-2 ${!canGoNext ? "opacity-30" : ""}`}
          disabled={!canGoNext}
        >
          <ChevronRight size={24} color={AccentColor} />
        </TouchableOpacity>
      </View>

      {/* Days of Week */}
      <View className="flex-row justify-between mb-2">
        {DAYS_OF_WEEK.map((day, index) => (
          <CustomText
            key={index}
            className={`w-[14%] text-center font-bold ${ThemeColor} opacity-60`}
          >
            {day}
          </CustomText>
        ))}
      </View>

      {/* Days Grid */}
      <View className="flex-row flex-wrap relative">
        {days.map((day, index) => {
          if (day === null) {
            return <View key={index} className="w-[14%] aspect-square" />;
          }

          const marked = isMarked(day);
          const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;
          const isSelected = selectedDate === dateString;

          // Render Tooltip if selected
          let tooltip = null;
          if (isSelected && dailyStats && dailyStats[dateString]) {
            const stats = dailyStats[dateString];
            const colIndex = index % 7;

            let tooltipPositionClass = "left-1/2 -ml-28"; // Default Center
            let arrowPositionClass = "left-1/2 -ml-3"; // Default Center

            if (colIndex < 2) {
              // Left alignment
              tooltipPositionClass = "left-0";
              arrowPositionClass = "left-4";
            } else if (colIndex > 4) {
              // Right alignment
              tooltipPositionClass = "right-0";
              arrowPositionClass = "right-4";
            }

            tooltip = (
              <View
                className={`absolute -top-40 w-56 ${ThemeColor} rounded-2xl p-4 z-50 shadow-lg ${tooltipPositionClass}`}
              >
                <CustomText
                  className={`${ThemeColor} text-lg font-bold mb-3 text-center border-b border-gray-400/20 pb-1`}
                >
                  {dateString}
                </CustomText>
                <View className="flex-row justify-between mb-2">
                  <CustomText
                    className={`${ThemeColor} text-base font-semibold`}
                  >
                    Focus:
                  </CustomText>
                  <CustomText className={`${ThemeColor} text-base`}>
                    {formatTime(stats.focus)}
                  </CustomText>
                </View>
                <View className="flex-row justify-between mb-2">
                  <CustomText
                    className={`${ThemeColor} text-base font-semibold`}
                  >
                    Short:
                  </CustomText>
                  <CustomText className={`${ThemeColor} text-base`}>
                    {formatTime(stats.shortBreak)}
                  </CustomText>
                </View>
                <View className="flex-row justify-between">
                  <CustomText
                    className={`${ThemeColor} text-base font-semibold`}
                  >
                    Long:
                  </CustomText>
                  <CustomText className={`${ThemeColor} text-base`}>
                    {formatTime(stats.longBreak)}
                  </CustomText>
                </View>
                {/* Triangle pointer */}
                <View
                  className={`absolute -bottom-3 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] ${arrowPositionClass}`}
                  style={{ borderTopColor: BorderThemeColor }}
                />
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={index}
              className="w-[14%] aspect-square items-center justify-center relative z-10"
              onPress={() => handleDayPress(day)}
              disabled={!marked}
            >
              {tooltip}
              <View
                className={`w-8 h-8 items-center justify-center rounded-full ${
                  marked ? "bg-orange-500" : ""
                } ${isSelected ? "border-2 border-white" : ""}`}
              >
                <CustomText
                  className={`text-center ${
                    marked ? "text-white font-bold" : ThemeColor
                  }`}
                >
                  {day}
                </CustomText>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
