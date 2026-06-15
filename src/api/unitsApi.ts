import type { Unit } from "../interfaces/Unit";
import { api } from "./api";


export const getUnits = async (): Promise<Unit[]> => {
    const response = await api.get<Unit[]>("/Units");
    return response.data;
};

export const createUnit = async (identifier: string) => {
    await api.post<Unit>("/Units", { identifier });
}