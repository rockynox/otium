import React, {useState} from "react";
import {Audit, Item} from "../types/Item";
import {databaseReference} from "../Database/firebaseConfiguration";
import {MovieDBResult} from "../types/theMovieDB";
import {MovieSelector} from "./MovieSelector";
import {User} from "../types/User";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./addItem.css";

interface AddItemModalProps {
    connectedUser: User
}

export const AddItemModal = (props: AddItemModalProps) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<MovieDBResult | null>();
    const [isSuccessSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);

    const handleSelectItem = (selectedItem: MovieDBResult | null) => {
        setSelectedItem(selectedItem);
    };

    const addItem = async (newItem: Item) => {
        return databaseReference.items.push().set(newItem);
    };

    const formSubmit = (event: any) => {
        event.preventDefault();
        if (selectedItem) {
            addItem(
                new Item(
                    "movie",
                    selectedItem,
                    new Audit(props.connectedUser.id, props.connectedUser.name)
                )
            )
                .then(() => {
                    setShowModal(!showModal);
                    setSuccessSnackbarOpen(true);
                })
                .catch(() => {
                    console.log("Can't add: " + selectedItem.id);
                });
        }
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessSnackbarOpen(false);
    };

    const renderAddForm = () => {
        if (showModal) {
            return (
                <div className="modal add-item-modal">
                    <div className="modal-content">
                        <h4>Ajouter un film</h4>
                        <MovieSelector handleSelectedItem={handleSelectItem}/>
                    </div>
                    <div className="modal-footer">
                        <div className="btn modalButton red" onClick={() => setShowModal(!showModal)}>Annuler</div>
                        <div className="btn modalButton" onClick={formSubmit}>Ajouter</div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            <Snackbar open={isSuccessSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                    Bien ajouté ! <span role="img" aria-label="Smile">😉</span>
                </MuiAlert>
            </Snackbar>
            <div className="fixed-action-btn">
                <div className="btn" onClick={() => setShowModal(!showModal)}>Ajouter un film</div>
            </div>
            {renderAddForm()}
        </div>
    );
};
