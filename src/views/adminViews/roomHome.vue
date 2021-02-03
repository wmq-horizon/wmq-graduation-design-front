<template>
<div>
  <el-row>
  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
    <div class="grid-content" style="padding-left:3%;float: left">
      <img src="../../assets/校徽.png" height="50" width="50"/>
      <img src="../../assets/标题.png" height="50" width="250"/>
    </div>
  </el-col>
</el-row>
  <div>
    <el-col :span="4"><menuComponent></menuComponent></el-col>
    <el-col :span="20">
      <div>
        <el-col :span="24" class="table-title">
          <div style="margin-top: 15px;margin-bottom: 10px;margin-right: 15%;">
            <el-input placeholder="请输入搜索内容" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="宣讲室编号" value="1"></el-option>
                <el-option label="宣讲室名称" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;">
        <el-table-column class="table-column"
                         prop="roomNumber"
                         label="宣讲室编号">
        </el-table-column>
        <el-table-column
          prop="roomName"
          label="宣讲室名称">
        </el-table-column>
        <el-table-column
          prop="rowCount"
          label="行数"
          width="130">
        </el-table-column>
        <el-table-column
          prop="colCount"
          label="列数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button style="float: left; padding-right: 3px;" type="text">
              <span style="color: red" @click="delItem(scope.row,scope.$index)">删除</span>
            </el-button>
            <el-button style="float: left; padding-right: 3px;" type="text">
              <span @click="editItem(scope.row,scope.$index)">编辑</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
  </div>
</template>

<script>
    export default {
        name: "classRoomHome",
        data(){
            return{
                input1: '',
                input2: '',
                input3: '',
                select: '',
                tableData:[{
                    roomNumber:'',
                    roomName:'',
                    rowCount:0,
                    colCount:0,
                }],
            }
        },
        methods:{
            delItem(row,index){
                console.log(index);
            },
            editItem(row,index){
                console.log(row);
                console.log(index);
            },
            getInitTableInfo(){
                this.$axios.get('/classRoomInfo/getClassRoomInfo').then(res=>{
                    console.log("res");
                    this.tableData=res.data.data;
                    console.log(this.tableData);
                }).catch(err=>{
                    console.log(err);
                })
            },
        },
        created() {
            this.getInitTableInfo();
        }
    }
</script>

<style scoped>
  .table-title{
    background-color:#B3CCB6;
  }
  .table-column{
    background-color: #B3CCB6;
  }
  /*搜索框的样式*/
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
