import {MovieDBResult} from "./theMovieDB";

export interface Item {
    type: "movie" | "simple"
    payload: MovieDBResult | SimpleItem
}

export interface SimpleItem {
    title: string
}
