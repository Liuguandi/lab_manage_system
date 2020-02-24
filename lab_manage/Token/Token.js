const http = require('http')
const crypto = require('crypto')
const queryString = require('querystring')
const express = require("express")
const jwt = require('jsonwebtoken')
// const router = express.Router();
// module.exports = router;



//服务器存储的cookie
let key = 'lab_key'
let secret = ""


module.exports = {
    addToken : function (req, res,usernameData) {
        res.setHeader('Access-Control-Expose-Headers', 'SetToken')
        let payload = {username:usernameData}
        let token = jwt.sign(payload,secret)
        res.setHeader('SetToken', `${key}=${token}`);
        return res
    },
    verifyToken : function (request,response) {
        
        let usernameData = request.headers.username
        let tokenGet = request.headers.authorization.split("=");
        let token = tokenGet[1];
        
        
        if(token === undefined || usernameData === undefined
        || token === null || usernameData === null
        || token === "null" || usernameData === "null")   {
            return false;
        }
        
        payload = jwt.verify(token,secret)
        if(payload.username === usernameData){
            return true;
        }
        return false;
    }
    
}