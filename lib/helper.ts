import { IntervalsType } from "@/types/types";
export const getTimeInSeconds = (intervals: IntervalsType) => {
  const groupedIntervals =
    intervals?.reduce((acc: Record<number, typeof intervals>, curr) => {
      const key = curr.sessionId;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {}) ?? {};

  // get total time
  const getIntervalTimeInSecs = Object.keys(groupedIntervals).map((key) => {
    const currInterval = groupedIntervals[Number(key)];

    if (currInterval.length === 0) return 0;

    const timeInSecs = currInterval
      .filter((curr) => curr.endTime != null)
      .map((curr) => {
        const timeInMs = curr.endTime! - curr.startTime;
        return Math.floor(timeInMs / 1000);
      });

    const allSecs = timeInSecs.reduce((acc, curr) => acc + curr, 0);

    return allSecs;
  });
  const seconds = getIntervalTimeInSecs.reduce((acc, curr) => acc + curr, 0);

  return seconds;
};

export const formatTime = (seconds: number) => {
  const MINUTE = 60;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  if (seconds >= DAY) {
    const days = Math.floor(seconds / DAY);
    return `${days} day${days !== 1 ? "s" : ""}`;
  }

  if (seconds >= HOUR) {
    const hours = Math.floor(seconds / HOUR);
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  if (seconds >= MINUTE) {
    const minutes = Math.floor(seconds / MINUTE);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  return `${seconds} second${seconds !== 1 ? "s" : ""}`;
};
