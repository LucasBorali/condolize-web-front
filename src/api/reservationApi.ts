import type { CreateReservationRequest } from "../interfaces/CreateReservationRequest";
import type { Reservation } from "../interfaces/Reservation";
import { api } from "./api";

export const getReservations = async () => {
    const response = await api.get<Reservation[]>("/reservations");
    return response.data;
}

export const createReservation = async (request: CreateReservationRequest) => {
    const response = await api.post<Reservation>("/reservations", request);
    return response.data;
}

// export const updateReservation = async (id: string, request: UpdateReservationRequest) => {
//     const response = await api.put<Reservation>(`/reservations/${id}`, request);
//     return response.data;
// }
export const deleteReservation = async (id: string) => {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
}