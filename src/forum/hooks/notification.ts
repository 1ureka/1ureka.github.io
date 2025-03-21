// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

import { useQuery } from "@tanstack/react-query";
import { notifications } from "../utils/test";

const fakeFetchNotifications = async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), Math.random() * 1000));
  return notifications;
};

// ----------------------------------------
// 實際 Hook
// ----------------------------------------

const staleTime = 1000 * 60 * 5; // 5 分鐘

const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fakeFetchNotifications,
    staleTime,
  });
};

export { useNotifications };
