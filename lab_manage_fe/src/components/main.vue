<template>
  <el-container class="whole">
    <el-header style="height:80px">
      <span style="font-size:30px">
        <el-row style="padding-left:0px; position:fixed;">
          <el-col :span="2">
            <img src="../assets/njtechlogo.png" alt />
          </el-col>
          <span style="padding-left:130px; ">机器人实验室管理系统</span>
        </el-row>
      </span>
      <span style="float:right;">
        <el-button round @click="logOut">退出</el-button>
      </span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="userListManage">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-suitcase-1"></i>
              <span>器材管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="devicesListManage">器材列表</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <el-menu-item index="2-2" @click="devicesTypeListManage">器材类型管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer style="height:30px">南京工业大学计算机科学与技术学院机器人实验室</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  mounted() {
    // var token = $cookies.get("lab_key")
    var token = window.localStorage.getItem('lab_key')
    if (!token) {
      this.$message.error("请登录");
      this.$router.push({ name: "Login" });
    }
  },
  name: "Main",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    userListManage() {
      if (this.$route.path != "/users") this.$router.push("/users");
    },
    devicesListManage() {
      if (this.$route.path != "/devices") this.$router.push("/devices");
    },
    devicesTypeListManage() {
      if (this.$route.path != "/deviceType") this.$router.push("/deviceType");
    },
    logOut() {
      if(this.$cookies.isKey("lab_key")){
        this.$cookies.remove("lab_key")
      }
      window.localStorage.clear('username')
      if (this.$route.path != "/login") this.$router.push("/login");
    },
   
  }
};
</script>

<style scoped>
.el-header {
  background-color: #0093dd;
  color: #ffffff;
  text-align: center;
  line-height: 70px;
}

.el-footer {
  background-color: #097cb5;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
}

.el-aside {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 100px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
</style>