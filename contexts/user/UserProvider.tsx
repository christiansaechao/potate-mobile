import { createContext, useState, useEffect } from "react";
import { DEFAULT_TIMES, THEMES } from "@/constants/constants";
import { TimerMode } from "@/types/types";
import UserOps from "@/lib/settings";
import { IUserContext } from "@/types/settings.types";

export const UserContext = createContext<
  IUserContext & {
    updateUser: (user: IUserContext) => Promise<void>;
  }
>({
  name: "",
  email: "",
  FOCUS: DEFAULT_TIMES[TimerMode.FOCUS],
  SHORT_BREAK: DEFAULT_TIMES[TimerMode.SHORT_BREAK],
  LONG_BREAK: DEFAULT_TIMES[TimerMode.LONG_BREAK],
  vibration: 0,
  weekly_goal: 5,
  weekly_focus_time_goal: 120, // Default 2 hours
  theme: "default",
  exp: 0,
  level: 0,
  updateUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserContext>({
    name: "",
    email: "",
    FOCUS: DEFAULT_TIMES[TimerMode.FOCUS],
    SHORT_BREAK: DEFAULT_TIMES[TimerMode.SHORT_BREAK],
    LONG_BREAK: DEFAULT_TIMES[TimerMode.LONG_BREAK],
    vibration: 0,
    weekly_goal: 5,
    weekly_focus_time_goal: 120,
    theme: "default",
    exp: 0,
    level: 0,
  });

  async function updateUser(newUser: IUserContext) {
    setUser(newUser);
    try {
      await UserOps.updateUserSettings({
        focus_duration: newUser.FOCUS,
        short_break_duration: newUser.SHORT_BREAK,
        long_break_duration: newUser.LONG_BREAK,
        vibration: newUser.vibration,
        weekly_goal: newUser.weekly_goal,
        weekly_focus_time_goal: newUser.weekly_focus_time_goal,
        theme: newUser.theme,
      });
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const users = await UserOps.getUser();

        if (!users || users.length === 0) {
          throw new Error("There was in issue when trying to get user data");
        }

        const userData = users[0];
        setUser({
          name: userData.name ?? "",
          email: userData.email ?? "",
          FOCUS: userData.focus_duration ?? DEFAULT_TIMES[TimerMode.FOCUS],
          SHORT_BREAK:
            userData.short_break_duration ??
            DEFAULT_TIMES[TimerMode.SHORT_BREAK],
          LONG_BREAK:
            userData.long_break_duration ?? DEFAULT_TIMES[TimerMode.LONG_BREAK],
          vibration: userData.vibration === 1 ? 1 : 0,
          weekly_goal: userData.weekly_goal ?? 5,
          weekly_focus_time_goal: userData.weekly_focus_time_goal ?? 120,
          theme:
            userData.theme && Object.keys(THEMES).includes(userData.theme)
              ? userData.theme
              : "default",
          exp: userData.exp ?? 0,
          level: userData.level ?? 0,
        });
      } catch (error) {
        console.error("getUserData failed in UserDefaultsProvider", { error });
        alert("Oops! We couldn't load your settings. Please try again.");
      }
    };

    getUserData();
  }, []);

  return <UserContext value={{ ...user, updateUser }}>{children}</UserContext>;
};
