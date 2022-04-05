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
exports.handleHoursLeft = (data) => {
    if (data) {
        const hoursLeft = basicHoursLeft;
        hoursLeft[0].value = data.done;
        hoursLeft[1].value = data.left;
        return hoursLeft;
    } else {
        return undefined;
    }
};
const basicSalaryProps = [
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
];

exports.handleSalary = (data) => {
    console.log(data)
    if(data){
        const salaryProps = basicSalaryProps;
        var i = 0;
        for (const prop in data) {
            if (prop !== "total" && prop !== "_id") {
                salaryProps[i].value = Math.round(data[prop]);
                i++;
            }
        }
        return salaryProps;
    }else{
        return undefined;
    }
};
