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
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">讲座大厅</el-menu-item>
        <el-submenu index="2">
          <template slot="title">人气榜</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>勤学榜</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">个人中心</a></el-menu-item>
      </el-menu>
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
                    <div class="lecture-class">{{item.lecTime}} | 量化分 {{item.lecScore}}</div>
                  </el-col>
                </el-row>
                <el-row>
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

                </el-row>

              </div>
              <!--                  预留作为无限滚动的显示部位-->
              <!--                  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">-->
              <!--                    <li v-for="i in count" class="infinite-list-item">{{ i }}</li>-->
              <!--                  </ul>-->
            </div>
            <el-divider content-position="left">
              <i class="el-icon-upload2"></i>
              <sapn class="lecture-text-class">人气讲座</sapn>
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
              <i class="el-icon-date"></i><span class="lecture-text-class" s></span>往期回顾
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
            <!--              </div>-->
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-card class="box-card">
                <div>用户登录</div>
                <el-input v-model="input" placeholder="用户名"></el-input>
                <el-input v-model="input" placeholder="密码"></el-input>
                <el-button round style="height: 45px;width: 100%">登录</el-button>
                <el-link :underline="false" style="color:#2D634E">重置密码</el-link>
              </el-card>
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
        <sapn>联系人：王女士</sapn>
        <el-divider direction="vertical"></el-divider>
        <span>联系电话：15760232967 </span>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "FirstPage",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                input: '',
                count: 6,
                // 从后台获取的一个讲座的信息
                lecture: {
                    message: '',
                    code: 0,
                    dataInfo: [{
                        'lecNumber': '',
                        'lecRoom': '',
                        'lecScore': '',
                        'lecTime': '',
                        'speaker': '',
                        'title': '',
                        'content': '',
                    }]
                }
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            load() {
                this.count += 0
            },
            //加载界面的时候从后端获取数据
        },
        created() {
            this.$axios.get('/home/first').then(res => {
                this.lecture.message = res.data.message;
                this.lecture.code = res.data.code;
                this.lecture.dataInfo = res.data.data;
                console.log(this.lecture.dataInfo);
            }).catch(err => {
                console.log(err)
            })
        },//created
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
