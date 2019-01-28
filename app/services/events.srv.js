'use strict'

const mysql = require('mysql');
const connection = require('../../db');
const security = require('../services/security.srv');
const moment = require('moment');

module.exports.createEvent = (place,name,address,init_date,end_date,user,category,event_type,success,error)=>{
    let d = new Date();
    let dateAudit =  moment(d).format("YYYY-MM-DD HH:mm:ss")
    let eventData = [[place,name,address,init_date,end_date,user,category,event_type,dateAudit]];
    connection.query(`insert into event (place,name,address,init_date,end_date,user,category,event_type,date_audit) values ? `,
    [eventData],function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    })
}

module.exports.updateEvent = (idevent,place,name,address,init_date,end_date,user,category,event_type,success,error)=>{
   connection.query(`update event set place = "${place}",name="${name}",
    address="${address}",init_date="${init_date}",end_date="${end_date}",
    user=${user},
    category=${category},event_type=${event_type} where idevent = ${idevent}`,function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    });
}

module.exports.deleteEvent = (idevent,success,error)=>{
    connection.query(`delete from event where idevent = ${idevent}`,function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    })
}

module.exports.showEventByUser = (user,success,error)=>{
    connection.query(`Select e.place 'place', e.name 'name' , e.address 'address',
                    e.init_date 'init_date' , e.end_date 'end_date',
                    e.date_audit 'create_date',
                    u.email 'user', c.name 'category', 
                    et.name 'event_type' from event as e
                    inner join user as u on u.iduser = e.user
                    inner join category as c on c.idcategory =e.category
                    inner join event_type as et on et.idevent_type = e.event_type
                    where e.user = ${user} order by e.date_audit DESC`,function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    })
}

module.exports.showDetailsEventById = (idevent,success,error)=>{
    connection.query(`select e.place 'place', e.name 'name' , e.address 'address',
                    e.init_date 'init_date' , e.end_date 'end_date',
                    e.date_audit 'create_date',
                    u.email 'user', c.name 'category', 
                    et.name 'event_type' from event as e
                    inner join user as u on u.iduser = e.user
                    inner join category as c on c.idcategory =e.category
                    inner join event_type as et on et.idevent_type = e.event_type
                    where e.idevent = ${idevent}`,function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    })
}

module.exports.showEventById = (idevent,success,error)=>{
    connection.query(`select * from event where idevent = ${idevent}`,function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    })
}