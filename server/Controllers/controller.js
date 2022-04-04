const calculator = require("../BusinessLogic/Calculator");
const dotenv = require("dotenv");
dotenv.config("../.env");

const db = require("../db");

const Salary = db.SalaryMonth;

exports.addMonth = (req, res) => {
    const dataRow = req.body.dataRow;
    const year = req.body.year;
    const month = req.body.month;
    const salary = new Salary({
        month: month,
        year: year,
        salary: calculator.calcSalary(dataRow.payment),
        totalHours: calculator.calcLeftHours(100, dataRow.totalInt),
        times: [dataRow],
    });
    salary
        .save(salary)
        .then((data) => {
            return res.send(data);
        })
        .catch((err) => {
            return res.status(500).send({ message: err.message || "Some error occured creating a monthly salary." });
        });
};

exports.addTime = (req, res) => {
    const year = req.body.year;
    const month = req.body.month;
    const date = new Date(req.body.dataRow.date);
    date.setDate(date.getDate() + 7);
    if (date.getMonth() !== month) {
        return res.status(500).send("Invalid date in current month salary");
    }
    req.body.dataRow = calculator.calcDailyPayment(req.body.dataRow);
    console.log("before salary calc")
    const salaryProps = calculator.calcSalary(req.body.dataRow.payment);
    console.log("after salary calc")
    Salary.findOneAndUpdate(
        { year: year, month: month },
        {
            $push: {
                times: req.body.dataRow,
            },
            $inc: {
                    "salary.total": req.body.dataRow.payment,
                    "salary.neto": salaryProps.neto,
                    "salary.pension": salaryProps.pension,
                    "salary.socialSecurity": salaryProps.socialSecurity,
                    "salary.health": salaryProps.health,
                    "salary.educationFund": salaryProps.educationFund,
                    "salary.incomeTax": salaryProps.incomeTax,
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
            }
            return res.send(data);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({ message: "There was a problem finding the monthly salary" });
        });
};
exports.getMonth = (req, res) => {
    const id = req.params.id;
    const year = Number(id.split("-")[1]);
    const month = Number(id.split("-")[0]);
    Salary.findOne({ year: year, month: month })
        .then((data) => {
            return res.send(data);
        })
        .catch(() => {
            return res.send({});
        });
};
