const express = require("express")
const app = express()
const port = 9876


app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`)
})


app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("X-Powered-By", "http://values.keys.moe/");
    res.header("Content-Type", "application/json;charset=utf-8");
    req.method.toUpperCase() === "OPTIONS" ? res.sendStatus(200) : next();//��ֹ��Ԥ����׶ξ���Ӧ�ӿ�
});


app.get('/',(req,res)=>{
    res.send("helloworld")
})

app.use("/authority",require("./router/AuthorityControl"))
app.use("/member",require("./router/MemberControl"))
app.use("/device",require("./router/DeviceControl"))
app.use("/devicetype",require("./router/DeviceTypeControl"))
app.use("/capacity",require("./router/CapacityControl"))

app.use("/test",require("./Token/test"))