import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PotatoQuote, TimerState } from "../../types/types";

import { useNotifications } from "@/hooks/useNotifications";
import { useLeaveAppConsequence } from "../../hooks/useLeaveAppConsequence";
import { useTimer } from "../../hooks/useTimer";

import { Header } from "../../components/ui/Header";
import { HealthBar } from "../../components/ui/HealthBar";
import { ModeSwitcher } from "../../components/ui/ModeSwitcher";
import { PotatoArea } from "../../components/ui/PotatoArea";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { ThemeSelector } from "../../components/ui/ThemeSelector";
import { TimerControls } from "../../components/ui/TimerControls";
import { TimerDisplay } from "../../components/ui/TimerDisplay";

import { DEFAULT_TIMES, THEMES } from "../../constants/constants";

import { useTheme } from "../../hooks/useTheme";

export default function App() {
    const [health, setHealth] = useState(80);
    const [quote, setQuote] = useState<PotatoQuote>({
        text: "Ready to lock in?",
        mood: "happy",
    });
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [showThemeSelector, setShowThemeSelector] = useState(false);

    useNotifications();

    const {
        mode,
        state,
        setState,
        timeLeft,
        switchMode,
        toggleTimer,
        resetTimer,
        fetchQuote,
    } = useTimer(health, setHealth);

    useLeaveAppConsequence(state, setHealth, setState, fetchQuote, mode);
    const timeToCallQuote = 300;

    useEffect(() => {
        let mounted = true;

        if (timeLeft % timeToCallQuote === 0) {
            fetchQuote(mode, state, health).then((q) => {
                if (mounted) setQuote(q);
            });
        }

        return () => {
            mounted = false;
        };
    }, [mode, state, health, fetchQuote]);

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
