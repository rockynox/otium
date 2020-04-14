import React, {useEffect, useState} from "react";
import "./itemList.css";
import {databaseReference} from "../Database/firebaseConfiguration";
import {ItemList} from "./ItemList";
import {Item} from "../types/Item";
import {User} from "../types/User";
import {getSnapshotAsObjectArray} from "../Database/databaseUtils";
import {LinearProgress} from "@material-ui/core";
import {AddItemModal} from "../AddItem/AddItemModal";

interface HomeProps {
    connectedUser: User
}

export const Home = (props: HomeProps) => {

    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const itemDatabaseSubscription = databaseReference.items.on("value", (snapshot) => {
            setItems(getSnapshotAsObjectArray(snapshot) as Item[]);
            setIsLoading(false);
        });
        return () => {
            databaseReference.items.off("value", itemDatabaseSubscription);
        };
    }, []);

    const renderItems = () =>
        items.map(item => {
            return <ItemList key={item.id} itemId={item.id} item={item} connectedUser={props.connectedUser}/>;
        });

    const renderEmptyItem = () =>
        <div className="col s10 offset-s1 center-align">
            <h4>Vous avez tout vu !</h4>
        </div>;

    return (
        <div className="container">
            <AddItemModal connectedUser={props.connectedUser}/>
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
