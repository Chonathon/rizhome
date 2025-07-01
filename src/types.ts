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

export interface LastFMArtistJSON {
    name: string;
    mbid: string;
    image: string;
    ontour: boolean;
    stats: LastFMStats;
    bio: LastFMBio;
    similar: string[];
    date: string; // this is for caching
}

export interface LastFMImage {
    link: string;
    size: string;
}

export interface LastFMStats {
    listeners: number;
    playcount: number;
}

export interface LastFMBio {
    link: string;
    summary: string;
    content: string;
}

export type GraphType = 'genres' | 'artists';