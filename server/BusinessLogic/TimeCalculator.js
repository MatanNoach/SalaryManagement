const monthlyHours = 100;
const overTimeStartMap = { 0: 8, 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9 };

exports.calcOverTime = (totalH, totalM, dataRow) => {
    const date = new Date(dataRow.date);
    const overTimeStart = overTimeStartMap[date.getDay()];
    var overTimeH = 0;
    var overTimeM = 0;
    if (totalH >= overTimeStart) {
        overTimeH = totalH - overTimeStart;
        overTimeM = totalM;
        if (overTimeM === 0 && overTimeH === 0) {
            dataRow["overtime"] = "-";
        } else {
            dataRow["overtime"] = this.timeFormat(overTimeH, overTimeM);
        }
    }else{
        dataRow["overtime"] = "-";
    }
    const totalOvertime = overTimeH + overTimeM / 60;
    return [totalOvertime,overTimeH,overTimeM]
};

exports.totalDailyHours = (dataRow) => {
    const [startH, startM] = this.extractTimeFromString(dataRow.startTime);
    const [endH, endM] = this.extractTimeFromString(dataRow.endTime);
    var startDate = new Date(0, 0, 0, startH, startM, 0);
    var endDate = new Date(0, 0, 0, endH, endM, 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    dataRow["totalInt"] = Number(hours + minutes / 60);
    return this.timeFormat(hours, minutes);
};

exports.calcTotalHours = (prevTime, addTime) => {
    const [prevH, prevM] = this.extractTimeFromString(prevTime);
    const [addH, addM] = this.extractTimeFromString(addTime);
    var newH = prevH + addH;
    var newM = addM + prevM;
    if (newM >= 60) {
        newH += 1;
        newM -= 60;
    }
    return timeFormat(newH, newM);
};
exports.timeIntToString = (time) => {
    const hours = Math.floor(time);
    const left = time - hours;
    const minutes = Math.round(left * 60);
    return timeFormat(hours, minutes);
};
exports.timeFormat = (hours, minutes) => {
    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
};
exports.extractTimeFromString = (time) => {
    return time.split(":").map((value) => Number(value));
};
exports.calcLeftHours = (leftBefore, counted) => {
    return {
        left: leftBefore - counted,
        done: monthlyHours - leftBefore + counted,
    };
};
