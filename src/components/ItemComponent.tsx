import React, {Component} from "react";
import {Item} from "../types/Item";
import {itemsDatabaseReference} from "../firebase";


type ItemProps = {
    itemId: string,
    item: Item
}


export class ItemComponent extends Component<ItemProps, {}> {


    removeItem = (itemId: string) => {
        itemsDatabaseReference.child(itemId).remove();
    };

    render() {
        const {itemId, item} = this.props;
        return (
            <div key="toDoName" className="col s10 offset-s1 to-do-list-item black">
                <h4>
                    {item.title}
                    <span
                        onClick={() => this.removeItem(itemId)}
                        className="complete-todo-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn"
                    >
            <i className="large material-icons">Done</i>
          </span>
                </h4>
            </div>
        );
    }
}
