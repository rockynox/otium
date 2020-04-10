import {MovieDBResult} from "./theMovieDB";
import {User} from "./User";

export class Item {
    id: string = "";
    type: "movie" | "simple";
    payload: MovieDBResult | SimpleItem;
    audit: Audit;
    viewedBy: User[] = [];

    constructor(type: "movie" | "simple",
                payload: MovieDBResult | SimpleItem,
                audit: Audit
    ) {
        this.viewedBy = [];
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
