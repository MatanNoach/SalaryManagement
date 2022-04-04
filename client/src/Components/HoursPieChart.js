import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const hoursLeft = [
    {
        title: "Done",
        value:0,
        color: "#13CE66",
    },
    {
        title: "Left",
        value:100,
        color: "#FF4949",
    },
];

class HoursPieChart extends React.Component {
    componentDidMount(){
        this.updateValues();
    }
    componentDidUpdate(){
        this.updateValues();
    }
    updateValues = ()=>{
        if(this.props.data){
            hoursLeft[0].value = this.props.data.done;
            hoursLeft[1].value = this.props.data.left;
        }
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
