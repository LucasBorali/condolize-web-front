import { api } from "./api";
import type { LoginRequest } from "../interfaces/LoginRequest";
import type { RegisterCondoRequest } from "../interfaces/RegisterCondoRequest";

export const login = async (request: LoginRequest) => {
    const response = await api.post("/Auth", request);

    return response.data;
};

export const register = async (request: RegisterCondoRequest) => {
    const response = await api.post("/Auth/register-association", request);

    return response.data;
};