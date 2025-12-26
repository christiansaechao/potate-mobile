export function expNeededForLevel(current_level: number): number {
    // Level 1 = 0 XP, Level 2 = 75 XP, Level 3 = 300 XP, Level 4 = 675 XP
    return Math.pow(current_level - 1, 2) * 75;
}

export function calculateLevel(total_exp: number): number {
    return Math.floor(Math.sqrt(total_exp / 75)) + 1;
}

export function calculateCurrentExp(current_level: number, total_exp: number): number {
    return Math.max(0, total_exp - expNeededForLevel(current_level));
}

export function calculateExpForNextLevel(level: number): number {
    return expNeededForLevel(level + 1) - expNeededForLevel(level);
}