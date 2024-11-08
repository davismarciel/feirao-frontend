import type { ComputerDTO } from "../DTO/ComputerDTO";
import type { Computer } from "../types/Computer";

export interface AdminContextData {
  computers: Computer[];
  computer: Computer | undefined;
  loading: boolean;
  error: string | null;
  list: () => Promise<void>;
  findById: (id: string, token: string) => Promise<Computer | undefined>;
  insert(data: ComputerDTO): Promise<Computer | undefined>;
  destroy(id: string): Promise<void>;
  edit(id: string, data: ComputerDTO): Promise<Computer | undefined>;
}
