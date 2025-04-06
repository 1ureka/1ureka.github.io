import { SQLiteClient } from "./SQLiteClient";
import { fetchUserByEmail, fetchUserByName, type FetchUserByNameResult } from "./user";

// 在伺服器中，應該使用更安全的方法，例如 bcrypt 或 PBKDF2
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const SESSION_STORAGE_KEY = "forum_session";
const SESSION_DURATION = 1000 * 60 * 60 * 1; // 1 小時

export type Session =
  | { authenticated: true; user: FetchUserByNameResult; loading: boolean; error: string | null }
  | { authenticated: false; user: null; loading: boolean; error: string | null };

type StoredSession = Session & { timestamp: number };

// ----------------------------
// 登入 (現實中，登入後應該將會話資訊存儲到 http only cookie，前端需要資訊時，從getSession獲取
// 但這裡為了簡化，直接存儲到 localStorage)
// ----------------------------

type LoginParams = { username: string; password: string };
type Login = (params: LoginParams) => Promise<Session>;

const login: Login = async ({ username, password }) => {
  // 1. 查詢使用者
  const user = await fetchUserByName({ name: username });
  if (!user) return { authenticated: false, user: null, loading: false, error: "使用者不存在" };

  // 2. 驗證密碼
  const sql = `
    SELECT id
    FROM users
    WHERE name = $username AND hashedPassword = $hashedPassword
  `;

  const hashedPassword = await hashPassword(password);
  const result = await SQLiteClient.exec(sql, { $username: username, $hashedPassword: hashedPassword });
  if (result.length === 0) {
    return { authenticated: false, user: null, loading: false, error: "密碼錯誤" };
  }

  // 3. 將會話資訊存入 localStorage
  const session: Session = { authenticated: true, user, loading: false, error: null };
  const storedSession: StoredSession = { ...session, timestamp: Date.now() };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storedSession));
  return session;
};

// ----------------------------
// 獲取會話資訊 (現實中應該要從 http only cookie 獲取，但這裡為了簡化，直接從 localStorage 獲取)
// ----------------------------

type GetSession = (options?: { server: boolean }) => Promise<Session>;

const getSession: GetSession = async ({ server } = { server: false }) => {
  // 檢查會話是否存在
  const sessionStr = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionStr) return { authenticated: false, user: null, loading: false, error: null };
  const storedSession = JSON.parse(sessionStr) as StoredSession;

  // 檢查會話是否有效
  if (!storedSession.authenticated) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return { authenticated: false, user: null, loading: false, error: null };
  }

  // 檢查會話是否過期
  const now = Date.now();
  if (now - storedSession.timestamp > SESSION_DURATION) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return { authenticated: false, user: null, loading: false, error: "會話已過期，請重新登入" };
  }

  // 獲取使用者資訊
  const sql = `
    SELECT id, name, description, email
    FROM users
    WHERE id = $userId
    LIMIT 1
  `;
  const result = await SQLiteClient.exec(sql, { $userId: storedSession.user.id }, server);

  // 如果使用者不存在，清除會話
  if (result.length === 0) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return { authenticated: false, user: null, loading: false, error: "使用者不存在" };
  }

  // 更新使用者資訊
  const user = result[0] as FetchUserByNameResult;
  const updatedSession: Session = { ...storedSession, user };

  // 更新時間戳並保存
  const updatedStoredSession: StoredSession = { ...updatedSession, timestamp: now };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedStoredSession));

  return updatedSession;
};

// ----------------------------
// 登出 (現實中，登出後應該清除 http only cookie，但這裡為了簡化，直接清除 localStorage)
// ----------------------------

type Logout = () => Promise<void>;

const logout: Logout = async () => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};

// ----------------------------
// 註冊
// ----------------------------

type RegisterParams = {
  username: string;
  password: string;
  email: string;
  description?: string;
};
type Register = (params: RegisterParams) => Promise<Session>;

const register: Register = async ({ username, password, email, description = "" }) => {
  // 檢查用戶名是否已存在
  const existingUser = await fetchUserByName({ name: username });
  if (existingUser) {
    return { authenticated: false, user: null, loading: false, error: "使用者名稱已存在" };
  }

  // 檢查電子郵件是否已存在
  const existingEmail = await fetchUserByEmail({ email });
  if (existingEmail) {
    return { authenticated: false, user: null, loading: false, error: "電子郵件已被使用" };
  }

  // 建立新使用者
  const hashedPassword = await hashPassword(password);
  const now = new Date().toISOString();

  const sql = `
      INSERT INTO users (name, email, hashedPassword, description, createdAt, updatedAt)
      VALUES ($name, $email, $hashedPassword, $description, $createdAt, $updatedAt)
      RETURNING id, name, description
    `;

  const result = await SQLiteClient.exec(sql, {
    $name: username,
    $email: email,
    $hashedPassword: hashedPassword,
    $description: description,
    $createdAt: now,
    $updatedAt: now,
  });

  if (!result || result.length === 0) {
    return { authenticated: false, user: null, loading: false, error: "註冊失敗" };
  }

  // 自動登入
  const user = result[0] as FetchUserByNameResult;
  const session: Session = { authenticated: true, user, loading: false, error: null };
  const storedSession: StoredSession = { ...session, timestamp: Date.now() };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storedSession));

  return session;
};

// ----------------------------
// 編輯個人資料 (username, email, description) (注意唯一性)
// ----------------------------

