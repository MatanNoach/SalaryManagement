import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./salarymonths.json");

// const times = data.times;
// const { month, year } = data;

var i = 0;
const myTimeOut = (times, month, year) => {
    console.log("in timeout");
    console.log(`uploading ${month} - ${year}`)
    const myInterval = setInterval(() => {
        console.log("trying");
        try {
            const dataRow = {
                date: times[i].date,
                startTime: times[i].startTime,
                endTime: times[i].endTime,
            };
            axios.put("http://localhost:5000/addTime", { month: month, year: year, dataRow: dataRow });
            console.log("done");
        } catch (e) {
            clearInterval(myInterval);
        }
        i++;
    }, 1000);
};
// I manually replace in number in brackets because bulk update does not work properly
const { month, year, times } = data[5];
myTimeOut(times,month,year);

