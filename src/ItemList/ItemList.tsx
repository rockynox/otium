import React from "react";
import {Item} from "../types/Item";
import {Movie} from "../types/theMovieDB";
import {User} from "../types/User";
import {databaseReference} from "../Database/firebaseConfiguration";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

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
        const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
        const creationDate = props.item.audit ? new Date(props.item.audit.createdDate).toLocaleDateString("fr", options) : "NA";
        const creationName = props.item.audit?.creatorName || "";
        return (<div className="item-card-audit-info">
            Conseillé par {creationName} le {creationDate}
        </div>);
    };

    const hasBeenViewedByUser = (item: Item, connectedUser: User) => {
        return item.viewedBy && item.viewedBy.find((user) => user.id === connectedUser.id);
    };

    if (props.item.type === "movie") {
        const movieItem = props.item.payload as Movie;
        return (
            // <div key="itemTitle"
            //      className={"col s10 offset-s1 list-item " + (hasBeenViewedByUser(props.item, props.connectedUser) ? "green" : "black")}
            //      onClick={() => handleItemClick(props.item)}>
            // </div>
            <Card className="card" elevation={2}>
                <CardContent className="content">
                    <Box mb={1}>
                        <h3 className="heading">{movieItem.title}</h3>
                        <span className="release-date">({movieItem.release_date})</span>
                        {/*<Rating*/}
                        {/*    name={"rating"}*/}
                        {/*    value={2}*/}
                        {/*    className="rating"*/}
                        {/*    size={"small"}*/}
                        {/*/>*/}
                    </Box>
                    <p className="body">
                        {movieItem.overview || "Pas de résumé disponible."}
                    </p>
                    <div className="more-detail">
                        Read more <span onClick={() => handleItemClick(props.item)} role="img"
                                        aria-label="right-arrow">➡️</span>
                    </div>
                    <Divider className="divider light"/>
                    <div>
                        <div className="textFooter">
                            {renderAuditInfo()}
                        </div>
                        <div>
                            <i
                                className="small material-icons"
                                onClick={(event) => toggleViewed(event, props.itemId, props.connectedUser, props.item)}
                            >
                                {(hasBeenViewedByUser(props.item, props.connectedUser) ? "check_box" : "check_box_outline_blank")}
                            </i>
                            {props.item.audit.creatorId === props.connectedUser.id && (
                                <i
                                    className="small material-icons"
                                    onClick={(event) => handleRemoveItem(event, props.itemId)}
                                >
                                    delete
                                </i>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardMedia
                    className="media"
                    image={
                        "https://image.tmdb.org/t/p/w200" + movieItem.poster_path
                    }
                />
            </Card>
        );
    } else {
        return (
            <div key="itemTitle" className="col s10 offset-s1 green">
                Unsupported item
            </div>
        );
    }
};
