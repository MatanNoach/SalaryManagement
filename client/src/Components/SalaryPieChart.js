import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const salaryProps = [
    {
        title: "נטו",
        value: 1,
        color: "#0981fb",
    },
    {
        title: "מס הכנסה",
        value: 1,
        color: "#80bdfa",
    },
    {
        title: "ביטוח בריאות",
        value: 1,
        color: "#3d59a0",
    },
    {
        title: "ביטוח לאומי",
        value: 1,
        color: "#546c86",
    },
    {
        title: "קרן פנסיה",
        value: 1,
        color: "#ad8fc6",
    },
    {
        title: "קרן השתלמות",
        value: 1,
        color: "#3e4c63",
    },
    // {
    //     title: "הכל",
    //     value: 0,
    //     color: "#0981fb",
    // },
];

class SalaryPieChart extends React.Component {
    componentDidMount() {
        this.updateValues();
    }
    componentDidUpdate() {
        this.updateValues();
    }
    updateValues = () => {
        if (this.props.data) {
            var i = 0;
            for (const prop in this.props.data) {
                if (prop !== "total" && prop !== "_id") {
                    salaryProps[i].value = Math.round(this.props.data[prop]);
                    i++;
                }
                // else if(prop==="total"){
                //     salaryProps[salaryProps.length-1].title = "סך הכל: " + Math.round(this.props.data[prop]);
                // }
            }
        }
    };
    render() {
        return (
            <PieChart
                data={salaryProps}
                lineWidth={30}
                paddingAngle={5}
                label={({ dataEntry }) => dataEntry.title + ": " + dataEntry.value}
                // segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                style={{ height: "300px" }}
                labelStyle={(index) => ({
                    fill: salaryProps[index].color,
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
