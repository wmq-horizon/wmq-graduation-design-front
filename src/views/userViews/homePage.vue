<template>
  <el-container>
    <vue-canvas-nest :config="{color:'0,96,128 ', count: 800}" :el="'#area'">
    </vue-canvas-nest>
    <el-header>
      <!--    导航菜单-->
      <homeComponent></homeComponent>
    </el-header>
    <el-container>
      <el-main id="area">
        <el-row>
          <el-col :span="16" style="padding-right: 1%">
              <div v-for=" (item,index) in lecture.dataInfo" :key="index">
                <el-card class="box-card  login_box">
                    <div slot="header" class="clearfix title">
                      <span>{{item.title}}</span>
                    </div>
                    <!--              内容简介-->
                    <div class="item">{{item.lecDate}}
                      <el-divider direction="vertical"></el-divider>
                      {{item.lecTime}}
                      <el-divider direction="vertical"></el-divider>
                      地点：{{item.lecRoom}}
                      <el-divider direction="vertical"></el-divider>
                      <router-link
                        :to="{
                              path:'/classRoom',
                              query:{
                                roomName:item.lecRoom,
                                lecNumber:item.lecNumber,
                                time:item.lecTime,
                                date:item.lecDate,
                                score:item.lecScore,
                                lecTitle:item.title,
                                }}"> 预约订座</router-link>
                    </div>

                    <div class="item">讲座编号：{{item.lecNumber}}
                      <el-divider direction="vertical"></el-divider>
                      量化分{{item.lecScore}}
                    </div>
                    <div class="item">讲师：{{item.speaker}},{{item.introduction}}</div>
                    <div class="item">{{item.content}}</div>
                </el-card>
              </div>
          </el-col>

          <!--          右边的两个侧栏-->
          <el-col :span="8">
            <div class="grid-content">
              <el-card class="box-card" v-if="loginStatus===null">
                <div>用户登录</div>
                <el-input placeholder="用户名" v-model="userId"></el-input>
                <el-input placeholder="密码" type="password" v-model="passWord"></el-input>
                <el-button @click="loginIn" round style="height: 45px;width: 100%">登录</el-button>
<!--                <el-link :underline="false" @click="showWhoIam" style="color:#2D634E">重置密码</el-link>-->
              </el-card>
              <el-card class="box-card" v-if=" loginStatus!==null">
                <div  class="wow pulse logOut" data-wow-duration="2s" data-wow-iteration="3">
                  <div>欢迎您！</div>
                  <div>{{this.uid}}</div>
                  <el-button @click="logOut" href="/home" type="text" style="color: white;font-size: medium">退出登录</el-button>
                </div>
              </el-card>
              <!--              其他讲座的连接入口-->
              <el-card class="box-card">
                <div slot="header">
                  <span style="text-align: left">外校讲座</span>
                </div>
                <div>
                  <el-link :underline="false" href="https://lib.xmu.edu.cn/lecture/" style="color:#2D634E">
                    厦门大学讲座报名入口
                  </el-link>
                </div>
                <div>
                  <el-link :underline="false" href="http://lib.scu.edu.cn/lecture_detail_list" style="color:#2D634E">
                    四川大学讲座信息查看
                  </el-link>
                </div>
                <div>
                  <el-link :underline="false" href="http://202.115.193.40/lrs/Default.aspx" style="color:#2D634E">
                    四川师范大学图书馆讲座预约
                  </el-link>
                </div>
                <div>
                  <el-link :underline="false" href="https://lib.tsinghua.edu.cn/service/workshop.html"
                           style="color:#2D634E">清华大学图书馆讲座信息
                  </el-link>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <foots></foots>
  </el-container>

</template>

