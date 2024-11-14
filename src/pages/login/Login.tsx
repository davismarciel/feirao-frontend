import { useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { login as apiLogin } from "../../api/auth";
import styles from "./login.module.css";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = await apiLogin(username, password);
      login(token);
    } catch (err) {
      console.log(err);
      setError("Erro no login. Por favor, verifique suas credenciais.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.loginBox}>
            <img
              src="/public/1704308192_logofs.png"
              alt="logo"
              className={styles.logo}
            />
            <h2>Área de acesso</h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="login"
                placeholder="Digite seu login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <button type="submit" className={styles.loginButton}>
              Acessar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
