const mongoose = require('mongoose');
var crypto = require('crypto'); 
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model("Admin",AdminSchema);