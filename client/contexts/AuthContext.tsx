import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole =
  | "customer"
  | "provider"
  | "admin"
  | "super_admin"
  | "support"
  | "manager";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isVerified: boolean;
  profileImage?: string;
  permissions: string[];
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  customer: [
    "view_services",
    "book_services",
    "view_bookings",
    "rate_providers",
    "chat_providers",
  ],
  provider: [
    "view_services",
    "manage_services",
    "view_bookings",
    "manage_bookings",
    "view_earnings",
    "chat_customers",
    "update_availability",
  ],
  support: [
    "view_users",
    "view_bookings",
    "view_providers",
    "handle_disputes",
    "chat_all",
    "view_reports",
  ],
  manager: [
    "view_users",
    "view_bookings",
    "view_providers",
    "manage_categories",
    "view_analytics",
    "export_data",
    "handle_disputes",
    "manage_support_tickets",
  ],
  admin: [
    "view_users",
    "manage_users",
    "view_bookings",
    "manage_bookings",
    "view_providers",
    "manage_providers",
    "manage_categories",
    "view_analytics",
    "export_data",
    "handle_disputes",
    "manage_support_tickets",
    "manage_content",
    "view_financials",
  ],
  super_admin: [
    "full_access",
    "manage_admins",
    "view_system_logs",
    "manage_system_settings",
    "backup_restore",
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Validate token and get user data
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      // API call to validate token
      const response = await fetch("/api/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem("auth_token");
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { user: userData, token } = await response.json();
      localStorage.setItem("auth_token", token);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const { user: newUser, token } = await response.json();
      localStorage.setItem("auth_token", token);
      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    if (user.role === "super_admin") return true;

    const rolePermissions = ROLE_PERMISSIONS[user.role] || [];
    return (
      rolePermissions.includes(permission) ||
      user.permissions.includes(permission)
    );
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }

    return user.role === role;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    isLoading,
    hasPermission,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
