<template>
  <div class="background">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 0px;line-height: 80px;text-align:left; ">
      <el-input
        placeholder="请输入内容"
        v-model="searchDetails"
        class="input-with-select"
        style="width:70%;"
        @change="dosearch()"
      >
        <el-select v-model="nowSelect" slot="prepend" placeholder="请选择" style="width:130px">
          <el-option label="全选" value="0"></el-option>
          <el-option label="按姓名" value="1"></el-option>
          <el-option label="按班级" value="2"></el-option>
          <el-option label="按联系电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click.stop="dosearch()"></el-button>
      </el-input>
    </div>

    <!-- 表格框 -->
    <div style = "height:300px">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100% ;line-height:10px"
      >
        <el-table-column type="index" min-width="30"></el-table-column>
         <el-table-column property="username" label="用户名" min-width="80"></el-table-column>
        <el-table-column property="name" label="姓名" min-width="80"></el-table-column>
        <el-table-column property="gender" label="性别" min-width="50"></el-table-column>
        <el-table-column property="class" label="班级" min-width="90"></el-table-column>
        <el-table-column property="sno" label="学号" min-width="130"></el-table-column>
        <el-table-column property="capacityNameOwn" label="状态" min-width="80"></el-table-column>
        <el-table-column property="phone" label="联系电话" min-width="115"></el-table-column>
        <el-table-column property="qq" label="qq" min-width="110"></el-table-column>
        <el-table-column property="email" label="邮箱" min-width="160"></el-table-column>
        <el-table-column property label="" min-width="200" >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-edit"
              v-has="'user_edit'"
              @click.stop="editUserisShow(scope)"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              plain
              icon="el-icon-check"
              v-has="'user_edit'"
              @click="editCapacityisShow(scope)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              plain
              icon="el-icon-delete"
              v-has="'user_edit'"
              @click="deleteUser(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
    <el-pagination
      @current-change="pageChange"
      :page-size="10"
      :pager-count="11"
      layout="prev, pager, next"
      :total="totalDataNum"
      style="height:30px"
    ></el-pagination>

    </div>

    

    <!-- 修改用户弹窗 -->
    <!-- visible 属性控制窗口的显示与隐藏 -->
    <el-dialog title="修改用户" :visible.sync="editUserShow" width="30%">
      <!-- 使用双向数据绑定,操作表单数据 -->
      <el-form :model="userEditData" :rules="rules">
        <el-form-item label="用户名" label-width="15%">
          <el-input v-model="userEditData.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="15%">
          <el-input v-model="userEditData.name" ></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="15%">
          <el-radio v-model="userEditData.gender" label="男">男</el-radio>
          <el-radio v-model="userEditData.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="班级" label-width="15%">
          <el-input v-model="userEditData.class" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="15%">
          <el-input v-model="userEditData.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" label-width="15%">
          <el-input v-model="userEditData.sno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="15%">
          <el-input v-model="userEditData.capacityNameOwn" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="15%">
          <el-input v-model="userEditData.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="15%">
          <el-input v-model="userEditData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="qq" label-width="15%">
          <el-input v-model="userEditData.qq" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 关闭窗口 -->
        <el-button @click="cancelUpdate">取 消</el-button>
        <!-- 绑定确定事件,发送数据到服务器入库 -->
        <el-button type="primary" @click="updatePut">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户权限" :visible.sync="capacityShow" width="30%">
      <!-- 使用双向数据绑定,操作表单数据 -->
      <el-form>
        <el-form-item label="用户名" label-width="15%">
          <span>{{capacityEditData.username}}</span>
        </el-form-item>
        <el-form-item label="姓名" label-width="15%">
          <span>{{capacityEditData.name}}</span>
        </el-form-item>
        <el-form-item label="角色" label-width="15%">
          <el-select v-model="capacityEditData.capacityChs" placeholder="请选择">
            <el-option
                        v-for="item in capacityName"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 关闭窗口 -->
        <el-button @click="capacityShow = false">取 消</el-button>
        <!-- 绑定确定事件,发送数据到服务器入库 -->
        <el-button type="primary" @click="capacityPut">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import qs from "Qs";
