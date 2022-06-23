const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const upload = require('express-fileupload');
const app = express();
const musicRouter = require('./routes/music');
const podcastRouter = require('./routes/podcast');
const audiobookRouter = require('./routes/audiobook');
const episodeRouter = require('./routes/episode');
const albumRouter = require('./routes/album');
const paymentRouter = require('./routes/payment')
const path = require('path');

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
app.use('/episode',episodeRouter);
app.use('/album',albumRouter);
app.use('/payment',paymentRouter);

app.use('/routes/music',express.static(path.join(path.resolve(),'/routes/music')));
app.use('/routes/music/photo',express.static(path.join(path.resolve(),'/routes/music/photo')));
app.use('/routes/music/lyrics',express.static(path.join(path.resolve(),'/routes/music/lyrics')));
app.use('/routes/podcast',express.static(path.join(path.resolve(),'/routes/podcast')));
app.use('/routes/podcast/photo',express.static(path.join(path.resolve(),'/routes/podcast/photo')));
app.use('/routes/audiobook',express.static(path.join(path.resolve(),'/routes/audiobook')));
app.use('/routes/audiobook/photo',express.static(path.join(path.resolve(),'/routes/audiobook/photo')));
app.use('/images',express.static(path.join(path.resolve(),'/images')));




app.use('/public', express.static(__dirname + '/yenePay/public'));


// viewed at http://localhost:3000
app.get('/yenepay', function(req, res) {
    res.sendFile(path.join(__dirname + '/yenePay/views/index.html'));
});
// viewed at http://localhost:3000/cart
app.get('/yenepay/cart', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/cart.html'));
});

var routes = require('./yenePay/api/routes/appRoutes');
routes(app);

app.listen(8000, () => {
    console.log('App is running on port 8000')
});