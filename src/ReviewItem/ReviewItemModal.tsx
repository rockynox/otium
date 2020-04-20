import React, {useState} from "react";
import {Item, ItemViewer} from "../types/Item";
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
import {addOnMaybeArray} from "../Database/databaseUtils";

interface ReviewItemModalProps {
    connectedUser: User
    itemToReview: Item | undefined
    handleReview: (itemReviewed: Item) => Promise<any>
}

export const ReviewItemModal = (props: ReviewItemModalProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [ratingValue, setRatingValue] = React.useState<number | null>(null);

    const [isSuccessSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);

    const formSubmit = () => {
        if (props.itemToReview) {
            const newViewer = new ItemViewer(props.connectedUser, ratingValue);
            let itemReviewed = props.itemToReview;
            itemReviewed.viewedBy = addOnMaybeArray(props.itemToReview.viewedBy, newViewer);
            props.handleReview(itemReviewed).then(
                () => setSuccessSnackbarOpen(true)
            );
        }
    };

    const closeWithoutRating = () => {
        setRatingValue(null);
        formSubmit();
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
                        <Button autoFocus onClick={closeWithoutRating} color={"primary"}>
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
            <Snackbar open={isSuccessSnackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                    {ratingValue ? (
                        <div>Vote enregistré <span role="img" aria-label="Urne de vote">🗳</span></div>
                    ) : (
                        <div>Marqué comme vu ! <span role="img" aria-label="Lunette">🤓</span></div>
                    )}
                </MuiAlert>
            </Snackbar>
            {renderReviewForm()}
        </div>
    );
};
