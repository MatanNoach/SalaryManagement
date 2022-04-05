import React from "react";
import { PieChart } from "react-minimal-pie-chart";

class HoursPieChart extends React.Component {
    render() {
        return (
            <PieChart
                data={this.props.data}
                lineWidth={30}
                paddingAngle={5}
                label={({ dataEntry }) => dataEntry.title+": "+Math.round(dataEntry.percentage) + "%"}
                style={{height:"300px"}}
                labelStyle={(index) => ({
                    fill: this.props.data[index].color,
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
