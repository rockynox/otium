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

    const handleViewed = (item: Item) => {
        let itemViewers = item.viewedBy ? item.viewedBy : [];
        if (itemViewers.find((user) => user.id === props.connectedUser.id)) {
            itemViewers = itemViewers.filter((user) => user.id !== props.connectedUser.id);
            console.log("removed !");
        } else {
            itemViewers = [...itemViewers, props.connectedUser];
            setItemToReview(item);
            console.log("Added !");
        }
        databaseReference.items.child(item.id + "/viewedBy").set(itemViewers);
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
                             isModalOpen={itemToReview !== undefined}
                             itemToReview={itemToReview}
                             setItemToReview={setItemToReview}
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
