import React, {useState} from "react";
import {Item} from "../types/Item";
import {Movie} from "../types/theMovieDB";
import {User} from "../types/User";
import MuiAlert from "@material-ui/lab/Alert";
import "./ReviewItem.css";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {RatingComponent} from "./RatingComponent";

interface ReviewItemModalProps {
    connectedUser: User
    isModalOpen: boolean
    setItemToReview: (itemToReview: Item | undefined) => void
    itemToReview: Item | undefined
}

export const ReviewItemModal = (props: ReviewItemModalProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [ratingValue, setRatingValue] = React.useState<number | null>(3);


    const [isSuccessSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);

    const addRating = async (rating: number, itemToRate: Item) => {
        //TODO
        // return databaseReference.items.push().set(newItem);
        return;
    };

    const formSubmit = () => {
        if (ratingValue && props.itemToReview) {
            addRating(ratingValue, props.itemToReview)
                .then(() => {
                    setSuccessSnackbarOpen(true);
                })
                .catch(() => {
                    console.log("Can't add rating");
                });
        }
        handleCloseModal();
    };

    const handleCloseModal = () => {
        props.setItemToReview(undefined);
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
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    fullScreen={fullScreen}
                    open={true}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Avez-vous aimé "{movieToReview.title}" ?</DialogTitle>
                    <DialogContent>
                        <RatingComponent ratingValue={ratingValue} setRatingValue={setRatingValue}/>
                        <DialogContentText>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseModal} color={"primary"}>
                            Ne pas noter
                        </Button>
                        <Button onClick={formSubmit} color="primary" autoFocus>
                            Valider
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }
    };
    return (
        <div>
            <Snackbar open={isSuccessSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                    Vote enregistré <span role="img" aria-label="Urne de vote">🗳</span>
                </MuiAlert>
            </Snackbar>
            {renderReviewForm()}
        </div>
    );
};
