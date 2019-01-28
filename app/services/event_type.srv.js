'use strict'

const mysql = require('mysql');
const connection = require('../../db');

module.exports.showEventType = (success,error)=>{
    connection.query(`select * from event_type`,function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    })
}