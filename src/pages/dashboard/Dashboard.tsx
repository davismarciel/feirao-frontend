import React from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./style.module.css";
import Computers from "../../components/computers/Computers";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <Computers />
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
