export interface Genre {
    id: string;
    name: string;
    artistCount: number;
}

export interface GenresJSON {
    count: number;
    genres: Genre[];
    links: NodeLink[];
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
    links: NodeLink[];
    date: string;
    genre: string;
}

export interface BasicNode {
    id: string;
    name: string;
}

export interface NodeLink {
    source: string;
    target: string;
}