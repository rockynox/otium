import React, {useState} from "react";
import {Item} from "../types/Item";
import {Movie} from "../types/theMovieDB";
import {User} from "../types/User";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./ReviewItem.css";

interface ReviewItemModalProps {
    connectedUser: User
    isModalOpen: boolean
    setItemToReview: (itemToReview: Item | undefined) => void
    itemToReview: Item | undefined
}

export const ReviewItemModal = (props: ReviewItemModalProps) => {

    const [isSuccessSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);

    const formSubmit = (event: any) => {
        event.preventDefault();
        // if (selectedItem) {
        //     addItem(
        //         new Item(
        //             "movie",
        //             selectedItem,
        //             new Audit(props.connectedUser.id, props.connectedUser.name)
        //         )
        //     )
        //         .then(() => {
        //         })
        //         .catch(() => {
        //             console.log("Can't add: " + selectedItem.id);
        //         });
        // }
        props.setItemToReview(undefined);
        setSuccessSnackbarOpen(true);
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessSnackbarOpen(false);
    };

    const renderReviewForm = () => {
        if (props.itemToReview) {
            const movieToReview = props.itemToReview.payload as Movie;
            return (
                <div className="modal add-item-modal">
                    <div className="modal-content">
                        <h4>Avez-vous aimé "{movieToReview.title}" ?</h4>
                    </div>
                    <div className="modal-footer">
                        <div
                            className="btn modalButton orange"
                            onClick={() => props.setItemToReview(undefined)}
                        >
                            Noter plus tard
                        </div>
                        <div className="btn modalButton" onClick={formSubmit}>Valider</div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            <Snackbar open={isSuccessSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                    Vote enregistré ! <span role="img" aria-label="Urne de vote">🗳</span>
                </MuiAlert>
            </Snackbar>
            {renderReviewForm()}
        </div>
    );
};
