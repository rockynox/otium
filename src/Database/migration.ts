import {databaseReference} from "./firebaseConfiguration";
import {Item} from "../types/Item";
import {getSnapshotAsObjectArray} from "./databaseUtils";

export function clearViewers() {
    let items: Item[];
    databaseReference.items.once("value", (snapshot) => {
        items = getSnapshotAsObjectArray(snapshot);
    })
        .then(() => {
                if (items) {
                    const clearedItem = items.map((item: Item) => {
                        delete item.viewedBy;
                        return item;
                    });
                    clearedItem.map((item: Item) => databaseReference.items.child(item.id).set(item));
                }
            }
        );
}
