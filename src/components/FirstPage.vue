<template>
  <el-container>
    <!--      头部-->
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
        background-color="#2D634E"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">学生中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">发布讲座</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">宣讲室</el-menu-item>
        <el-menu-item index="4"><a href="" target="_blank">首页</a></el-menu-item>
      </el-menu>

    </el-header>
    <el-container>
      <!--        <el-aside width="200px">Aside</el-aside>-->
      <el-container>
        <!--          主体部分-->
        <el-main>
          <!--  走马灯-->
          <el-carousel height="300px">
            <!--              <el-carousel-item v-for="item in 4" :key="item">-->
            <!--                <h3 class="small">{{ item }}</h3>-->
            <!--              </el-carousel-item>-->
            <el-carousel-item>

              <img src="../assets/11.png" height="100%" width="100%"/>
            </el-carousel-item>
            <el-carousel-item>

              <img src="../assets/22.png" height="100%" width="100%"/></el-carousel-item>
            <el-carousel-item>

              <img src="../assets/33.png" height="100%" width="100%"/></el-carousel-item>
            <el-carousel-item>

              <img src="../assets/全景图.jpg" height="100%" width="100%"/></el-carousel-item>
          </el-carousel>


          <el-row>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <div>__________________________________________________________</div>
                <div>
                  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                    <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
                  </ul>
                </div>
              </div>
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
        <el-footer>Footer</el-footer>
      </el-container>
      <!--        <el-aside width="200px">Aside</el-aside>-->

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
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            load () {
                this.count += 0
            },
            //加载界面的时候从后端获取数据
            created(){
                this.axios.get('home/first').then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            },

    },}
</script>


<style scoped>
  /*登录卡片内容*/
  .text {
    font-size: 14px;
  }

  /*.item {*/
  /*  padding: 5px 0;*/
  /*}*/

  .box-card {
    width: 100%;
    margin-top: 3%;
  }

  /*整体布局*/
  .el-header {
    /*background-color: #B3C0D1;*/
    /*color: #333;*/
    text-align: center;
    float: left;
    line-height: 3%;
    width: 100%;
    padding: 0;
    font-size: x-small;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    float: left;
    line-height: 3%;
    width: 100%;
    padding: 0;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    padding-right: 15%;
    padding-left: 15%;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  /*导航栏菜单*/
  .el-menu {
    padding-right: 10%;
  }

  .el-menu-item {

    float: right;
  }

  .el-submenu {

    float: right;
  }

  /*轮播图css*/
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
