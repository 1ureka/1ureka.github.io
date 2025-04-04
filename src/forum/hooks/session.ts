import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getSession, login, logout, register, editProfile, changePassword } from "../data/session";
import type { Session } from "../data/session";

const staleTime = 1000 * 60 * 5; // 5分鐘

// 會話管理
export const useSession = (): Session => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime,
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

// 登入功能
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};

// 登出功能
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};

// 註冊功能
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};

// 編輯使用者資料
export const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProfile,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};

// 變更密碼
export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
