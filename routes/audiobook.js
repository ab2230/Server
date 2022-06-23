const express = require('express')

const router = express.Router()
const Audiobook = require('../models/audiobook')
const AudiobookPath = './routes/audiobook/';
const PhotoPath = './routes/audiobook/photo/';

router.post('/upload',async(req,res)=>{

    var getChapter =[]
    var file = '';
    var filename = '';
    
    
    var photoFile = req.files.photo;
    var photoName = photoFile.name;

    photoFile.mv(PhotoPath+photoName,function(err){
        if(err){
            res.send(err)
        } 
    })

    for(var i=0;i<req.body.chapterName.length;i++)
    {
      getChapter.push({
          file:AudiobookPath+req.files.file[i].name,
          chapterName:req.body.chapterName[i],
          chapterLength:req.body.chapterLength[i],
          description2:req.body.description2[i]})
      file = req.files.file[i];
      filename = file.name;
    
      file.mv(AudiobookPath+filename,function(err){
        if(err){
            res.send(err)
        } 
    })
    }

    const audiobook = new Audiobook({
        title:req.body.audiobookName,
        author_name:req.body.authorName,
        narrator_name:req.body.narratorName,
        email:req.body.email,
        cell:req.body.phoneNumber,
        image:PhotoPath+photoName,
        category:req.body.category,
        description:req.body.description1,
        Chapters:getChapter
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
        res.json(audiobook);
    }catch(err){
        res.send('Error '+err)
    }
})

router.get("/:audiobook_id",async(req,res)=>{
    try{
        const audiobook = await Audiobook.findById(req.params.audiobook_id);
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(audiobook)
    }catch(err){
        res.send('Error '+err)
    }
        
})

router.delete("/:audiobook_id",async(req,res)=>{
    try{
    const audiobook = await Music.findByIdAndRemove(req.params.audiobook_id);
    res.statusCode = "200"
    res.setHeader('Content-Type','application/json')
    res.json(audiobook);
    }catch(err){
        res.send('Error'+ err)
    }
})

router.put("/:audibook_id",async(req,res)=>{
    try{ 
  const audiobook = await Music.findByIdAndUpdate(req.params.audibook_id,{
      $set:req.body,
  },{new:true})
  res.statusCode = "200"
  res.setHeader('Content-Type','application/json')
  res.json(audiobook)
  }catch(err){
     res.send('Error '+err)
  }
})
module.exports = router;