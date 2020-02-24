const http = require('http');
const crypto = require('crypto')
const queryString = require('querystring')
const express = require("express")
const router = express.Router();
const devicedb = require("../database/Device")
module.exports = router;



const jwt = require('jsonwebtoken')




const bodyParser=require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });



router.post("/test",urlencodedParser,(req,res)=>{
    let payload = {name:'张三',admin:true}
    let secret = 'test'
    let token = jwt.sign(payload,secret)
    res.send()
})

router.post("/fuck",urlencodedParser,(req,res)=>{
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5LiJIiwiYWRtaW4iOnRydWUsImlhdCI6MTU4MjM3OTE4NH0.fpFd4s5bfGfou0o_AI19TT-uNr9o2-TLBhdxnP9vn8A"
    let secret = 'test'
    payload = jwt.verify(token,secret)
})