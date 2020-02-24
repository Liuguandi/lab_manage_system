<template>
  <div class="background">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>器材管理</el-breadcrumb-item>
      <el-breadcrumb-item>器材列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 0px;line-height: 80px;text-align:left; ">
      <el-button type="primary" plain @click="addDevices" v-has="'device_edit'">器材添加</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="searchDetails"
        class="input-with-select"
        style="width:70%;"
        @change="dosearch()"
      >
        <el-select v-model="nowSelect" slot="prepend" placeholder="请选择" style="width:130px">
          <el-option label="全选" value="0"></el-option>
          <el-option label="按名称(模糊搜索)" value="1"></el-option>
          <el-option label="按类型" value="2"></el-option>
          <el-option label="按功能(模糊搜索)" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click.stop="dosearch()"></el-button>
      </el-input>
    </div>

    <!-- 表格框 -->
    <div style="height:300px">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100% ;line-height:10px"
      >
        <el-table-column type="index" min-width="30"></el-table-column>
        <el-table-column property="name" label="器材名" min-width="80"></el-table-column>
        <el-table-column property="number" label="数量" min-width="50"></el-table-column>
        <el-table-column property="deviceTypeNameOwn" label="类型" min-width="90"></el-table-column>
        <el-table-column property="location" label="存放位置" min-width="80"></el-table-column>
        <el-table-column property="functions" label="功能" min-width="80"></el-table-column>
        <el-table-column property label min-width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-edit"
              v-has="'device_edit'"
              @click.stop="editDeviceShow(scope)"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              plain
              icon="el-icon-check"
              v-has="'device_edit'"
              @click="devicesDetailsShow(scope)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              plain
              icon="el-icon-delete"
              v-has="'device_edit'"
              @click="deleteDevice(scope.row.id)"
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

    <!-- 修改器材弹窗 -->
    <!-- visible 属性控制窗口的显示与隐藏 -->
    <el-dialog title="修改器材" :visible.sync="editDeviceShowFlag" width="40%">
      <!-- 使用双向数据绑定,操作表单数据 -->
      <el-form :model="deviceEditData" :rules="addrules">
        <el-form-item label="器材名" label-width="15%">
          <el-input v-model="deviceEditData.name"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number" label-width="15%">
          <el-input v-model="deviceEditData.number"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="15%">
          <el-select v-model="deviceEditData.deviceTypeChs" placeholder="请选择">
            <el-option
              v-for="item in deviceTypeName"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存放位置" label-width="15%">
          <el-input v-model="deviceEditData.location"></el-input>
        </el-form-item>
        <el-form-item label="功能" label-width="15%">
          <el-input v-model="deviceEditData.functions"></el-input>
        </el-form-item>
        <el-form-item label="详细说明" label-width="15%">
          <el-input v-model="deviceEditData.details"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 关闭窗口 -->
        <el-button @click="cancelUpdate">取 消</el-button>
        <!-- 绑定确定事件,发送数据到服务器入库 -->
        <el-button type="primary" @click="updatePut">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="器材详细信息" :visible.sync="deviceTypeShow" width="40%">
      <!-- 使用双向数据绑定,操作表单数据 -->
      <el-form>
        <el-form-item label="名称" label-width="15%">
          <span>{{deviceTypeEditData.name}}</span>
        </el-form-item>
        <el-form-item label="数量" label-width="15%">
          <span>{{deviceTypeEditData.number}}</span>
        </el-form-item>
        <el-form-item label="类别" label-width="15%">
          <span>{{deviceTypeEditData.deviceTypeNameOwn}}</span>
        </el-form-item>
        <el-form-item label="功能" label-width="15%">
          <span>{{deviceTypeEditData.functions}}</span>
        </el-form-item>
        <el-form-item label="存放地点" label-width="15%">
          <span>{{deviceTypeEditData.location}}</span>
        </el-form-item>
        <el-form-item label="详细信息" label-width="15%">
          <span>{{deviceTypeEditData.details}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 关闭窗口 -->
        <!-- 绑定确定事件,发送数据到服务器入库 -->
        <el-button type="primary" @click="deviceTypeShow = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 增加器材弹窗 -->
    <!-- visible 属性控制窗口的显示与隐藏 -->
    <el-dialog title="增加器材" :visible.sync="addDevicesShow" width="40%">
      <!-- 使用双向数据绑定,操作表单数据 -->
      <el-form :model="addDevicesData" :rules="addrules">
        <el-form-item label="器材名" label-width="15%">
          <el-input v-model="addDevicesData.name"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number" label-width="15%">
          <el-input v-model="addDevicesData.number"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="15%">
          <el-select v-model="addDevicesData.deviceTypeChs" placeholder="请选择">
            <el-option
              v-for="item in deviceTypeName"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存放位置" label-width="15%">
          <el-input v-model="addDevicesData.location"></el-input>
        </el-form-item>
        <el-form-item label="功能" label-width="15%">
          <el-input v-model="addDevicesData.functions"></el-input>
        </el-form-item>
        <el-form-item label="详细说明" label-width="15%">
          <el-input v-model="addDevicesData.details"></el-input>
        </el-form-item>
        <!-- 关闭窗口 -->
        <el-button @click="cancelAdd">取 消</el-button>
        <!-- 绑定确定事件,发送数据到服务器入库 -->
        <el-button type="primary" @click="addDevicePut()">确 定</el-button>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        
      </div>-->
    </el-dialog>
  </div>
</template>


<script>
import qs from "Qs";
export default {
  mounted: function() {
    this.$connectBackEnd({
      url: "/deviceType/selectAllName",
      method: "get"
    }).then(backdata => {
      var data = backdata.data;
      var status = backdata.status;
      if (status == 200) {
        this.deviceTypeName = data;
      }
    });
  },

  name: "Devices",
  data() {
    var checkNum = (rule, value, callback) => {
      if (!/^\+?[1-9][0-9]*$/.test(value)) {
        callback(new Error("请输入正整数"));
      } else {
        callback();
      }
    };
    return {
      searchDetails: "",
      nowSelect: "",
      tableData: [],
      nowPage: 1,
      totalDataNum: 0,

      userEditRow: 0,
      editDeviceShowFlag: false,
      deviceEditData: {
        deviceTypeChs: 0
      },
      deviceTypeEditData: {
        id: "",
        name: "",
        deviceTypeChs: 0
      },
      deviceTypeShow: false,
      deviceTypeName: [],

      addDevicesShow: false,
      addDevicesData: {},

      addrules: {
        number: [{ validator: checkNum, trigger: "blur" }]
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
        var url = "/device/countAll";
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

        url = "/device/selectAll";
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
              if (data[i].type != undefined && data[i].type != "") {
                data[i].deviceTypeNameOwn = this.deviceTypeName[
                  data[i].type
                ].name; //存在安全隐患
              }
            }
            if (data.length === 0) {
              this.$message.error("无搜索结果");
            }
            this.tableData = data;
          }
        });
      } else if (this.nowSelect === "1") {
        let requestData = { name: this.searchDetails };
        var url = "/device/countName";
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

        url = "/device/selectName";
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
              if (data[i].type != undefined && data[i].type != "")
                data[i].deviceTypeNameOwn = this.deviceTypeName[
                  data[i].type
                ].name; //存在安全隐患
            }
            if (data.length === 0) {
              this.$message.error("无搜索结果");
            }
            this.tableData = data;
          }
        });
      } else if (this.nowSelect === "2") {
        let requestData = { type: this.searchDetails };
        var url = "/device/countType";
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

        url = "/device/selectType";
        requestData = { page: this.nowPage, type: this.searchDetails };
        this.$connectBackEnd({
          url,
          method: "post",
          data: qs.stringify(requestData)
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].type != undefined && data[i].type != "")
                data[i].deviceTypeNameOwn = this.deviceTypeName[
                  data[i].type
                ].name; //存在安全隐患
            }
            if (data.length === 0) {
              this.$message.error("无搜索结果");
            }
            this.tableData = data;
          }
        });
      } else if (this.nowSelect === "3") {
        let requestData = { functions: this.searchDetails };
        var url = "/device/countFunction";
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

        url = "/device/selectFunction";
        requestData = { page: this.nowPage, functions: this.searchDetails };
        this.$connectBackEnd({
          url,
          method: "post",
          data: qs.stringify(requestData)
        }).then(backdata => {
          var data = backdata.data;
          var status = backdata.status;
          if (status == 200) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].type != undefined && data[i].type != "")
                data[i].deviceTypeNameOwn = this.deviceTypeName[
                  data[i].type
                ].name; //存在安全隐患
            }
            if (data.length === 0) {
              this.$message.error("无搜索结果");
            }
            this.tableData = data;
          }
        });
      }
    },
    // 删除器材
    deleteDevice(id) {
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
            url: `device/delete`,
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
    editDeviceShow(scope) {
      this.deviceEditData = scope.row;
      this.editDeviceShowFlag = true;
    },
    cancelUpdate() {
      this.editDeviceShowFlag = false;
    },
    updatePut() {
      this.editDeviceShowFlag = false;
      let requestData = this.deviceEditData;
      if (requestData.deviceTypeChs != undefined) {
        requestData.type = requestData.deviceTypeChs;
      }
      if (requestData.number == undefined) {
        requestData.number = "null";
      }
      if (!/^\+?[1-9][0-9]*$/.test(this.addDevicesData.number)) {
        this.$message.error("器件数量需要为正整数！");
        this.dosearch();
        return;
      }
      this.$connectBackEnd({
        url: "device/modify",
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
    devicesDetailsShow(scope) {
      this.deviceTypeEditData = scope.row;
      this.deviceTypeShow = true;
    },
    //器材添加
    addDevices() {
      this.addDevicesShow = true;
      this.addDevicesData.deviceTypeChs = 0;
    },
    cancelAdd() {
      this.addDevicesShow = false;
    },
    addDevicePut() {
      if (!/^\+?[1-9][0-9]*$/.test(this.addDevicesData.number)) {
        this.$message.error("器件数量需要为正整数！");
        this.dosearch();
        return;
      }

      this.addDevicesShow = false;
      let requestData = this.addDevicesData;
      requestData.type = requestData.deviceTypeChs;
      this.$connectBackEnd({
        url: "/device/add",
        method: "post",
        data: qs.stringify(requestData)
      }).then(backdata => {
        var data = backdata.data;
        var status = backdata.status;
        if (status == 200) {
          if (data.message === "success") {
            this.$message.success("修改成功");
            this.dosearch();
            return;
          }
        }
      });
    }
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