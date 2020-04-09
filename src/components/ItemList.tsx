import React from "react";
import {Item, SimpleItem} from "../types/Item";
import {databaseReference} from "../database/firebase";
import {useHistory} from "react-router-dom";

type ItemListProps = {
    itemId: string,
    item: Item
}

export const ItemList = (props: ItemListProps) => {

    let history = useHistory();

    function handleClick() {
        history.push("/item/" + props.itemId);
    }

    let handleRemoveItem = (event: any, itemId: string) => {
        event.stopPropagation();
        databaseReference.items.child(itemId).remove()
            .catch((error) => console.error("Fail to delete item. Detail: " + error));
    };
    switch (props.item.type) {
        case "movie":
        case "simple":
            const simpleItem = props.item.payload as SimpleItem;
            return (
                <div key="itemTitle" className="col s10 offset-s1 list-item black"
                     onClick={() => handleClick()}>
                    <h4>
                        {simpleItem.title}
                        <span onClick={(event) => handleRemoveItem(event, props.itemId)}
                              className="complete-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn">
                            <i className="large material-icons">Remove</i>
                        </span>
                    </h4>
                    Added
                    by {props.item.audit?.creatorName || ""} on {props.item.audit ? new Date(props.item.audit.createdDate).toUTCString() : ""}
                </div>
            );
        default:
            const oldItem = props.item as any;
            return (
                <div key="itemTitle" className="col s10 offset-s1 list-item black"
                     onClick={() => handleClick()}>
                    <h4>
                        {oldItem.title}
                        <span onClick={(event) => handleRemoveItem(event, props.itemId)}
                              className="complete-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn">
                            <i className="large material-icons">Remove</i>
                        </span>
                    </h4>
                </div>
            );
    }
};
