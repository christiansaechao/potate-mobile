import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/theme";
import { AppTheme, TimerMode } from "../../types/types";

interface ThemeContextType {
  theme: AppTheme;
  colors: (typeof Colors)["default"];
  setTheme: (theme: AppTheme) => void;
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  colors: Colors.default,
  setTheme: () => {},
  mode: TimerMode.FOCUS,
  setMode: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<AppTheme>(
    systemColorScheme === "dark" ? "dark" : "default"
  );
  const [mode, setMode] = useState<TimerMode>(TimerMode.FOCUS);

  // Sync with system theme changes
  useEffect(() => {
    setTheme(systemColorScheme === "dark" ? "dark" : "default");
  }, [systemColorScheme]);

  const colors = Colors[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
