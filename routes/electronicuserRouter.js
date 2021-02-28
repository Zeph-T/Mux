const { json } = require('body-parser');
const { response } = require('express');
var express = require('express');
var router = express.Router();
var User = require("../models/electronicuser.js");



router.route("/")
.get(async(req,res)=>{
    var users= await User.find({},"-_id  -__v");
    users = JSON.parse(JSON.stringify(users));

    res.render("users1",{users:users})
});


router.post("/deleteUser",(req,res)=>{
    
    User.deleteOne(req.body,(err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect("/electronicusers");
        }
    })
})


router.post("/updateUser",(req,res)=>{
    const user = req.body.Username;
    User.findOneAndUpdate({"Username":user},req.body,(err)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            res.redirect("/electronics");
        }
    })

})

module.exports = router;