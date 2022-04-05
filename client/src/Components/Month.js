import React from "react";
import AddButton from "./AddButton";
import { Container, Grid, Typography } from "@mui/material";
import TimeDialog from "./TimeDialog";
import TimeTable from "./TimeTable";
import axios from "axios";
import EventSnackBar from "./EventSnackBar";
import HoursPieChart from "./HoursPieChart";
import SalaryPieChart from "./SalaryPieChart";
import LeftButton from "./LeftButton";
import RightButton from "./RightButton";
import handler from "../Utils/DataHandler";
class Month extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            snackBarOpen: false,
            snackBarMessage: "",
            severity: "success",
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            data: {},
        };
    }
    componentDidMount = async () => {
        this.getMonthData();
    };
    getMonthData = async () => {
        console.log("getting data");
        await axios
            .get("http://localhost:5000/getMonth/" + this.state.month + "-" + this.state.year)
            .then((data) => {
                console.log("data got");
                console.log(data.data);
                this.setState({ data: data.data });
            })
            .catch((err) => {
                console.log("There was a problem getting the monthly data");
                console.error(err);
                this.openSnackBar(String(err), "error");
            });
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.state.month !== prevState.month) {
            this.getMonthData();
        }
    }
    openAddTime = () => {
        this.setState({
            openDialog: true,
        });
    };
    dataUpdate = (data) => {
        this.setState({
            data: data,
        });
    };
    closeDialog = () => {
        this.setState({
            openDialog: false,
        });
    };
    openSnackBar = (message, type) => {
        console.log("snack bar open");
        this.setState({
            snackBarOpen: true,
            snackBarMessage: message,
            severity: type,
        });
    };
    closeSnackBar = () => {
        console.log("snack bar close");
        this.setState({
            snackBarOpen: false,
            snackBarMessage: "",
        });
    };
    moveMonthDown = () => {
        if (this.state.month === 0) {
            this.setState((prevState) => {
                return {
                    month: 11,
                    year: prevState.year - 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    month: prevState.month - 1,
                };
            });
        }
    };
    moveMonthUp = () => {
        if (this.state.month === 11) {
            this.setState((prevState) => {
                return {
                    month: 0,
                    year: prevState.year + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    month: prevState.month + 1,
                };
            });
        }
    };
    render() {
        return (
            <div>
                <h1>This is my Salary Web App</h1>
                <LeftButton onClick={this.moveMonthDown} />
                <RightButton onClick={this.moveMonthUp} />
                <Container>
                    <Grid container justifyContent="center" textAlign={"center"}>
                        <Grid item xs={12}>
                            <Typography variant="h3">
                                {this.state.month > 8
                                    ? Number(this.state.month + 1)
                                    : "0" + Number(this.state.month + 1)}{" "}
                                - {this.state.year}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ paddingBottom: 10 }}>
                            <TimeTable month={this.state.month} year={this.state.year} data={this.state.data.times} />
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4">
                                    Total: {this.state.data.totalHours? Math.round(this.state.data.totalHours.done*100)/100 : 0}
                                </Typography>
                                <HoursPieChart data={handler.handleHoursLeft(this.state.data.totalHours)} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h4">
                                Total: {this.state.data.salary? Math.round(this.state.data.salary.total*100)/100 : 0}
                                </Typography>
                                <SalaryPieChart data={handler.handleSalary(this.state.data.salary)} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ position: "sticky", bottom: 10 }} justifyContent="center">
                        <AddButton onClick={this.openAddTime} />
                    </Grid>
                </Container>
                <TimeDialog
                    open={this.state.openDialog}
                    onClose={this.closeDialog}
                    month={this.state.month}
                    year={this.state.year}
                    onSubmit={this.dataUpdate}
                    event={this.openSnackBar}
                />
                <EventSnackBar
                    open={this.state.snackBarOpen}
                    onClose={this.closeSnackBar}
                    message={this.state.snackBarMessage}
                    severity={this.state.severity}
                />
            </div>
        );
    }
}
export default Month;
