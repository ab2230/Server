const express = require('express')

const router = express.Router()
const Audiobook = require('../models/audiobook')

router.post('/upload',async(req,res)=>{

    var file = req.files.file;
    var filename = file.name;

    file.mv('./audiobook/'+filename,function(err){
        if(err){
            res.send(err)
        } 
    })
    
    var photoFile = req.files.photo;
    var photoName = photoFile.name;

    photoFile.mv('./audiobook/photo/'+photoName,function(err){
        if(err){
            res.send(err)
        } 
    })

    const audiobook = new Audiobook({
        title:req.body.musicName,
        author_name:req.body.authorName,
        narrator_name:req.body.narratorName,
        email:req.body.email,
        cell:req.body.phoneNumber,
        image:"./audiobook/photo/"+photoName,
        path:'./audiobook/'+filename,
        description:req.body.description
    })
    try{
        const addedAudiobook = await audiobook.save();
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(addedAudiobook);
    }
    catch(err){
        res.send("Error "+ err)
    }
})


router.get('/', async(req,res)=>{
    try{
        console.log('omg it is get of audiobook')
        const audiobook = await Audiobook.find({})
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(podcast);
    }catch(err){
        res.send('Error '+err)
    }
})

module.exports = router;