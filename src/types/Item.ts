import {MovieDBResult} from "./theMovieDB";

export class Item {

    type: "movie" | "simple";
    payload: MovieDBResult | SimpleItem;
    audit: Audit;

    constructor(type: "movie" | "simple",
                payload: MovieDBResult | SimpleItem,
                audit: Audit
    ) {
        this.type = type;
        this.payload = payload;
        this.audit = audit;
    }

}

export class Audit {
    creatorId: string;
    creatorName: string;
    createdDate: string;

    constructor(creatorId: string, creatorName: string) {
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.createdDate = new Date().toISOString();
    }
}

export class SimpleItem {
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}
