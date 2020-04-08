// https://developers.themoviedb.org/3/search/multi-search : Object description
interface Movie {
    id: number;
    poster_path: string | null;
    adult: boolean | null;
    media_type: "movie";
    overview: string | null;
    original_title: string;
    title: string;
}

interface TvShow {
    id: number;
    poster_path: string | null;
    adult: boolean | null;
    media_type: "tv";
    overview: string | null;
    original_name: string;
    name: string;
}

interface Person {
    id: number;
    poster_path: string | null;
    adult: boolean;
    media_type: "person";
    name: string;
}

export type MovieDBResult = Movie | TvShow | Person
