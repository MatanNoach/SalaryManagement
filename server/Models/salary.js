module.exports = (mongoose)=>{
    let timeStamp = mongoose.Schema({
        date:String,
        startTime:String,
        endTime:String,
        totalInt:Number,
        totalString:String,
        overtime:String,
        payment:Number,
    });
    let month = mongoose.Schema({
        month:Number,
        year:Number,
        salary:Number,
        totalHours:Number,
        times:[timeStamp],
    })
    const salaryMonth = mongoose.model("SalaryMonth", month);
    return salaryMonth;
}