<script>
    import vueCanvasNest from 'vue-canvas-nest'
    import {WOW} from 'wowjs'
    import 'animate.css'
    export default {
        name: "FirstPage",
        components: {vueCanvasNest},
        data() {
            return {
                loginStatus: sessionStorage.getItem("status"),
                userId: '',
                passWord: '',
                count: 6,
                uid:sessionStorage.getItem("session"),
                // 从后台获取的一个讲座的信息
                lecture: {
                    message: '',
                    code: 0,
                    dataInfo: [{
                        lecNumber: '',
                        lecRoom: '',
                        lecScore: '',
                        letDate: '',
                        lecTime: '',
                        speaker: '',
                        title: '',
                        content: '',
                        stuNumber: this.uid,
                    }]
                },
                seat: {
                    seat_message: '',
                    seat_code: '',
                    room_name: '',
                    row_count: 0,
                    col_count: 0
                }
            }
        },
        methods: {
            showWhoIam() {
                this.$axios.get("student/hello").then(res => {
                    console.log(res);
                    console.log("show me")

                }).catch(err => {
                });
            },

            logOut(){
                sessionStorage.removeItem("session");
                sessionStorage.removeItem("status");
                window.location.href='/home';
                this.$axios.get("/logOut").then(res=>{
                    console.log("logout");
                    console.log(res);
                }).catch(err=>{console.log(err)});
            },
            loginIn() {
                console.log(this.$md5(this.passWord));
                this.$axios.post("/login", {
                    uid: this.userId,
                    password: this.$md5(this.passWord),
                    role: 'student'
                }).then(res => {
                    console.log(res);
                    //为了slice方法不会报错
                    if (res.data.code === 200) {
                        sessionStorage.setItem("session", res.data.data);
                        sessionStorage.setItem("status", "true");
                        let status = sessionStorage.getItem("status").slice();
                        this.loginStatus = status;
                        let uid = sessionStorage.getItem("session").slice();
                        this.uid = uid;
                        console.log("status:" + sessionStorage.getItem("status"));
                    }
                    console.log(res.data.data);
                }).catch(err => {
                    console.log(err)
                })
            },
            load() {
                this.count += 0
            },
            //加载界面的时候从后端获取数据
        },
        created() {
            this.loginStatus = sessionStorage.getItem("status");
            console.log("this.loginStatus:" + this.loginStatus);
            this.$axios.get('/student/home').then(res => {
                this.lecture.message = res.data.message;
                this.lecture.code = res.data.code;
                this.lecture.dataInfo = res.data.data;
            }).catch(err => {
                console.log(err)
            })

        },//created
        mounted() {
            let options = {live: false};
            let wow = new WOW(options);
            wow.init();
        }
    }
</script>

<style scoped>
  .lecture-class {
    background: white;
    font-size: 16px;
  }

  .lecture-text-class {
    font-size: 16px;
    font-weight: bold;
  }

  /*登录卡片内容*/
  .box-card {
    position: relative;
    width: 100%;
    margin-bottom: 50px;
  }

  .box-card .el-input{
    margin-bottom: 1%;

  }

  .el-main {
    padding-right: 6%;
    padding-left: 6%;
    color: #333;
    text-align: center;
    line-height: 40px;
  }
  .item {
    font-size: 14px;
    text-align: left;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 50px;
    margin-left: 10%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .el-row{
    margin-top:3%;}

  .login_box{
    border-radius:40px;
    box-shadow: 10px 10px 5px #888;
    margin-right: 10%;
    background:rgba(0,96,128,0.1);
  }
  .login_box:hover{
    -webkit-transform: scale(1.02, 1.02);
    /* Safari */
    -ms-transform: scale(1.02, 1.02);
    /* IE 9 */
    transform: scale(1.02, 1.02);
  }
  .logOut {
    background: url("../../assets/sea3.jpg");
    background-size: cover;
    width: 320px;
    height: 250px;
    color: white;
    transition: transform 0.5s ease;
    margin: auto;
  }

  .logOut:hover{
    -webkit-transform: scale(1.02, 1.02);
    /* Safari */
    -ms-transform: scale(1.02, 1.02);
    /* IE 9 */
    transform: scale(1.02, 1.02);
  }

</style>
