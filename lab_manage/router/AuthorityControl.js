const express = require("express")
const router = express.Router();
const authoritydb = require("../database/Authority")
const tokenCheck = require("../Token/Token")
module.exports = router;

const bodyParser=require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//������(all����֧��POST GET PUT PATCH DELETE����)
router.all("/select",(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        authoritydb.getAuthority( (data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        response.send(data)
    })
})

router.post("/add",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        authoritydb.addAuthority( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        response.send(data)
    })
})

router.post("/delete",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        authoritydb.deleteAuthority( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        response.send(data)
    })
})

