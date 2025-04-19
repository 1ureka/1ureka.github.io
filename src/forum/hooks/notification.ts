import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotificationCount, fetchNotifications } from "../data/notification";
import { markAllNotificationsRead, markNotificationRead } from "../data/notification";
import { deleteNotification, deleteAllNotifications } from "../data/notification";
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

const useMarkNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationRead,
    onError: (error) => console.error(`已讀通知失敗: ${error}`),
    onSuccess: ({ error }) => {
      if (error) return console.error(`已讀通知失敗: ${error}`);
      console.log("成功標記為已讀");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notificationCounts"] });
    },
  });
};

const useMarkAllNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onError: (error) => console.error(`已讀所有通知失敗: ${error}`),
    onSuccess: ({ error }) => {
      if (error) return console.error(`已讀所有通知失敗: ${error}`);
      else console.log("成功已讀所有通知");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notificationCounts"] });
    },
  });
};

const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNotification,
    onError: (error) => console.error(`刪除通知失敗: ${error}`),
    onSuccess: ({ error }) => {
      if (error) return console.error(`刪除通知失敗: ${error}`);
      else console.log("成功刪除通知");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notificationCounts"] });
    },
  });
};

const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllNotifications,
    onError: (error) => console.error(`刪除所有通知失敗: ${error}`),
    onSuccess: ({ error }) => {
      if (error) return console.error(`刪除所有通知失敗: ${error}`);
      else console.log("成功刪除所有通知");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notificationCounts"] });
    },
  });
};

export { useNotifications, useNotificationCount };
export { useMarkNotification, useMarkAllNotification };
export { useDeleteNotification, useDeleteAllNotifications };
