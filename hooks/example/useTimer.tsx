import { DEFAULT_TIMES } from "@/constants/constants";
import { TimerMode, TimerState } from "@/types";

import { useEffect, useRef, useState } from "react";

/**
 * Functions Inside
 * switchMode
 * resetTimer
 * setInterval (timer)
 */

const useTimer = () => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.FOCUS);
  const [time, setTime] = useState(DEFAULT_TIMES[TimerMode.FOCUS]); // default time is 25 minutes
  const [state, setState] = useState(TimerState.IDLE);

  const timerId = useRef<number | null>(null);

  function toggleTimer() {
    setState((prev) =>
      prev === TimerState.RUNNING ? TimerState.PAUSED : TimerState.RUNNING
    );
  }

  function switchMode(mode: TimerMode) {
    setMode(mode);
    setTime(DEFAULT_TIMES[mode]);
    setState(TimerState.IDLE);

    if (timerId.current) clearInterval(timerId.current);
  }

  function resetTimer() {
    setTime(DEFAULT_TIMES[TimerMode.FOCUS]);
    setState(TimerState.IDLE);
  }

  function timer() {
    timerId.current = setInterval(() => setTime((time) => time - 1), 1000);
  }

  useEffect(() => {
    if (state !== TimerState.RUNNING) return;

    timer();

    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, [mode, state]);

  return { time, mode, switchMode, resetTimer, toggleTimer };
};

const Timer = () => {
  const { time, mode, switchMode, resetTimer, toggleTimer } = useTimer();

  return (
    <div>
      {time}
      <button onClick={() => toggleTimer()}>Start</button>
      <button onClick={() => switchMode("mode")}>switch mode</button>
      <button onClick={resetTimer}>Reset Time</button>
    </div>
  );
};
