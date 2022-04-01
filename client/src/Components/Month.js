import React from "react";
import AddButton from "./AddButton";
import { Container, Grid } from "@mui/material";
import TimeDialog from "./TimeDialog";
import TimeTable from "./TimeTable";
class Month extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
        };
    }
    addTime = () => {
        this.setState({
            openDialog: true,
        });
    };
    closeDialog = () => {
        this.setState({
            openDialog: false,
        });
    };
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <Container>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sx={{paddingBottom:10}}>
                            <TimeTable />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ position: "sticky", bottom: 10 }} justifyContent="center">
                        <AddButton onClick={this.addTime} />
                    </Grid>
                </Container>
                <TimeDialog open={this.state.openDialog} onClose={this.closeDialog} />
            </div>
        );
    }
}
export default Month;
