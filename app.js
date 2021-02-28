const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const field = require("./models/toyfields");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;


var $ = require("jquery");
const url = process.env.DB_URL;
mongoose.connect(url,{ useUnifiedTopology: true , useNewUrlParser: true,  useFindAndModify: false });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(("public")));
app.set("view engine","ejs");

var toyRouter=require("./routes/toyRouter.js");
var toyUserRouter = require("./routes/toyuserRouter.js");
var electronicRouter = require("./routes/electronicRouter.js");
var electronicUserRouter  = require("./routes/electronicuserRouter.js");

app.use("/toys",toyRouter);
app.use("/toyusers",toyUserRouter);
app.use("/electronics",electronicRouter);
app.use("/electronicusers",electronicUserRouter);

app.get("/",(req,res)=>{
    res.redirect("/toys");
})


app.listen(PORT,(err) =>{
    console.log("Server listening on Port 3000");
})