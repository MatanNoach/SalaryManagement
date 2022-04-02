import React from "react";
import AddButton from "./AddButton";
import { Container, Grid } from "@mui/material";
import TimeDialog from "./TimeDialog";
import TimeTable from "./TimeTable";
import axios from "axios";
class Month extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            month: "march",
            year: 2022,
            data: [],
        };
    }
    componentDidMount = async () => {
        console.log("getting data")
        await axios
            .get("http://localhost:5000/getMonth/" + this.state.month + "-" + this.state.year)
            .then((data) => {
                this.setState({ data: data.data });
            })
            .catch((err) => {
                console.log("There was a problem getting the monthly data");
                console.error(err);
            });
    };
    addTime = () => {
        this.setState({
            openDialog: true,
        });
    };
    pushTime = (dataRow) => {
        console.log("pushing time")
        this.setState((prevState) => {
            return { data: [...prevState.data,dataRow] };
        });
    };
    closeDialog = () => {
        this.setState({
            openDialog: false,
        });
    };
    render() {
        console.log("rendering month")
        console.log(this.state.data)
        return (
            <div>
                <h1>This is my Salary Web App</h1>
                <Container>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sx={{ paddingBottom: 10 }}>
                            <TimeTable month={this.state.month} year={this.state.year} data={this.state.data} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ position: "sticky", bottom: 10 }} justifyContent="center">
                        <AddButton onClick={this.addTime} />
                    </Grid>
                </Container>
                <TimeDialog
                    open={this.state.openDialog}
                    onClose={this.closeDialog}
                    month={this.state.month}
                    year={this.state.year}
                    onSubmit={this.pushTime}
                />
            </div>
        );
    }
}
export default Month;
