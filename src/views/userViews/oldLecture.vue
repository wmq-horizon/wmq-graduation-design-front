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
            <div v-for=" (item,index) in bookedLecture.dataInfo" :key="index">
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
        name: "oldLecture",
        components: {vueCanvasNest},
        data() {
            return {
                time:'12:00-14:00',
                date:'2021-02-18',
                // 从后台获取的一个讲座的信息
                bookedLecture: {
                    message: '',
                    code: 0,
                    dataInfo: [{
                        stuNumber:'',
                        lecNumber: '',
                        roomNumber: '',
                        title: '',
                        score: '',
                        time: '',
                        date: '',
                        speaker: '',
                        comments:'',
                        content: '',
                    }]
                },
            }
        },
        methods: {
            //加载界面的时候从后端获取数据
        },
        created() {
            this.$axios.get('/student/pastLecture?date='+this.date+'&time='+this.time).then(res => {
                console.log(res);
                this.bookedLecture.message = res.data.message;
                this.bookedLecture.code = res.data.code;
                this.bookedLecture.dataInfo = res.data.data;
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



</style>
