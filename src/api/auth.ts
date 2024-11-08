import api from "../util/api";

export const login = async (
  login: string,
  password: string
): Promise<string> => {
  const response = await api.post("/auth/login", { login, password });

  if (response.status !== 200) {
    throw new Error("Login failed");
  }

  const data = await response.data.token;

  return data;
};
