import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

class TimeTable extends React.Component {
    
    render() {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Overtime</TableCell>
                            <TableCell>Payment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data ? this.props.data.map((day, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{day.date}</TableCell>
                                    <TableCell>{day.startTime}</TableCell>
                                    <TableCell>{day.endTime}</TableCell>
                                    <TableCell>{day.total}</TableCell>
                                    <TableCell>{day.overtime}</TableCell>
                                    <TableCell>{day.payment}</TableCell>
                                </TableRow>
                            );
                        }): <></>}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
export default TimeTable;
