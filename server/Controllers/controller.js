const calculator = require("../BusinessLogic/Calculator");
const dotenv = require("dotenv");
dotenv.config("../.env");

const db = require("../db");

const Salary = db.SalaryMonth;

exports.addMonth = (req, res) => {
    const dataRow = req.body.dataRow;
    const year = req.body.year;
    const month = req.body.month;
    console.log(req.body)
    const salary = new Salary({
        month: month,
        year: year,
        times:[dataRow]
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
    req.body.dataRow = calculator.calcDailyPayment(req.body.dataRow)
    Salary.findOneAndUpdate({ year: year, month: month },{
        $push:{
            times:{
                date:req.body.dataRow.date,
                startTime:req.body.dataRow.startTime,
                endTime:req.body.dataRow.endTime,
                total:req.body.dataRow.total,
                payment:req.body.dataRow.payment
            }
        }
    }).then((data) => {
        if (!data) {
            const newMonth = this.addMonth(req,res);
            return res.send(newMonth);
        } else {
            return res.send(data);
        }
    }).catch(err=>{
        return res.status(500).send({message:err.message || "There was a problem finding the monthly salary"})
    })
};

