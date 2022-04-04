import React from "react";
import { TextField } from "@mui/material";

const isPositive = (number, type) => {
    if (number <= 0 || isNaN(number)) {
        return { error: "Must enter a positive " + type };
    }
    return { error: null, num: number };
};

const positiveIntegerValidation = (value) => {
    const number = Number(value);
    // check if the number is int and not float
    if (!Number.isInteger(number)) {
        return { error: "Must enter a positive Integer" };
    }
    return isPositive(number, "Integer");
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
    if (value === "" || value === undefined) {
        return { error: "Invalid Date Format" };
    }
    return { error: null };
};
const timeValidation = (value) => {
    const error = { error: "Invalid Time Format" };
    if (value === undefined) {
        return error;
    }
    const splitted = value.split(":");
    if (splitted.length !== 2) {
        return error;
    }
    if (splitted[0].length !== 2 || splitted[1].length !== 2) {
        return error;
    }
    const num1 = positiveIntegerValidation(splitted[0]);
    const num2 = positiveIntegerWithZeroValidation(splitted[1]);
    if (num1.error || num2.error) {
        return error;
    }
    if (num1.num > 23 || num2.num > 59) {
        return error;
    }
    return { error: null };
};
const validationFunctions = {
    positiveInteger: positiveIntegerValidation,
    positiveIntegerWithZero: positiveIntegerWithZeroValidation,
    date: dateValidation,
    time: timeValidation,
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
    componentDidMount = () => {
        if (this.props.validation) {
            this.props.setValidation(this.validate);
        }
    };
    validateGood = ()=>{
        this.setState({
            isError: false,
            error: "",
        });
    }
    validateBad = (res)=>{
        this.setState({
            isError: true,
            error: res.error,
        });
    }
    validate = (value) => {
        const res = validationFunctions[this.props.validation](value);
        if (res.error) {
            this.validateBad(res);
        } else {
            this.validateGood();
        }
        return res;
    };
    onChange = (event) => {
        const value = event.target.value;
        if (this.props.validation) {
            this.validate(value);
        }
        this.props.onChange(value);
        
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
