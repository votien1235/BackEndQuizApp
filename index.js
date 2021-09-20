require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path")
const router = require("./api")
require("./repositories");

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use("/static", express.static(path.join(__dirname,"static"))); 


const PORT = 5000;
app.listen(5000, () => {
    console.log("App is running at " + PORT);
})