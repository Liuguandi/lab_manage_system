const express = require("express")
const router = express.Router();
const capacitydb = require("../database/Capacity")
const tokenCheck = require("../Token/Token")
module.exports = router;

const bodyParser=require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//查数据(all方法支持POST GET PUT PATCH DELETE传参)
router.all("/selectAllName",(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        capacitydb.getCapacityName( (data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        if(data.code === 404){
            response.send(data)
            return
        }
        response.send(data)
    })
})

router.post("/selectDetailsById",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        capacitydb.getCapacityDetailsByID( request.body,(data)=>{
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
        capacitydb.addMember( request.body,(data)=>{
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
        capacitydb.deleteMember( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        response.send(data)
    })
})


router.post("/modify",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        capacitydb.modifyCapacity( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        response.send(data)
    })
})
