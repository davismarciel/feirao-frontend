export interface AuthContextData {
  loading: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
