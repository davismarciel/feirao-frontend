import { useState, type ChangeEvent } from "react";
import { useAdmin } from "../../../hooks/useAdmin";
import styles from "./styles.module.css";
import type { onCloseProps } from "../../../types/OnClose";
import { ClipLoader } from "react-spinners";

const ComputerModal = ({ onClose }: onCloseProps) => {
  const { insert } = useAdmin();
  const [newComputer, setNewComputer] = useState({
    id: Number(),
    mac: "",
    localHostName: "",
    processador: "",
    ramSize: Number(),
    dataDeInstalacao: "",
    sistemaOperacional: "",
    ip: "",
    loja: "",
    dataAtual: Number(),
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComputer({ ...newComputer, [e.target.name]: e.target.value });
  };

  const handleInsert = async () => {
    let isValid = true;

    // Verifica se todos os campos estão preenchidos
    for (const key in newComputer) {
      if (newComputer[key as keyof typeof newComputer] === "") {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    setErrorMessage(""); // Limpa a mensagem de erro se estiver válido
    setLoading(true);

    const result = await insert(newComputer);
    setLoading(false);

    if (result) {
      onClose();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Adicionar Computador</h2>
        <form>
          <input
            type="text"
            name="mac"
            placeholder="MAC"
            onChange={handleInputChange}
            value={newComputer.mac}
          />

          <input
            type="text"
            name="localHostName"
            placeholder="Nome do Host"
            onChange={handleInputChange}
            value={newComputer.localHostName}
          />

          <input
            type="text"
            name="processador"
            placeholder="Processador"
            onChange={handleInputChange}
            value={newComputer.processador}
          />

          <input
            type="number"
            name="ramSize"
            placeholder="Tamanho da RAM (GB)"
            onChange={handleInputChange}
            value={newComputer.ramSize}
          />

          <input
            type="date"
            name="dataDeInstalacao"
            placeholder="Data de Instalação"
            onChange={handleInputChange}
            value={newComputer.dataDeInstalacao}
          />

          <input
            type="text"
            name="sistemaOperacional"
            placeholder="Sistema Operacional"
            onChange={handleInputChange}
            value={newComputer.sistemaOperacional}
          />

          <input
            type="text"
            name="ip"
            placeholder="IP"
            onChange={handleInputChange}
            value={newComputer.ip}
          />

          <input
            type="text"
            name="loja"
            placeholder="Loja"
            onChange={handleInputChange}
            value={newComputer.loja}
          />

          <input
            type="date"
            name="dataAtual"
            placeholder="Data Atual"
            onChange={handleInputChange}
            value={newComputer.dataAtual}
          />

          {/* Exibe a mensagem de erro no final */}
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

          <div className={styles.btnContainer}>
            <button type="button" onClick={handleInsert}>
              {loading ? <ClipLoader /> : "Salvar"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComputerModal;
