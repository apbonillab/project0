'use strict'

const mysql = require('mysql');
const connection = require('../../db');
const security = require('../services/security.srv');

module.exports.createUser = (email,password,success,error)=>{
    let userData = [[email,password]];
    connection.query(`insert into user (email,password) values ? `,
    [userData],function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    })
}


module.exports.loginUser = (email, password, success, error) => {
    let query = `select * from user where email= "${email}"`;
    connection.query(query,function(err,result,fields){
        if(err){
                throw err;
        }
        if(result[0]!=undefined){
            if (result[0].password === password) {
                let user = result[0].iduser;
                console.log("es igual"+user);
                security.generateToken(email).then(function(result){
                    success({'token':result,'user':user});
              });
                
            }else{
                success(403);
            }
        }else{
            success(403);
        }
       
        
    })
}

module.exports.showUsers = (success,error)=>{
    connection.query(`select * from user`,function(err,result,fields){
        if(err){
            error(err);
        }
        success(result);
    })
}