import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export const useNotifications = () => {
  useEffect(() => {
    // Set notification handler inside useEffect to avoid module-level execution
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission for notifications not granted");
      }
    };

    requestPermissions();
  }, []);
};
