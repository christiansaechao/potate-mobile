import { createContext, useState, useEffect } from "react";
import { DEFAULT_TIMES } from "@/constants/constants";
import { TimerMode } from "@/types/types";
import UserOps from "@/lib/settings";
import { IUserContext } from "@/types/settings.types";

export const UserContext = createContext<
  IUserContext & {
    updateUser: (user: IUserContext) => void;
  }
>({
  name: "",
  email: "",
  FOCUS: DEFAULT_TIMES[TimerMode.FOCUS],
  SHORT_BREAK: DEFAULT_TIMES[TimerMode.SHORT_BREAK],
  LONG_BREAK: DEFAULT_TIMES[TimerMode.LONG_BREAK],
  vibration: 0,
  weekly_goal: 5,
  exp: 0,
  level: 0,
  updateUser: () => {},
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
    exp: 0,
    level: 0,
  });

  function updateUser(user: IUserContext) {
    setUser(user);
  }

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
        FOCUS: userData.focus_duration,
        SHORT_BREAK: userData.short_break_duration,
        LONG_BREAK: userData.long_break_duration,
        vibration: userData.vibration,
        weekly_goal: userData.weekly_goal ?? 5,
        exp: userData.exp ?? 0,
        level: userData.level ?? 0,
      });
    };

    getUserData();
  }, []);

  return <UserContext value={{ ...user, updateUser }}>{children}</UserContext>;
};
