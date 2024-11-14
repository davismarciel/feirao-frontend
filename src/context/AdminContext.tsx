import React, { createContext, useState, ReactNode } from "react";
import {
  deleteComputer,
  editComputer,
  findComputerById,
  insertComputer,
  listOfComputers,
} from "../api/admin";

import type { AdminContextData } from "../interfaces/AdminContextData";
import type { Computer } from "../types/Computer";
import type { ComputerDTO } from "../DTO/ComputerDTO";

export const AdminContext = createContext<AdminContextData>(
  {} as AdminContextData
);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [computer, setComputer] = useState<Computer | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const list = async () => {
    if (computers.length > 0) return;
    setLoading(true);
    setError(null);
    try {
      const data = await listOfComputers();
      setComputers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const findById = async (
    id: string,
    token: string
  ): Promise<Computer | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const data = await findComputerById(id, token);
      if (!computer || computer.id !== data.id) {
        setComputer(data);
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const insert = async (data: ComputerDTO): Promise<Computer | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const insertData = await insertComputer(data);
      setComputer(insertData);
      setComputers((prevComputers) => [...prevComputers, insertData]);
      location.reload();
      return insertData;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const destroy = async (id: string): Promise<void> => {
    setLoading(false);
    setError(null);
    try {
      if (id) {
        await deleteComputer(id);
        setComputers((prevComputers) =>
          prevComputers.filter((comp) => comp.id.toString() !== id)
        );
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const edit = async (
    id: string,
    data: ComputerDTO
  ): Promise<Computer | undefined> => {
    setLoading(false);
    setError(null);
    try {
      if (id && data) {
        const result = await editComputer(id, data);
        setComputer(result);
        return result;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        computers,
        loading,
        error,
        list,
        findById,
        computer,
        insert,
        destroy,
        edit,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
