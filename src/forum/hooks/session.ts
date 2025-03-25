import { useQuery, useQueryClient } from "@tanstack/react-query";
import { users } from "../utils/data";
import type { User } from "../utils/dataType";
const mockUser = users.find((user) => user.name === "1ureka") || users[0];

export type Session =
  | {
      authenticated: true;
      user: User;
      loading: boolean;
      error: string | null;
    }
  | {
      authenticated: false;
      user: null;
      loading: boolean;
      error: string | null;
    };

// 模擬 API 呼叫來獲取會話資訊
const fetchSession = async (): Promise<Session> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模擬已登入狀態
      resolve({
        authenticated: true,
        user: mockUser,
        loading: false,
        error: null,
      });

      // 若要模擬未登入狀態，可以使用下方程式碼替代上方
      /*
      resolve({
        authenticated: false,
        user: null,
        loading: false,
        error: null,
      });
      */
    }, Math.random() * 1000);
  });
};

// 會話管理 Hook
export const useSession = (): Session => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 1000 * 60 * 5, // 5分鐘內視為新鮮數據
    refetchOnWindowFocus: true, // 當視窗重新獲取焦點時重新獲取
    retry: 1, // 如果獲取失敗，重試一次
  });

  if (isFetching) {
    return {
      authenticated: false,
      user: null,
      loading: true,
      error: null,
    };
  }

  if (error) {
    return {
      authenticated: false,
      user: null,
      loading: false,
      error: error instanceof Error ? error.message : "未知錯誤",
    };
  }

  return (
    data || {
      authenticated: false,
      user: null,
      loading: false,
      error: null,
    }
  );
};

// 登入/登出功能
export const useSessionActions = () => {
  const queryClient = useQueryClient();

  const login = async (credentials: { username: string; password: string }) => {
    // 實際環境中這裡應該呼叫 API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username && credentials.password) {
          // 登入成功，更新快取
          queryClient.setQueryData(["session"], {
            authenticated: true,
            user: { ...mockUser, name: credentials.username },
            loading: false,
            error: null,
          });
          resolve();
        } else {
          reject(new Error("帳號或密碼錯誤"));
        }
      }, 1000);
    });
  };

  const logout = async () => {
    // 實際環境中這裡應該呼叫 API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 登出後更新快取
        queryClient.setQueryData(["session"], {
          authenticated: false,
          user: null,
          loading: false,
          error: null,
        });
        resolve();
      }, 500);
    });
  };

  const refreshSession = () => {
    queryClient.invalidateQueries({ queryKey: ["session"] });
  };

  return { login, logout, refreshSession };
};
