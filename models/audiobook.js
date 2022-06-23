const mongoose = require('mongoose')


const Chapter = mongoose.Schema({
    chapterName: {
      type: String,
    },
    file: {
      type: String,
    },
    chapterLength: {
      type: String,
    },
    description2: {
      type: String,
    }
  });


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
category: {
    type: Array,
    required: true,
  },
description:{
    type:String,
    required:true
},
rate:{
  type: 'number',
  default:0.0
},
Chapters: [Chapter]
},{
  timestamps:true
})
module.exports = mongoose.model('Audiobook',audiobookSchema )