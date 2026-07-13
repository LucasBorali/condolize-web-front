export interface UpdatePublicSpaceRequest {
    name: string;
    description: string;
    capacity: number;
    amenities: string[];
    isActive: boolean;
}