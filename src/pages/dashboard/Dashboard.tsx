import styles from "./style.module.css";
import Computers from "../../components/computers/Computers";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Computers />
    </div>
  );
};

export default Dashboard;
