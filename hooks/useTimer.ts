import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { DEFAULT_TIMES, EXP_REWARDS } from "../constants/constants";
import { getPotatoWisdom } from "../services/potatoWisdomLocal";
import { SessionType, TimerMode, TimerState } from "../types/types";
import userOps from "@/lib/settings";

type IUseTimer = (
    mode: TimerMode,
    setMode: (mode: TimerMode) => void,
    health: number,
    setHealth: (h: number | ((h: number) => number)) => void,
    StartSession: (mode: string) => Promise<SessionType>,
    StopSession: (h: number, completed?: number) => void,
    StartInterval: (id: number) => void,
    StopInterval: () => void,
    setExp: React.Dispatch<React.SetStateAction<number>>
) => {
    mode: TimerMode;
    state: TimerState;
    setState: React.Dispatch<React.SetStateAction<TimerState>>;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    switchMode: (newMode: TimerMode) => void;
    toggleTimer: () => void;
    resetTimer: () => void;
    fetchQuote: (
        m: TimerMode,
        s: TimerState,
        hp: number
    ) => Promise<{ text: string; mood: string }>;
};

export const useTimer: IUseTimer = (
    mode,
    setMode,
    health,
    setHealth,
    StartSession,
    StopSession,
    StartInterval,
    StopInterval,
    setExp
) => {
    const [state, setState] = useState<TimerState>(TimerState.IDLE);
    const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMES[TimerMode.FOCUS]);
    const [session, setSession] = useState<SessionType | null>(null);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const fetchQuote = useCallback(
        async (m: TimerMode, s: TimerState, hp: number) => {
            return getPotatoWisdom(m, s, hp);
        },
        []
    );

    const switchMode = useCallback(
        (newMode: TimerMode) => {
            // stop everything about the current session
            StopInterval();
            StopSession(health);

            if (timerRef.current) clearInterval(timerRef.current);

            setMode(newMode);
            setState(TimerState.IDLE);
            setTimeLeft(DEFAULT_TIMES[newMode]);
            setSession(null);
        },
        [StopSession, StopInterval, health, setMode]
    );

    const toggleTimer = useCallback(async () => {
        // 🔹 Case 1: IDLE → start a new session
        if (state === TimerState.IDLE) {
            try {
                const sessionRes = await StartSession(mode);
                setSession(sessionRes);
                StartInterval(sessionRes.id);
                setHealth(100);
                setState(TimerState.RUNNING);
            } catch (err) {
                console.error("Failed to start session", err);
            }
            return;
        }

        // 🔹 Case 2: RUNNING → pause (stop interval, keep session)
        if (state === TimerState.RUNNING) {
            StopInterval();
            setState(TimerState.PAUSED);
            return;
        }

        // 🔹 Case 3: PAUSED → resume (reuse existing session.id)
        if (state === TimerState.PAUSED) {
            if (!session?.id) {
                console.warn("No active session to resume");
                return;
            }
            StartInterval(session.id);
            setState(TimerState.RUNNING);
            return;
        }

        // 🔹 Case 4: COMPLETED → start fresh session
        if (state === TimerState.COMPLETED) {
            try {
                setTimeLeft(DEFAULT_TIMES[mode]);
                const sessionRes = await StartSession(mode);
                setSession(sessionRes);
                StartInterval(sessionRes.id);
                setHealth(100);
                setState(TimerState.RUNNING);
            } catch (err) {
                console.error("Failed to start session", err);
            }
            return;
        }
    }, [
        state,
        mode,
        StartSession,
        StartInterval,
        StopInterval,
        setHealth,
        session,
    ]);

    const resetTimer = useCallback(() => {
        StopInterval();
        StopSession(health);

        if (timerRef.current) clearInterval(timerRef.current);

        setState(TimerState.IDLE);
        setTimeLeft(DEFAULT_TIMES[mode]);
        setHealth(100);
        setSession(null);
    }, [mode, setHealth, StopInterval, StopSession, health]);

    // Timer countdown + health regen
    useEffect(() => {
        if (state !== TimerState.RUNNING) return;

        timerRef.current = setInterval(() => {
            // ⏳ countdown
            setTimeLeft((t) => {
                if (t <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    StopSession(health, 1);
                    // Award XP
                    setExp((prev) => {
                        const reward = EXP_REWARDS[mode] + Math.floor(Math.random() * 10) - 5
                        const newExp = prev + reward;
                        userOps.updateUserSettings({ exp: newExp });
                        return newExp;
                    });
                    fetchQuote(mode, TimerState.COMPLETED, health);
                    setState(TimerState.COMPLETED);
                    return 0;
                }
                return t - 1;
            });

            if (AppState.currentState === "active") {
                setHealth((h: number) => Math.min(100, h + 0.05)); // 20secs + 0.05% health
            }
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [state, mode, fetchQuote, health, setHealth, StopSession]);

    return {
        mode,
        state,
        setState,
        timeLeft,
        setTimeLeft,
        switchMode,
        toggleTimer,
        resetTimer,
        fetchQuote,
    };
};