type EditProfileParams = {
  userId: number;
  username?: string;
  email?: string;
  description?: string;
};
type EditProfile = (params: EditProfileParams) => Promise<Session>;

const editProfile: EditProfile = async ({ userId, username, email, description }) => {
  // 取得目前的登入狀態
  const currentSession = await getSession({ server: true });
  if (!currentSession.authenticated || currentSession.user.id !== userId) {
    return { authenticated: false, user: null, loading: false, error: "未登入或無權限" };
  }

  // 檢查是否有任何要更新的欄位
  if (!username && !email && description === undefined) {
    return { ...currentSession, error: "沒有要更新的欄位" };
  } else if (
    username === currentSession.user.name &&
    email === currentSession.user.email &&
    description === currentSession.user.description
  ) {
    return { ...currentSession, error: "個人資料沒有任何變更需要更新" };
  }

  // 檢查用戶名唯一性
  if (username && username !== currentSession.user.name) {
    const existingUser = await fetchUserByName({ name: username });
    if (existingUser) {
      return { ...currentSession, error: "使用者名稱已存在" };
    }
  }

  // 檢查電子郵件唯一性
  if (email && email !== currentSession.user.email) {
    const existingEmail = await fetchUserByEmail({ email });
    if (existingEmail) {
      return { ...currentSession, error: "電子郵件已被使用" };
    }
  }

  // 準備更新欄位
  const updateFields: string[] = [];
  const params: Record<string, string | number> = { $userId: userId };

  if (username) {
    updateFields.push("name = $username");
    params.$username = username;
  }

  if (email) {
    updateFields.push("email = $email");
    params.$email = email;
  }

  if (description !== undefined) {
    updateFields.push("description = $description");
    params.$description = description;
  }

  // 添加更新時間
  updateFields.push("updatedAt = $updatedAt");
  params.$updatedAt = new Date().toISOString();

  // 執行更新
  const sql = `
      UPDATE users
      SET ${updateFields.join(", ")}
      WHERE id = $userId
      RETURNING id, name, email, description
    `;

  const result = await SQLiteClient.exec(sql, params);

  if (!result || result.length === 0) {
    return { ...currentSession, error: "更新失敗" };
  }

  // 更新會話資訊
  const user = result[0] as FetchUserByNameResult;
  const session: Session = { authenticated: true, user, loading: false, error: null };
  const storedSession: StoredSession = { ...session, timestamp: Date.now() };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storedSession));

  return session;
};

// ----------------------------
// 變更密碼 (password)
// ----------------------------

type ChangePasswordParams = {
  userId: number;
  currentPassword: string;
  newPassword: string;
};
type ChangePassword = (params: ChangePasswordParams) => Promise<Session>;

const changePassword: ChangePassword = async ({ userId, currentPassword, newPassword }) => {
  // 取得目前的登入狀態
  const currentSession = await getSession({ server: true });
  if (!currentSession.authenticated || currentSession.user.id !== userId) {
    return { authenticated: false, user: null, loading: false, error: "未登入或無權限" };
  }

  // 驗證當前密碼
  const currentHashedPassword = await hashPassword(currentPassword);
  const verifyPasswordSql = `
      SELECT id
      FROM users
      WHERE id = $userId AND hashedPassword = $hashedPassword
    `;

  const verifyResult = await SQLiteClient.exec(verifyPasswordSql, {
    $userId: userId,
    $hashedPassword: currentHashedPassword,
  });

  if (verifyResult.length === 0) {
    return { ...currentSession, error: "當前密碼錯誤" };
  }

  // 更新新密碼
  const newHashedPassword = await hashPassword(newPassword);
  const now = new Date().toISOString();

  const updateSql = `
      UPDATE users
      SET hashedPassword = $hashedPassword,
          updatedAt = $updatedAt
      WHERE id = $userId
    `;

  await SQLiteClient.exec(updateSql, {
    $userId: userId,
    $hashedPassword: newHashedPassword,
    $updatedAt: now,
  });

  return { ...currentSession, error: null };
};

// ----------------------------
// 刪除帳號 (刪除整個 record)
// ----------------------------

type DeleteAccountParams = {
  userId: number;
  //   password: string;
};
type DeleteAccount = (params: DeleteAccountParams) => Promise<{ success: boolean; error: string | null }>;

const deleteAccount: DeleteAccount = async ({ userId }) => {
  // 取得目前的登入狀態
  const currentSession = await getSession({ server: true });
  if (!currentSession.authenticated || currentSession.user.id !== userId) {
    return { success: false, error: "未登入或無權限" };
  }

  // 驗證密碼 (若需要更高安全性的可選項)
  //   const hashedPassword = await hashPassword(password);
  //   const verifyPasswordSql = `
  //       SELECT id
  //       FROM users
  //       WHERE id = $userId AND hashedPassword = $hashedPassword
  //     `;

  //   const verifyResult = await SQLiteClient.exec(verifyPasswordSql, {
  //     $userId: userId,
  //     $hashedPassword: hashedPassword,
  //   });

  //   if (verifyResult.length === 0) {
  //     return { success: false, error: "密碼錯誤" };
  //   }

  // 刪除帳號
  const deleteSql = `
      DELETE FROM users
      WHERE id = $userId
    `;

  await SQLiteClient.exec(deleteSql, { $userId: userId });
  await logout();
  return { success: true, error: null };
};

// ----------------------------
// 匯出
// ----------------------------

export { login, getSession, logout, register, editProfile, changePassword, deleteAccount };
