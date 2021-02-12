const express= require("express");
const cors= require("cors");

const port= process.env.PORT;
const dailyUpdateRouter=require("./routers/dailyUpdate")
const stoplightRouter= require("./routers/stoplightRouter")
const hospitalRouter= require("./routers/hospitalRouter")
require("../db/mongoose");

const app= express();

app.use(express.json());
app.use(cors());
app.use(dailyUpdateRouter);
app.use(stoplightRouter);
app.use(hospitalRouter)

app.listen(port,()=>{
    console.log("Server connected, port: ", port);
});