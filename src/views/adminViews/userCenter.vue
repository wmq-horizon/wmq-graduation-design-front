<template>
  <div>
    <headerBar></headerBar>
    <div>
      <el-col :span="4"><menuComponent></menuComponent></el-col>
      <el-col :span="20">
        <div>
          <el-col :span="24" class="table-title">
            <div style="margin-top: 15px;margin-bottom: 10px;margin-right: 15%;">
              <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="用户编号" value="1"></el-option>
                  <el-option label="用户名" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </div>
        <el-table
          :data="userInfo.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%;">
          <el-table-column class="table-column"
                           prop="uid"
                           label="用户编号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="integrity"
            label="诚信值">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色">
          </el-table-column>
          <el-table-column
            prop="score"
            label="量化分">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
              <el-button style="float: left; padding-right: 3px;" type="text">
                <span style="color: red" @click="delItem(scope.row,scope.$index)">删除</span>
              </el-button>
              <el-button style="float: left; padding-right: 3px;" type="text">
                <span @click="editItem(scope.row,scope.$index)">锁定</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          layout="total,prev, pager, next"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="userInfo.length">
        </el-pagination>
      </el-col>
    </div>
  </div>
</template>

<script>
    export default {
        name: "studentCenter",
        data() {
            return {
                userInfo:[{
                    uid:'',
                    name:'',
                    integrity:'',
                    role:'',
                    score:'',
                    status:''
                }],
                pageSize:5,
                currentPage:1,
                input1: '',
                input2: '',
                input3: '',
                select: '',
            }
        },
        methods: {
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
            },
        },
        created() {
            this.$axios.get("/admin/users").then(res=>{
                this.userInfo = res.data.data;
                console.log(res);
                console.log(this.userInfo);
                console.log(res.data.data);
            }).catch(err=>{
                console.log(err);
            })
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
