import React from "react";
import AddButton from "./AddButton";
import { Container, Grid, Typography } from "@mui/material";
import TimeDialog from "./TimeDialog";
import TimeTable from "./TimeTable";
import axios from "axios";
import EventSnackBar from "./EventSnackBar";
import CustomPieChart from "./HoursPieChart";
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
            data: [],
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
                console.log(err);
            });
    };
    openAddTime = () => {
        this.setState({
            openDialog: true,
        });
    };
    pushTime = (dataRow) => {
        console.log("pushing time");
        this.setState((prevState) => {
            return { data: [...prevState.data, dataRow] };
        });
    };
    closeDialog = () => {
        this.setState({
            openDialog: false,
        });
    };
    openSnackBar = (message, type) => {
        console.log("open snack bar");
        this.setState({
            snackBarOpen: true,
            snackBarMessage: message,
            severity: type,
        });
    };
    closeSnackBar = () => {
        console.log("close snack bar");
        this.setState({
            snackBarOpen: false,
            snackBarMessage: "",
        });
    };
    render() {
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
                            <TimeTable month={this.state.month} year={this.state.year} data={this.state.data} />
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CustomPieChart />
                            </Grid>
                            <Grid item xs={6}>
                                <SalaryPieChart />
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
                    onSubmit={this.pushTime}
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
