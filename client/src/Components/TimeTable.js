import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Box,
    IconButton,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

const headCells = [
    {
        title: "Date",
        key: "date",
    },
    {
        title: "Start",
        key: "startTime",
    },
    {
        title: "End",
        key: "endTime",
    },
    {
        title: "Total",
        key: "totalString",
    },
    {
        title: "Overtime",
        key: "overtime",
    },
    {
        title: "Payment",
        key: "payment",
    },
];


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

class TimeTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderBy: "date",
            order: "asc",
        };
    }
    setOrder = (isAsc, property) => {
        this.setState({
            order: isAsc ? "desc" : "asc",
            orderBy: property,
        });
    };
    createSortHandler = (property) => (event) => {
        this.handleRequestSort(event, property);
    };
    handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === "asc";
        this.setOrder(isAsc, property);
    };
    render() {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{backgroundColor:"#1976d2"}}>
                            {headCells.map((head) => {
                                console.log(head.key)
                                return (
                                    <TableCell
                                    style={{color:"white"}}
                                        key={head.key}
                                        sortDirection={this.state.orderBy === head.key ? this.state.order : false}
                                    >
                                        {head.title}
                                        <TableSortLabel
                                            active={this.state.orderBy === head.key}
                                            direction={this.state.orderBy === head.key ? this.state.order : "asc"}
                                            onClick={this.createSortHandler(head.key)}
                                        >
                                            {this.state.orderBy === head.key ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {this.state.order === "desc"
                                                        ? "sorted descending"
                                                        : "sorted ascending"}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                );
                            })}
                            <TableCell style={{color:"white"}}>
                            Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data ? (
                            this.props.data.sort(getComparator(this.state.order,this.state.orderBy)).map((day, i) => {
                                return (
                                    <TableRow key={i}>
                                        {headCells.map((head) => {
                                            return <TableCell>{day[head.key]}</TableCell>;
                                        })}
                                        <TableCell>
                                            <IconButton onClick={this.props.deleteRow(this.props.data[i])}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
export default TimeTable;
