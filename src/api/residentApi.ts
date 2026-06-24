import type { CreateResidentRequest } from "../interfaces/CreateResidentRequest";
import type { Resident } from "../interfaces/Resident";
import { api } from "./api";

export const getResidents = async () => {
    const response = await api.get<Resident[]>("/residents");
    return response.data;
};

export const createResident = async (request: CreateResidentRequest) => {
    const response = await api.post<Resident>("/residents", request);
    return response.data;
}