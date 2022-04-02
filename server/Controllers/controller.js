const calculator = require("../BusinessLogic/Calculator");
const dotenv = require("dotenv");
dotenv.config("../.env");

const db = require("../db");
const salary = require("../Models/salary");
const { redirect } = require("statuses");

const Salary = db.SalaryMonth;

exports.addMonth = (req, res) => {
    const dataRow = req.body.dataRow;
    const year = req.body.year;
    const month = req.body.month;
    console.log(dataRow);
    const salary = new Salary({
        month: month,
        year: year,
        salary: dataRow.payment,
        totalHours: dataRow.totalInt,
        times: [dataRow],
    });
    salary
        .save(salary)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return res.status(500).send({ message: err.message || "Some error occured creating a monthly salary." });
        });
};

exports.addTime = (req, res) => {
    const year = req.body.year;
    const month = req.body.month;
    req.body.dataRow = calculator.calcDailyPayment(req.body.dataRow);
    Salary.findOneAndUpdate(
        { year: year, month: month },
        {
            $push: {
                times: req.body.dataRow,
            },
            $inc: {
                salary: req.body.dataRow.payment,
                totalHours:req.body.dataRow.totalInt,
            }
        }
    )
        .then((data) => {
            if (!data) {
                this.addMonth(req, res);
                return res.send(req.body.dataRow);
            }
        })
        .catch((err) => {
            return res.status(500).send({ message: err.message || "There was a problem finding the monthly salary" });
        });
};
exports.getMonth = (req, res) => {
    const id = req.params.id;
    const year = Number(id.split("-")[1]);
    const month = id.split("-")[0];
    Salary.findOne({ year: year, month: month })
        .then((data) => {
            return res.send(data.times);
        })
        .catch((err) => {
            return res.send([]);
        });
};
