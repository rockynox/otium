import {Item} from "../types/Item";

export class ItemsDatabaseReferenceMock {

    items = {
        "-M4-a1wdVcNWiDaozTE_": {"title": "Rien ne se perd,"},
        "-M42uRDhN-nhn-1YCdC5": {"title": "rien ne se crée,"},
        "-M4AG6NMoXsdXi0D2Qyc": {"title": "tout se transforme."},
        "-M4DPqnHilxo0xbnKLlc": {"title": "Conservation de la matière."},
        "-M4EzqWyHhHAQHSnwWuu": {"title": "Antoine Lavoisier"}
    };

    callback = (arg1: any) => {
    };

    on = (arg1: any, callback: any) => {
        this.callback = callback;
        console.log("Connected.");
        this.callback({val: () => this.items});
    };

    push = () => {
        return {
            set: (item: Item) => new Promise((resolve, reject) => {
                const newId = -Object.keys(this.items).length - 1;
                // @ts-ignore
                this.items[newId] = item;
                this.callback({val: () => this.items});
                console.log("Item added: " + item.title);
                resolve("Added successfuly: " + item.title);
            })
        };
    };

    off = (arg1: any, arg2: any) => console.log("Disconected.");

    child = (itemId: string) => {
        return {
            remove: () => new Promise((resolve => {
                // @ts-ignore
                delete this.items[itemId];
                this.callback({val: () => this.items});
                console.log("Item removed: " + itemId);
            }))
        };
    };
}
