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
    let salary=mongoose.Schema({
        total:Number,
        neto:Number,
        pension:Number,
        socialSecurity:Number,
        health:Number,
        educationFund:Number,
        incomeTax:Number,
    })
    let totalHours=mongoose.Schema({
        left:Number,
        done:Number,
    })
    let month = mongoose.Schema({
        month:Number,
        year:Number,
        salary:salary,
        totalHours:totalHours,
        times:[timeStamp],
    })
    const salaryMonth = mongoose.model("SalaryMonth", month);
    return salaryMonth;
}