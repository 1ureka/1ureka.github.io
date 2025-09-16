import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetDatabase, insertRow, updateRow, deleteRows, deleteRowsByIds } from "../data/update";

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

export const useInsertRow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertRow,
    onSuccess: (result) => {
      if (result.success) {
        // 刷新相關查詢
        queryClient.invalidateQueries({ queryKey: ["getRows"] });
        queryClient.invalidateQueries({ queryKey: ["getTotalRows"] });
        console.log("新增資料成功");
      } else {
        console.error(result.error);
      }
    },
    onError: (error) => {
      console.error("新增資料失敗:", error);
    },
  });
};

export const useUpdateRow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRow,
    onSuccess: (result) => {
      if (result.success) {
        // 刷新相關查詢
        queryClient.invalidateQueries({ queryKey: ["getRows"] });
        console.log("更新資料成功");
      } else {
        console.error(result.error);
      }
    },
    onError: (error) => {
      console.error("更新資料失敗:", error);
    },
  });
};

export const useDeleteRows = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRows,
    onSuccess: (result) => {
      if (result.success) {
        // 刷新相關查詢
        queryClient.invalidateQueries({ queryKey: ["getRows"] });
        queryClient.invalidateQueries({ queryKey: ["getTotalRows"] });
        console.log(`成功刪除 ${result.rowsAffected} 筆資料`);
      } else {
        console.error(result.error);
      }
    },
    onError: (error) => {
      console.error("刪除資料失敗:", error);
    },
  });
};

export const useDeleteRowsByIds = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRowsByIds,
    onSuccess: (result) => {
      if (result.success) {
        // 刷新相關查詢
        queryClient.invalidateQueries({ queryKey: ["getRows"] });
        queryClient.invalidateQueries({ queryKey: ["getTotalRows"] });
        console.log(`成功刪除 ${result.rowsAffected} 筆資料`);
      } else {
        console.error(result.error);
      }
    },
    onError: (error) => {
      console.error("批次刪除失敗:", error);
    },
  });
};

export { useResetDatabase };
