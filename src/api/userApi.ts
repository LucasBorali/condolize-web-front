import type { CreateUserRequest } from "../interfaces/CreateUserRequest";
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