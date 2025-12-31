import { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "react-native";

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
import { TimerControls } from "../../components/potato/TimerControls";
import { TimerDisplay } from "../../components/potato/TimerDisplay";
import { LevelDisplay } from "@/components/potato/LevelDisplay";

import { THEMES } from "../../constants/constants";

import { useTheme } from "@/hooks/context-hooks/useTheme";

import { useUserDefaults } from "@/hooks/context-hooks/useUserDefaults";

export default function App() {
  // hook calls
  const user = useUserDefaults();
  const { theme, mode, setMode } = useTheme();
  const { StartSession, StopSession, StartInterval, StopInterval } =
    useSessionManager();
  useNotifications();

  // states
  const [health, setHealth] = useState(100);
  const [quote, setQuote] = useState<PotatoQuote>({
    text: "Ready to lock in?",
    mood: "happy",
  });
  const [exp, setExp] = useState<number>(user.exp ?? 0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const timeToCallQuote = 300;
  const backgroundColor = THEMES[theme][mode];

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
    setExp,
    user
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

  const progress = useMemo(() => {
    const totalMinutes = user?.[mode];
    if (totalMinutes == null || totalMinutes <= 0) return 0;

    const totalSeconds = totalMinutes * 60;
    const pct = ((totalSeconds - timeLeft) / totalSeconds) * 100;
    return Math.max(0, Math.min(100, pct));
  }, [mode, timeLeft, user]);

  const timeLabel = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    return `${mm}:${ss}`;
  }, [timeLeft]);

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

  return (
    <SafeAreaView
      className={`flex-1 transition-colors duration-300 ${backgroundColor}`}
    >
      <View className="flex-1 items-center justify-between py-6 px-4 pb-24">
        <Header
          isSound={isSoundEnabled}
          toggleSound={() => setIsSoundEnabled((p) => !p)}
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
