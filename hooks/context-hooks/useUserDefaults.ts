import { useContext } from "react";
import { UserContext } from "@/contexts/user/UserProvider";

export const useUserDefaults = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used inside a UserProvider");
  }

  return context;
};
