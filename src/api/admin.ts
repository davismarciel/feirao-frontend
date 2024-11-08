import type { ComputerDTO } from "../DTO/ComputerDTO";
import type { Computer } from "../types/Computer";
import api from "../util/api";

export const listOfComputers = async (): Promise<Computer[]> => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get("/computador", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Erro ao listar os computadores!");
    }

    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer a requisição: " + error);
  }
};

export const findComputerById = async (
  id: string,
  token: string
): Promise<Computer> => {
  try {
    const response = await api.get(`/computador/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Erro ao listar os computadores!");
    }

    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer a requisição: " + error);
  }
};

export const findByStore = async (store: string): Promise<void> => {
  try {
    const response = await api.get(`/computador/loja/${store}`);

    if (response.status !== 200) {
      throw new Error("Erro ao listar a loja com os computadores!");
    }

    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer a requisição: " + error);
  }
};

export const insertComputer = async (data: ComputerDTO): Promise<Computer> => {
  try {
    const response = await api.post("/computador", {
      ...data,
    });

    if (response.status !== 201) {
      throw new Error("Erro ao inserir computador");
    }

    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer a requisição: " + error);
  }
};

export const deleteComputer = async (id: string): Promise<void> => {
  const response = await api.delete(`/computador/${id}`);
  try {
    if (response.status !== 201) {
      throw new Error("Erro ao inserir computador");
    }

    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer a requisição: " + error);
  }
};

export const editComputer = async (
  id: string,
  data: ComputerDTO
): Promise<Computer | undefined> => {
  const response = await api.put(`/computador/${id}`, { ...data });
  try {
    if (response.status !== 201) {
      throw new Error("Erro ao inserir computador");
    }
    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer a requisição: " + error);
  }
};
