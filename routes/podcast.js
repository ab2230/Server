const express = require('express')

const router = express.Router()
const Podcast = require('../models/podcast')

router.post('/upload',async(req,res)=>{

    var file = req.files.file;
    var filename = file.name;

    file.mv('./podcast/'+filename,function(err){
        if(err){
            res.send(err)
        } 
    })
    
    var photoFile = req.files.photo;
    var photoName = photoFile.name;

    photoFile.mv('./podcast/photo/'+photoName,function(err){
        if(err){
            res.send(err)
        } 
    })

    const podcast = new Podcast({
        title:req.body.musicName,
        podcasters:req.body.podcasterName,
        email:req.body.email,
        cell:req.body.phoneNumber,
        image:"./podcast/photo/"+photoName,
        path:'./podcast/'+filename,
        description:req.body.description
    })
    try{
        const addedPodcast = await podcast.save();
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(addedPodcast);
    }
    catch(err){
        res.send("Error "+ err)
    }
})


router.get('/', async(req,res)=>{
    try{
        console.log('omg it is get of podcaster')
        const podcast = await Podcast.find({})
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(podcast);
    }catch(err){
        res.send('Error '+err)
    }
})

module.exports = router