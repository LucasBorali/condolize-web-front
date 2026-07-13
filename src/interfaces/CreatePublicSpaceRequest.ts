export interface CreatePublicSpaceRequest {
    name: string;
    description: string;
    capacity: number;
    amenities: string[];
}