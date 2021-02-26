<template>
  <div>
  <headerBar></headerBar>
    <div>
      <el-col :span="4"><menuComponent></menuComponent></el-col>
      <el-col :span="20">
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <el-image
              style="width: 100%; height: 150px"
              :src="url"
              :fit="fit"></el-image>
          </div>
        </div>
        <el-card class="box-card">
<!--          <div><span style="font-weight:bold;">我的信息</span></div>-->
<!--          <el-divider></el-divider>-->
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
                fits: ['fill'],
                url: 'https://tse1-mm.cn.bing.net/th/id/OIP.Q84dPkecBmJ9UyTIV8AiEAHaEo?pid=ImgDet&rs=1',
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
