import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadDatabase, validateDatabaseFile } from "@/datahub/data/upload";

export const useUploadDatabase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDatabase,
    onSuccess: (result) => {
      if (result.success) {
        // 清除所有查詢快取，因為資料庫已被替換
        queryClient.resetQueries();
        console.log("資料庫上傳成功");
      } else {
        console.error(result.error);
      }
    },
    onError: (error) => {
      console.error("資料庫上傳失敗:", error);
    },
  });
};

export const useValidateDatabaseFile = () => {
  return useMutation({
    mutationFn: validateDatabaseFile,
  });
};