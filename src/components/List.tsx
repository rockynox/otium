import React, {Component} from "react";
import _ from "lodash";
import "./style.css";
import {itemsDatabaseReference} from "../firebase";
import {ItemComponent} from "./ItemComponent";
import {Item} from "../types/Item";

export class List extends Component {
    state = {
        showForm: true,
        formValue: "",
        items: []
    };

    inputChange = (event: any) => {
        this.setState({formValue: event.target.value});
    };

    addItem = async (newItem: any) => {
        itemsDatabaseReference.push().set(newItem);
    };

    formSubmit = (event: any) => {
        const {formValue} = this.state;
        this.addItem({title: formValue});
        event.preventDefault();
        this.setState({formValue: ""});
    };

    renderAddItemForm = () => {
        const {showForm, formValue} = this.state;
        if (showForm) {
            return (
                <div id="add-form" className="col s10 offset-s1">
                    <form onSubmit={this.formSubmit}>
                        <div className="input-field">
                            <input
                                value={formValue}
                                onChange={this.inputChange}
                                id="newItem"
                                type="text"
                            />
                            <label htmlFor="newItem">New item title</label>
                        </div>
                    </form>
                </div>
            );
        }
    };

    renderItems() {
        const {items} = this.state;
        const itemList = _.map(items, (item: Item, itemId: string) => {
            return <ItemComponent key={itemId} itemId={itemId} item={item}/>;
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

    componentDidMount() {
        itemsDatabaseReference.on("value", (snapshot: { val: any }) => {
            this.setState({items: snapshot.val()});
        });
    }

    render() {
        const {showForm} = this.state;
        return (
            <div className="list-container">
                <div className="row">
                    {this.renderAddItemForm()}
                    {this.renderItems()}
                </div>
                <div className="fixed-action-btn">
                    <button
                        onClick={() => this.setState({showForm: !showForm})}
                        className="btn-floating btn-large black darken-4"
                    >
                        {showForm ? (
                            <i className="large material-icons">-</i>
                        ) : (
                            <i className="large material-icons">+</i>
                        )}
                    </button>
                </div>
            </div>
        );
    }
}
