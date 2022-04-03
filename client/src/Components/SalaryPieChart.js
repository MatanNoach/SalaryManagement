import axios from "axios";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const hoursLeft = [
    {
        title: "נטו",
        value: 100,
        color: "#0981fb",
    },
    {
        title: "מס הכנסה",
        value: 70,
        color: "#80bdfa",
    },
    {
        title: "ביטוח בריאות",
        value: 70,
        color: "#3d59a0",
    },
    {
        title: "ביטוח לאומי",
        value: 70,
        color: "#546c86",
    },
    {
        title: "קרן פנסיה",
        value: 70,
        color: "#ad8fc6",
    },
    {
        title: "קרן השתלמות",
        value: 70,
        color: "#3e4c63",
    },
];


class SalaryPieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // getData = async ()=>{
    //     await axios.get("http://localhost:5000/getMonthSalary/" + this.props.month + "-" + this.props.year).then(data=>{
    //         this.setState({data:data})
    //     }).catch(err=>{

    //     })
    // }
    render() {
        return (
            <PieChart
                data={hoursLeft}
                lineWidth={30}
                paddingAngle={5}
                label={({ dataEntry }) => dataEntry.title+": "+dataEntry.value}
                segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                style={{height:"300px"}}
                labelStyle={(index) => ({
                    fill: hoursLeft[index].color,
                    fontSize: "5px",
                    fontFamily: "sans-serif",
                })}
                labelPosition={112}
                radius={42}
                animate={true}
            />
        );
    }
}
export default SalaryPieChart;
