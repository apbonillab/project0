'use strict'
var express = require('express')
var routr = express.Router();
var category = require('../services/category.srv.js');
var event_type = require('../services/event_type.srv.js');

routr.get('/category',ensureToken,(req,res)=>{
    category.showCategory(function(response){
        res.statusCode = 200;
        res.send(response);

    },function(err){
        return res.status(500).end();
    })
})

routr.get('/event_type',ensureToken,(req,res)=>{
    event_type.showEventType(function(response){
        res.statusCode = 200;
        res.send(response);

    },function(err){
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