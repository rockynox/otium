import React from "react";
import {Item} from "../types/Item";
import {Movie} from "../types/theMovieDB";
import {User} from "../types/User";
import {databaseReference} from "../Database/firebaseConfiguration";

type ItemListProps = {
    connectedUser: User
    itemId: string,
    item: Item
}

export const ItemList = (props: ItemListProps) => {

    // let history = useHistory();

    const handleItemClick = (item: Item) => {
        // history.push("/item/" + itemId);
        const movieItem = props.item.payload as Movie;
        window.open("https://www.google.com/search?q=" + movieItem.title + " film", "_blank");
    };

    const handleRemoveItem = (event: any, itemId: string) => {
        event.stopPropagation();
        databaseReference.items.child(itemId).remove()
            .catch((error) => console.error("Fail to delete item. Detail: " + error));
    };

    const toggleViewed = (event: any, itemId: string, connectedUser: User, item: Item) => {
        event.stopPropagation();
        let itemViewers = item.viewedBy ? item.viewedBy : [];
        if (itemViewers.find((user) => user.id === connectedUser.id)) {
            itemViewers = itemViewers.filter((user) => user.id !== connectedUser.id);
        } else {
            itemViewers = [...itemViewers, connectedUser];
        }
        databaseReference.items.child(itemId + "/viewedBy").set(itemViewers);
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

    const hasBeenViewedByUser = (item: Item, connectedUser: User) => {
        return item.viewedBy && item.viewedBy.find((user) => user.id === connectedUser.id);
    };

    if (props.item.type === "movie") {
        const movieItem = props.item.payload as Movie;
        return (
            <div key="itemTitle"
                 className={"col s10 offset-s1 list-item " + (hasBeenViewedByUser(props.item, props.connectedUser) ? "green" : "black")}
                 onClick={() => handleItemClick(props.item)}>
                <div className="row">
                    <h4>
                        {movieItem.title} ({movieItem.release_date})
                    </h4>
                    <span onClick={(event) => handleRemoveItem(event, props.itemId)}
                          className="complete-item waves-effect waves-light red text-darken-4 btn">
                            <i className="small material-icons">delete</i>
                        </span>
                    <span onClick={(event) => toggleViewed(event, props.itemId, props.connectedUser, props.item)}
                          className="complete-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn">
                            <i className="small material-icons">{(hasBeenViewedByUser(props.item, props.connectedUser) ? "check_box" : "check_box_outline_blank")}</i>
                        </span>
                </div>
                {renderAuditInfo()}
            </div>
            // <ReviewCard2/>
        );
    } else {
        return (
            <div key="itemTitle" className="col s10 offset-s1 list-item green">
                Unsupported item
            </div>
        );
    }
};
