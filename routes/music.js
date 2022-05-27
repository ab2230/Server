const express = require('express')

const router = express.Router()
const Music = require('../models/music')

router.post('/',async(req,res)=>{
    const music = new Music({
        title:req.body.title,
        artist_name:req.body.artist_name,
        music_description:req.body.music_description,
        image:req.body.image,
        path:req.body.path,
        rate:req.body.rate
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