<template>
  <div class="background">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>器材管理</el-breadcrumb-item>
      <el-breadcrumb-item>器材类型列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 0px;line-height: 80px;text-align:left; ">
      <el-button type="primary" plain @click="addDevicesType" v-has="'deviceType_edit'">器材类型添加</el-button>
      <el-button type="primary" plain @click="deleteDeviceType" v-has="'deviceType_edit'">器材类型删除</el-button>
      <el-button type="primary" plain @click="updateDevicesType" v-has="'deviceType_edit'">器材类型修改</el-button>
    </div>

    <!-- 表格框 -->
    <div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100% ;line-height:10px"
      >
        <el-table-column type="index" min-width="100"></el-table-column>
        <el-table-column property="name" label="器材类型名" min-width="10"></el-table-column>
        <el-table-column property="details" label="类型说明" min-width="40"></el-table-column>
      </el-table>
    </div>

    <!-- 增加器材类型弹窗 -->
    <!-- visible 属性控制窗口的显示与隐藏 -->
    <el-dialog title="添加器材类型" :visible.sync="editDeviceTypeShowFlag" width="30%"  v-has="'deviceType_edit'">
      <el-form :model="deviceTypeEditData">
        <el-form-item label="器材类型名称" label-width="20%">
          <el-input v-model="deviceTypeEditData.name"></el-input>
        </el-form-item>
        <el-form-item label="类型说明" label-width="20%">
          <el-input v-model="deviceTypeEditData.details"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="addDeviceTypePut">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除器材弹窗 -->
    <el-dialog title="删除器材类型" :visible.sync="deleteTypeShowFlag" width="40%"  v-has="'deviceType_edit'">
      <el-form :model="deleteDevicesTypeData">
        <el-form-item label="类型" label-width="15%">
          <el-select v-model="deleteDevicesTypeData.deviceTypeChs" placeholder="请选择">
            <el-option
              v-for="item in tableData"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="cancelDelete">取 消</el-button>
      <el-button type="primary" @click="deleteDeviceTypePut">确 定</el-button>
    </el-dialog>

    <!-- 修改器材弹窗 -->
    <el-dialog title="修改器材类型" :visible.sync="updateTypeShowFlag" width="40%"  v-has="'deviceType_edit'">
      <el-form :model="updateDevicesTypeData">
        <el-form-item label="类型" label-width="15%">
          <el-select v-model="updateDevicesTypeData.deviceTypeChs" placeholder="请选择">
            <el-option
              v-for="item in tableData"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型说明" label-width="15%">
          <el-input v-model="updateDevicesTypeData.details"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="cancelUpdate">取 消</el-button>
      <el-button type="primary" @click="updateDevicesTypePut">确 定</el-button>
    </el-dialog>
  </div>
</template>


<script>
import qs from "Qs";
export default {
  mounted: function() {
    this.$connectBackEnd({
      url: "/deviceType/selectAllinfo",
      method: "get"
    }).then(backdata => {
      var data = backdata.data;
      var status = backdata.status;
      if (status == 200) {
        this.tableData = data;
      }
    });
  },

  name: "DeviceType",
  data() {
    var checkNum = (rule, value, callback) => {
      if (!/^\+?[1-9][0-9]*$/.test(value)) {
        callback(new Error("请输入正整数"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      nowPage: 1,
      totalDataNum: 0,
      userEditRow: 0,
      editDeviceTypeShowFlag: false,
      deviceTypeEditData: {},

      deleteTypeShowFlag: false,
      deleteDevicesTypeData: {},

      updateTypeShowFlag: false,
      updateDevicesTypeData: {}
    };
  },
  methods: {
    dosearchUpdate() {
      var url = "/device/countAll";
      this.$connectBackEnd({
        url: "/deviceType/selectAllinfo",
        method: "get"
      }).then(backdata => {
        var data = backdata.data;
        var status = backdata.status;
        if (status == 200) {
          this.tableData = data;
        }
      });
    },

    // 删除器材
    deleteDeviceType() {
      this.deleteTypeShowFlag = true;
    },
    cancelDelete() {
      this.deleteTypeShowFlag = false;
    },

    deleteDeviceTypePut() {
      if (this.deleteDevicesTypeData.deviceTypeChs === undefined) {
        this.$message.error("请选择需要删除的器材类型");
        return;
      }

      let requestData = { id: this.deleteDevicesTypeData.deviceTypeChs };
      this.$connectBackEnd({
        url: "/deviceType/delete",
        method: "post",
        data: qs.stringify(requestData)
      }).then(backdata => {
        var data = backdata.data;
        var status = backdata.status;
        if (status == 200) {
          if (data.message === "success") {
            this.deleteTypeShowFlag = false;
            this.$message.success("修改成功");
            this.deleteDevicesTypeData.deviceTypeChs = undefined;
            this.dosearchUpdate();
            return;
          }
        }
      });
    },

    //器材类型添加
    addDevicesType() {
      this.editDeviceTypeShowFlag = true;
    },
    cancelAdd() {
      this.editDeviceTypeShowFlag = false;
    },
    addDeviceTypePut() {
      if (this.deviceTypeEditData.name === undefined) {
        this.$message.error("请选择需要添加的器材类型名称");
        return;
      }
      let requestData = this.deviceTypeEditData;
      this.$connectBackEnd({
        url: "/deviceType/add",
        method: "post",
        data: qs.stringify(requestData)
      }).then(backdata => {
        var data = backdata.data;
        var status = backdata.status;
        if (status == 200) {
          if (data.message === "success") {
            this.editDeviceTypeShowFlag = false;
            this.$message.success("修改成功");
            this.dosearchUpdate();
            return;
          }
        }
      });
    },

    updateDevicesType() {
      this.updateTypeShowFlag = true;
    },
    cancelUpdate() {
      this.updateTypeShowFlag = false;
    },
    updateDevicesTypePut() {
      if (this.updateDevicesTypeData.deviceTypeChs === undefined) {
        this.$message.error("请选择需要修改的器材类型");
        return;
      }
      if (this.updateDevicesTypeData.details === undefined) {
        this.updateDevicesTypeData.details = "";
      }
      let requestData = {
        id: this.updateDevicesTypeData.deviceTypeChs,
        details: this.updateDevicesTypeData.details
      };
      this.$connectBackEnd({
        url: "/deviceType/modify",
        method: "post",
        data: qs.stringify(requestData)
      }).then(backdata => {
        var data = backdata.data;
        var status = backdata.status;
        if (status == 200) {
          if (data.message === "success") {
            this.updateTypeShowFlag = false;
            this.$message.success("修改成功");
            this.updateDevicesTypeData.deviceTypeChs = undefined;
            this.updateDevicesTypeData.details = undefined;
            this.dosearchUpdate();
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