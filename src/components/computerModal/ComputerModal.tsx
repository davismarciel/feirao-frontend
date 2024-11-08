import { useState, type ChangeEvent } from "react";
import { useAdmin } from "../../hooks/useAdmin";
import styles from "./styles.module.css";
import type { onCloseProps } from "../../types/OnClose";
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComputer({ ...newComputer, [e.target.name]: e.target.value });
  };

  const handleInsert = async () => {
    setLoading(true);
    const result = await insert(newComputer);
    setLoading(true);
    if (result) {
      onClose();
      location.reload();
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
          />
          <input
            type="text"
            name="localHostName"
            placeholder="Nome do Host"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="processador"
            placeholder="Processador"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="ramSize"
            placeholder="Tamanho da RAM (GB)"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dataDeInstalacao"
            placeholder="Data de Instalação"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="sistemaOperacional"
            placeholder="Sistema Operacional"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ip"
            placeholder="IP"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="loja"
            placeholder="Loja"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dataAtual"
            placeholder="Data Atual"
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleInsert} disabled={loading}>
            {loading ? <ClipLoader /> : "Salvar"}
          </button>
          <button type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComputerModal;
