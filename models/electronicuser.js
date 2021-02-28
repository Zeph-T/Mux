const mongoose = require('mongoose');

const ElectronicUser = mongoose.model("elecrtonicDoc",mongoose.Schema({},{strict:false}));

module.exports = ElectronicUser;