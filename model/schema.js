const mongoose = require("mongoose");

const schemas = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true,
    }
},{timestamps:true});

const userModel = new mongoose.model("userData",schemas);

module.exports = userModel;