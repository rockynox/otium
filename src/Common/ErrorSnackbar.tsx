import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

interface ErrorSnackbarProps {
    open: boolean,
    setOpen: (isOpen: boolean) => void
}

export const ErrorSnackbar = (props: ErrorSnackbarProps) => {

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        props.setOpen(false);
    };

    return (
        <div>
            <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    An error occurred.
                </MuiAlert>
            </Snackbar>
        </div>
    );
};
