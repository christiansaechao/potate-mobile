import { PotatoQuote, TimerMode, TimerState } from "../types/types";

/* -------------------------------------------------------
   FUNNY POTATO QUOTES
--------------------------------------------------------*/

const QUOTES = {
    happy: [
        "Look at us! Productivity? Mashed it. 🥔✨",
        "I’m basically a golden french fry of success right now!",
        "Let’s cook up some focus! I’m feeling crispy!",
        "Your brain is sizzling today—keep going!",
        "Wow… you’re peeling amazing today.",
        "Who needs caffeine? You’ve got pure potato power!",
        "Smol potato believes in you. Yes you.",
        "You’re doing great—like a perfectly seasoned wedge.",
        "This focus session is baked to perfection!",
        "We are thriving. Thriving like sprouts in sunlight.",
        "You’re unstoppable! I’m just along for the ride.",
        "Good vibes only—no rotten roots here!",
        "Every click grows my potato muscles.",
        "My happiness level is at french-fry-tier.",
        "Look at us… just focusing… vibing… iconic.",
        "Keep going! You're potato-ing like a pro.",
        "I feel warm and buttery inside. Thanks.",
        "That task didn’t even stand a chance.",
        "Wow, productivity can taste THIS good?",
        "If we finish this, I’ll treat myself to potato skincare.",
    ],

    angry: [
        "HEY. GET BACK HERE. We had a deal.",
        "If you open TikTok again I *swear*.",
        "STOP DISTRACTING YOURSELF. I’m literally molding.",
        "APP SWITCH AGAIN AND I’M GOING FULL HASHBROWN.",
        "I did NOT wake up today to be ignored.",
        "BRO PLEASE—STAY. JUST STAY. FOCUS.",
        "You're hurting my starch feelings.",
        "Look at your choices. Look at your life.",
        "If your screen time goes up again I’m melting.",
        "WE WERE DOING SO GOOD. WHY?",
        "Do I need to start yelling in tuber language?",
        "Every distraction is like peeling my skin off.",
        "PUT THE PHONE DOWN OR SQUARE UP.",
        "I’m actually seeing red… literally turning into a yam.",
        "If focus was fries, you’re dropping the basket.",
        "I didn’t sign up to be a neglected spud.",
        "You better redeem this session or else…",
        "I bite. And I WILL.",
        "Don't “just check one thing.” LIES.",
        "Try me. TRY ME AGAIN. See what happens.",
    ],

    sleepy: [
        "Can we… not? I’m tired, boss.",
        "I could nap. Right here. On the timer.",
        "Focus… focus… oh no I’m dozing—WAIT.",
        "Wake me when we’re productive again.",
        "I’m like… 2 seconds away from becoming mashed.",
        "My eyes are… closing… continue without me…",
        "What if we rested… forever… hypothetically?",
        "You go on. I’ll just lay here. Peacefully.",
        "If I snore, pretend you didn't hear it.",
        "Why is focusing so much WORK…",
        "I'm a baked potato… literally baked.",
        "Do potatoes get burnout? Asking for me.",
        "Everything feels like slow motion right now.",
        "Coffee. Give me coffee. Or tea. Or dirt.",
        "I’m halfway between nap and existential crisis.",
        "The spirit is willing but the starch is weak.",
        "My thoughts are mashed potatoes right now.",
        "Do we *have* to be productive…?",
        "I’ll rally soon. Probably. Maybe. No promises.",
        "I need rest like fries need ketchup.",
    ],

    chaotic: [
        "AAAAAAAAA THE TIMER IS TICKING DO SOMETHING.",
        "WE ARE NOT OKAY BUT WE MOVE.",
        "I’M LOSING HEALTH LIKE A ROTTEN SPUD.",
        "THE SKY IS FALLING. ALSO YOUR FOCUS.",
        "IF YOU LEAVE AGAIN I WILL COMBUST.",
        "CHAOS. ENERGY. PANIC. MOTIVATION????",
        "I’m about to speedrun a breakdown.",
        "THIS IS YOUR BRAIN ON DISTRACTIONS.",
        "WHO NEEDS FOCUS? NOT ME. (Actually yes me help.)",
        "WHY ARE WE LIKE THIS?",
        "Push the timer. Push it. PUSH IT.",
        "I feel unhinged but in a productive way.",
        "CURRENT MOOD: SPINNING LIKE A MICROWAVE POTATO.",
        "Everything is fine! HAHAHAHA—(it's not).",
        "Help me. Help yourself. Help us ALL.",
        "Your phone is evil. BANISH IT.",
        "I’m vibrating with anxiety AND determination.",
        "IS THIS WHAT MELTING FEELS LIKE??",
        "Okay new plan: panic until successful.",
        "IM ABOUT TO GO CRISPY. LIKE BURNT CRISPY.",
    ],

    cool: [
        "Easy win. We’re just built different.",
        "Too smooth. Too clean. Too focused.",
        "Not even sweating. Potatoes don’t sweat.",
        "Look at that timer. Folded. Effortlessly.",
        "Certified Focus Unit™.",
        "That’s a W. Another one. Add it to the pile.",
        "We chilled. We cooked. We dominated.",
        "Your productivity? Seasoned perfectly.",
        "I stay winning. You too apparently.",
        "Good session. I barely had to do anything.",
        "Cool spud. Cooler results.",
        "Another task completed—no biggie.",
        "We out here being LEGENDARY but calmly.",
        "Stay frosty. Or stay baked. Your choice.",
        "Focus achieved. Style maintained.",
        "You’re like… the CEO of potatoes right now.",
        "Success hits different when you’re chill about it.",
        "Time management? More like time mastery.",
        "Crisp. Clean. No distractions. Nice.",
        "We did it, champ—now let’s walk away dramatically.",
    ],
};

/* -------------------------------------------------------
   SELECT A RANDOM QUOTE
--------------------------------------------------------*/

const pickRandom = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

/* -------------------------------------------------------
   MOOD OVERRIDES BASED ON STATE + HEALTH
--------------------------------------------------------*/

const determineMood = (
    state: TimerState,
    health: number
): PotatoQuote["mood"] => {
    if (state === TimerState.COMPLETED) return "cool";
    if (health < 30) return "chaotic";
    if (health < 60) return "angry";
    return "happy";
};

/* -------------------------------------------------------
   MAIN FUNCTION — DROP-IN REPLACEMENT
--------------------------------------------------------*/

export const getPotatoWisdom = (
    mode: TimerMode,
    state: TimerState,
    health: number
) => {
    const mood = determineMood(state, health);
    const text = pickRandom(QUOTES[mood]);

    return { text, mood };
};
