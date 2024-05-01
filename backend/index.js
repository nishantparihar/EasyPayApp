const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors")


const app = express()

app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

app.use('/api/v1', rootRouter);


app.listen("3000");


module.exports = app


