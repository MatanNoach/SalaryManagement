module.exports = app => {
    const router = require("express").Router();
    const controller = require("../Controllers/controller")

    router.put("/addTime",controller.addTime)
    router.get("/getMonth/:date",controller.getMonth)
    router.delete("/removeTime/:date/:id",controller.removeTime)
    app.use("/",router);
}