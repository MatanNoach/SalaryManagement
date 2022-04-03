import { Snackbar, Slide, Alert } from "@mui/material";
import React from "react";

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

class EventSnackBar extends React.Component {
    render() {
        return (
            <Snackbar onClose={this.props.onClose} open={this.props.open} autoHideDuration={3000} TransitionComponent={TransitionRight}>
                <Alert severity={this.props.severity} variant="filled" sx={{ width: "100%" }}>
                    {this.props.message}
                </Alert>
            </Snackbar>
        );
    }
}
export default EventSnackBar;
