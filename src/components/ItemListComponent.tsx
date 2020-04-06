import React, {Component} from "react";
import {Item} from "../types/Item";
import {itemsDatabaseReference} from "../firebase";
import {Link} from "react-router-dom";


type ItemProps = {
    itemId: string,
    item: Item
}


export class ItemListComponent extends Component<ItemProps, {}> {


    removeItem = (itemId: string) => {
        itemsDatabaseReference.child(itemId).remove()
            .catch((error) => console.error("Fail to delete item. Detail: " + error));
    };

    render() {
        const {itemId, item} = this.props;
        return (
            <Link to={"/item/" + itemId}>
                <div key="itemTitle" className="col s10 offset-s1 list-item black"
                     onClick={() => console.log(item.title + " clicked!")}>
                    <h4>
                        {item.title}
                        <span
                            onClick={() => this.removeItem(itemId)}
                            className="complete-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn"
                        >
                        <i className="large material-icons">Remove</i>
                    </span>
                    </h4>
                </div>
            </Link>
        );
    }
}
