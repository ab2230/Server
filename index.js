const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const upload = require('express-fileupload');
const app = express();
const musicRouter = require('./routes/music');
const podcastRouter = require('./routes/podcast');
const audiobookRouter = require('./routes/audiobook');


mongoose.connect("mongodb://localhost:27017/Awd",{
    useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("successfully connected")
    }
})

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(upload());

app.use('/music',musicRouter);
app.use('/podcast',podcastRouter);
app.use('/audiobook',audiobookRouter);

app.listen(8000, () => {
    console.log('App is running on port 8000')
});