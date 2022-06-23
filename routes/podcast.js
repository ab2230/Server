const express = require('express')

const router = express.Router()
const Podcast = require('../models/podcast')
const PodcastPath = '/routes/podcast/';
const PhotoPath = '/routes/podcast/photo/';


router.post('/upload',async(req,res)=>{

    var getEpisode =[]
    var file = '';
    var filename = '';
    
    var photoFile = req.files.photo;
    var photoName = photoFile.name;

    photoFile.mv('.'+PhotoPath+photoName,function(err){
        if(err){
            res.send(err)
        } 
    })
    for(var i=0;i<req.body.episodeName.length;i++)
    {
      getEpisode.push({
          file:PodcastPath+req.files.file[i].name,
          episodeName:req.body.episodeName[i],
          episodeLength:req.body.episodeLength[i],
          description2:req.body.description2[i]
        })
      file = req.files.file[i];
      filename = file.name;
    
       file.mv('.'+PodcastPath+filename,function(err){
        if(err){
            res.send(err)
        } 
       })
    }
    
    const podcast = new Podcast({
        title:req.body.podcastName,
        podcasters:req.body.podcasterName,
        email:req.body.email,
        cell:req.body.phoneNumber,
        image:PhotoPath+photoName,
        category:req.body.category,
        description:req.body.description1,
        episodes:getEpisode
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


/*router.post("/", async (req, res) => {
    const uploadingPodcast = new Podcast(req.body);
  
    try {
      // console.log(req.body)
      const addPodcast = await uploadingPodcast.save();
      res.json(addPodcast);
    } catch (error) {
      res.json({ message: error });
    }
  });
  */

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

router.get("/:podcast_id",async(req,res)=>{
    try{
        const podcast = await Podcast.findById(req.params.podcast_id);
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(podcast)
    }catch(err){
        res.send('Error '+err)
    }
        
})

router.delete("/:podcast_id",async(req,res)=>{
    try{
    const podcast = await Music.findByIdAndRemove(req.params.podcast_id);
    res.statusCode = "200"
    res.setHeader('Content-Type','application/json')
    res.json(podcast)
    }catch(err){
        res.send('Error'+ err)
    }
})

router.put("/:podcast_id",async(req,res)=>{
    try{ 
  const podcast = await Music.findByIdAndUpdate(req.params.podcast_id,{
      $set:req.body,
  },{new:true})
  res.statusCode = "200"
  res.setHeader('Content-Type','application/json')
  res.json(podcast)
  }catch(err){
     res.send('Error '+err)
  }
})


module.exports = router