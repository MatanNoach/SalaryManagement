import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import TimeTextField from "./TimeTextField";
import { Slide } from "@mui/material";
import axios from "axios";

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
            validations: {
                date: undefined,
                startTime: undefined,
                endTime: undefined,
            },
        };
    }
    setDate = (value) => {
        this.setState({
            date: value,
        });
    };
    setStartTime = (value) => {
        this.setState({
            startTime: value,
        });
    };
    setEndTime = (value) => {
        this.setState({
            endTime: value,
        });
    };
    setDateValidation = (validationFunc) => {
        this.setState((prevState) => ({
            validations: {
                ...prevState.validations,
                date: validationFunc,
            },
        }));
    };
    setStartValidation = (validationFunc) => {
        this.setState((prevState) => ({
            validations: {
                ...prevState.validations,
                startTime: validationFunc,
            },
        }));
    };
    setEndValidation = (validationFunc) => {
        this.setState((prevState) => ({
            validations: {
                ...prevState.validations,
                endTime: validationFunc,
            },
        }));
    };
    onClose = () => {
        this.setState(
            {
                date: "",
                startTime: "",
                endTime: "",
            },
            this.props.onClose()
        );
    };
    onSubmit = async () => {
        if (this.validateFields()) {
            const row = this.state;
            delete row.errors;
            await axios
                .put("http://localhost:5000/addTime", { month: this.props.month, year: this.props.year, dataRow: row })
                .then((data) => {
                    if (this.props.event) {
                        this.props.event("Time Added", "success");
                    }
                    this.props.onSubmit(data.data);
                    this.onClose();
                })
                .catch((err) => {
                    console.error(err);
                    if (this.props.event) {
                        if (err.response) {
                            this.props.event(err.response.data.message, "error");
                        } else {
                            this.props.event(String(err), "error");
                        }
                    }
                });
        }
    };
    validateFields() {
        var isValid = true;
        for (const validation in this.state.validations) {
            const res = this.state.validations[validation](this.state[validation]);
            if (res.error) {
                isValid = false;
            }
        }
        return isValid;
    }

    render() {
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
                        <TimeTextField
                            type="date"
                            onChange={this.setDate}
                            value={this.state.date}
                            validation="date"
                            setValidation={this.setDateValidation}
                        />
                        <TimeTextField
                            label="Start"
                            type="text"
                            onChange={this.setStartTime}
                            value={this.state.startTime}
                            validation="time"
                            setValidation={this.setStartValidation}
                        />
                        <TimeTextField
                            label="End"
                            type="text"
                            onChange={this.setEndTime}
                            value={this.state.endTime}
                            validation="time"
                            setValidation={this.setEndValidation}
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
