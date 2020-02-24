const config = require("../config/mysql")
const mysql = require("mysql")
const conn = mysql.createConnection(config)


module.exports = {
    getAuthority: (call) => {
        var sqlStr = "select * from authority where isDeleted = 0 "
        var ans = conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call(result)
        })

    },

    addAuthority: (data, call) => {
        var sqlStr = ""
        if (data.fatherid === undefined) {
            sqlStr = "insert into authority(name) values(" + "'" + data.name + "')"
        } else {
            sqlStr = "insert into authority(name,fatherid) values(" + "'" + data.name + "'," + data.fatherid + ")"
        }
        conn.query(sqlStr, (err, result) => {
            if (err) {
                call({ code: 404, message: "fail" })
                return
            }
            call({ code: 201, message: "success" })
            //call(result)
        })
    },


    deleteAuthority: (data, call) => {
        var sqlStr = "update authority set isDeleted = 1 where id = " + data.id;
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
