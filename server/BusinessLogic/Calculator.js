const overTimeStartMap = { 0: 8, 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9 };
const monthlyHours = 100;
const overTimePayment = 1.25;
const hourlyPayment = 90;
const drivingExpenses = 22.6;
const dailyCibus = 25;

const basicCalc = (prop, salary) => {
    return salaryProps[prop].percentage * salary;
};
const doublePercentagecalc = (prop, salary) => {
    const step = 6331; // step by social security website
    const num1 = Math.min(salary, step);
    const num2 = Math.max(salary - step, 0);
    return salaryProps[prop].percentage1 * num1 + salaryProps[prop].percentage2 * num2;
};
const netoCalc = (salaryObj, salary) => {
    let neto = salary;
    for (const p in salaryObj) {
        if (p !== "total") {
            neto -= salaryObj[p];
        }
    }
    return neto;
};

const salaryProps = {
    pension: {
        percentage: 0.06,
        calcFunction: basicCalc,
        isDeduction: false,
    },
    socialSecurity: {
        percentage1: 0.004,
        percentage2: 0.07,
        calcFunction: doublePercentagecalc,
        isDeduction: true,
    },
    health: {
        percentage1: 0.031,
        percentage2: 0.05,
        calcFunction: doublePercentagecalc,
        isDeduction: true,
    },
    educationFund: {
        percentage: 0.025,
        calcFunction: basicCalc,
        isDeduction: false,
    },
    incomeTax: {
        percentage: 0.031,
        calcFunction: basicCalc,
        isDeduction: true,
    }, // estimated
};

exports.calcDailyPayment = (dataRow) => {
    const date = new Date(dataRow.date);
    const overTimeStart = overTimeStartMap[date.getDay()];
    const total = totalDailyHours(dataRow);
    dataRow["totalString"] = total;
    var [totalH, totalM] = total.split(":").map((value) => Number(value));
    var payment = 0;
    if (totalH >= overTimeStart) {
        const overTimeH = totalH - overTimeStart;
        const overTimeM = totalM;
        if (overTimeM === 0 && overTimeH === 0) {
            dataRow["overtime"] = "-";
        } else {
            dataRow["overtime"] =
                (overTimeH <= 9 ? "0" : "") + overTimeH + ":" + (overTimeM <= 9 ? "0" : "") + overTimeM;
        }
        payment += (overTimeH + overTimeM / 60) * hourlyPayment * overTimePayment;
        totalH -= overTimeH;
        totalM -= overTimeM;
    } else {
        dataRow["overtime"] = "-";
    }
    payment += (totalH + totalM / 60) * hourlyPayment;
    dataRow["payment"] = payment + drivingExpenses;
    return dataRow;
};
const totalDailyHours = (dataRow) => {
    const [startH, startM] = dataRow.startTime.split(":").map((value) => Number(value));
    const [endH, endM] = dataRow.endTime.split(":").map((value) => Number(value));
    var startDate = new Date(0, 0, 0, startH, startM, 0);
    var endDate = new Date(0, 0, 0, endH, endM, 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    dataRow["totalInt"] = Number(hours + minutes / 60);
    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
};
exports.calcTotalHours = (prevTime, addTime) => {
    const [prevH, prevM] = prevTime.split(":").map((value) => Number(value));
    const [addH, addM] = addTime.split(":").map((value) => Number(value));
    var newH = prevH + addH;
    var newM = addM + prevM;
    if (newM >= 60) {
        newH += 1;
        newM -= 60;
    }
    return newH + ":" + newM;
};
exports.timeIntToString = (time) => {
    const hours = Math.floor(time);
    const left = time - hours;
    const minutes = Math.round(left * 60);
    return hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
};
exports.calcSalary = (salary, driving, cibus) => {
    console.log("in calcSalary");
    console.log(salary);
    const salaryObj = {};
    const deductionSalary = salary + cibus;
    salaryObj["total"] = salary;
    for (const p in salaryProps) {
        if (salaryProps[p].isDeduction) {
            salaryObj[p] = salaryProps[p].calcFunction(p, deductionSalary);
        } else {
            salaryObj[p] = salaryProps[p].calcFunction(p, salary - driving);
        }
        console.log(p);
        console.log(salaryObj[p]);
    }
    salaryObj["neto"] = netoCalc(salaryObj, salary);
    return salaryObj;
};

exports.calcLeftHours = (leftBefore, counted) => {
    return {
        left: leftBefore - counted,
        done: monthlyHours - leftBefore + counted,
    };
};
