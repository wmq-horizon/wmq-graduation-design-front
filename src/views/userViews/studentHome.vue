<template>
  <el-container>
    <vue-canvas-nest :config="{color:'0,96,128 ', count: 800}" :el="'#area'">
    </vue-canvas-nest>
    <el-header>
      <!--    导航菜单-->
      <homeComponent></homeComponent>
    </el-header>
    <el-container id="area">
        <el-aside >
          <el-card class="box-card">
            <div><span style="font-weight:bold;">我的信息</span></div>
            <el-divider></el-divider>
            <div><span>学号：{{user.uid}}</span></div>
            <el-divider></el-divider>
            <div><span>昵称：{{user.name}}</span></div>
            <el-divider></el-divider>
            <div><span>诚信值：{{user.integrity}}</span></div>
            <el-divider></el-divider>
            <div><span>量化分：{{user.score}}</span></div>
            <el-divider></el-divider>
            <div><span>修改密码</span></div>
            <el-divider></el-divider>
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
                量化分{{item.score}}
              </div>
              <div class="text item">讲师：{{item.speaker}},{{item.introduction}}</div>
              <div class="text item">{{item.content}}</div>
              <div class="text item">
                <div v-if="item.commented===0">
                  <el-collapse>
                    <el-collapse-item title="写评价">
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="写下您的心得或者建议"
                        v-model="item.comments">
                      </el-input>
                        <el-button type="text" @click="doComment(item.comments,item.title)" style="float:right">提交</el-button>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                <div v-if="item.commented===1">
                  <span>已评价</span><br>
                  <span> {{item.comments}}</span>
                </div>
              </div>
            </el-card>
          </div>
        </el-main>
    </el-container>
    <foots></foots>
  </el-container>
</template>
<script>
    import {WOW} from 'wowjs'
    import 'animate.css'
    import vueCanvasNest from 'vue-canvas-nest'
    export default {
        name: "student_home",
        components: {vueCanvasNest},
        data(){
            return{
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
                }],
                // comments:'',
            }
        },
        methods:{
            // moreComments(title){
            //   this.$axios.get("student/getMoreComments?title="+title).then(res=>{
            //       console.log(res);
            //   }).catch(err=>{
            //       console.log(err);
            //   })
            // },

            doComment(comments,title){
                this.$axios.put("student/doComment",{
                    stuNumber:this.user.uid,
                    title:title,
                    comments:comments,
                    lecNumber:"lecNumber"
                }).then(res=>{
                    // 评价成功之后修改前端页面
                    console.log(res);
                }).catch(err=>{
                  console.log(err);
                })
            },
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
    line-height: 2%;
    /*width: 100%;*/
    /*padding: 0;*/
    /*margin-bottom: 100px;*/
    /*font-size: x-small;*/
  }

  .el-aside .box-card{
    text-align: center;
    line-height: 100%;
    background: rgba(0,96,128,0.3);
    position: fixed;
    box-shadow: 7px 7px 4px #888;
  }

  #area{
    padding: 50px 100px 30px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 2%;
    text-align: left;
  }

  .title {
    background: rgba(0,96,128,0.1);
    font-size: 20px;
    color: black;
    border-radius: 5px;
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
    margin-bottom: 3%;
  }
</style>
