const express = require('express')

const router = express.Router()
const Music = require('../models/music');
const MusicPath = '/routes/music/';
const PhotoPath = '/routes/music/photo/';
const LyricsPath = '/routes/music/lyrics/';

router.post('/upload',async(req,res)=>{

   var file = req.files.file;
    var filename = file.name;

    file.mv('.'+MusicPath+filename,function(err){
        if(err){
            res.send(err)
        } 
    })
    
    var photoFile = req.files.photo;
    var photoName = photoFile.name;

    photoFile.mv('.'+PhotoPath+photoName,function(err){
        if(err){
            res.send(err)
        } 
    })

    var lyricsFile = req.files.lyrics;
    var lyricsName = lyricsFile.name;

    lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
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
        lyricsPath:LyricsPath+lyricsName,
        category:req.body.category,
        music_length:req.body.musicLength
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

router.get("/user", async (req, res) => {
    const qCategory = req.query.category;
    const qNew = req.query.new;
    try {
      let music;
      if (qCategory) {
        music = await Music.find({
          category: {
            $in: [qCategory],
          },
        });
      } 
     else if (qNew) {
        music = await Music.find().sort({ createdAt: -1 });
      }
      else {
        music = await Music.find().limit(8);
      }
  
      res.json(music);
    } catch (error) {
      res.json({ message: error });
    }
  });

router.get("/:music_id",async(req,res)=>{
    try{
        const music = await Music.findById(req.params.music_id);
        res.statusCode = "200"
        res.setHeader('Content-Type','application/json')
        res.json(music)
    }catch(err){
        res.send('Error '+err)
    }
        
})

router.delete("/:music_id",async(req,res)=>{
    try{
    const music = await Music.findByIdAndRemove(req.params.music_id);
    res.statusCode = "200"
    res.setHeader('Content-Type','application/json')
    res.json(music)
    }catch(err){
        res.send('Error'+ err)
    }
})

router.put("/:music_id",async(req,res)=>{

      if(req.files.file!==undefined && req.files.photo!==undefined && req.body.category!==undefined&&req.files.lyrics!==undefined){

        var file = req.files.file;
      var filename = file.name;
  
      file.mv('.'+MusicPath+filename,function(err){
          if(err){
              res.send(err)
          } 
      })
      
      var photoFile = req.files.photo;
      var photoName = photoFile.name;
  
      photoFile.mv('.'+PhotoPath+photoName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
      var lyricsFile = req.files.lyrics;
      var lyricsName = lyricsFile.name;
  
      lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            path:MusicPath+filename,
            lyricsPath:LyricsPath+lyricsName,
            category:req.body.category,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file===undefined && req.files.photo!==undefined && req.body.category!==undefined&&req.files.lyrics!==undefined){
      
      var photoFile = req.files.photo;
      var photoName = photoFile.name;
  
      photoFile.mv('.'+PhotoPath+photoName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
      var lyricsFile = req.files.lyrics;
      var lyricsName = lyricsFile.name;
  
      lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            lyricsPath:LyricsPath+lyricsName,
            category:req.body.category,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file!==undefined && req.files.photo===undefined && req.body.category!==undefined&&req.files.lyrics!==undefined){

        var file = req.files.file;
      var filename = file.name;
  
      file.mv('.'+MusicPath+filename,function(err){
          if(err){
              res.send(err)
          } 
      })
  
      var lyricsFile = req.files.lyrics;
      var lyricsName = lyricsFile.name;
  
      lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            path:MusicPath+filename,
            lyricsPath:LyricsPath+lyricsName,
            category:req.body.category,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }if(req.files.file!==undefined && req.files.photo!==undefined && req.body.category===undefined&&req.files.lyrics!==undefined){

        var file = req.files.file;
      var filename = file.name;
  
      file.mv('.'+MusicPath+filename,function(err){
          if(err){
              res.send(err)
          } 
      })
      
      var photoFile = req.files.photo;
      var photoName = photoFile.name;
  
      photoFile.mv('.'+PhotoPath+photoName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
      var lyricsFile = req.files.lyrics;
      var lyricsName = lyricsFile.name;
  
      lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            path:MusicPath+filename,
            lyricsPath:LyricsPath+lyricsName,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file!==undefined && req.files.photo!==undefined && req.body.category!==undefined&&req.files.lyrics===undefined){

        var file = req.files.file;
      var filename = file.name;
  
      file.mv('.'+MusicPath+filename,function(err){
          if(err){
              res.send(err)
          } 
      })
      
      var photoFile = req.files.photo;
      var photoName = photoFile.name;
  
      photoFile.mv('.'+PhotoPath+photoName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            path:MusicPath+filename,
            category:req.body.category,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file!==undefined && req.files.photo!==undefined && req.body.category===undefined&&req.files.lyrics===undefined){

        var file = req.files.file;
      var filename = file.name;
  
      file.mv('.'+MusicPath+filename,function(err){
          if(err){
              res.send(err)
          } 
      })
      
      var photoFile = req.files.photo;
      var photoName = photoFile.name;
  
      photoFile.mv('.'+PhotoPath+photoName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            path:MusicPath+filename,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file!==undefined && req.files.photo===undefined && req.body.category===undefined&&req.files.lyrics!==undefined){

        var file = req.files.file;
      var filename = file.name;
  
      file.mv('.'+MusicPath+filename,function(err){
          if(err){
              res.send(err)
          } 
      })
  
      var lyricsFile = req.files.lyrics;
      var lyricsName = lyricsFile.name;
  
      lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            path:MusicPath+filename,
            lyricsPath:LyricsPath+lyricsName,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file===undefined && req.files.photo===undefined && req.body.category!==undefined&&req.files.lyrics!==undefined){

      var lyricsFile = req.files.lyrics;
      var lyricsName = lyricsFile.name;
  
      lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            lyricsPath:LyricsPath+lyricsName,
            category:req.body.category,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file===undefined && req.files.photo!==undefined && req.body.category!==undefined&&req.files.lyrics===undefined){

      
      var photoFile = req.files.photo;
      var photoName = photoFile.name;
  
      photoFile.mv('.'+PhotoPath+photoName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            category:req.body.category,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file!==undefined && req.files.photo===undefined && req.body.category!==undefined&&req.files.lyrics===undefined){

        var file = req.files.file;
      var filename = file.name;
  
      file.mv('.'+MusicPath+filename,function(err){
          if(err){
              res.send(err)
          } 
      })
  
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            path:MusicPath+filename,
            category:req.body.category,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file===undefined && req.files.photo!==undefined && req.body.category===undefined&&req.files.lyrics!==undefined){

      
      var photoFile = req.files.photo;
      var photoName = photoFile.name;
  
      photoFile.mv('.'+PhotoPath+photoName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
      var lyricsFile = req.files.lyrics;
      var lyricsName = lyricsFile.name;
  
      lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            lyricsPath:LyricsPath+lyricsName,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file!==undefined && req.files.photo!==undefined && req.body.category!==undefined&&req.files.lyrics!==undefined){

        var file = req.files.file;
      var filename = file.name;
  
      file.mv('.'+MusicPath+filename,function(err){
          if(err){
              res.send(err)
          } 
      })
      
      var photoFile = req.files.photo;
      var photoName = photoFile.name;
  
      photoFile.mv('.'+PhotoPath+photoName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
      var lyricsFile = req.files.lyrics;
      var lyricsName = lyricsFile.name;
  
      lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            path:MusicPath+filename,
            lyricsPath:LyricsPath+lyricsName,
            category:req.body.category,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file!==undefined && req.files.photo===undefined && req.body.category===undefined&&req.files.lyrics===undefined){

        var file = req.files.file;
      var filename = file.name;
  
      file.mv('.'+MusicPath+filename,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            path:MusicPath+filename,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file===undefined && req.files.photo!==undefined && req.body.category===undefined&&req.files.lyrics===undefined){
      
      var photoFile = req.files.photo;
      var photoName = photoFile.name;
  
      photoFile.mv('.'+PhotoPath+photoName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            image:PhotoPath+photoName,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file===undefined && req.files.photo===undefined && req.body.category!==undefined&&req.files.lyrics===undefined){

        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            category:req.body.category,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file===undefined && req.files.photo===undefined && req.body.category===undefined&&req.files.lyrics!==undefined){

  
      var lyricsFile = req.files.lyrics;
      var lyricsName = lyricsFile.name;
  
      lyricsFile.mv('.'+LyricsPath+lyricsName,function(err){
          if(err){
              res.send(err)
          } 
      })
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            lyricsPath:LyricsPath+lyricsName,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }else if(req.files.file===undefined && req.files.photo===undefined && req.body.category===undefined&&req.files.lyrics===undefined){
  
        try{
          const music = await Music.update({_id:req.params.music_id},{
            title:req.body.musicName,
            artist_name:req.body.artistName,
            email:req.body.email,
            cell:req.body.phoneNumber,
            music_length:req.body.musicLength
          },{new:true})
          res.statusCode = "200"
          res.setHeader('Content-Type','application/json')
          res.json(music)
        }catch(err){
          res.send('Error '+err)
         }
  
  
      }

    }
      )
router.get("/artists", async (req, res) => {
    const qCategory = req.query.category;
    try {
      let music;
  
      music = await Music.find();
  
      res.json(music);
    } catch (error) {
      res.json({ message: error });
    }
  });
  router.get("/albums/:album_id", async (req, res) => {
    var mus = ""
    try{
     
      // const music = await Music.find({music:{$elemMarch:{"album":req.params.album_id}}})
     const music = (await Music.find({})).filter((item)=>item.album ===req.params.album_id )
      for(var i =0 ;i<music.length;i++)
      {
          if(req.params.album_id === music[i].album)
          {
               mus =  mus + await Music.findById(music[i]._id)
          
          }
      }
      res.statusCode = "200"
      res.setHeader('Content-Type','application/json')
      res.json(music)
  }catch(err){
      res.send('Error '+err)
  }
  });

  //Get Specific Music
router.get("/user/:artist_name", async (req, res) => {
    try {
      // const music = await Music.findById(req.params.music_id);
      console.log('hello artist')
      var s = req.params.artist_name;
      const music = await (await Music.find({})).filter((item)=>item.artist_name==s)
      res.statusCode = "200";
      res.setHeader("Content-Type", "application/json");
      res.json(music);
    } catch (err) {
      res.send("Error " + err);
    }
  });


module.exports = router