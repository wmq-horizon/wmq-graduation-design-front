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
        <el-card class="box-card">
          <div><span style="font-weight:bold;">我的信息</span></div>
          <el-divider></el-divider>
          <div><span>编号：{{user.uid}}</span></div>
          <el-divider></el-divider>
          <div><span>昵称：{{user.name}}</span></div>
          <el-divider></el-divider>
          <div><span>诚信值：{{user.integrity}}</span></div>
          <el-divider></el-divider>
          <div><span>量化分：{{user.score}}</span></div>
          <el-divider></el-divider>
          <div><span>角色：{{user.role}}</span></div>
        </el-card>

      </el-col>
    </div>
  </div>
</template>
<script>
    export default {
        name: "studentCenter",
        data() {
            return {
                data:'',
                user:{
                    uid:'',
                    name:'',
                    password:'',
                    integrity:0,
                    role:'',
                    score:0,
                    status:0,
                },
                input1: '',
                input2: '',
                input3: '',
                select: '',
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            getUserInfo(){
                this.$axios.get('/student/hello').then(res=>{
                    this.user = res.data.data;
                    console.log("this.user:");
                    console.log(this.user);
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                });
            }
        },

        created() {
            this.getUserInfo();
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
