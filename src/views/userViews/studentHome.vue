<template>
  <el-container>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content" style="padding-left:3%;float: left">
          <img src="../../assets/校徽.png" height="50" width="50"/>
          <img src="../../assets/标题.png" height="50" width="250"/>
        </div>
      </el-col>
    </el-row>
    <el-header>
      <!--    导航菜单-->
      <homeComponent></homeComponent>
    </el-header>
    <el-container>
      <el-container>
        <el-aside width="30%">
          <div class="demo-image">
            <div class="block" v-for="fit in fits" :key="fit">
<!--              <span class="demonstration">{{ fit }}</span>-->
              <el-image
                style="width: 100%; height: 100%"
                :src="url"
                :fit="fit"></el-image>
            </div>
          </div>
        </el-aside>
        <el-main>
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
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>

    export default {
        name: "student_home",
        data(){
            return{
                fits: ['fill'],
                url: 'https://th.bing.com/th/id/R0cc76b7131caa1c7a6672f05d6ce4fc1?rik=bqQNNwk%2f17ZVOw&riu=http%3a%2f%2fimg.mp.itc.cn%2fupload%2f20170403%2fd265e7c573c2414ba9de52f49db14ad0_th.jpg&ehk=F58NLPLaIeKND7eyIfaa2GAGgd%2f5Y5Q1zdNmDPjbDtA%3d&risl=&pid=ImgRaw',
                user:{
                    uid:'',
                    name:'',
                    password:'',
                    integrity:0,
                    role:'',
                    score:0,
                    status:0,
                }
            }
        },
        methods:{
            getUserInfo(){
                this.$axios.get('/student/hello').then(res=>{
                    this.user = res.data.data;
                    console.log(this.user);
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                });
            }
        },
        mounted() {
            this.getUserInfo();
        }
    }
</script>

<style scoped>
  .lecture-class {
    background-color: white;
    font-size: 16px;
  }

  .lecture-text-class {
    background-color: white;
    font-size: 16px;
    font-weight: bold;
  }

  /*登录卡片内容*/
  .box-card {
    width: 100%;
  }

  /*整体布局*/
  .el-header {
    text-align: center;
    float: left;
    line-height: 3%;
    width: 100%;
    padding: 0;
    font-size: x-small;
  }

  .el-footer {
    background-color: #3C3C43;
    color: white;
    text-align: center;
    float: left;
    width: 100%;
    padding-bottom: 0;
    padding-top: 2%;
  }

  .el-aside {
    text-align: center;
    line-height: 100%;
    padding-left: 7%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 120%;
    padding-top: 2%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  /*轮播图css*/
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  /*标题栏css*/
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