export default {
  mounted:function(){
    this.$connectBackEnd({
        url:"/capacity/selectAllName",
        method:"get",
      }).then(backdata=>{
         var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            this.capacityName = data;
          }
      })
  },

  name: "Users",
  data() {
    return {
      searchDetails: "",
      nowSelect: "",
      tableData: [],
      nowPage: 1,
      totalDataNum: 0,

      userEditRow: 0,
      editUserShow: false,
      userEditData: {
      },
      capacityEditData: {
        id: "",
        name:"",
        capacityChs:0,
      },
      capacityShow: false,
      capacityName:[],
      
      rules: {
        // 验证用户名 在组建中使用 prop 设置
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    pageChange(page) {
      this.nowPage = page;
      this.dosearch();
    },
    dosearch() {

      if (this.nowSelect === "0") {
        var url = "/member/countAll";
        this.$connectBackEnd({
          url,
          method: "get"
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            this.totalDataNum = data[0].totalNum;
          }
        });

        url = "/member/selectAll";
        let requestData = { page: this.nowPage };
        this.$connectBackEnd({
          url,
          method: "post",
          data: qs.stringify(requestData)
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].gender === 1) {
                data[i].gender = "男";
              } else if (data[i].gender === 0) {
                data[i].gender = "女";
              }
              data[i].capacityNameOwn = (this.capacityName[data[i].capacity].name) 
            }
            if (data.length === 0) {
              this.$message.error("无搜索结果");
            }
            this.tableData = data;
          }
        });
      } else if (this.nowSelect === "1") {
        let requestData = { name: this.searchDetails };
        var url = "/member/countName";
        this.$connectBackEnd({
          url,
          method: "post",
          data: qs.stringify(requestData)
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            this.totalDataNum = data[0].totalNum;
          }
        });

        url = "/member/selectName";
        requestData = { page: this.nowPage, name: this.searchDetails };
        this.$connectBackEnd({
          url,
          method: "post",
          data: qs.stringify(requestData)
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].gender === 1) {
                data[i].gender = "男";
              } else if (data[i].gender === 0) {
                data[i].gender = "女";
              }
               data[i].capacityNameOwn = (this.capacityName[data[i].capacity].name) 
            }
           
            if (data.length === 0) {
              this.$message.error("无搜索结果");
               
            }

            this.tableData = data;
          }
        });
      } else if (this.nowSelect === "2") {
        let requestData = { class: this.searchDetails };
        var url = "/member/countClass";
        this.$connectBackEnd({
          url,
          method: "post",
          data: qs.stringify(requestData)
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            this.totalDataNum = data[0].totalNum;
          }
        });

        url = "/member/selectClass";
        requestData = { page: this.nowPage, class: this.searchDetails };
        this.$connectBackEnd({
          url,
          method: "post",
          data: qs.stringify(requestData)
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].gender === 1) {
                data[i].gender = "男";
              } else if (data[i].gender === 0) {
                data[i].gender = "女";
              }
              data[i].capacityNameOwn = (this.capacityName[data[i].capacity].name) 
            }
            
            if (data.length === 0) {
              this.$message.error("无搜索结果");
            }
            this.tableData = data;
          }
        });
      } else if (this.nowSelect === "3") {
        let requestData = { phone: this.searchDetails };
        var url = "/member/countPhone";
        this.$connectBackEnd({
          url,
          method: "post",
          data: qs.stringify(requestData)
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            this.totalDataNum = data[0].totalNum;
          }
        });

        url = "/member/selectPhone";
        requestData = { page: this.nowPage, phone: this.searchDetails };
        this.$connectBackEnd({
          url,
          method: "post",
          data: qs.stringify(requestData)
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].gender === 1) {
                data[i].gender = "男";
              } else if (data[i].gender === 0) {
                data[i].gender = "女";
              }
              data[i].capacityNameOwn = (this.capacityName[data[i].capacity].name) 
            }
            
            if (data.length === 0) {
              this.$message.error("无搜索结果");
            }
            this.tableData = data;
          }
        });
      }
    },
    // 删除用户
    deleteUser(id) {
      // 添加确认窗口
      this.$confirm("此操作将删除该用户, 确认继续?", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 如果点击确认按钮执行
        .then(() => {
          // 请求接口,执行删除操作
          //获取要删除的用户id
          let requestData = { id: id };
          this.$connectBackEnd({
            url: `member/delete`,
            // 请求接口 删除用户
            method: "post",
            data: qs.stringify(requestData)
          }).then(backdata => {
            var data = backdata.data;
            var status = backdata.status;
            if (status == 200) {
              // 删除成功后,重新获取用户列表
              this.nowPage = 1;
              this.dosearch();
              // 提示成功
              this.$message({ message: "删除成功", type: "success" });
            }
          });
        })
        // 如果询问窗口点击 取消执行以下操作
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editUserisShow(scope) {
      this.userEditData = scope.row;
      this.editUserShow = true;
    },
    cancelUpdate() {
      this.editUserShow = false;
    },
    updatePut() {
      this.editUserShow = false;
      let requestData = this.userEditData;
      if (requestData.gender === "男") requestData.gender = 1;
      else if (requestData.gender === "女") requestData.gender = 0;
      this.$connectBackEnd({
        url: "member/modify",
        method: "post",
        data: qs.stringify(requestData)
      }).then(backdata => {
        var data = backdata.data;
        var status = backdata.status;
        if (status == 200) {
          this.nowPage = 1;
          this.dosearch();
          this.$message({ message: "更新成功", type: "success" });
        }
      });
    },
    editCapacityisShow(scope) {
      this.capacityEditData = scope.row;
      // this.capacityEditData.id = scope.row.id;
      // this.capacityEditData.name = scope.row.name;
      // this.capacityEditData.capacity = scope.row.capacity;
      // this.capacityEditData.capacityNameOwn = scope.row.capacityNameOwn;
      
      this.capacityShow = true;
    },
    capacityPut() {
      this.capacityShow = false;
      let requestData = { id:this.capacityEditData.id,capacity:this.capacityEditData.capacityChs}
      this.$connectBackEnd({
        url:"/member/setCapacity",
        method:"post",
        data: qs.stringify(requestData)
      }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            if (data.message === "success") {
              this.$message.success("修改成功");
              this.dosearch()
              return
            }
          }
        });
    },


  }
};
</script>

<style scoped>
.background {
  color: gray;
  height: 100%;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.cell {
  text-align: center;
}

</style>