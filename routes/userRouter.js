const { json } = require('body-parser');
const { response } = require('express');
var express = require('express');
var router = express.Router();

router.get("/:topic", async (req, res) => {
    const topic = req.params.topic;

    if (topic === "toys") {
        var User = require("../models/toyusers.js");
    }
    else {
        var User = require("../models/electronicuser.js");
    }
    var users = await User.find({}, "-_id  -__v");
    users = JSON.parse(JSON.stringify(users));

    res.render("userdata", { users: users, topic: topic })
});

router.post("/:topic", async (req, res) => {
    const topic = req.params.topic;
    if (topic === "toys") {
        var User = require("../models/toyusers");
    }
    else {
        var User = require("../models/electronicuser");
    }
    const item = req.body;
    var newUser = new User(req.body);
    const result = await User.find({ "Username": req.body.Username })
    if (result.length === 0) {

        try {
            newUser.save();
            res.redirect("/users/" + topic);
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.send("The Username is Already Taken Please Enter a different UserName");
    }
})


router.post("/:topic/deleteUser", (req, res) => {
    const topic = req.params.topic;
    if (topic === "toys") {
        var User = require("../models/toyusers.js");
    }
    else {
        var User = require("../models/electronicuser.js");
    }

    User.deleteOne(req.body, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect("/" + topic);
        }
    })
})

router.post("/:topic/updateUser", (req, res) => {
    const topic = req.params.topic;
    if (topic === "toys") {
        var User = require("../models/toyusers.js");
    }
    else {
        var User = require("../models/electronicuser.js");
    }
    const user = req.body.Username;
    User.findOneAndUpdate({ "Username": user }, req.body, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect("/" + topic);
        }
    })

})

module.exports = router;