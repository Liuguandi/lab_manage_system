<template>
  <div class="background" @keyup.enter="pressEnter('loginForm')">
    <transition name="el-fade-in">
      <div v-show="show">
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
          <h3 class="login-title">欢迎登录</h3>
          <el-form-item label="账号" prop="username">
            <el-input type="text" placeholder="请输入账号" v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="form.password" />
          </el-form-item>
          <div class="loginbtn">
            <el-button @click="onRegistClick">注册</el-button>
            <el-button
              type="primary"
              @click="onSubmit('loginForm')"
              @keyup.enter="onSubmit('loginForm')"
            >登录</el-button>
          </div>
        </el-form>
      </div>
    </transition>

    <!-- 注册用户弹窗 -->
    <!-- visible 属性控制窗口的显示与隐藏 -->
    <el-dialog title="修改用户" :visible.sync="registUserShow" width="35%">
      <el-form ref="registerForm" :model="userRegistData" :rules="registrules">
        <el-form-item label="用户名" prop="username" label-width="15%">
          <el-input v-model="userRegistData.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" label-width="15%">
          <el-input v-model="userRegistData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" label-width="15%">
          <el-radio v-model="userRegistData.gender" label="1">男</el-radio>
          <el-radio v-model="userRegistData.gender" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="class" label-width="15%">
          <el-input v-model="userRegistData.class" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="15%">
          <el-input v-model="userRegistData.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="sno" label-width="15%">
          <el-input v-model="userRegistData.sno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" label-width="15%">
          <el-input v-model="userRegistData.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="15%">
          <el-input v-model="userRegistData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qq" label-width="15%">
          <el-input v-model="userRegistData.qq" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRegist">取 消</el-button>
        <el-button type="primary" @click="registPut('registerForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "Qs";
let Base64 = require("js-base64").Base64;
export default {
  mounted() {
    this.show = true;
  },

  name: "Login",
  data() {
    return {
      show: false,
      form: {
        username: "",
        password: ""
      },

      registUserShow: false,
      userRegistData: {
        username: "",
        name: "",
        class: "",
        password: "",
        sno: "",
        phone: "",
        email: "",
        qq: ""
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
          { min: 6, message: "密码不得小于6位", trigger: "blur" }
        ]
      },
      registrules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" }
        ],
        gender: [{ required: true, message: "性别不可为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不可为空", trigger: "blur" }],
        class: [{ required: true, message: "班级不可为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
          { min: 6, message: "密码不得小于6位", trigger: "blur" }
        ],
        sno: [{ required: true, message: "学号不可为空", trigger: "blur" }],
        phone: [
          { required: true, message: "联系方式不可为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          this.form.password = Base64.encode(this.form.password);
          this.$connectBackEnd({
            url: "/member/login",
            method: "post",
            data: qs.stringify(this.form)
          }).then(backdata => {
            var data = backdata.data;
            var status = backdata.status;
            if (status === 200) {
              if (data.code === 403 && data.message === "wrong") {
                this.$message.error("用户名密码错误");
                this.form.password = Base64.decode(this.form.password);
                return;
              } else {
                new Promise((resolve, reject) => {
                  window.localStorage.setItem("username", data[0].username);
                  let tokenTemp = backdata.headers.settoken.split("=");
                  window.localStorage.setItem(tokenTemp[0], tokenTemp[1]);
                  // console.log("username" + data[0].username)
                  // console.log(tokenTemp[0]+ tokenTemp[1])
                  resolve();
                })
                .then(
                  res => {
                    this.$connectBackEnd({
                      url: "/capacity/selectDetailsById",
                      method: "post",
                      data: qs.stringify({ id: data[0].capacity })
                    })
                    .then(permissionBackdata => {
                      var permissionData = permissionBackdata.data;
                      var permissionStatus = permissionBackdata.status;
                      if (permissionStatus == 200) {
                        // console.log("premissionData")
                        // console.log(permissionData.message)
                        if(permissionData.message === "login"){
                          location.reload()
                        }
                        if( permissionData[0] === undefined){
                          location.reload()
                        }
                        let permissionDetails = permissionData[0].permission.split(
                          ","
                        );
                        this.$store.commit("capacityInit", permissionDetails);
                      }
                    });

                    this.$message.success("登录成功");
                    this.$router.push("/main");
                  },
                  err => {}
                );
              }
            }
          });
        } else {
          this.$message.error("用户名/密码未按格式填写");
          return false;
        }
      });
    },
    onRegistClick() {
      this.registUserShow = true;
    },
    cancelRegist() {
      this.registUserShow = false;
    },
    registPut(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userRegistData.password = Base64.encode(
            this.userRegistData.password
          );
          this.$connectBackEnd({
            url: "/member/add",
            method: "post",
            data: qs.stringify(this.userRegistData)
          }).then(backdata => {
            var data = backdata.data;
            var status = backdata.status;
            if (status == 200) {
              if (data.message === "success") {
                this.registUserShow = false;
                this.$message.success("注册成功");
                return;
              } else if (data.code == 406) {
                this.$message.error("用户名已存在！");
                return;
              } else {
                this.$message.error("存在错误！");
                return;
              }
            }
          });
        } else {
          this.$message.error("存在信息错误");
          return false;
        }
      });
    },
    pressEnter(formName) {
      if (this.registUserShow === false) {
        this.onSubmit(formName);
      } else if (this.registUserShow === true) {
        this.registPut(formName);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background-color: #ffffff;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.background {
  background: url("../assets/login.jpg") no-repeat center center fixed;
  background-size: 100% 100% auto;
  height: 100%;
  width: 100%;
  position: absolute;
  background-repeat: no-repeat;
  display: block;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.loginbtn {
  margin: 0 auto;
  text-align: center;
  display: block;
}
.el-input__inner {
  width: 85%;
}
</style>