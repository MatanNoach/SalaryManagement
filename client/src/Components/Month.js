import React from "react";
import AddButton from "./AddButton";
import { Dialog, Grid } from "@mui/material";
import TimeDialog from "./TimeDialog";
class Month extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openDialog:false
        }
    }
    addTime = () => {
        this.setState({
            openDialog:true
        })
    };
    closeDialog=()=>{
        console.log("in close (month)")
        this.setState({
            openDialog:false
        })
    }
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <Grid container spacing={3} sx={{ position: "sticky", bottom: 10 }} justifyContent="center">
                    <AddButton onClick={this.addTime} />
                    <TimeDialog open={this.state.openDialog} onClose={this.closeDialog}/>
                </Grid>
            </div>
        );
    }
}
export default Month;
