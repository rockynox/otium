import React, {useState} from "react";
import {Audit, Item} from "../../types/Item";
import {databaseReference} from "../../database/firebase";
import {MovieDBResult} from "../../types/theMovieDB";
import {MovieSelector} from "./MovieSelector";
import {User} from "../../types/User";

interface AddItemModalProps {
    connectedUser: User
}

export const AddItemModal = (props: AddItemModalProps) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [formValue, setFormValue] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<MovieDBResult | null>();

    const inputChange = (event: any) => {
        setFormValue(event.target.value);
        console.log(formValue);
    };

    const handleSelectItem = (selectedItem: MovieDBResult | null) => {
        setSelectedItem(selectedItem);
    };

    const addItem = async (newItem: Item) => {
        databaseReference.items.push().set(newItem)
            .catch(() => "Fail to add item");
    };

    const formSubmit = (event: any) => {
        if (!formValue && !selectedItem) {
            return;
        }
        if (formValue) {
            const newItem = new Item(
                "simple",
                {title: formValue},
                new Audit(props.connectedUser.id, props.connectedUser.name)
            );
            addItem(newItem);
            setFormValue("");
        } else if (selectedItem) {
            addItem(new Item(
                "movie",
                selectedItem,
                new Audit(props.connectedUser.id, props.connectedUser.name)
            ));
        }
        event.preventDefault();
        setShowModal(!showModal);
    };

    const renderAddForm = () => {
        if (showModal) {
            return (
                <div className="modal add-item-modal">
                    <div className="modal-content">
                        <h4>Enter le titre de l'objet a partager</h4>
                        <div id="add-form" className="col s10 offset-s1">
                            <form onSubmit={formSubmit}>
                                <div className="input-field">
                                    <input
                                        value={formValue}
                                        onChange={inputChange}
                                        id="newItem"
                                        type="text"
                                    />
                                    <label htmlFor="newItem">Item title</label>
                                </div>
                            </form>
                        </div>
                        <h4>Ou chercher un film ou une serie</h4>
                        <MovieSelector handleSelectedItem={handleSelectItem}/>
                    </div>
                    <div className="modal-footer">
                        <div className="btn modalButton" onClick={() => setShowModal(!showModal)}>Cancel</div>
                        <div className="btn modalButton" onClick={formSubmit}>Add</div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            <div className="fixed-action-btn">
                <div className="btn" onClick={() => setShowModal(!showModal)}>+</div>
            </div>
            {renderAddForm()}
        </div>
    );
};
