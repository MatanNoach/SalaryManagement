import React from "react";
import {Fab } from "@mui/material";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
class RightButton extends React.Component{
    render(){
        return(
        <Fab color="primary" variant="contained" size="medium" onClick={this.props.onClick}>
            <ArrowForwardIcon/>
        </Fab>
        )
    }
}
export default RightButton;