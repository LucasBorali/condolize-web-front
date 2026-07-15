export interface Reservation {
    id: string;
    publicSpaceId: string;
    publicSpaceName: string;

    userId: string;
    userName: string;

    startDate: string;
    endDate: string;

    notes?: string;
}