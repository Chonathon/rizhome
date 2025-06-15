export interface Genre {
    id: string;
    name: string;
}

export interface GenresJSON {
    count: number;
    genres: Genre[];
    date: string;
}

export interface Tag {
    name: string;
    count: number;
}

export interface Artist {
    id: string;
    name: string;
    tags: Tag[];
    location?: string;
    startDate?: string;
}

export interface ArtistJSON {
    count: number;
    artists: Artist[];
    links: ArtistLink[];
    date: string;
    genre: string;
}

export type ArtistLink = [string, string];