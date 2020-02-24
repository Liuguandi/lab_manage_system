const config = require("../config/mysql")
const mysql = require("mysql")
const conn = mysql.createConnection(config)


module.exports = {
    getDeviceTypeName: (call) => {
        var sqlStr = "select id,name from devicetype "
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })

    },

    getDeviceTypeAll: (call) => {
        var sqlStr = "select id,name,details from devicetype where isDeleted = 0"
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })

    },


    getDeviceTypeDetailsByID:(data,call)=>{
        var sqlStr = `select id,name,details from devicetype where  id=${data.id}`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    

    addDeviceType: (data, call) => {
        var sqlStr = `insert into devicetype (name,details) values("${data.name}","${data.details}")`
        
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    },


    deleteDeviceType: (data, call) => {
        var sqlStr = "update devicetype set isDeleted = 1 where id = " + data.id;
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    },
    modifyDeviceTypeDetails: (data, call) => {
        var sqlStr = `update devicetype set details = "${data.details}" where id = ${data.id}`
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    }
}
