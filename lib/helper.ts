import { IntervalsType } from "@/types/types";
export const getTimeInMins = (intervals: IntervalsType) => {
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
  const timeSpendInMins = Math.floor(seconds / 60);

  return timeSpendInMins;
};
