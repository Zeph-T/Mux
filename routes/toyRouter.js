const mongoose = require("mongoose");
const express = require('express');
var router = express.Router();
const field = require("../models/toyfields.js");
const toyUser = require("../models/toyusers.js");

router.get("/", (req, res) => {
    field.find((err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { fields: docs });
        }
    })
})

router.post("/", async (req, res) => {
    const item = req.body;
    var newUser = new toyUser(req.body);
    const result = await toyUser.find({ "Username": req.body.Username })
    console.log(result);
    if (result.length === 0) {

        try {
            newUser.save();
            res.redirect("/toyusers");
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.send("The Username is Already Taken Please Enter a different UserName");
    }
})

router.post("/newfield", async (req, res) => {

    const newField = new field({
        name: req.body.name,
        type: req.body.type
    })

    newField.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect("/toys");
        }
    });


})

router.post("/delete", (req, res) => {
    field.deleteOne({ name: req.body.name }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect("/toys");
        }
    })
})


router.post("/updatefield",(req,res)=>{
    field.findOneAndUpdate({name:req.body.name},{name:req.body.newname },(err,docs)=>{
        if(err)
        {
            console.log(err);
        }
        else {
            res.redirect("/toys");
        }
    })
})

router.post("/update", async (req, res) => {
    var response = await toyUser.findOne(req.body);
    response = JSON.parse(JSON.stringify(response));
    console.log(response.Lastname);
})
module.exports = router;