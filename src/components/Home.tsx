import React, {Component} from "react";
import _ from "lodash";
import "./style.css";
import {databaseReference} from "../database/firebase";
import {ItemList} from "./ItemList";
import {Item} from "../types/Item";
import {AddItemModal} from "./Modal/AddItemModal";

export class Home extends Component {
    state = {
        items: []
    };

    itemDatabaseSubscription: any;

    componentDidMount() {
        this.itemDatabaseSubscription = databaseReference.items.on("value", (snapshot: { val: any }) => {
            this.setState({items: snapshot.val()});
        });
    }

    componentWillUnmount(): void {
        databaseReference.items.off("value", this.itemDatabaseSubscription);
    }

    renderItems() {
        const {items} = this.state;
        const itemList = _.map(items, (item: Item, itemId: string) => {
            return <ItemList key={itemId} itemId={itemId} item={item}/>;
        });
        if (!_.isEmpty(itemList)) {
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
                <AddItemModal/>
                <div className="list-container">
                    <div className="row">
                        {this.renderItems()}
                    </div>
                </div>
            </div>
        );
    }
}
