module.exports = app => {
    const router = require("express").Router();
    const controller = require("../Controllers/controller")
    
    router.put("/saveTime",controller.addTime)
    app.use("/",router);
}