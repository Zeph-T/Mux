const mongoose = require('mongoose');
 
const fieldSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required: true
    }
});


const Field=mongoose.model("electronicfield",fieldSchema);

module.exports = Field;