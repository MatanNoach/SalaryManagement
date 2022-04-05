import React from "react";
import { PieChart } from "react-minimal-pie-chart";

class SalaryPieChart extends React.Component {
    render() {
        return (
            <PieChart
                data={this.props.data}
                lineWidth={30}
                paddingAngle={5}
                label={({ dataEntry }) => dataEntry.title + ": " + dataEntry.value}
                // segmentsShift={(index) => (index === this.state.hoverIndex ? 7 : 0.5)}
                style={{ height: "300px" }}
                labelStyle={(index) => ({
                    fill: this.props.data[index].color,
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
