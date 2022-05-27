const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const upload = require('express-fileupload');
const app = express();

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

app.use(cors());
app.use(express.static('public'));

app.use(upload());

app.post('/upload', (req, res) => {
    var file = req.files.file;
    var filename = file.name;

    file.mv('./music/'+filename,function(err){
        if(err){
            res.send(err)
        } else {
            res.send("file uploaded")
        }
    })
});

app.listen(8000, () => {
    console.log('App is running on port 8000')
});