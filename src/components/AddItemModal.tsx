import React from "react";
import {itemsDatabaseReference} from "../firebase";

const display = {
    display: "block"
};
const hide = {
    display: "none"
};

export class AddItemModal extends React.Component {
    state = {
        showModal: false,
        formValue: ""
    };

    toggleModal = () => {
        const {showModal} = this.state;
        this.setState({showModal: !showModal});
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
        this.toggleModal();
    };


    render() {
        var modal = [];
        const {showModal, formValue} = this.state;
        modal.push(
            <div className="modal" style={showModal ? display : hide}>
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <div id="add-form" className="col s10 offset-s1">
                        <form onSubmit={e => {
                            e.preventDefault();
                        }}>
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
                </div>
                <div className="modal-footer">
                    <div className="btn modalButton" onClick={this.toggleModal}>Cancel</div>
                    <div className="btn modalButton" onClick={this.formSubmit}>Add</div>
                </div>
            </div>
        );
        return (
            <div>
                <div className="fixed-action-btn">
                    <div className="btn" onClick={this.toggleModal}>+</div>
                </div>
                {modal}
            </div>
        );
    }
}
