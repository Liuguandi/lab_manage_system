const express = require("express")
const router = express.Router();
const devicedb = require("../database/Device")
const tokenCheck = require("../Token/Token")
module.exports = router;

const bodyParser=require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//������(all����֧��POST GET PUT PATCH DELETE����)
router.all("/countAll",(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        devicedb.getAllDeviceNum( (data)=>{
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

//������(all����֧��POST GET PUT PATCH DELETE����)
router.all("/selectAll",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        devicedb.getAlldeviceByPage( (data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        if(data.code === 404){
            response.send(data)
            return
        }
        var page = request.body.page -1 ;
        data = data.slice(page*10,10*page+10) 
        response.send(data)
    })
})


router.all("/countName",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        devicedb.getNamedeviceNum( request.body,(data)=>{
            resolve(data)
            return
        })
    })
    promise.then((data)=>{
        if(data.code === 404){
            response.send(data)
        }
        response.send(data)
    })
})

router.all("/selectName",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        devicedb.getNamedeviceByPage( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        if(data.code === 404){
            response.send(data)
            return
        }
        var page = request.body.page -1 ;
        data = data.slice(page*10,10*page+9) 
        response.send(data)
    })
})


router.all("/countType",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        devicedb.getTypedeviceNum( request.body,(data)=>{
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

router.all("/selectType",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        devicedb.getTypedeviceByPage( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        if(data.code === 404){
            response.send(data)
            return
        }
        var page = request.body.page -1 ;
        data = data.slice(page*10,10*page+9) 
        response.send(data)
    })
})

router.all("/countFunction",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        devicedb.getFunctiondeviceNum( request.body,(data)=>{
            resolve(data)
            return
        })
    })
    promise.then((data)=>{
        if(data.code === 404){
            response.send(data)
        }
        response.send(data)
    })
})

router.all("/selectFunction",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        devicedb.getFunctiondeviceByPage( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        if(data.code === 404){
            response.send(data)
            return
        }
        var page = request.body.page -1 ;
        data = data.slice(page*10,10*page+9) 
        response.send(data)
    })
})





router.post("/add",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        devicedb.adddevice( request.body,(data)=>{
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
        devicedb.deletedevice( request.body,(data)=>{
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
        devicedb.modifyedevice( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        response.send(data)
    })
})

