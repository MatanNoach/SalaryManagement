const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

const baseClientURL = "http://localhost:3000";

const corsOptions = {
    origin: baseClientURL,
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/routes")(app);

app.listen(PORT, () => {
    console.log(`Node server started running in port: ${PORT}`);
});
