const express = require('express')

const router = express.Router()
const Music = require('../models/music');
const MusicPath = './routes/music/';
const PhotoPath = './routes/music/photo/';

router.post('/upload',async(req,res)=>{

    var file = req.files.file;
    var filename = file.name;

    file.mv(MusicPath+filename,function(err){
        if(err){
            res.send(err)
        } 
    })
    
    var photoFile = req.files.photo;
    var photoName = photoFile.name;

    photoFile.mv(PhotoPath+photoName,function(err){
        if(err){
            res.send(err)
        } 
    })

    const music = new Music({
        title:req.body.musicName,
        artist_name:req.body.artistName,
        email:req.body.email,
        cell:req.body.phoneNumber,
        image:PhotoPath+photoName,
        path:MusicPath+filename,
    })
    try{
        const addMusic = await music.save();
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(addMusic);
    }
    catch(err){
        res.send("Error "+ err)
    }
})


router.get('/', async(req,res)=>{
    try{
        console.log('omg it is get music')
        const music = await Music.find({})
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(music);
    }catch(err){
        res.send('Error '+err)
    }
})

module.exports = router