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
        hoursLeft[0].value = Math.min(data.done, 100);
        hoursLeft[1].value = Math.max(data.left, 0);
        return hoursLeft;
    } else {
        return undefined;
    }
};
const basicSalaryProps = [
    {
        title: "נטו",
        value: 1,
        en: "neto",
        color: "#0981fb",
    },
    {
        title: "קרן פנסיה",
        value: 1,
        en: "pension",
        color: "#ad8fc6",
    },
    {
        title: "ביטוח לאומי",
        value: 1,
        en: "socialSecurity",
        color: "#546c86",
    },
    {
        title: "ביטוח בריאות",
        value: 1,
        en: "health",
        color: "#3d59a0",
    },
    {
        title: "קרן השתלמות",
        value: 1,
        en: "educationFund",
        color: "#3e4c63",
    },
    {
        title: "מס הכנסה",
        value: 1,
        en: "incomeTax",
        color: "#80bdfa",
    },
];

exports.handleSalary = (data) => {
    console.log(data);
    if (data) {
        const salaryProps = basicSalaryProps;
        var i = 0;
        for (const prop in basicSalaryProps) {
            salaryProps[i].value = Math.round(data[basicSalaryProps[prop].en]);
            i++;
        }
        return salaryProps;
    } else {
        return undefined;
    }
};
