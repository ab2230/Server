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
album:{
    type:String,

},
rate:{
    type:'number',
    
}
})
module.exports = mongoose.model('Music',musicSchema )