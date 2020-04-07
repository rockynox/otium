import React from "react";
import {Item} from "../../types/Item";
import {databaseReference} from "../../database/firebase";

export class AddItemModal extends React.Component {
    state = {
        showModal: false,
        formValue: ""
    };

    toggleModal = () => {
        const previousShowModal = this.state.showModal;
        this.setState({showModal: !previousShowModal});
    };

    inputChange = (event: any) => {
        this.setState({formValue: event.target.value});
    };

    addItem = async (newItem: Item) => {
        databaseReference.items.push().set(newItem)
            .catch(() => "Fail to add item: " + newItem.title);
    };

    formSubmit = (event: any) => {
        const {formValue} = this.state;
        this.addItem({title: formValue});
        event.preventDefault();
        this.setState({formValue: ""});
        this.toggleModal();
    };

    renderAddForm() {
        const {showModal, formValue} = this.state;
        if (showModal) {
            return (
                <div className="modal add-item-modal">
                    <div className="modal-content">
                        <h4>New item</h4>
                        <div id="add-form" className="col s10 offset-s1">
                            <form onSubmit={this.formSubmit}>
                                <div className="input-field">
                                    <input
                                        value={formValue}
                                        onChange={this.inputChange}
                                        id="newItem"
                                        type="text"
                                    />
                                    <label htmlFor="newItem">Item title</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="btn modalButton" onClick={this.toggleModal}>Cancel</div>
                        <div className="btn modalButton" onClick={this.formSubmit}>Add</div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="fixed-action-btn">
                    <div className="btn" onClick={this.toggleModal}>+</div>
                </div>
                {this.renderAddForm()}
            </div>
        );
    }
}
