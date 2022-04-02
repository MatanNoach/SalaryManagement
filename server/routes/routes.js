module.exports = app => {
    const router = require("express").Router();
    const controller = require("../Controllers/controller")

    router.put("/addTime",controller.addTime)
    router.get("/getMonth/:id",controller.getMonth)
    app.use("/",router);
}