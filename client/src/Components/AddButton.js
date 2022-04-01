import React from "react";
import {Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

class AddButton extends React.Component{
    render(){
        return(
        <Fab color="primary" variant="contained" size="medium" onClick={this.props.onClick}>
            <AddIcon/>
        </Fab>
        )
    }
}
export default AddButton;