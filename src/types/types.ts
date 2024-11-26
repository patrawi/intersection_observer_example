interface Location {
    name: string;
    type: string;
    dimension: string;
}

interface Episode {
    id: string;
    name: string;
    air_date: string;
    episode: string;
}

export interface Character {
    created?: string;
    episode: Episode[];
    gender?: "Female" | "Male" | "Genderless" | "unknown";
    id?: string;
    image?: string;
    location?: Location;
    name?: string;
    origin?: Location;
    species?: string;
    status?: "Alive" | "Dead" | "unknown";
    type?: string;
}

interface Info {
    count: number;
    next: string;
    pages: number;
    prev?: string;
}

export interface ICharactersRequest {
    info: Info;
    results: Character[];
}
export interface PaginatedResponse<T> {
    info: PaginatedInfo;
    results: T[];
}
export interface PaginatedInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}
