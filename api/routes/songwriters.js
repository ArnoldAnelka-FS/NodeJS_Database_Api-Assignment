const express = require("express");
const mongoose = require("mongoose");
const Songwriter = require("../models/songwriter");
const router = express.Router();
const Messages = require("../../messages/messages");
const songwriter = require("../models/songwriter");
const song = require("../models/song");

// GET
router.get("/", (req,res,next)=>{
   const getSongwriter = {
      songwriter: req.body.songwriter,
      _id: mongoose.Types.ObjectId(),
      name: req.body.name
   };
   
   Songwriter.find({}, {
      find:getSongwriter
   }) .then(result => {
      res.status(200).json({
         message: Messages.songwriter_get_all,
         songwriter: {
            songwriter:result.songwriter,
            id:result.id,
            name: result.name
         },
         metadata:{
            host:req.hostname,
            method:req.method
         }
      });
   })
   .catch(err => {
      res.status(500).json({
         error:{
            message: err.message
         }
      })
   });
   });

// POST
router.post("/", (req,res,next)=>{
   const newSongwriter = new Songwriter({
      _id:mongoose.Types.ObjectId(),
      name: req.body.name
   });

   Songwriter.find({
      name: req.body.name
})
.exec()
.then(result =>{
   console.log(result);
   if(result.length > 0){
      return res.status(406).json({
         message: Messages.songwriter_already_exists
      })
   }
})
   // write on the db
   newSongwriter.save()
   .then(result => {
      console.log(result);
      res.status(200).json({
         message: Messages.songwriter_saved,
         song:{
            songwriter: result.songwriter,
            id: result._id
         }
      })

   })
   .catch(err => {
      console.error(err.message);
      res.status(500).json({
         message: err.message
      })
   })
   .catch(err =>{
      res.status(500).json({
         error: {
            message: err.message
         }
      })
   })
});


// GET BY ID
router.get("/:songwriterid", (req, res, next) => {
    const songwriterid = req.params.songwriterid;
    Songwriter.findById(songwriterid)
    .select("name _id")
    .populate("song")
    .exec()
    .then(songwriter => {
     if(!songwriter){
      console.log(songwriter);
      return res.status(404).json({
         message: Messages.songwriter_not_found
      })
     } else {
      res.status(201).json({
      message: Messages.songwriter_found,
      songwriter :songwriter
      })
   }
    })
    .catch(err => {
      res.status(500).json({
         error: {
         message: err.message
      }
     })
    })
   });

// PATCH
   router.patch("/:songwriterid", (req,res,next)=>{
      const songwriterid = req.params.songwriterid;
    
      const updatedSongwriter = {
        songwriter: req.body.songwriter,
        name:req.body.name
      };
  
      Songwriter.updateOne({
        _id:songwriterid
     }, {
        $set: updatedSongwriter
     })
     .populate("song")
     .exec()
     .then(songwriter => {
      if(!songwriter){
         console.log(songwriter);
         return res.status(404).json({
            message: Messages.songwriter_not_updated
         })
      } else{
         res.status(200).json({
            message: Messages.songwriter_updated,
            metadata:{
               host: req.hostname,
               method: req.method
            }
         })
      }
    
     })
     .catch(err => {
        res.status(500).json({
           error:{
              message: err.message
           }
        })
     });
     });

// DELETE
   router.delete("/:songwriterid", (req,res,next)=>{
      const songwriterid = req.params.songwriterid;
  
     Songwriter.deleteOne({
     _id:songwriterid
     })
     .populate("song")
     .exec()
     .then(songwriterid => {
      if(!songwriterid){
         console.log(songwriterid);
         return res.status(404).json({
            message: Messages.songwriter_not_deleted
         })
      } else{
         res.status(200).json({
            message: Messages.songwriter_deleted,
            request: {
               method:"GET",
               url: "http://localhost:3000/songwriters" + songwriterid
            }
         })
      }
   })
     .catch(err => {
        res.status(500).json({
           error:{
              message: err.message
           }
        })
     });
     });

module.exports = router;