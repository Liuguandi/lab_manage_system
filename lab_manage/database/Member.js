const config = require("../config/mysql")
const mysql = require("mysql")
const conn = mysql.createConnection(config)
const Base64 = require('js-base64').Base64

module.exports = {
    getAllMemberNum: (call) => {
        var sqlStr = "select count(*) as totalNum from member where isDeleted = 0 "
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },
    getAllMemberByPage: (call) => {
        var sqlStr = "select id,username,name,gender,class,sno,capacity,phone,email,qq from member where isDeleted = 0 "
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    getClassMemberNum: (data, call) => {
        if (data === undefined || data.class === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select count(*) as totalNum from member where isDeleted = 0 and class = "${data.class}"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },
    getClassMemberByPage: (data, call) => {
        if (data === undefined || data.class === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select id,username,name,gender,class,sno,capacity,phone,email,qq from member where isDeleted = 0 and class = "${data.class}"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    getNameMemberNum: (data, call) => {
        if (data === undefined || data.name === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select count(*) as totalNum from member where isDeleted = 0 and name = "${data.name}"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },
    getNameMemberByPage: (data, call) => {
        if (data === undefined || data.name === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select id,username,name,gender,class,sno,capacity,phone,email,qq from member where isDeleted = 0 and name = "${data.name}"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    getPhoneMemberNum: (data, call) => {
        if (data === undefined || data.phone === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select count(*) as totalNum from member where isDeleted = 0 and phone = "${data.phone}"`

        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },
    getPhoneMemberByPage: (data, call) => {
        if (data === undefined || data.phone === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select id,username,name,gender,class,sno,capacity,phone,email,qq from member where isDeleted = 0 and phone = "${data.phone}"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    checkUsername: (data, call) => {
        sqlStr = `select count(*) as number from member where username = "${data.username}"`
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    addMember: (data, call) => {
        if(data.password != undefined){
            data.password = Base64.decode(data.password)
        }
        if (data.name === undefined) data.name = ""
        if (data.gender === undefined) data.gender = null
        if (data.class === undefined) data.class = ""
        if (data.password === undefined) data.password = ""
        if (data.sno === undefined) data.sno = ""
        if (data.phone === undefined) data.phone = ""
        sqlStr = `insert into member(username,name,gender,class,password,sno,phone) values("${data.username}","${data.name}",${data.gender},"${data.class}","${data.password}","${data.sno}","${data.phone}")`
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
        })
    },

    deleteMember: (data, call) => {
        var sqlStr = "update member set isDeleted = 1 where id = " + data.id;
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    },

    modifyeMember: (data, call) => {
        if(data.password != undefined){
            data.password = Base64.decode(data.password)
        }
        if (data.gender === "") data.gender = "null"
        var sqlStr = `update member set name="${data.name}",gender=${data.gender},class="${data.class}",password="${data.password}",sno="${data.sno}",phone="${data.phone}",email="${data.email}",qq="${data.qq}" where id = ${data.id}`;
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    },

    setMemberCapacity: (data, call) => {
        var sqlStr = `update member set capacity="${data.capacity}" where id = ${data.id}`;
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    },

    memberLogin: (data, call) => {
        if(data.password != undefined){data.password = Base64.decode(data.password)}
        var sqlStr = `select id,username,name,gender,class,sno,capacity,phone,email,qq from member where isDeleted = 0 and username = "${data.username}" and password = "${data.password}"`
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            if(result.length === 0){
                call({ code: 403, message: "wrong" })
                return 
            }
            result.code = 201;
            result.message = "success";
            result.username = data.username;
            call(result)
        })
    },
}
