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

type GetSession = () => Promise<Session>;

const getSession: GetSession = async () => {
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
  const result = await SQLiteClient.exec(sql, { $userId: storedSession.user.id });

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
// 匯出
// ----------------------------

export { login, getSession, logout, register };
