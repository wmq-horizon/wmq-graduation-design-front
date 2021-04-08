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
            <el-card id="box-card">
              <div class="imgbox">
                <el-image
                  :fits="fits"
                  :src="require('../../assets/sea1.jpg')"
                  style="width: 350px; height: 520px"></el-image>
                <a href="/test">
                  <div class="mask">
                    <span>近期讲座</span>
                  </div>
                </a>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="padding-right: 1%">
            <div class="grid-content">
              <el-card class="box-card" v-if="loginStatus===null">
                <el-image
                  :fits="fits"
                  :src="require('../../assets/sea2.jpg')"
                  style="width: 350px; height: 520px"></el-image>
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
                <el-link :underline="false" @click="showWhoIam" style="color:#2D634E">重置密码</el-link>
              </el-card>
              <el-card class="box-card" v-if=" loginStatus!==null">
                <div :key="fit" class="wow pulse" data-wow-duration="2s" data-wow-iteration="3" v-for="fit in fits">
                  <el-image
                    :fit="fit"
                    :src="url"
                    style="width: 350px; height: 250px"></el-image>
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
      <el-footer>
        四川师范大学 讲座信息网
      </el-footer>
      <el-footer>
        <span>联系人：王女士</span>
        <el-divider direction="vertical"></el-divider>
        <span>联系电话：15760232967 </span>
      </el-footer>
    </el-container>
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
                url: 'https://uploadfile.bizhizu.cn/2017/0318/20170318102106585.jpg',
                url1: '../assets/sea1.jpg',
                url2: '../assets/sea2.jpg',
                loginStatus: sessionStorage.getItem("status"),
                userId: '',
                passWord: '',
                count: 6,
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
                        stuNumber: this.userId,
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

            logOut() {
                this.$axios.get("logOut").then(res => {
                    console.log("logout");
                    console.log(res);
                }).catch(err => {
                    console.log(err)
                });
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
  .imgbox {
    position: relative;
    width: 350px;
    height: 520px;
  }

  .imgbox .el-image {
    width: 350px;
    height: 520px;
    /* 转换速度 */
    transition: transform 0.5s ease;
  }

  .imgbox .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 350px;
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
  }

  .imgbox a:hover .mask {
    opacity: 1;
    /* 增加元素的大小*/
    -webkit-transform: scale(1.1, 1.1);
    /* Safari */
    -ms-transform: scale(1.1, 1.1);
    /* IE 9 */
    transform: scale(1.1, 1.1);
  }

  .imgbox:hover .el-image{
    -webkit-transform: scale(1.1, 1.1);
    /* Safari */
    -ms-transform: scale(1.1, 1.1);
    /* IE 9 */
    transform: scale(1.1, 1.1);
  }
  /*登录卡片内容*/
  .box-card {
    width: 100%;
  }

  .box-card:hover {
    box-shadow: #434A50;
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

  .el-main {
    margin-top: 3%;
    padding-right: 6%;
    padding-left: 6%;
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    line-height: 40px;
    padding-top: 0;
  }
  .el-row{
    margin:5%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }
</style>
