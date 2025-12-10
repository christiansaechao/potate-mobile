import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export const useNotifications = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission for notifications not granted");
      }
    };

    requestPermissions();
  }, []);
};
