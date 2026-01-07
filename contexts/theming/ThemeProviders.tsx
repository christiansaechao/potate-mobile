import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { COLORS } from "../../constants/theme";
import { AppTheme, TimerMode } from "../../types/types";
import { UserContext } from "../user/UserProvider";

interface ThemeContextType {
  theme: AppTheme;
  colors: (typeof COLORS)["default"];
  setTheme: (theme: AppTheme) => void;
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  colors: COLORS.default,
  setTheme: () => {},
  mode: TimerMode.FOCUS,
  setMode: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const systemColorScheme = useColorScheme();
  const { theme: userTheme, updateUser, ...userData } = useContext(UserContext);

  const [theme, setThemeState] = useState<AppTheme>(
    (userTheme as AppTheme) ||
      (systemColorScheme === "dark" ? "dark" : "default")
  );
  const [mode, setMode] = useState<TimerMode>(TimerMode.FOCUS);

  // Sync with system theme changes (only if user hasn't set a preference? Or user preference overrides?)
  // Let's make user preference override.
  // actually, if userTheme exists (and isn't just "potate" default if we want system default), use it.
  // DB default is "potate" (which isn't valid AppTheme).
  // AppTheme = "default" | "dark" | "dracula" | ...

  useEffect(() => {
    if (userTheme && userTheme !== "potate") {
      setThemeState(userTheme as AppTheme);
    }
  }, [userTheme]);

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    updateUser({ ...userData, theme: newTheme });
  };

  const colors = COLORS[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
