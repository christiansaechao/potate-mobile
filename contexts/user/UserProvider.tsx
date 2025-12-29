import { createContext, useState, useEffect } from "react";
import { DEFAULT_TIMES } from "@/constants/constants";
import { TimerMode } from "@/types/types";
import UserOps from "@/lib/settings";
import { IUserContext } from "@/types/settings.types";

export const UserContext = createContext<IUserContext>({
  name: "",
  email: "",
  focus_duration: DEFAULT_TIMES[TimerMode.FOCUS],
  short_break_duration: DEFAULT_TIMES[TimerMode.SHORT_BREAK],
  long_break_duration: DEFAULT_TIMES[TimerMode.LONG_BREAK],
  vibration: false,
  weekly_goal: 5,
  exp: 0,
  level: 0,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserContext | undefined>();
  useEffect(() => {
    const getUserData = async () => {
      const users = await UserOps.getUser();

      if (!users || users.length === 0) {
        throw new Error("There was in issue when trying to get user data");
      }

      const userData = users[0];
      setUser({
        name: userData.name ?? "",
        email: userData.email ?? "",
        focus_duration:
          userData.focus_duration ?? DEFAULT_TIMES[TimerMode.FOCUS],
        short_break_duration:
          userData.short_break_duration ?? DEFAULT_TIMES[TimerMode.SHORT_BREAK],
        long_break_duration:
          userData.long_break_duration ?? DEFAULT_TIMES[TimerMode.LONG_BREAK],
        vibration: (userData.vibration ?? 0) === 1,
        weekly_goal: userData.weekly_goal ?? 5,
        exp: userData.exp ?? 0,
        level: userData.level ?? 0,
      });
    };

    getUserData();
  }, []);

  return (
    <UserContext
      value={
        user ?? {
          name: "",
          email: "",
          focus_duration: DEFAULT_TIMES[TimerMode.FOCUS],
          short_break_duration: DEFAULT_TIMES[TimerMode.SHORT_BREAK],
          long_break_duration: DEFAULT_TIMES[TimerMode.LONG_BREAK],
          vibration: false,
          weekly_goal: 5,
          exp: 0,
          level: 0,
        }
      }
    >
      {children}
    </UserContext>
  );
};
