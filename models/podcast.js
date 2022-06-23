const mongoose = require('mongoose')

const Episode = mongoose.Schema({
    episodeName: {
      type: String,
      required:true
    },
    file: {
      type: String,
      required:true
    },
    episodeLength: {
      type: String,
      required:true
    },
    description2: {
      type: String,
      required:true
    }
  });

const podcastSchema = new mongoose.Schema({
    title:
    {
        type:String,
        required:true
},
   podcasters:{
    type:String,
    required:true
},
email:{
    type:String
},
cell:{
    type:Number
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
episodes: [Episode]

},{
  timestamps:true
})
module.exports = mongoose.model('Podcast',podcastSchema )