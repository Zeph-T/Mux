const mongoose = require('mongoose');

const ToyUser = mongoose.model("toyDoc",mongoose.Schema({},{strict:false}));

module.exports = ToyUser;