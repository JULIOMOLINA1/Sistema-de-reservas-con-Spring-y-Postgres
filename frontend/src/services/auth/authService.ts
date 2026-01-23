import type { AuthResponse, LoginRequest } from "@/common/auth/authTypes";

const API_URL = "http://localhost:8087/api/auth";

export const login = async (request: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Invalid credentials");
  }

  const data: AuthResponse = await response.json();
  localStorage.setItem("admin_token", data.token);
  return data;
};

export const logout = () => {
  localStorage.removeItem("admin_token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("admin_token");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
