import React, {useEffect, useState} from "react";
import "./style.css";
import {databaseReference} from "../database/firebase";
import {ItemList} from "./ItemList";
import {Item} from "../types/Item";
import {AddItemModal} from "./AddItem/AddItemModal";
import {User} from "../types/User";
import {getSnapshotAsObjectArray} from "../database/databaseUtils";

interface HomeProps {
    connectedUser: User
}

export const Home = (props: HomeProps) => {

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const itemDatabaseSubscription = databaseReference.items.on("value", (snapshot) => {
            setItems(getSnapshotAsObjectArray(snapshot) as Item[]);
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
            <h4>You have no more item to see !</h4>
        </div>;

    return (
        <div className="container">
            <AddItemModal connectedUser={props.connectedUser}/>
            <div className="list-container">
                <div className="row">
                    {items.length ?
                        renderItems() :
                        renderEmptyItem()
                    }
                </div>
            </div>
        </div>
    );
};
