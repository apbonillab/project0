'use strict'

const mysql = require('mysql');
const connection = require('../../db');

module.exports.showCategory = (success,error)=>{
    connection.query(`select * from category`,function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    })
}