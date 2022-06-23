const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({
    title:
    {
        type:String,
        required:true
},
   artist_name:{
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
lyricsPath:{
    type:String,
    required:true
},
album:{
    type:String,
},
category: {
    type: Array,
    required: true,
  },
music_length:{
    type:String,
    required:true
},  
rate:{
    type: 'number',
    default:0.0
}
},{
    timestamps:true
})
module.exports = mongoose.model('Music',musicSchema )