const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const field = require("./models/toyfields");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const url = process.env.DB_URL;

mongoose.connect(url,{ useUnifiedTopology: true , useNewUrlParser: true,  useFindAndModify: false });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(("public")));
app.set("view engine","ejs");

var userRouter = require("./routes/userRouter");
var fieldRouter = require("./routes/fieldRouter");

app.get("/",(req,res)=>{
    res.redirect("/toys");
})

app.use("/",fieldRouter);
app.use("/users",userRouter);




app.listen(PORT,(err) =>{
    console.log("Server listening on Port 3000");
})