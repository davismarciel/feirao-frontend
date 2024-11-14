import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin";
import { useAuth } from "../../hooks/useAuth";
import ClipLoader from "react-spinners/ClipLoader";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import styles from "./styles.module.css";
import { useFormattedDate } from "../../util/useFormattedDate";

const ComputerDetail = () => {
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { findById, loading, error, computer, destroy, edit } = useAdmin();
  const [formData, setFormData] = useState(computer);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && token && (!computer || computer.id !== Number(id))) {
      findById(id, token);
    }
  }, [id, findById, computer, token]);

  useEffect(() => {
    setFormData(computer);
  }, [computer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? { ...prevData, [name]: value } : prevData
    );
  };

  const handleEdit = async () => {
    if (id && formData) {
      await edit(id, formData);
      location.reload();
    }
  };

  if (!token) {
    return <div>Token não encontrado. Por favor, faça login novamente.</div>;
  }

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!computer) {
    return <div>No computer found</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Voltar
      </button>
      <h1 className={styles.header}>Detalhes do Computador</h1>
      <form>
        <label>
          ID: <input type="text" name="id" value={formData?.id} disabled />
        </label>
        <label>
          MAC:{" "}
          <input
            type="text"
            name="mac"
            value={formData?.mac || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Local Host Name:{" "}
          <input
            type="text"
            name="localHostName"
            value={formData?.localHostName || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Processador:{" "}
          <input
            type="text"
            name="processador"
            value={formData?.processador || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          RAM Size:{" "}
          <input
            type="number"
            name="ramSize"
            value={formData?.ramSize || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Data de Instalação:{" "}
          <input
            type="text"
            name="dataDeInstalacao"
            value={formData?.dataDeInstalacao || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Sistema Operacional:{" "}
          <input
            type="text"
            name="sistemaOperacional"
            value={formData?.sistemaOperacional || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          IP:{" "}
          <input
            type="text"
            name="ip"
            value={formData?.ip || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Loja:{" "}
          <input
            type="text"
            name="loja"
            value={formData?.loja || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Data Atual:{" "}
          <input
            type="text"
            name="dataAtual"
            value={useFormattedDate(formData?.dataAtual || "")}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <div className={styles.buttonContainer}>
        <Link
          to="/dashboard/computadores"
          className={`${styles.actionButton} ${styles.editButton}`}
          onClick={handleEdit}
        >
          <IoMdCreate /> Editar
        </Link>
        <Link
          to="/dashboard/computadores"
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => destroy(computer?.id.toString())}
        >
          <IoMdTrash /> Deletar
        </Link>
      </div>
    </div>
  );
};

export default ComputerDetail;
