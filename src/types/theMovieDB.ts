// https://developers.themoviedb.org/3/search/multi-search : Object description
export enum MEDIA_TYPE {
    movie = "movie",
    tv = "tv",
    person = "person"
}

export interface Movie {
    id: number;
    poster_path: string | null;
    adult: boolean | null;
    media_type: MEDIA_TYPE.movie;
    overview: string | null;
    original_title: string;
    title: string;
    release_date: string
}

export interface TvShow {
    id: number;
    poster_path: string | null;
    adult: boolean | null;
    media_type: MEDIA_TYPE.tv;
    overview: string | null;
    original_name: string;
    name: string;
}

export interface Person {
    id: number;
    poster_path: string | null;
    adult: boolean;
    media_type: MEDIA_TYPE.person;
    name: string;
}

export type MovieDBResult = Movie | TvShow | Person
