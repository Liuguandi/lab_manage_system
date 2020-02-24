const express = require("express")
const router = express.Router();
const memberdb = require("../database/Member")
const tokenCheck = require("../Token/Token")
module.exports = router;

const bodyParser=require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//������(all����֧��POST GET PUT PATCH DELETE����)
router.all("/countAll",(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        memberdb.getAllMemberNum( (data)=>{
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

router.all("/selectAll",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        memberdb.getAllMemberByPage( (data)=>{
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

router.all("/countClass",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        memberdb.getClassMemberNum( request.body,(data)=>{
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

router.all("/selectClass",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        memberdb.getClassMemberByPage( request.body,(data)=>{
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

router.all("/countName",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        memberdb.getNameMemberNum( request.body,(data)=>{
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
        memberdb.getNameMemberByPage( request.body,(data)=>{
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

router.all("/countPhone",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        memberdb.getPhoneMemberNum( request.body,(data)=>{
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

router.all("/selectPhone",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        memberdb.getPhoneMemberByPage( request.body,(data)=>{
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
    var promise  = new Promise(function(resolve,reject){
        memberdb.checkUsername(request.body,(data)=>{
            if(data[0].number === 0){
                resolve(request.body)
            }else{
                reject({code:406,message:"username has been used"})
            }
        })
    })
    promise.then((data)=>{
        memberdb.addMember(data,(finData)=>{
            response.send(finData)
        })
    }).catch(function(reason){
        response.send(reason)
    })
    
})

router.post("/delete",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        memberdb.deleteMember( request.body,(data)=>{
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
        memberdb.modifyeMember( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        response.send(data)
    })
})

router.post("/setCapacity",urlencodedParser,(request,response)=>{
    if(!tokenCheck.verifyToken(request,response))response.send({code:401,message:"login"})
    var promise  = new Promise(function(resolve,reject){
        memberdb.setMemberCapacity( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        response.send(data)
    })
})

router.post("/login",urlencodedParser,(request,response)=>{
       var promise  = new Promise(function(resolve,reject){
        memberdb.memberLogin( request.body,(data)=>{
            resolve(data)
        })
    })
    promise.then((data)=>{
        if(data.code === 201 && data.message === "success"){
            //增加饼干
            response = tokenCheck.addToken(request,response,data.username)
        }
        response.send(data)
    })
})
