const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
db.SalaryMonth = require('./Models/salary')(mongoose);
db.connection = db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.log("Could not connect to the database.,", err)
    });

module.exports = db;
