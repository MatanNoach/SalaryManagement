const constClass = require("./Constants")
const timeCalculator = require("./TimeCalculator");

const basicCalc = (prop, salary) => {
    return salaryProps[prop].percentage * salary;
};

const doublePercentageCalc = (prop, salary) => {
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
        calcFunction: doublePercentageCalc,
        isDeduction: true,
    },
    health: {
        percentage1: 0.031,
        percentage2: 0.05,
        calcFunction: doublePercentageCalc,
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
    const total = timeCalculator.totalDailyHours(dataRow);
    dataRow["totalString"] = total;
    var [totalH, totalM] = timeCalculator.extractTimeFromString(total);
    var payment = 0;
    var [overTimePayment, totalH, totalM] = calcOverTimePayment(dataRow, totalH, totalM);
    payment += overTimePayment;
    payment += (totalH + totalM / 60) * constClass.hourlyPayment;
    dataRow["payment"] = payment + constClass.drivingExpenses;
    return dataRow;
};
const calcOverTimePayment = (dataRow, totalH, totalM) => {
    const [totalOvertime, overTimeH, overTimeM] = timeCalculator.calcOverTime(totalH, totalM, dataRow);
    var payment = 0;
    if (totalOvertime !== 0) {
        payment +=
            Math.min(totalOvertime, 2) * constClass.overTimePayment25 * constClass.hourlyPayment +
            Math.max(totalOvertime - 2, 0) * constClass.overTimePayment50 * constClass.hourlyPayment;
        totalH -= overTimeH;
        totalM -= overTimeM;
    }
    return [payment, totalH, totalM];
};

exports.calcSalary = (salary, monthlyDriving, monthlyCibus) => {
    const salaryObj = {};
    const deductionSalary = salary + monthlyCibus;
    salaryObj["total"] = salary;
    for (const p in salaryProps) {
        if (salaryProps[p].isDeduction) {
            salaryObj[p] = salaryProps[p].calcFunction(p, deductionSalary);
        } else {
            salaryObj[p] = salaryProps[p].calcFunction(p, salary - monthlyDriving);
        }
    }
    salaryObj["neto"] = netoCalc(salaryObj, salary);
    return salaryObj;
};
exports.calcFullSalary = (times) => {
    let salaryObj = {
        total: 0,
        neto: 0,
        pension: 0,
        socialSecurity: 0,
        health: 0,
        educationFund: 0,
        incomeTax: 0,
    };
    times.map((time) => {
        salaryObj = this.calcSalary(time.payment, constClass.drivingExpenses, constClass.dailyCibus);
    });
    return salaryObj.total === 0 ? null : salaryObj;
};
