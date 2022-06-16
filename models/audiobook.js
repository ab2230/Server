const mongoose = require('mongoose')

const audiobookSchema = new mongoose.Schema({
    title:
    {
        type:String,
        required:true
},
   author_name:{
    type:String,
    required:true
},
narrator_name:{
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
image:{
    type:String,
    required:true
},
path:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
rate:{
    type:'number',
    
}
})
module.exports = mongoose.model('Audiobook',audiobookSchema )