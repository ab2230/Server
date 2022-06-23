const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    album_title:
    {
    type:String,
    required:true
    },
     artist_name:{
     type:String,
     required:true
    },
    album_description:{
    type:String,
    },
    image:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true
    },
    cell:{
        type:Number,
        required:true
    },
    category: {
        type: Array,
        required: true,
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Album',albumSchema )