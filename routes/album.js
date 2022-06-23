const express = require('express')

const router = express.Router()
const Music = require('../models/music')
const Album = require('../models/album')
const MusicPath = '/routes/music/';
const PhotoPath = '/routes/music/photo/';
const LyricsPath = '/routes/music/lyrics/';


router.get('/', async(req,res)=>{
    const qNew = req.query.new;
    try{
        let albums;
        if (qNew) {
            albums = await Album.find().sort({ createdAt: -1 }).limit(8);
          }
          else{ 
          albums = await Album.find().limit(8)
          }
        res.statusCode = "200";
        res.setHeader('Content-Type','application/json')
        res.json(albums)
       
    }catch(err){
        res.send('Error '+err)
    }
})
//Album Add route




router.post('/upload',async(req,res)=>{
    
    var getTrack =[]
    var file = '';
    var filename = '';
    var lyricsFile = '';
    var lyricsName = '';

    var Albumid = ''
    var photoFile=req.files.photo;
    var photoName=photoFile.name;

    photoFile.mv('.'+PhotoPath+photoName,function(err){
        if(err){
            res.send(err)
        } 
    })
    
    

    try{
        const album = new Album({
            album_title:req.body.albumName,
            artist_name:req.body.artistName,
            album_description:req.body.description1,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            category:req.body.category,
            email:req.body.email
        })
        const addedAlbum = await album.save()
        Albumid = addedAlbum._id
        
        for(var i=0;i<req.body.trackName.length;i++)
        {
          getTrack.push({
              file:req.files.file[i].name,
              trackName:req.body.trackName[i],
              trackLength:req.body.trackLength[i],
              description2:req.body.description2[i],
              lyrics:req.files.lyrics[i].name})
          file = req.files.file[i];
          filename = file.name;
        
          file.mv('.'+MusicPath+filename,function(err){
            if(err){
                res.send(err)
            } 
        })

        lyricsFile = req.files.file[i];
          lyricsName = lyricsFile.name;
        
          lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
            if(err){
                res.send(err)
            } 
        })
        }
        console.log(getTrack);
        for(var i=0;i<req.body.trackName.length;i++){
        const music = new Music({
            title:getTrack[i].trackName,
            artist_name:req.body.artistName,
            music_length:getTrack[i].trackLength,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            path:MusicPath+getTrack[i].file,
            lyricsPath:LyricsPath+getTrack[i].lyrics,
            category:req.body.category,
            album:Albumid
        }) 
        await music.save()
    } 
    }
    catch(err){
        res.send('Error')
    }
   
})





//Get Specific Album
router.get("/:album_id",async(req,res)=>{
    // var mus = ""
    try{
        const album = await Album.findById(req.params.album_id);
        // const music = await Music.find({music:{$elemMarch:{"album":req.params.album_id}}})
    
        // for(var i =0 ;i<music.length;i++)
        // {
        //     if(req.params.album_id === music[i].album)
        //     {
        //          mus =  mus + await Music.findById(music[i]._id)
            
        //     }
        // }
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(album)
    }catch(err){
        res.send('Error '+err)
    }
})
//Update specific Album
router.put("/:album_id",async(req,res)=>{
    try{ 
  const album = await Album.findByIdAndUpdate(req.params.album_id,{
      $set:req.body,
  },{new:true})
  res.statusCode = "200"
  res.setHeader('Content-Type','application/json')
  res.json(album);
  }catch(err){
     res.send('Error '+err)
  }
})
//Delete  Album


//Delete Specific Album
router.delete("/:album_id",async(req,res)=>{
    console.log("In the delete part")
    try{
     const album = await Album.findByIdAndRemove(req.params.album_id);
     const music = await Music.find({music:{$elemMarch:{"album":req.params.album_id}}})
    
    for(var i =0 ;i<music.length;i++)
    {
        if(req.params.album_id === music[i].album)
        {
            const mus = await Music.findByIdAndRemove(music[i]._id)
        }  
    }
    res.statusCode = "200"
    res.setHeader('Content-Type','application/json')
    res.json(`Album with id ${req.params.album_id} is Successefuly deleted`)
    }catch(err){
        res.send('Error'+ err)
    }
})
module.exports = router