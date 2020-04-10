import React from "react";
import {Item, SimpleItem} from "../types/Item";
import {databaseReference} from "../database/firebase";
import {useHistory} from "react-router-dom";
import {Movie} from "../types/theMovieDB";
import {User} from "../types/User";

type ItemListProps = {
    connectedUser: User
    itemId: string,
    item: Item
}

export const ItemList = (props: ItemListProps) => {

    let history = useHistory();

    const handleItemClick = (itemId: string) => {
        history.push("/item/" + itemId);
    };

    const handleRemoveItem = (event: any, itemId: string) => {
        event.stopPropagation();
        databaseReference.items.child(itemId).remove()
            .catch((error) => console.error("Fail to delete item. Detail: " + error));
    };

    const handleHasViewed = (event: any, itemId: string, connectedUser: User, item: Item) => {
        event.stopPropagation();
        if (!item.viewedBy) {
            item.viewedBy = [connectedUser];
        } else if (!item.viewedBy.find((user) => user.id === connectedUser.id)) {
            item.viewedBy = [...item.viewedBy, connectedUser];
        } else {
            return;
        }
        databaseReference.items.child(itemId).set(item);
        console.log("Item: " + itemId + " has been viewed by " + connectedUser.name);
    };

    const renderAuditInfo = () => {
        if (!props.item.audit) {
            return;
        }
        const creationDate = props.item.audit ? new Date(props.item.audit.createdDate).toUTCString() : "NA";
        const creationName = props.item.audit?.creatorName || "";
        return (<div className="item-card-audit-info">
            Added by {creationName} on {creationDate}
        </div>);
    };

    const isViewedByUser = (item: Item, connectedUser: User) => {
        if (!item.viewedBy || item.viewedBy.includes(connectedUser)) {
            return "black";
        }
        return "green";
    };

    switch (props.item.type) {
        case "movie":
            const movieItem = props.item.payload as Movie;
            return (
                <div key="itemTitle"
                     className={"col s10 offset-s1 list-item " + isViewedByUser(props.item, props.connectedUser)}
                     onClick={() => handleItemClick(props.itemId)}>
                    <h4>
                        {movieItem.title} ({movieItem.release_date})
                        <span onClick={(event) => handleRemoveItem(event, props.itemId)}
                              className="complete-item waves-effect waves-light red text-darken-4 btn">
                            <i className="small material-icons">delete</i>
                        </span>
                        <span onClick={(event) => handleHasViewed(event, props.itemId, props.connectedUser, props.item)}
                              className="complete-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn">
                            <i className="small material-icons">check_circle</i>
                        </span>
                    </h4>
                    {renderAuditInfo()}
                </div>
            );
        case "simple":
            const simpleItem = props.item.payload as SimpleItem;
            return (
                <div key="itemTitle" className="col s10 offset-s1 list-item green"
                     onClick={() => handleItemClick(props.itemId)}>
                    <h4>
                        {simpleItem.title}
                        <span onClick={(event) => handleRemoveItem(event, props.itemId)}
                              className="complete-item waves-effect waves-light red text-darken-4 btn">
                            <i className="small material-icons">delete</i>
                        </span>
                    </h4>
                    {renderAuditInfo()}
                </div>
            );
    }
};
