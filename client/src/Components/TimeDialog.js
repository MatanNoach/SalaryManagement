import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import TimeTextField from "./TimeTextField";
import { Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class TimeDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            startTime: "",
            endTime: "",
            errors: {
                date: true,
                startTime: true,
                endTime: true,
            },
        };
    }
    setDate = (value, isError) => {
        this.setState((prevState) => ({
            date: value,
            errors: {
                ...prevState.errors,
                date: isError,
            },
        }));
    };
    setStartTime = (value, isError) => {
        this.setState((prevState) => ({
            startTime: value,
            errors: {
                ...prevState.errors,
                startTime: isError,
            },
        }));
    };
    setEndTime = (value, isError) => {
        this.setState((prevState) => ({
            endTime: value,
            errors: {
                ...prevState.errors,
                endTime: isError,
            },
        }));
    };
    onClose = () => {
        this.setState(
            {
                date: "",
                startTime: "",
                endTime: "",
                errors: {
                    date: true,
                    startTime: true,
                    endTime: true,
                },
            },
            this.props.onClose()
        );
    };
    onSubmit = () => {
        var isValid = true;
        if (this.state.errors !== undefined) {
            for (const field in this.state.errors) {
                if (this.state.errors[field]) {
                    isValid = false;
                }
            }
        }
        if (isValid) {
            console.log("Send!");
        }
    };
    render() {
        console.log(this.state);
        return (
            <Dialog
                open={this.props.open}
                onClose={this.onClose}
                maxWidth="md"
                fullWidth={true}
                TransitionComponent={Transition}
            >
                <DialogTitle>Add Time</DialogTitle>
                <DialogContent>
                    <Stack direction="row" spacing={2}>
                        <TimeTextField type="date" onChange={this.setDate} value={this.state.date} validation="date" />
                        <TimeTextField
                            label="Start"
                            type="text"
                            onChange={this.setStartTime}
                            value={this.state.startTime}
                            validation="time"
                        />
                        <TimeTextField
                            label="End"
                            type="text"
                            onChange={this.setEndTime}
                            value={this.state.endTime}
                            validation="time"
                        />
                        <Button
                            variant="contained"
                            sx={{ height: "40px", alignSelf: "center" }}
                            onClick={this.onSubmit}
                        >
                            Submit
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        );
    }
}
export default TimeDialog;
