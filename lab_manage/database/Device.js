const config = require("../config/mysql")
const mysql = require("mysql")
const conn = mysql.createConnection(config)


module.exports = {
    getAllDeviceNum: (call) => {
        var sqlStr = "select count(*) as totalNum from device "
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },
    getAlldeviceByPage: (call) => {
        var sqlStr = "select id,name,number,type,details,img,location,functions from device "
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    getNamedeviceNum: (data, call) => {
        if (data === undefined || data.name === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select count(*) as totalNum from device where name like "%${data.name}%"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },
    getNamedeviceByPage: (data, call) => {
        if (data === undefined || data.name === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select id,name,number,type,details,img,location,functions from device where name like "%${data.name}%"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    getTypedeviceNum: (data, call) => {
        if (data === undefined || data.type === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select count(*) as totalNum from device where type = "${data.type}"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },
    getTypedeviceByPage: (data, call) => {
        if (data === undefined || data.type === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select id,name,number,type,details,img,location,functions from device where type = "${data.type}"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    getFunctiondeviceNum: (data, call) => {
        if (data === undefined || data.functions === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select count(*) as totalNum from device where functions like "%${data.functions}%"`
        
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },
    getFunctiondeviceByPage: (data, call) => {
        if (data === undefined || data.functions === undefined) {
            call({ code: 404, message: "fail" })
            return
        }
        var sqlStr = `select id,name,number,type,details,img,location,functions from device where functions like "%${data.functions}%"`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    adddevice: (data, call) => {
        sqlStr = `insert into device(name,number,type,details,img,location,functions) values("${data.name}",${data.number},"${data.type}","${data.details}","${data.img}","${data.location}","${data.functions}")`
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    },

    deletedevice: (data, call) => {
        var sqlStr = "delete from device  where id = " + data.id;
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    },

    modifyedevice: (data, call) => {
        if(data.gender === "") data.gender = "null"
        var sqlStr = `update device set name="${data.name}",number=${data.number},type="${data.type}",details="${data.details}",img="${data.img}",location="${data.location}",functions="${data.functions}" where id = ${data.id}`;
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    },

 

}
