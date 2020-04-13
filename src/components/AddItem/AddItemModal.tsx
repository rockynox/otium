import React, {useState} from "react";
import {Audit, Item} from "../../types/Item";
import {databaseReference} from "../../database/firebase";
import {MovieDBResult} from "../../types/theMovieDB";
import {MovieSelector} from "./MovieSelector";
import {User} from "../../types/User";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
        databaseReference.items.push().set(newItem)
            .catch(() => "Fail to add item");
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
                        <h4>Ajouter un film ou une série</h4>
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
                    Bien ajouté ! 😉
                </MuiAlert>
            </Snackbar>
            <div className="fixed-action-btn">
                <div className="btn" onClick={() => setShowModal(!showModal)}>+</div>
            </div>
            {renderAddForm()}
        </div>
    );
};
