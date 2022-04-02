import "./Calculator"
import calcDailyPayment from "./Calculator";
import axios from "axios"
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const dataDir = "./src/Data/";
const saveTime = (fileName, dataRow) => {
    const filePath = dataDir + fileName + ".json";
    const objName = createObjName(dataRow.date);
    if(verifyHours(dataRow)){
        calcDailyPayment(dataRow)
    }
    axios.put("http://localhost:5000/api/saveFile",{"fileName":fileName,"dataRow":dataRow});
    // const data = require(filePath)
    // console.log(data)
    // data[objName].push(dataRow)
    // fs.writeFile(filePath,JSON.stringify(data),'utf8');
    // fs.readFile(filePath,"utf-8",(err,data)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log(data)
    //     data[objName].push(dataRow)
    //     fs.writeFile(filePath,JSON.stringify(data),'utf8');
    // })
};
const createObjName = (date) => {
    const splittedDate = date.split("-");
    const [year, month, day] = [splittedDate[0], splittedDate[1], splittedDate[2]];
    const objName = getMonth(month) + "-" + year;
    console.log("objName: ", objName);
    return objName;
};
const getMonth = (num) => {
    return months[Number(num)];
};
const verifyHours = (dataRow) => {
    const [startH, startM] = dataRow.startTime.split(":").map((value) => Number(value));
    const [endH, endM] = dataRow.endTime.split(":").map((value) => Number(value));
    if (startH > endH) {
        throw new Error("End Time smaller than Start Time ");
    } else if (startH === endH && startM > endM) {
        throw new Error("End Time smaller than Start Time ");
    }else{
       return true 
    }
};
export default saveTime;
