import React from "react";
import { PieChart,Tooltip } from "react-minimal-pie-chart";
import animateProps from 'react-animate-props';
import { Easing } from 'tweenkle';
import PropTypes from "prop-types"

const basicHoursLeft = [
    {
        title: "Done",
        value: 0,
        color: "#13CE66",
    },
    {
        title: "Left",
        value: 100,
        color: "#FF4949",
    },
];

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


// HoursPieChart.propTypes = {
//     animatedProps: PropTypes.object,
//     // data: {
//     //     done:{
//     //         value:PropTypes.number,
//     //     },
//     //     left:{
//     //         value:PropTypes.number,
//     //     }
//     // },
//     data:PropTypes.array,
//     onAnimateProgress: PropTypes.func,
//   };
   
//   HoursPieChart.defaultProps = {
//     animatedProps: {
//       data: {
//           done:{
//               value:{
//                 ease: Easing.Quad.In,
//                 delay: 500,
//                 duration: 1500,
//               }
//           },
//           left:{
//               value:{
//                 ease: Easing.Quad.In,
//                 delay: 500,
//                 duration: 1500,
//               }
//           }
        
//       },
//     },
//     data: basicHoursLeft,
//     onAnimateProgress: (prop, value) => {
//         console.log("on animate progress")
//         console.log(prop)
//         console.log(value)
//       return {
//         [prop]: value,
//       };
//     },
//     onAnimateComplete: (prop, value, tweensActive) => {
//       return {
//         [prop]: value,
//       };
//     },
//   };

export default animateProps(HoursPieChart,HoursPieChart.defaultProps);
