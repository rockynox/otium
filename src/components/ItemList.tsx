import React from "react";
import {Item} from "../types/Item";
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

    return (
        <div key="itemTitle" className="col s10 offset-s1 list-item black"
             onClick={() => handleClick()}>
            <h4>
                {props.item.title}
                <span onClick={(event) => handleRemoveItem(event, props.itemId)}
                      className="complete-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn">
                    <i className="large material-icons">Remove</i>
                </span>
            </h4>
        </div>
    );
};
