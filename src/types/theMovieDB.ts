// https://developers.themoviedb.org/3/search/multi-search : Object description
export interface Movie {
    id: number;
    poster_path: string | null;
    adult: boolean | null;
    media_type: "movie";
    overview: string | null;
    original_title: string;
    title: string;
    release_date: string
}

export interface TvShow {
    id: number;
    poster_path: string | null;
    adult: boolean | null;
    media_type: "tv";
    overview: string | null;
    original_name: string;
    name: string;
}

export interface Person {
    id: number;
    poster_path: string | null;
    adult: boolean;
    media_type: "person";
    name: string;
}

export type MovieDBResult = Movie | TvShow | Person
