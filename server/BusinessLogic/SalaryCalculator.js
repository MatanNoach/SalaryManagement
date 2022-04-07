const timeCalculator = require("./TimeCalculator")

const overTimePayment25 = 1.25;
const overTimePayment50 = 1.50;
const hourlyPayment = 90;
const drivingExpenses = 22.6;

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
    var [totalH, totalM] = timeCalculator.extractTimeFromString(total)
    var payment = 0;
    var [overTimePayment,totalH,totalM] = calcOverTimePayment(dataRow,totalH,totalM);
    payment+=overTimePayment;
    payment += (totalH + totalM / 60) * hourlyPayment;
    dataRow["payment"] = payment + drivingExpenses;
    return dataRow;
};
const calcOverTimePayment = (dataRow,totalH,totalM)=>{
    const [totalOvertime,overTimeH,overTimeM] = timeCalculator.calcOverTime(totalH,totalM,dataRow)
    var payment=0;
    if(totalOvertime!==0){
        payment +=  Math.min(totalOvertime,2)* overTimePayment25 + Math.max(totalOvertime-2,0)*overTimePayment50;
        totalH -= overTimeH;
        totalM -= overTimeM;
    }
    return [payment,totalH,totalM];
}

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
    }
    salaryObj["neto"] = netoCalc(salaryObj, salary);
    return salaryObj;
};

