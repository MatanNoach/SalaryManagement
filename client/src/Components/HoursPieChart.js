import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const hoursLeft = [
    {
        title: "Done",
        value: 30,
        color: "#13CE66",
    },
    {
        title: "Left",
        value: 70,
        color: "#FF4949",
    },
];

class HoursPieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <PieChart
                data={hoursLeft}
                lineWidth={30}
                paddingAngle={5}
                label={({ dataEntry }) => dataEntry.title+": "+Math.round(dataEntry.percentage) + "%"}
                style={{height:"300px"}}
                labelStyle={(index) => ({
                    fill: hoursLeft[index].color,
                    fontSize: "6px",
                    fontFamily: "sans-serif",
                })}
                animate={true}
                radius={42}
            />
        );
    }
}
export default HoursPieChart;
