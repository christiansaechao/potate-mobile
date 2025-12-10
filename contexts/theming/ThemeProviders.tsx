import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/theme";
import { AppTheme } from "../../types/types";

interface ThemeContextType {
  theme: AppTheme;
  colors: (typeof Colors)["default"];
  setTheme: (theme: AppTheme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  colors: Colors.default,
  setTheme: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<AppTheme>(
    systemColorScheme === "dark" ? "dark" : "default"
  );

  // Sync with system theme changes
  useEffect(() => {
    setTheme(systemColorScheme === "dark" ? "dark" : "default");
  }, [systemColorScheme]);

  const colors = Colors[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
