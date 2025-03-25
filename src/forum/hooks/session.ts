import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tryCatch } from "@/utils/tryCatch";
import { users } from "../utils/data";
import type { User } from "../utils/dataType";

// localStorage key 常數
const SESSION_STORAGE_KEY = "forum_session";
const mockUser = users.find((user) => user.name === "1ureka") || users[0];

// 從 localStorage 獲取儲存的會話資訊
const getStoredSession = async () => {
  const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!storedSession) return null;

  const result = await tryCatch(Promise.resolve(JSON.parse(storedSession)));
  if (result.error) {
    console.error("讀取儲存的會話資訊失敗", result.error);
    return null;
  }
  return result.data as Session;
};

// 將會話資訊儲存到 localStorage
const storeSession = async (session: Session): Promise<void> => {
  const result = await tryCatch(Promise.resolve(localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))));

  if (result.error) console.error("儲存會話資訊失敗", result.error);
};

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
  await new Promise((res) => setTimeout(res, Math.random() * 1000));

  const storedSession = await getStoredSession();
  if (storedSession && storedSession.authenticated) return storedSession;

  return { authenticated: false, user: null, loading: false, error: null };
};

// 會話管理 Hook
export const useSession = (): Session => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 1000 * 60 * 5,
  });

  if (isFetching) {
    return { authenticated: false, user: null, loading: true, error: null };
  }

  if (error) {
    return {
      authenticated: false,
      user: null,
      loading: false,
      error: error instanceof Error ? error.message : "未知錯誤",
    };
  }

  return data || { authenticated: false, user: null, loading: false, error: null };
};

// 登入/登出功能
export const useSessionActions = () => {
  const queryClient = useQueryClient();

  // 實際環境中這裡應該呼叫 API
  const login = async (credentials: { username: string; password: string }) => {
    await new Promise((res) => setTimeout(res, 1000));

    if (credentials.username && credentials.password) {
      const sessionData: Session = { authenticated: true, user: mockUser, loading: false, error: null };
      await storeSession(sessionData);
      queryClient.setQueryData(["session"], sessionData);
    } else {
      console.error("帳號或密碼未輸入");
    }
  };

  // 實際環境中這裡應該呼叫 API
  const logout = async () => {
    await new Promise((res) => setTimeout(res, 1000));

    const sessionData: Session = { authenticated: false, user: null, loading: false, error: null };
    localStorage.removeItem(SESSION_STORAGE_KEY);
    queryClient.setQueryData(["session"], sessionData);
  };

  const refreshSession = () => {
    queryClient.invalidateQueries({ queryKey: ["session"] });
  };

  return { login, logout, refreshSession };
};
