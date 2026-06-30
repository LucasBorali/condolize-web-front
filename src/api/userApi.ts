import type { CreateUserRequest } from "../interfaces/CreateUserRequest";
import type { UpdateUserRequest } from "../interfaces/UpdateUserRequest";
import type { User } from "../interfaces/User";
import { api } from "./api";

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>("/User");
    return response.data;
}

export const createUser = async (request: CreateUserRequest) => {
     const response = await api.post("/User", request);

    return response.data;
}

export const updateUser = async (id: string, request: UpdateUserRequest) => {
    const response = await api.put(`/User/${id}`, request)

    return response.data
}

export const deleteUser = async (id:string) => {
    await api.delete(`/User/${id}`);
}