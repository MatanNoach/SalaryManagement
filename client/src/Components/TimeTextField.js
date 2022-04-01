import React from "react";
import { TextField } from "@mui/material";

const isPositive = (number, type) => {
    if (number <= 0 || isNaN(number)) {
        return { error: "Must enter a positive " + type };
    }
    return { error: null };
};

const positiveIntegerValidation = (value) => {
    const number = Number(value);
    // check if the number is int and not float
    if (!Number.isInteger(number)) {
        return { error: "Must enter a positive Integer" };
    }
    return isPositive(number, "Integer");
};

const positiveFloatValidation = (value) => {
    const number = Number(value);
    return isPositive(number, "Decimal");
};

const positiveIntegerWithZeroValidation = (value) => {
    const number = Number(value);
    // check if the number is int and not float
    if (!Number.isInteger(number)) {
        return { error: "Must enter a positive Integer" };
    }
    if (number === 0) {
        return { error: null };
    }
    return isPositive(number, "Integer");
};
const dateValidation = (value) => {
    if (value === "") {
        return { error: "Invalid Date Format" };
    }
    return { error: null };
};
const validationFunctions = {
    positiveInteger: positiveIntegerValidation,
    positiveFloat: positiveFloatValidation,
    positiveIntegerWithZero: positiveIntegerWithZeroValidation,
    date: dateValidation,
};

class TimeTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            error: "",
            value: this.props.value || "",
        };
    }
    onChange = (event) => {
        const value = event.target.value;
        if (this.props.validation) {
            const res = validationFunctions[this.props.validation](value);
            if (res.error) {
                this.setState(
                    {
                        isError: true,
                        error: res.error,
                    },
                    () => this.props.onChange(value, true)
                );
            } else {
                this.setState(
                    {
                        isError: false,
                        error: "",
                    },
                    () => this.props.onChange(value, false)
                );
            }
        } else {
            this.props.onChange(value, false);
        }
    };
    render() {
        return (
            <TextField
                label={this.props.label}
                type={this.props.type}
                autoComplete="off"
                value={this.props.value}
                error={this.state.isError}
                helperText={this.state.error}
                onChange={this.onChange}
            />
        );
    }
}
export default TimeTextField;
