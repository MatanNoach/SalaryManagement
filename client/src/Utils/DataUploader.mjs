import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./march.json");
const times = data.times;
const { month, year } = data;

var i=0;
const myTimeOut = () => {
    console.log("in timeout");
    const myInterval = setInterval(() => {
        console.log("trying");
        try {
            const dataRow = {
                date: times[i].date,
                startTime: times[i].startTime,
                endTime: times[i].endTime,
            };
            axios.put("http://localhost:5000/addTime", { month: month, year: year, dataRow:dataRow })
            console.log("done");
        } catch (e) {
            clearInterval(myInterval);
        }
        i++;
    }, 500);
};
myTimeOut();
