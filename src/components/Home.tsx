import React, {Component} from "react";
import "./style.css";
import {databaseReference} from "../database/firebase";
import {ItemList} from "./ItemList";
import {Item} from "../types/Item";
import {AddItemModal} from "./AddItem/AddItemModal";
import {User} from "../types/User";

interface HomeProps {
    connectedUser: User
}

export class Home extends Component<HomeProps> {
    state = {
        items: []
    };

    itemDatabaseSubscription: any;

    componentDidMount() {
        this.itemDatabaseSubscription = databaseReference.items.on("value", (snapshot: { val: any }) => {
            this.setState({items: snapshot.val() as Item[]});
        });
    }

    componentWillUnmount(): void {
        databaseReference.items.off("value", this.itemDatabaseSubscription);
    }

    renderItems() {
        const {items} = this.state;
        const itemsObjects: Item[] = Object.entries(items)
            .map(entry => {
                const [id, itemWithoutId] = entry as [string, Item];
                return {id: id, ...itemWithoutId} as Item;
            });
        const itemList = itemsObjects
            .map(item => {
                return <ItemList key={item.id} itemId={item.id} item={item} connectedUser={this.props.connectedUser}/>;
            });
        if (itemList) {
            return itemList;
        }
        return (
            <div className="col s10 offset-s1 center-align">
                <h4>You have no more item to see !</h4>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <AddItemModal connectedUser={this.props.connectedUser}/>
                <div className="list-container">
                    <div className="row">
                        {this.renderItems()}
                    </div>
                </div>
            </div>
        );
    }
}
