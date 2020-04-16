const express = require('express');
var router = express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
var {Player}=require('../models/player');

router.get('/',(req,res)=>{
    Player.find((err,docs)=>{
        if(!err){res.send(docs);}
        else {console.log('error in retrieving the records players: '+JSON.stringify(err,undefined,2));}
    });
});

router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('no record found for the id : $(req.params.id)');
    Player.findById(req.params.id,(err,doc)=>{
        if (!err){res.send(doc);}
        else {Console.log('Error in Retriving Player: '+JSON.stringify(err,undefined,2));}
    });
});

router.post('/',(req,res)=>{
    var ply=new Player({
        name:req.body.name,
        joiningDate:req.body.joiningDate,
        birthDate:req.body.birthDate,
        score:req.body.score
    });
    ply.save((err,doc)=>{
        if(!err){res.send(doc);}
        else {console.log('error in player save '+JSON.stringify(err,undefined,2));}
    });
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('no record found for the id : $(req.params.id)');
    var ply={
        name:req.body.name,
        joiningDate:req.body.joiningDate,
        birthDate:req.body.birthDate,
        score:req.body.score
    };
    Player.findByIdAndUpdate(req.params.id,{$set:ply},{new:true},(err,doc)=>{
        if(!err) 
            {res.send(doc);}
        else {console.log('error while updating the record :'+ JSON.stringify(err,undefined,2));}
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('no record found for the id : $(req.params.id)');
    Player.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('error in player deletion :'+JSON.stringify(err,undefined,2)); }
    });

});
module.exports=router;