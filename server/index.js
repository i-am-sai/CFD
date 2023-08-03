const express = require("express");
const cors = require('cors');
const { connection } = require("./config/db");
const { FormRouter } = require("./route/FormRoutes");
const { ResponseRouter } = require("./route/ResponseRoutes");
const app = express()
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
    res.send("Welcome to custom form builder")
})

app.use("/forms", FormRouter)
app.use("/response", ResponseRouter)

app.listen(PORT, async () => {
    try {
        await connection
        console.log("DB is connected!!")
    } catch (error) {
        console.log(error)
    }
    console.log("app is running at the port 8080")
})

