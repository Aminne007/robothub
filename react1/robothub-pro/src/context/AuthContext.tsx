import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  type AccountOrder,
  type AccountRecord,
  seedAccounts,
} from "../data/accounts";

export type Role = "guest" | "user" | "admin";

export type SessionUser = Omit<AccountRecord, "password">;

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  company?: string;
};

type ProfileUpdate = Partial<SessionUser["profile"]> & {
  name?: string;
};

type AuthCtx = {
  user: SessionUser | null;
  accounts: SessionUser[];
  login: (email: string, password: string) => Promise<SessionUser>;
  register: (payload: RegisterPayload) => Promise<SessionUser>;
  logout: () => void;
  updateProfile: (update: ProfileUpdate) => void;
  updateAccountRole: (id: string, role: Exclude<Role, "guest">) => void;
  toggleAccountStatus: (id: string) => void;
  appendOrder: (order: AccountOrder) => void;
};

const SESSION_KEY = "robothub:session";
const ACCOUNTS_KEY = "robothub:accounts";

const sanitizeAccount = (account: AccountRecord): SessionUser => {
  const { password, ...rest } = account;
  return rest;
};

const loadAccounts = (): AccountRecord[] => {
  if (typeof window === "undefined") return seedAccounts;
  const stored = window.localStorage.getItem(ACCOUNTS_KEY);
  if (!stored) return seedAccounts;
  try {
    const parsed = JSON.parse(stored) as AccountRecord[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return seedAccounts;
    }
    return parsed;
  } catch (error) {
    console.warn("Failed to parse stored accounts", error);
    return seedAccounts;
  }
};

const getInitialUser = (): SessionUser | null => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as SessionUser;
  } catch (error) {
    console.warn("Failed to parse session", error);
    return null;
  }
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<AccountRecord[]>(loadAccounts);
  const [user, setUser] = useState<SessionUser | null>(getInitialUser);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!user) {
      window.localStorage.removeItem(SESSION_KEY);
      return;
    }
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const latest = accounts.find(account => account.id === user.id);
    if (!latest) {
      setUser(null);
      return;
    }
    const sanitized = sanitizeAccount(latest);
    const hasChanged = JSON.stringify(user) !== JSON.stringify(sanitized);
    if (hasChanged) {
      setUser(sanitized);
    }
  }, [accounts, user]);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const account = accounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());

    if (!account || account.password !== password) {
      throw new Error("Invalid credentials");
    }

    if (account.status === "banned") {
      throw new Error("Account disabled");
    }

    const session = sanitizeAccount(account);
    setUser(session);
    return session;
  };

  const register = async ({ name, email, password, company }: RegisterPayload) => {
    await new Promise(resolve => setTimeout(resolve, 400));

    const exists = accounts.some(account => account.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error("Email already registered");
    }

    const newAccount: AccountRecord = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: "user",
      status: "active",
      joinedAt: new Date().toISOString().slice(0, 10),
      profile: {
        company,
        bio: "New builder exploring RobotHub.",
      },
      orders: [],
    };

    setAccounts(prev => [...prev, newAccount]);
    const session = sanitizeAccount(newAccount);
    setUser(session);
    return session;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (update: ProfileUpdate) => {
    if (!user) return;

    const { name, ...profileUpdates } = update;

    setAccounts(prev =>
      prev.map(account => {
        if (account.id !== user.id) return account;
        return {
          ...account,
          name: name ?? account.name,
          profile: {
            ...account.profile,
            ...profileUpdates,
          },
        };
      }),
    );
  };

  const updateAccountRole = (id: string, role: Exclude<Role, "guest">) => {
    setAccounts(prev =>
      prev.map(account => (account.id === id ? { ...account, role } : account)),
    );
  };

  const toggleAccountStatus = (id: string) => {
    setAccounts(prev =>
      prev.map(account =>
        account.id === id
          ? { ...account, status: account.status === "active" ? "banned" : "active" }
          : account,
      ),
    );
  };

  const appendOrder = (order: AccountOrder) => {
    if (!user) return;
    setAccounts(prev =>
      prev.map(account =>
        account.id === user.id
          ? { ...account, orders: [order, ...account.orders] }
          : account,
      ),
    );
  };

  const sanitizedAccounts = useMemo(() => accounts.map(sanitizeAccount), [accounts]);

  const value: AuthCtx = {
    user,
    accounts: sanitizedAccounts,
    login,
    register,
    logout,
    updateProfile,
    updateAccountRole,
    toggleAccountStatus,
    appendOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
