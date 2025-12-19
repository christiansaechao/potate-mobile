import userOps from "@/lib/settings";
import { useEffect, useState } from "react";

export const useOnboardingStatus = () => {
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getUser } = userOps;

  const getData = async () => {
    setIsLoading(true);
    try {
      const user = await getUser();
      setCompleted(user.length > 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { completed, isLoading };
};
