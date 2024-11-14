import { useState, useEffect } from "react";
import { useAdmin } from "../../hooks/useAdmin";
import { Link } from "react-router-dom";
import ComputerModal from "../modal/computerModal/ComputerModal";
import styles from "./styles.module.css";

import { ClipLoader } from "react-spinners";
import { useFormattedDate } from "../../util/useFormattedDate";
import { useAuth } from "../../hooks/useAuth";

const Computers = () => {
  const { computers, loading, error, list } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState("");
  const [filteredComputers, setFilteredComputers] = useState(computers);
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    list();
  }, [list]);

  useEffect(() => {
    const exactFiltered = computers.filter((computer) => {
      const findByComputerId =
        searchTerm === "" || computer.id.toString() === searchTerm;
      const findByStore =
        filteredStores === "" || computer.loja === filteredStores;
      return findByComputerId && findByStore;
    });
    setFilteredComputers(exactFiltered);
  }, [searchTerm, computers, filteredStores]);

  const uniqueStores = Array.from(new Set(computers.map((comp) => comp.loja)));
  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="white" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/public/1704308192_logofs.png" width={150} alt="logo" />{" "}
        <h1>Lista de Computadores</h1>
        <div className={styles.filterGroup}>
          <select
            className={styles.seletorLoja}
            name="store"
            id="store"
            value={filteredStores}
            onChange={(e) => setFilteredStores(e.target.value)}
          >
            <option value="">--SELECIONE A LOJA--</option>
            {uniqueStores.map((store) => (
              <option key={store} value={store}>
                LOJA {store}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="PESQUISAR POR COMPUTADOR"
            className={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            Adicionar computador
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </div>
      {filteredComputers.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>MAC</th>
              <th className={styles.th}>Nome do Host</th>
              <th className={styles.th}>Processador</th>
              <th className={styles.th}>Tamanho da RAM (GB)</th>
              <th className={styles.th}>Data de Instalação</th>
              <th className={styles.th}>Sistema Operacional</th>
              <th className={styles.th}>IP</th>
              <th className={styles.th}>Loja</th>
              <th className={styles.th}>Data Atual</th>
            </tr>
          </thead>
          <tbody>
            {filteredComputers.map((computer) => (
              <tr key={computer.id} className={styles.tr}>
                <td className={styles.td}>
                  <Link to={`/dashboard/computadores/${computer.id}`}>
                    {computer.id}
                  </Link>
                </td>
                <td className={styles.td}>{computer.mac}</td>
                <td className={styles.td}>{computer.localHostName}</td>
                <td className={styles.td}>{computer.processador}</td>
                <td className={styles.td}>{computer.ramSize} GB</td>
                <td className={styles.td}>{computer.dataDeInstalacao}</td>
                <td className={styles.td}>{computer.sistemaOperacional}</td>
                <td className={styles.td}>{computer.ip}</td>
                <td className={styles.td}>{computer.loja}</td>
                <td className={styles.td}>
                  {useFormattedDate(computer.dataAtual)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.noData}>Nenhum computador encontrado.</div>
      )}
      {showModal && <ComputerModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Computers;
