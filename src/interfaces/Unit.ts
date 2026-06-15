import type { Resident } from "./Resident";

export interface Unit {
    id: string;
    identifier: string;
    residentCount: number;
    residents: Resident[];
}