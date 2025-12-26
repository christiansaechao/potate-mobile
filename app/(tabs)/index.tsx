import { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { PotatoQuote, TimerState } from "../../types/types";

import { useNotifications } from "@/hooks/useNotifications";
import { useSessionManager } from "@/hooks/useSessionManager";
import { useLeaveAppConsequence } from "../../hooks/useLeaveAppConsequence";
import { useTimer } from "../../hooks/useTimer";

import { Header } from "../../components/potato/Header";
import { HealthBar } from "../../components/potato/HealthBar";
import { ModeSwitcher } from "../../components/potato/ModeSwitcher";
import { PotatoArea } from "../../components/potato/PotatoArea";
import { ProgressBar } from "../../components/potato/ProgressBar";
import { ThemeSelector } from "../../components/potato/ThemeSelector";
import { TimerControls } from "../../components/potato/TimerControls";
import { TimerDisplay } from "../../components/potato/TimerDisplay";
import { LevelDisplay } from "@/components/potato/LevelDisplay";

import { DEFAULT_TIMES, THEMES } from "../../constants/constants";

import { View } from "react-native";
import { useTheme } from "../../hooks/useTheme";

import userOps from "@/lib/settings";

export default function App() {
  const [health, setHealth] = useState(100);
  const [quote, setQuote] = useState<PotatoQuote>({
    text: "Ready to lock in?",
    mood: "happy",
  });
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const { theme, setTheme, mode, setMode } = useTheme();
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const [exp, setExp] = useState(0);

  useNotifications();
  const { StartSession, StopSession, StartInterval, StopInterval } =
    useSessionManager();

  const {
    state,
    setState,
    timeLeft,
    setTimeLeft,
    switchMode,
    toggleTimer,
    resetTimer,
    fetchQuote,
  } = useTimer(
    mode,
    setMode,
    health,
    setHealth,
    StartSession,
    StopSession,
    StartInterval,
    StopInterval,
    setExp
  );

  useLeaveAppConsequence(
    state,
    setHealth,
    setState,
    setTimeLeft,
    fetchQuote,
    mode,
    setExp
  );
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
  }, [mode, state, health, fetchQuote, timeLeft]);

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

  useEffect(() => {
    const fetchExp = async () => {
      const result = await userOps.getAllSettings();
      setExp(result.exp ?? 0);
    };
    fetchExp();
  }, []);

  return (
    <SafeAreaView
      className={`flex-1 transition-colors duration-300 ${backgroundColor}`}
    >
      <View className="flex-1 items-center justify-between py-6 px-4 pb-24">
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

        <LevelDisplay total_exp={exp} />

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
