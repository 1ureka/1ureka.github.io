import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetDatabase } from "../data/update";

const useResetDatabase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetDatabase,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [] });
    },
    onError: (error) => {
      console.error("重置資料庫失敗:", error);
      queryClient.resetQueries({ queryKey: [] });
    },
  });
};

export { useResetDatabase };
