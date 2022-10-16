const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Song = require("../models/songs");

// GET
router.get("/", (req,res,next)=>{
const getSong = {
   title: req.body.title,
   songwriter: req.body.songwriter,
   _id: mongoose.Types.ObjectId()
};

Song.find({}, {
   find:getSong
}) .then(result => {
   res.status(200).json({
      message: "All Songs",
      song: {
         title:result.title,
         songwriter:result.songwriter,
         id:result.id
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
 const newSong = new Song({
   _id: mongoose.Types.ObjectId(),
   title: req.body.title,
   songwriter: req.body.songwriter
 });

//  write to the db
   newSong.save()
   .then(result =>{
     console.log(result);
     res.status(200).json({
      message: "Song Saved",
      song:{
         title: result.title,
         songwriter: result.songwriter,
         id: result._id,
         metadata: {
            method: req.method,
            host: req.hostname
         }
      }
     })
   })
   .catch(err => {
      console.console.error(err.message);
      res.status(500).json({
         error: {
            message: err.message
         }
      })

   });
   });

// GET BY ID
router.get("/:id", (req,res,next)=>{
const id = req.params.id;
const newSong = new Song({
   _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      songwriter: req.body.songwriter
})
//  write on the db
newSong.save()
.then(result =>{
  console.log(result);
  res.status(200).json({
   message: "Song found by Id",
   song:{
      title:result.title,
      songwriter:result.songwriter,
      id: result.id,
      metadata: {
         method: req.method,
         host: req.hostname
      }
   }
  })
})
.catch(err => {
   console.console.error(err.message);
   res.status(500).json({
      error: {
         message: err.message
      }
   })

});
});


// PATCH
router.patch("/:songid", (req,res,next)=>{
    const songid = req.params.songid;
  
    const updatedSong = {
      title: req.body.title,
      songwriter: req.body.songwriter
    };

    Song.updateOne({
      _id:songid
   }, {
      $set: updatedSong
   }).then(result => {
      res.status(200).json({
         message: "Updated Song",
         song: {
            title:result.title,
            songwriter: result.songwriter,
            id: result._id
         },
         metadata:{
            host: req.hostname,
            method: req.method
         }
      })
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
router.delete("/:id", (req,res,next)=>{
    const id = req.params.id;
   
    const deleteSong = {
      title:req.body.title,
      songwriter: req.body.songwriter,
      id: req.body._id
    };


   Song.deleteOne({
   _id:id
   },{
      deleteOne: deleteSong
   })
   .then(result => {
      res.status(200).json({
         message: "Song Deleted",
         song: {
            title:result.title,
            songwriter: result.songwriter,
            id: result._id
         },
         metadata:{
            host: req.hostname,
            method: req.method
         }
      })
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