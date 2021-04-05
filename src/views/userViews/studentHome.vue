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
        </el-aside>
        <el-main>
          <div v-for=" (item,index) in lectures" :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix title">
                <span>{{item.title}}</span>
              </div>
              <!--              内容简介-->
              <div class="text item">{{item.date}}
                <el-divider direction="vertical"></el-divider>
                {{item.time}}
                <el-divider direction="vertical"></el-divider>
                地点：{{item.lecRoom}}
                <el-divider direction="vertical"></el-divider>
              </div>
                <el-divider direction="vertical"></el-divider>
                量化分{{item.score}}
                <el-divider direction="vertical"></el-divider>
              <div class="text item">讲师：{{item.speaker}},{{item.introduction}}</div>
              <div class="text item">{{item.content}}</div>
              <div class="text item">{{item.commented}}</div>
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
    import {WOW} from 'wowjs'
    import 'animate.css'
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
                },
                lectures:[{
                    time:'',
                    date:'',
                    score:0,
                    commented:0,
                    comments:'',
                    lecRoom:'',
                    title:'',
                    speaker:'',
                    introduction:'',
                    content:'',
                }]
            }
        },
        methods:{
            getUserInfo(){
                this.$axios.get('/student/hello').then(res=>{
                    this.user = res.data.data;
                    console.log(this.user);
                    console.log(res);
                    this.lectures = res.data.data;
                    this.$axios.get('/student/participated?stuNumber='+this.user.uid).then(res=>{
                        console.log(res);
                        this.lectures = res.data.data;
                    }).catch(err=>{
                        console.log(err);
                    });
                }).catch(err=>{
                    console.log(err);
                });


            }
        },

        mounted() {
            this.getUserInfo();
            let options={live:false};
            let wow=new WOW(options);
            wow.init();
        }
    }
</script>

<style scoped>

  /*整体布局*/
  .el-header {
    text-align: center;
    float: left;
    line-height: 3%;
    width: 100%;
    padding: 0;
    font-size: x-small;
  }

  .el-aside {
    text-align: center;
    line-height: 100%;
    padding-left: 7%;
  }
  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    text-align: left;
  }

  .title {
    background-color: #B3CCB6;
    font-size: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-left: 3%;
    margin-right: 3%;
    margin-top: 1%;
  }
</style>
