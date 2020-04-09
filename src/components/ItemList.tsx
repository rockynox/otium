import React from "react";
import {Item, SimpleItem} from "../types/Item";
import {databaseReference} from "../database/firebase";
import {useHistory} from "react-router-dom";
import {Movie} from "../types/theMovieDB";

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

    function renderAuditInfo() {
        if (!props.item.audit) {
            return;
        }
        const creationDate = props.item.audit ? new Date(props.item.audit.createdDate).toUTCString() : "NA";
        const creationName = props.item.audit?.creatorName || "";
        return (<div className="item-card-audit-info">
            Added by {creationName} on {creationDate}
        </div>);
    }

    switch (props.item.type) {
        case "movie":
            const movieItem = props.item.payload as Movie;
            return (
                <div key="itemTitle" className="col s10 offset-s1 list-item black"
                     onClick={() => handleClick()}>
                    <h4>
                        {movieItem.title} ({movieItem.release_date})
                        <span onClick={(event) => handleRemoveItem(event, props.itemId)}
                              className="complete-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn">
                            <i className="large material-icons">Remove</i>
                        </span>
                    </h4>
                    {renderAuditInfo()}
                </div>
            );
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
                    {renderAuditInfo()}
                </div>
            );
    }
};
