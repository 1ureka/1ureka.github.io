import { useQuery } from "@tanstack/react-query";
import { fetchNotificationCount, fetchNotifications } from "../data/notification";
import type { FetchNotificationsParams } from "../data/notification";

const staleTime = 1000 * 60 * 1; // 1 分鐘

const useNotifications = (params: FetchNotificationsParams) => {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => fetchNotifications(params),
    staleTime,
  });
};

const useNotificationCount = () => {
  return useQuery({
    queryKey: ["notificationCounts"],
    queryFn: fetchNotificationCount,
    staleTime,
  });
};

export { useNotifications, useNotificationCount };
