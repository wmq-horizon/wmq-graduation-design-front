<template>
  <el-container>
    <!--      头部包括校徽和标题-->
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content" style="padding-left:3%;float: left">
          <img src="../assets/校徽.png" height="50" width="50"/>
          <img src="../assets/标题.png" height="50" width="250"/>
        </div>
      </el-col>
    </el-row>
    <el-header>
      <!--    导航菜单-->
    <homeComponent></homeComponent>
    </el-header>
    <!--    主体部分  -->
    <el-container>
      <!--          主体部分-->
      <el-main>
        <!--  走马灯-->
        <el-carousel height="200px">
          <el-carousel-item>
            <img src="../assets/11.png" height="100%" width="100%" alt=""/>
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/22.png" height="100%" width="100%" alt=""/></el-carousel-item>
          <el-carousel-item>
            <img src="../assets/33.png" height="100%" width="100%" alt=""/></el-carousel-item>
          <el-carousel-item>
            <img src="../assets/全景图.jpg" height="100%" width="100%" alt=""/></el-carousel-item>
        </el-carousel>
        <!--          讲座信息显示的地方-->
        <el-row>
          <el-col :span="16" style="padding-right: 1%">
            <el-divider content-position="left">
              <i class="el-icon-view"></i>
              <span class="lecture-text-class">   近期讲座</span></el-divider>
            <!--              <div class="grid-content bg-purple">-->
            <div>
              <!--                显示一行讲座的信息-->
              <div v-for="item of lecture.dataInfo">
                <el-row>
                  <el-col :span="12">
                    <div class="lecture-text-class"><i class="el-icon-caret-right"></i> {{item.title}}</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="lecture-class">{{item.lecDate}} | 量化分 {{item.lecScore}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-row>
                    <el-col :span="8">
                      <div class="lecture-class">{{item.speaker}} | {{item.introduction}}</div>
                    </el-col>
                    <el-col :span="5">
                      <div class="lecture-class">.</div>
                    </el-col>
                    <el-col :span="11">
                      <div class="lecture-class">{{item.lecTime}}【{{item.lecRoom}}】
                        <router-link
                          :to="{
                              path:'/classRoom',
                              query:{
                                roomNumber:item.lecRoom,
                                lecNumber:item.lecNumber,
                                time:item.lecTime,
                                date:'2020-01-01',
                                score:item.lecScore
                                }}"> 预定座位</router-link>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
              <!--                  预留作为无限滚动的显示部位-->
              <!--                  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">-->
              <!--                    <li v-for="i in count" class="infinite-list-item">{{ i }}</li>-->
              <!--                  </ul>-->
            </div>
            <el-divider content-position="left">
              <i class="el-icon-upload2"></i>
              <span class="lecture-text-class">人气讲座</span>
            </el-divider>
            <div v-for="item of lecture.dataInfo">
              <el-row>
                <el-col :span="12">
                  <div class="lecture-text-class"><i class="el-icon-caret-right"></i> {{item.title}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="lecture-class">{{item.lecTime}} | 量化分 {{item.lecScore}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="lecture-class">{{item.speaker}} | {{item.introduction}}</div>
                </el-col>
                <el-col :span="8">
                  <div class="lecture-class">.</div>
                </el-col>
                <el-col :span="8">
                  <div class="lecture-class">【{{item.lecRoom}}】
                    <router-link to="/classRoom"> 预定座位</router-link>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-divider content-position="left">
              <i class="el-icon-date"></i><span class="lecture-text-class"></span>往期回顾
            </el-divider>
            <div v-for="item of lecture.dataInfo">
              <el-row>
                <el-col :span="12">
                  <div class="lecture-text-class"><i class="el-icon-caret-right"></i> {{item.title}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="lecture-class">{{item.lecTime}} | 量化分 {{item.lecScore}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="lecture-class">{{item.speaker}} | {{item.introduction}}</div>
                </el-col>
                <el-col :span="8">
                  <div class="lecture-class">.</div>
                </el-col>
                <el-col :span="8">
                  <div class="lecture-class">【{{item.lecRoom}}】
                    <router-link to="/classRoom"> 预定座位</router-link>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
<!--          右边的两个侧栏-->
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-card class="box-card" v-if="loginStatus===null">
                <div>用户登录</div>
                <el-input v-model="userId" placeholder="用户名"></el-input>
                <el-input v-model="passWord" placeholder="密码" type="password"></el-input>
                <el-button round style="height: 45px;width: 100%" @click="loginIn">登录</el-button>
                <el-link :underline="false" style="color:#2D634E" @click="showWhoIam">重置密码</el-link>
              </el-card>
              <el-card class="box-card"  v-if=" loginStatus!==null">
<!--                <div v-for="o in 4" :key="o" class="text item">-->
<!--                  {{'列表内容 ' + o }}-->
<!--                </div>-->
<!--                <span>欢迎光临</span>-->
                <div class="wow pulse" data-wow-duration="2s" data-wow-iteration="3" v-for="fit in fits" :key="fit">
                  <el-image
                    style="width: 350px; height: 250px"
                    :src="url"
                    :fit="fit"></el-image>
                </div>
              </el-card>
<!--              其他讲座的连接入口-->
              <el-card class="box-card">
                <div slot="header">
                  <span style="text-align: left">外校讲座</span>
                </div>
                <div>
                  <el-link :underline="false" style="color:#2D634E" href="https://lib.xmu.edu.cn/lecture/">
                    厦门大学讲座报名入口
                  </el-link>
                </div>
                <div>
                  <el-link :underline="false" style="color:#2D634E" href="http://lib.scu.edu.cn/lecture_detail_list">
                    四川大学讲座信息查看
                  </el-link>
                </div>
                <div>
                  <el-link :underline="false" style="color:#2D634E" href="http://202.115.193.40/lrs/Default.aspx">
                    四川师范大学图书馆讲座预约
                  </el-link>
                </div>
                <div>
                  <el-link :underline="false" style="color:#2D634E"
                           href="https://lib.tsinghua.edu.cn/service/workshop.html">清华大学图书馆讲座信息
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
    import {WOW} from 'wowjs'
    import 'animate.css'
    import loginIn from "./adminViews/loginIn";
    export default {
        name: "FirstPage",
        data() {
            return {
                fits: ['fill'],
                url: 'https://uploadfile.bizhizu.cn/2017/0318/20170318102106585.jpg',
                loginStatus:sessionStorage.getItem("status"),
                userId:'',
                passWord:'',
                count: 6,
                // 从后台获取的一个讲座的信息
                lecture: {
                    message: '',
                    code: 0,
                    dataInfo: [{
                        'lecNumber': '',
                        'lecRoom': '',
                        'lecScore': '',
                        'letDate':'',
                        'lecTime': '',
                        'speaker': '',
                        'title': '',
                        'content': '',
                    }]
                },
                seat:{
                    seat_message:'',
                    seat_code:'',
                    room_name:'',
                    row_count:0,
                    col_count:0
                }
            }
        },
        methods: {
            showWhoIam(){
                this.$axios.get("student/hello").then(res=>{
                    console.log(res);
                    console.log("show me")

                }).catch(err=>{});
            },

            logOut(){
                this.$axios.get("/user/logOut").then(res=>{
                    console.log("logout");
                    console.log(res);
                }).catch(err=>{console.log(err)});
            },
            loginIn() {
                this.$axios.post("/user/login", {
                    uid: this.userId,
                    password: this.passWord,
                    role:'student'
            }).then(res => {
                    console.log(res);
                    //为了slice方法不会报错
                    if(res.data.code===200){
                        sessionStorage.setItem("session",res.data.data);
                        sessionStorage.setItem("status","true");
                        let status = sessionStorage.getItem("status").slice();
                        this.loginStatus = status;
                        console.log("status:"+sessionStorage.getItem("status"));
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
            console.log("this.loginStatus:" +this.loginStatus);
            this.$axios.get('/student/home').then(res => {
                this.lecture.message = res.data.message;
                this.lecture.code = res.data.code;
                this.lecture.dataInfo = res.data.data;
            }).catch(err => {
                console.log(err)
            })

        },//created
        mounted(){
            let options={live:false};
            let wow=new WOW(options);
            wow.init();
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
    margin-top: 10%;
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
    line-height: 100px;
  }

  .el-main {
    padding-right: 6%;
    padding-left: 6%;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 40px;
    padding-top: 0;
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
</style>
