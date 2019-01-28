'use strict'
var express = require('express')
var routr = express.Router();
var eventsService = require('../services/events.srv.js');

routr.get('/all/:user',ensureToken,(req,res)=>{
    console.log(req.params.user)
    eventsService.showEventByUser(req.params.user,function(response){
        res.statusCode = 200;
        res.send(response);

    },function(err){
        console.log(err);
        return res.status(500).end();
    })
})

routr.get('/detail/:idevent',ensureToken,(req,res)=>{
    eventsService.showDetailsEventById(req.params.idevent,function(response){
        res.statusCode = 200;
        res.send(response);

    },function(err){
        return res.status(500).end();
    })
})

routr.get('/detail_update/:idevent',ensureToken,(req,res)=>{
    eventsService.showEventById(req.params.idevent,function(response){
        res.statusCode = 200;
        res.send(response);

    },function(err){
        return res.status(500).end();
    })
})


routr.delete('/delete/:idevent',ensureToken,(req,res)=>{
    eventsService.deleteEvent(req.params.idevent,function(response){
        res.statusCode = 200;
        res.send(response);

    },function(err){
        return res.status(500).end();
    })
})

routr.put('/update',ensureToken,(req,res)=>{
    
    eventsService.updateEvent(
        req.body.idevent,
        req.body.place,
        req.body.name,
        req.body.address,
        req.body.init_date,
        req.body.end_date,
        req.body.user,
        req.body.category,
        req.body.event_type,
        function(response){
        res.statusCode = 200;
        res.send(response);

    },function(err){
        console.log(err);
        return res.status(500).end();
    })
})

routr.post('/create',ensureToken,(req,res)=>{
    
    eventsService.createEvent(
        req.body.place,
        req.body.name,
        req.body.address,
        req.body.init_date,
        req.body.end_date,
        req.body.user,
        req.body.category,
        req.body.event_type,
        function(response){
        res.statusCode = 200;
        res.send(response);

    },function(err){
        console.log(err);
        return res.status(500).end();
    })
})



function ensureToken(req,res,next){
    const beareheader = req.headers['authorization'];
    console.log('bearerheader: '+beareheader);
    if(typeof beareheader != 'undefined'){
        const bearer = beareheader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
    
}

module.exports = routr;