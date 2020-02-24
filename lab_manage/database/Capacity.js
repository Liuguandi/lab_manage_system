const config = require("../config/mysql")
const mysql = require("mysql")
const conn = mysql.createConnection(config)


module.exports = {
    getCapacityName: (call) => {
        var sqlStr = "select id,name from capacity "
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })

    },


    getCapacityDetailsByID:(data,call)=>{
        var sqlStr = `select name,permission from capacity where id=${data.id}`
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })
    },

    

    // addCapacity: (data, call) => {
    //     var sqlStr = ""
    //     if (data.fatherid === undefined) {
    //         sqlStr = "insert into capacity(name) values(" + "'" + data.name + "')"
    //     } else {
    //         sqlStr = "insert into capacity(name,fatherid) values(" + "'" + data.name + "'," + data.fatherid + ")"
    //     }
    //     conn.query(sqlStr, (err, result) => {
    //         if (err) {
    //             call({ code: 404, message: "fail" })
    //             return
    //         }
    //         call({ code: 201, message: "success" })
    //         //call(result)
    //     })
    // },


    // deleteCapacity: (data, call) => {
    //     var sqlStr = "update capacity set isDeleted = 1 where id = " + data.id;
    //     conn.query(sqlStr, (err, result) => {
    //         if (err) {
    //             call({ code: 404, message: "fail" })
    //             return
    //         }
    //         call({ code: 201, message: "success" })
    //         //call(result)
    //     })
    // }
}
