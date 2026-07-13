import { api } from "./api";
import type { PublicSpace } from "../interfaces/PublicSpace";
import type { CreatePublicSpaceRequest } from "../interfaces/CreatePublicSpaceRequest";
import type { UpdatePublicSpaceRequest } from "../interfaces/UpdatePublicSpaceRequest";

export const getPublicSpaces = async (): Promise<PublicSpace[]> => {
    const response = await api.get<PublicSpace[]>("/PublicSpaces");
    return response.data;
};

export const createPublicSpace = async (
    request: CreatePublicSpaceRequest
) => {
    const response = await api.post("/PublicSpaces", request);
    return response.data;
};

export const updatePublicSpace = async (
    id: string,
    request: UpdatePublicSpaceRequest
) => {
    const response = await api.put(`/PublicSpaces/${id}`, request);
    return response.data;
};

export const deletePublicSpace = async (id: string) => {
    await api.delete(`/PublicSpaces/${id}`);
};