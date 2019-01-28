const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt  = require('jsonwebtoken');
const usersController = require('./app/controllers/users.ctrl.js');
const eventsController = require('./app/controllers/events.ctrl.js');
const generalController = require('./app/controllers/general-list.ctrl.js');
const port = 8010;

app.listen(port,()=>{
    console.log('server on port: '+port);
})

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', [usersController]);
app.use('/events', [eventsController]);
app.use('/general', [generalController]);


app.get('/',(req,res)=>{
    res.json({
        text: 'api works!'
    })
})

app.post('/api/login',(req,res)=>{
    const user = {id:3};
    const token = jwt.sign({user},'my_secret_key');
    res.json({
        token
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
app.get('/api/protected',ensureToken,(req,res)=>{
    jwt.verify(req.token,'my_secret_key',(err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                text:'protected',
                data
            })
        }
    })
    
})
