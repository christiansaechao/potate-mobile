import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PotatoQuote, TimerState } from "../../types/types";
// hooks
import { useSessionManager } from "@/hooks/useSessionManager";
import { useFocusHealth } from "../../hooks/useFocusHealth";
import { useTimer } from "../../hooks/useTimer";

import { Header } from "../../components/potato/Header";
import { HealthBar } from "../../components/potato/HealthBar";
import { ModeSwitcher } from "../../components/potato/ModeSwitcher";
import { PotatoArea } from "../../components/potato/PotatoArea";
import { ProgressBar } from "../../components/potato/ProgressBar";
import { ThemeSelector } from "../../components/potato/ThemeSelector";
import { TimerControls } from "../../components/potato/TimerControls";
import { TimerDisplay } from "../../components/potato/TimerDisplay";

import { DEFAULT_TIMES, THEMES } from "../../constants/constants";

import { useTheme } from "../../hooks/useTheme";

export default function App() {
  const [health, setHealth] = useState(100);
  const [quote, setQuote] = useState<PotatoQuote>({
    text: "Ready to lock in?",
    mood: "happy",
  });
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const { StartSession, StopSession, StartInterval, StopInterval } =
    useSessionManager();

  const {
    mode,
    state,
    timeLeft,
    switchMode,
    toggleTimer,
    resetTimer,
    fetchQuote,
  } = useTimer(
    health,
    setHealth,
    StartSession,
    StopSession,
    StartInterval,
    StopInterval
  );
  useFocusHealth(state, setHealth, fetchQuote, mode);

  const timeToCallQuote = 300;

  useEffect(() => {
    let mounted = true;

    if (timeLeft % timeToCallQuote === 0) {
      fetchQuote(mode, state, health).then((q) => {
        if (mounted) setQuote(q as PotatoQuote);
      });
    }

    return () => {
      mounted = false;
    };
  }, [mode, timeLeft, state, health, fetchQuote]);

  const progress = useMemo(() => {
    const total = DEFAULT_TIMES[mode];
    if (!total) return 0;
    return ((total - timeLeft) / total) * 100;
  }, [mode, timeLeft]);

  const timeLabel = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    return `${mm}:${ss}`;
  }, [timeLeft]);

  const backgroundColor = THEMES[theme][mode];

  return (
    <SafeAreaView
      className={`flex-1 transition-colors duration-300 ${backgroundColor}`}
    >
      <View className="flex-1 items-center justify-between py-6 px-4">
        <ThemeSelector
          visible={showThemeSelector}
          currentTheme={theme}
          onSelect={setTheme}
          onClose={() => setShowThemeSelector(false)}
        />

        <Header
          isSound={isSoundEnabled}
          toggleSound={() => setIsSoundEnabled((p) => !p)}
          openThemes={() => setShowThemeSelector(true)}
        />

        <ModeSwitcher mode={mode} switchMode={switchMode} />

        <HealthBar health={health} />

        <PotatoArea
          quote={quote}
          mode={mode}
          state={state}
          health={health}
          fetchWisdom={fetchQuote}
          mood={quote.mood}
        />

        <TimerDisplay time={timeLabel} label={TimerState[state]} />

        <TimerControls
          state={state}
          mode={mode}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          switchMode={switchMode}
        />

        <ProgressBar progress={progress} />
      </View>
    </SafeAreaView>
  );
}
