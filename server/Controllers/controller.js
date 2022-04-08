const salaryCalculator = require("../BusinessLogic/SalaryCalculator");
const timeCalculator = require("../BusinessLogic/TimeCalculator");
const dotenv = require("dotenv");
dotenv.config("../.env");

const db = require("../db");

const Salary = db.SalaryMonth;
const drivingExpenses = 22.6;
const dailyCibus = 25;

exports.addMonth = (req, res) => {
    const dataRow = req.body.dataRow;
    const year = req.body.year;
    const month = req.body.month;
    const salary = new Salary({
        month: month,
        year: year,
        salary: salaryCalculator.calcSalary(dataRow.payment, drivingExpenses, dailyCibus),
        totalHours: timeCalculator.calcLeftHours(100, dataRow.totalInt),
        times: [dataRow],
    });
    salary
        .save(salary)
        .then((data) => {
            return res.send(data);
        })
        .catch((err) => {
            return res.status(500).send({ message: "Some error occured while creating a monthly salary." });
        });
};

exports.addTime = (req, res) => {
    const year = req.body.year;
    const month = req.body.month;
    const date = new Date(req.body.dataRow.date);
    date.setDate(date.getDate() + 7);
    if (date.getMonth() !== month) {
        return res.status(500).send({ message: "Invalid date in current month salary" });
    }
    req.body.dataRow = salaryCalculator.calcDailyPayment(req.body.dataRow);
    Salary.findOneAndUpdate(
        { year: year, month: month },
        {
            $push: {
                times: req.body.dataRow,
            },
            $inc: {
                "salary.total": req.body.dataRow.payment,
                "salary.drivingExpenses": drivingExpenses,
                "salary.cibus": dailyCibus,
                "totalHours.left": req.body.dataRow.totalInt * -1,
                "totalHours.done": req.body.dataRow.totalInt,
            },
        },
        {
            new: true,
        }
    )
        .then((data) => {
            if (!data) {
                console.log("adding month");
                return this.addMonth(req, res);
            } else {
                const salaryProps = salaryCalculator.calcSalary(data.salary.total, data.salary.drivingExpenses, data.salary.cibus);
                return updateMonth(req, res,{salary:salaryProps},year,month);
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({ message: "There was a problem finding the monthly salary" });
        });
};
exports.getMonth = (req, res) => {
    const date = req.params.date;
    const year = Number(date.split("-")[1]);
    const month = Number(date.split("-")[0]);
    Salary.findOne({ year: year, month: month })
        .then((data) => {
            return res.send(data);
        })
        .catch(() => {
            return res.send({});
        });
};
exports.removeTime = (req, res) => {
    console.log("in remove time")
    const date = req.params.date;
    const year = Number(date.split("-")[1]);
    const month = Number(date.split("-")[0]);
    const id = req.params.id;
    Salary.findOneAndUpdate(
        { year: year, month: month },
        {
            $pull: {
                times: {
                    _id: id,
                },
            },
        },
        {
            new: true,
        }
    )
        .then((data) => {
            salaryObj = salaryCalculator.calcFullSalary(data.times);
            totalHours = timeCalculator.calcFullTime(data.times);
            return updateMonth(req, res, {salary:salaryObj,totalHours:totalHours}, year, month);
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).send({ message: "There was a deleting the row" });
        });
};
const updateMonth = (req, res, props,year,month) => {
    Salary.findOneAndUpdate(
        { year: year, month: month },
        {
            $set: props,
        },
        {
            new:true
        }
    )
        .then((data) => {
            if(data.totalHours===null){
                Salary.deleteOne({_id:data._id}).then((retData)=>{
                    return res.send({})
                })
            }
            return res.send(data);
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).send({ message: "There was a problem finding the monthly salary" });
        });
};
