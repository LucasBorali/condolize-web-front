export interface CreateReservationRequest {
    publicSpaceId: string;
    userId: string;

    startDate: string;
    endDate: string;

    notes: string;
}