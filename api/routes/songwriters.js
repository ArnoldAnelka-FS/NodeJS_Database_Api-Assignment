const express = require("express");
const router = express.Router();

router.get("/", (req,res,next)=>{
 res.json({
    message:"Songwriters - GET"})
});

router.post("/", (req,res,next)=>{
 res.json({
    message:"Songwriters - POST"})
   });

router.get("/:songwriterid", (req,res,next)=>{
    const songwriterid = req.params.songwriterid;
    res.json({
       message:"Songwriters - GET",
       id:songwriterid
    });
   });

   router.patch("/:songwriterid", (req,res,next)=>{
    const songwriterid = req.params.songwriterid;
    res.json({
       message:"Songwriters - PATCH",
       id:songwriterid
    });
   });

   router.delete("/:songwriterid", (req,res,next)=>{
    const songwriterid = req.params.songwriterid;
    res.json({
       message:"Songwriters - DELETE",
       id:songwriterid
    });
   });

module.exports = router;
