import React from "react";
import AddButton from "./AddButton";
import { Container, Grid, Typography } from "@mui/material";
import TimeDialog from "./TimeDialog";
import TimeTable from "./TimeTable";
import axios from "axios";
import EventSnackBar from "./EventSnackBar";
import HoursPieChart from "./HoursPieChart";
import SalaryPieChart from "./SalaryPieChart";
class Month extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            snackBarOpen: false,
            snackBarMessage: "",
            severity: "success",
            month: 2,
            year: 2022,
            data: {},
        };
    }
    componentDidMount = async () => {
        console.log("getting data");
        await axios
            .get("http://localhost:5000/getMonth/" + this.state.month + "-" + this.state.year)
            .then((data) => {
                this.setState({ data: data.data });
            })
            .catch((err) => {
                console.log("There was a problem getting the monthly data");
                console.error(err);
                this.openSnackBar(String(err), "error");
            });
    };
    openAddTime = () => {
        this.setState({
            openDialog: true,
        });
    };
    dataUpdate = (data) => {
        console.log("in data update");
        console.log(data);
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
    render() {
        console.log(this.state.data);
        return (
            <div>
                <h1>This is my Salary Web App</h1>
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
                                <HoursPieChart data={this.state.data.totalHours} />
                            </Grid>
                            <Grid item xs={6}>
                                <SalaryPieChart data={this.state.data.salary} />
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
