'use strict'
var express = require('express')
var routr = express.Router();
var usersServices = require('../services/users.srv.js');

routr.post('/', (req, res) => {
    usersServices.createUser(
        req.body.email,
        req.body.password,
        function (user) {
            res.status(200).send(user)
        },function(error){
            if(error.code === 'ER_DUP_ENTRY')//valida si el correo ya existe
                res.status(400).send(error);
            res.status(500).send(error);
            
        }
    )

})

routr.post('/login', (req, res) => {
    usersServices.loginUser(
        req.body.email,
        req.body.password,
        function (user) {
            res.status(200).send(user)
        },function(error){
            res.sendStatus(401)
        }
    )

})


module.exports = routr;