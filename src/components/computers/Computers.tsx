import { useState, useEffect } from "react";
import { useAdmin } from "../../hooks/useAdmin";
import { Link } from "react-router-dom";
import ComputerModal from "../../components/computerModal/ComputerModal";
import styles from "./styles.module.css";
import { IoMdAddCircle } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { formatDate } from "../../util/formatData";

const Computers = () => {
  const { computers, loading, error, list } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState("");
  const [filteredComputers, setFilteredComputers] = useState(computers);
  const [showModal, setShowModal] = useState(false);

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

  if (loading) {
    return <ClipLoader color="white" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <select
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setShowModal(true)}>
        <IoMdAddCircle />
        <span>ADICIONAR COMPUTADOR</span>
      </button>

      <h1 className={styles.header}>Lista de Computadores</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>MAC</th>
            <th>Nome do Host</th>
            <th>Processador</th>
            <th>Tamanho da RAM (GB)</th>
            <th>Data de Instalação</th>
            <th>Sistema Operacional</th>
            <th>IP</th>
            <th>Loja</th>
            <th>Data Atual</th>
          </tr>
        </thead>
        <tbody>
          {filteredComputers.map((computer) => (
            <tr key={computer.id}>
              <td>
                <Link to={`/dashboard/computadores/${computer.id}`}>
                  {computer.id}
                </Link>
              </td>
              <td>{computer.mac}</td>
              <td>{computer.localHostName}</td>
              <td>{computer.processador}</td>
              <td>{computer.ramSize} GB</td>
              <td>{formatDate(computer.dataDeInstalacao)}</td>
              <td>{computer.sistemaOperacional}</td>
              <td>{computer.ip}</td>
              <td>{computer.loja}</td>
              <td>{formatDate(computer.dataAtual)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <ComputerModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Computers;
