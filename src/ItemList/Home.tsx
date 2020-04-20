import React, {useEffect, useState} from "react";
import "./itemList.css";
import {databaseReference} from "../Database/firebaseConfiguration";
import {ItemList} from "./ItemList";
import {Item} from "../types/Item";
import {User} from "../types/User";
import {getSnapshotAsObjectArray} from "../Database/databaseUtils";
import {LinearProgress} from "@material-ui/core";
import {AddItemModal} from "../AddItem/AddItemModal";
import {ReviewItemModal} from "../ReviewItem/ReviewItemModal";

interface HomeProps {
    connectedUser: User
}

export const Home = (props: HomeProps) => {

    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [itemToReview, setItemToReview] = useState<Item>();

    useEffect(() => {
        const itemDatabaseSubscription = databaseReference.items.on("value", (snapshot) => {
            setItems(getSnapshotAsObjectArray(snapshot) as Item[]);
            setIsLoading(false);
        });
        return () => {
            databaseReference.items.off("value", itemDatabaseSubscription);
        };
    }, []);

    function isConnectedUserInViewers(item: Item) {
        if (item.viewedBy) {
            return item.viewedBy.find((itemViewer) => itemViewer.viewer.id === props.connectedUser.id);
        }
        return false;
    }

    function removeViewerAndSave(item: Item, viewerToRemove: User) {
        let itemViewers = item.viewedBy ? item.viewedBy : [];
        itemViewers = itemViewers.filter((itemViewer) => itemViewer.viewer.id !== viewerToRemove.id);
        databaseReference.items.child(item.id + "/viewedBy").set(itemViewers);
    }

    const handleReview = (item: Item): Promise<any> => {
        return databaseReference.items.child(item.id).set(item)
            .then(
                () => setItemToReview(undefined)
            );
    };

    const handleViewed = (item: Item) => {
        if (isConnectedUserInViewers(item)) {
            removeViewerAndSave(item, props.connectedUser);
        } else {
            setItemToReview(item);
        }
    };

    const renderItems = () =>
        items.map(item => {
            return <ItemList key={item.id} itemId={item.id} item={item} connectedUser={props.connectedUser}
                             handleViewed={handleViewed}/>;
        });

    const renderEmptyItem = () =>
        <div className="col s10 offset-s1 center-align">
            <h4>Vous avez tout vu !</h4>
        </div>;

    return (
        <div className="container">
            <AddItemModal connectedUser={props.connectedUser}/>
            <ReviewItemModal connectedUser={props.connectedUser}
                             itemToReview={itemToReview}
                             handleReview={handleReview}
            />
            {isLoading ?
                <LinearProgress/> :
                (<div className="list-container">
                    <div className="row">
                        {items.length ?
                            renderItems() :
                            renderEmptyItem()
                        }
                    </div>
                </div>)
            }
        </div>
    );
};
