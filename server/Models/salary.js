module.exports = (mongoose)=>{
    let timeStamp = mongoose.Schema({
        date:String,
        startTime:String,
        endTime:String,
        total:String,
        overtime:String,
        payment:Number,
    });
    let month = mongoose.Schema({
        month:String,
        year:Number,
        times:[timeStamp],
    })
    const salaryMonth = mongoose.model("SalaryMonth", month);
    return salaryMonth;
}