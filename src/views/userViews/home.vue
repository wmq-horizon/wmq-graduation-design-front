<template>
  <el-container>
    <vue-canvas-nest :config="{color:'0,96,128 ', count: 800}" :el="'#area'">
    </vue-canvas-nest>
    <el-header>
      <!--    导航菜单-->
      <homeComponent></homeComponent>
    </el-header>
    <!--    主体部分  -->
    <el-container>
      <!--          主体部分-->
      <el-main id="area">
        <el-row>
          <el-col :span="8" style="padding-right: 1%">
            <el-card>
              <div class="imgbox">
                <el-image
                  :fits="fits"
                  :src="require('../../assets/sea1.jpg')"
                  style="width: 330px; height: 520px;"></el-image>
                <a href="/homePage">
                  <div class="mask">
                    <span class="text" style="font-size: 18px">近期讲座<br></span>
                    <span class="text"><br>学海无涯，徜徉在知识的海洋</span>
                  </div>
                </a>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="padding-right: 1%">
            <el-card>
              <div class="imgbox">
                <el-image
                  :fits="fits"
                  :src="require('../../assets/sea2.jpg')"
                  style="width: 330px; height: 520px"></el-image>
                <a href="/popularityList">
                  <div class="mask">
                    <span class="text" style="font-size: 18px">数据分析<br></span>
                    <span class="text"><br>查看数据分析</span>
                  </div>
                </a>
              </div>
            </el-card>
          </el-col>
          <!--          右边的两个侧栏-->
          <el-col :span="8">
            <div class="grid-content">
              <el-card class="box-card" v-if="loginStatus===null">
                <div>用户登录</div>
                <el-input placeholder="用户名" v-model="userId"></el-input>
                <el-input placeholder="密码" type="password" v-model="passWord"></el-input>
                <el-button @click="loginIn" round style="height: 45px;width: 100%">登录</el-button>
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
                    <span class="links">厦门大学讲座报名入口</span>
                  </el-link>
                </div>
                <div>
                  <el-link :underline="false" href="http://lib.scu.edu.cn/lecture_detail_list" style="color:#2D634E">
                    <span class="links">四川大学讲座信息查看</span>
                  </el-link>
                </div>
                <div>
                  <el-link :underline="false" href="http://202.115.193.40/lrs/Default.aspx" style="color:#2D634E">
                    <span class="links">四川师范大学图书馆讲座预约</span>
                  </el-link>
                </div>
                <div>
                  <el-link :underline="false" href="https://lib.tsinghua.edu.cn/service/workshop.html"
                           style="color:#2D634E"><span class="links">清华大学图书馆讲座信息</span>
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
                fits: ['fill'],
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
                        sessionStorage.setItem("role", "student");
                        let status = sessionStorage.getItem("status").slice();
                        this.loginStatus = status;
                        console.log("status:" + sessionStorage.getItem("status"));
                        const h = this.$createElement;
                        this.$notify({
                            title: '登录成功',
                            message: h('i', { style: 'color: teal'}, '欢迎您！')
                        });
                    }else{
                        const h = this.$createElement;
                        this.$notify({
                            title: '登录失败',
                            message: h('i', { style: 'color: teal'}, res.data.setMessage)
                        });
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
  .imgbox {
    border-radius: 4px;
    position: relative;
    width: 330px;
    height: 520px;
    margin: auto;
  }

  .imgbox .el-image {
    border-radius: 4px;
    width: 330px;
    height: 520px;
    /* 转换速度 */
    transition: transform 0.5s ease;
  }

  .imgbox .mask {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    width: 330px;
    height: 520px;
    background: rgba(44, 44, 44, 0.6);
    color: #ffffff;
    opacity: 0;
    display: flex;
    font-size: 13px;
    /* 转换速度 */
    transition: transform 0.5s ease;
  }

  .mask span {
    margin: auto;
    transition: transform 0.5s ease;
  }
  .imgbox:hover .text{
    -webkit-transform: scale(1.2, 1.2) translate(0,-50px);
  }

  .imgbox:hover .mask {
    opacity: 1;
    /* 增加元素的大小*/
    -webkit-transform: scale(1.05, 1.05) ;
    /* Safari */
    -ms-transform: scale(1.05, 1.05) ;
    /* IE 9 */
    transform: scale(1.05, 1.05) ;
  }

  .imgbox:hover .el-image{
    -webkit-transform: scale(1.05, 1.05);
    /* Safari */
    -ms-transform: scale(1.05, 1.05);
    /* IE 9 */
    transform: scale(1.05, 1.05);
  }

  /*登录卡片内容*/
  .box-card {
    width: 100%;
    margin-bottom: 4%;
  }
  .el-main {
    margin-top: 3%;
    padding-right: 6%;
    padding-left: 6%;
    color: #333;
    text-align: center;
    line-height: 40px;
    padding-top: 0;
  }
  .el-row{
    margin-top:3%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }


  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }
  .box-card .el-input{
    margin-bottom: 1%;
  }
  .links:hover{
    color: #99a9bf;
  }
  .logOut {
    background: url("../../assets/sea3.jpg");
    background-size: cover;
    width: 350px;
    height: 250px;
    color: white;
    transition: transform 0.5s ease;
  }
  .logOut:hover{
    -webkit-transform: scale(1.02, 1.02);
    /* Safari */
    -ms-transform: scale(1.02, 1.02);
    /* IE 9 */
    transform: scale(1.02, 1.02);
  }
</style>
