const mongoose = require("mongoose");
const express = require('express');
var router = express.Router();

router.get("/:topic", async (req, res) => {
    const topic = req.params.topic;
    if (topic === "toys") {
        var topicname = "TOYS";
        var Field = require("../models/toyfields.js");
    }
    else {
        var topicname = "ELECTRONICS";
        var Field = require("../models/electronicfields");
    }
    try {
        const docs = await Field.find();
        res.render("form", { fields: docs, topic: topic, topicname: topicname });
    }
    catch (err) {
        res.send(err);
    }
})





router.post("/:topic/newfield", async (req, res) => {
    const topic = req.params.topic;
    if (topic === "toys") {
        var field = require("../models/toyfields.js");
    }
    else {
        var field = require("../models/electronicfields");
    }
    const newField = new field({
        name: req.body.name,
        type: req.body.type
    })
    const doc = await field.find({ name: req.body.name });

    if (doc.length !== 0) {
        res.send("Field is Already Present Try Changing the Name of the Field")
    }
    else {
        try {
            newField.save();
            res.redirect("/" + topic);
        }
        catch (err) {
            res.send(err);
        }

    }

});

router.post("/:topic/delete", async (req, res) => {
    const topic = req.params.topic;
    if (topic === "toys") {
        var field = require("../models/toyfields.js");
    }
    else {
        var field = require("../models/electronicfields");
    }


    try {
        await field.deleteOne({ name: req.body.name });
        res.redirect("/" + topic);
    }
    catch (err) {
        res.send(err);
    }
});

router.post("/:topic/updatefield", async (req, res) => {
    const topic = req.params.topic;
    if (topic === "toys") {
        var field = require("../models/toyfields.js");
    }
    else {
        var field = require("../models/electronicfields");
    }
    try {
        await field.findOneAndUpdate({ name: req.body.name }, { name: req.body.newname });
        res.redirect("/" + topic);
    }
    catch (err) {
        res.send(err);
    }
})





module.exports = router;