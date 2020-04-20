import {MovieDBResult} from "./theMovieDB";
import {User} from "./User";

export enum Item_TYPE {
    movie = "movie",
    tv = "tv",
    person = "person"
}

export class Item {
    id: string = "";
    type: Item_TYPE;
    payload: MovieDBResult;
    audit: Audit;
    viewedBy: ItemViewer[] = [];


    constructor(type: Item_TYPE,
                payload: MovieDBResult,
                audit: Audit
    ) {
        this.viewedBy = [];
        this.type = type;
        this.payload = payload;
        this.audit = audit;
    }
}

export class ItemViewer {
    viewer: User;
    viewDate: string;
    rating: number | null;

    constructor(viewer: User, rating: number | null = null) {
        this.viewer = viewer;
        this.viewDate = new Date().toISOString();
        this.rating = rating;
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

// export class SimpleItem {
//     title: string;
//
//     constructor(title: string) {
//         this.title = title;
//     }
// }
