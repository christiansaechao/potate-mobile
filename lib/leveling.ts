export function expNeededForLevel(current_level: number): number {
  // Level 1 = 0 XP, Level 2 = 100 XP, Level 3 ~= 282 XP, Level 4 ~= 519 XP
  return Math.floor(Math.pow(current_level - 1, 1.5) * 100);
}

export function calculateLevel(total_exp: number): number {
  return Math.floor(Math.pow(total_exp / 100, 1 / 1.5)) + 1;
}

export function calculateCurrentExp(
  current_level: number,
  total_exp: number
): number {
  return Math.max(0, total_exp - expNeededForLevel(current_level));
}

export function calculateExpForNextLevel(level: number): number {
  return expNeededForLevel(level + 1) - expNeededForLevel(level);
}
