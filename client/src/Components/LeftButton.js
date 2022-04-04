import React from "react";
import {Fab } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
class LeftButton extends React.Component{
    render(){
        return(
        <Fab color="primary" variant="contained" size="medium" onClick={this.props.onClick}>
            <ArrowBackIcon/>
        </Fab>
        )
    }
}
export default LeftButton;