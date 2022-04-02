const overTimeStartMap = { 0: 8, 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9 };
const dailyHours = 100;
const overTimePayment = 1.25;
const hourlyPayment = 90;

exports.calcDailyPayment = (dataRow) => {
    const date = new Date(dataRow.date);
    const overTimeStart = overTimeStartMap[date.getDay()];
    const total = totalDailyHours(dataRow);
    dataRow["total"] = total;
    var [totalH, totalM] = total.split(":").map((value) => Number(value));
    var payment = 0;
    if (totalH >= overTimeStart) {
        const overTimeH = totalH - overTimeStart;
        const overTimeM = totalM;
        if (overTimeM === 0 && overTimeH === 0) {
            dataRow["overtime"] = "-";
        } else {
            dataRow["overtime"] = overTimeH + ":" + overTimeM;
        }
        payment += (overTimeH + overTimeM / 60) * hourlyPayment * overTimePayment;
        totalH -= overTimeH;
        totalM -= overTimeM;
    } else {
        dataRow["overtime"] = "-";
    }
    payment += (totalH + totalM / 60) * hourlyPayment;
    dataRow["payment"] = payment;
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
    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
};
