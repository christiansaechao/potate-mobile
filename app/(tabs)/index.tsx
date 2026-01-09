import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import { AchievementToast } from "@/components/ui/AchievementToast";
import { Header } from "@/components/potato/Header";
import { HealthBar } from "@/components/potato/HealthBar";
import { LevelDisplay } from "@/components/potato/LevelDisplay";
import { ModeSwitcher } from "@/components/potato/ModeSwitcher";
import { PotatoArea } from "@/components/potato/PotatoArea";
import { ProgressBar } from "@/components/potato/ProgressBar";
import { TimerControls } from "@/components/potato/TimerControls";
import { TimerDisplay } from "@/components/potato/TimerDisplay";
import AnimatedScreen from "@/components/ui/AnimatedScreen";
import { Confetti } from "@/components/potato/Confetti";

// Constants & Types
import { DB_DEFAULT_TIMES } from "@/constants/constants";
import { THEMES } from "@/constants/theme";
import { PotatoQuote, TimerState } from "@/types/types";
import { calculateLevel } from "@/lib/leveling";

// Hooks
import { useTheme } from "@/hooks/context-hooks/useTheme";
import { useUserDefaults } from "@/hooks/context-hooks/useUserDefaults";
import { useLeaveAppConsequence } from "@/hooks/useLeaveAppConsequence";
import { useNotifications } from "@/hooks/useNotifications";
import { useSessionManager } from "@/hooks/useSessionManager";
import { useTimer } from "@/hooks/useTimer";
import { useAmbientMusic } from "@/hooks/useBackgroundMusic";

export default function App() {
  // --- Hooks ---

  const user = useUserDefaults();
  const { theme, mode, setMode } = useTheme();
  const { StartSession, StopSession, StartInterval, StopInterval } =
    useSessionManager();

  const [isSound, setIsSound] = useState(false);
  const toggleSound = () => setIsSound((prev) => !prev);

  useNotifications();

  // --- State ---

  const [health, setHealth] = useState(100);
  const [quote, setQuote] = useState<PotatoQuote>({
    text: "Ready to lock in?",
    mood: "happy",
  });
  const [showConfetti, setShowConfetti] = useState(false);

  // --- Constants ---

  const timeToCallQuote = 300;
  const backgroundColor = THEMES[theme][mode];

  // --- Custom Hooks ---

  const handleUpdateExp = (updater: number | ((prev: number) => number)) => {
    const newExp =
      typeof updater === "function" ? updater(user.exp ?? 0) : updater;
    user.updateUser({
      ...user,
      exp: newExp,
      level: calculateLevel(newExp),
    });
  };

  const {
    state,
    setState,
    timeLeft,
    setTimeLeft,
    switchMode,
    toggleTimer,
    resetTimer,
    fetchQuote,
    achievementToToast,
  } = useTimer(
    mode,
    setMode,
    health,
    setHealth,
    StartSession,
    StopSession,
    StartInterval,
    StopInterval,
    handleUpdateExp,
    user
  );

  useLeaveAppConsequence(
    state,
    setHealth,
    setState,
    setTimeLeft,
    fetchQuote,
    mode,
    handleUpdateExp
  );

  useAmbientMusic(isSound);

  // --- Derived State ---

  const progress = useMemo(() => {
    const totalSeconds = user?.[
      DB_DEFAULT_TIMES[mode] as keyof typeof user
    ] as number;
    if (totalSeconds == null || totalSeconds <= 0) return 0;

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

  // --- Effects ---

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

  // --- Render ---

  return (
    <SafeAreaView
      className={`flex-1 transition-colors duration-300 ${backgroundColor}`}
    >
      <AnimatedScreen>
        <View className="flex-1 items-center justify-between py-6 px-4 pb-24">
          <Header isSound={isSound} toggleSound={toggleSound} />

          <ModeSwitcher mode={mode} switchMode={switchMode} />
          <View className="w-full flex justify-center items-center gap-4 py-2">
            <HealthBar health={health} />
            <LevelDisplay total_exp={user.exp ?? 0} />
          </View>

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
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
          />

          <ProgressBar progress={progress} />
        </View>
      </AnimatedScreen>
      <Confetti show={showConfetti} />
      {achievementToToast && (
        <AchievementToast achievement={achievementToToast} />
      )}
    </SafeAreaView>
  );
}
