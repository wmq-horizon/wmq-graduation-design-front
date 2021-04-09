<template>
  <div>
    <headerBar></headerBar>
    <div>
      <el-col :span="4">
        <menuComponent></menuComponent>
      </el-col>
      <el-col :span="20">
        <div v-for=" (item,index) in lecture" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix title">
              <span>{{item.title}}</span>
            </div>
            <!--              内容简介-->
            <div class="text item">{{item.lecDate}}
              <el-divider direction="vertical"></el-divider>
              {{item.lecTime}}
              <el-divider direction="vertical"></el-divider>
              地点：{{item.lecRoom}}
              <el-divider direction="vertical"></el-divider>
              <router-link
                :to="{
                              path:'/signPage',
                              query:{
                                lecName:item.title,
                                lecNumber:item.lecNumber,
                                }}"> 签到页面</router-link>
            </div>

            <div class="text item">讲座编号：{{item.lecNumber}}
              <el-divider direction="vertical"></el-divider>
              量化分{{item.lecScore}}
              <el-divider direction="vertical"></el-divider>
              <el-link :href="'http://127.0.0.1:8088/api/admin/qrCode?lecName='+item.title+'&lecNumber='+item.lecNumber" target="_blank" type="primary">现场签到</el-link>
            </div>
            <div class="text item">讲师：{{item.speaker}},{{item.introduction}}</div>
            <div class="text item">{{item.content}}</div>
<!--            尝试使用折叠面板渲染页面-->
            <el-collapse  @change="handleChange(item.lecNumber,item.title)">
              <el-collapse-item title="查看预约订座学生名单" >
                <div>
                  <el-table
                    :data="lectureBookers"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                      prop="stuNumber"
                      label="学号">
                    </el-table-column>
                    <el-table-column
                      prop="roomNumber"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="rrow"
                      label="座位行号">
                    </el-table-column>
                    <el-table-column
                      prop="collumn"
                      label="座位列号">
                    </el-table-column>
                    <el-table-column
                      prop="integrity"
                      label="诚信值">
                    </el-table-column>
                    <el-table-column
                      prop="score"
                      label="累计量化分">
                    </el-table-column>
                    <el-table-column
                      label="是否签到">
                      <template slot-scope="scope">
                        <span v-if="scope.row.arrived===0">待签到</span>
                        <span v-if="scope.row.arrived===1">已签到</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
    export default {
        name: "personalInfo",
        data() {
            return {
                datedStudent:false,
                datedStuLecNumber:'',
                datedStuLecTitle:'',
                lectureBookers:[{

                }],
                lecture: [{
                    content: '',
                    introduction: '',
                    lecDate: '',
                    lecNumber: '',
                    lecRoom: '',
                    lecScore: '',
                    lecTime: '',
                    speaker: '',
                    title: '',
                }],
            }
        },
        methods: {
            // 带状态表格的处理
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            getTodayLecture() {
                this.$axios.get("admin/getLectureOfToday?lecDate=2021-02-18").then(res => {
                    console.log("查询今天召开的讲座");
                    this.lecture = res.data.data;
                    console.log(this.lecture);
                }).catch(err => {
                    console.log(err);
                })
            },
            handleChange(lecNumber,title){
                console.log(lecNumber);
                console.log(title);
                this.$axios.get("/admin/lectureBookers?lecNumber="+lecNumber).then(res=>{
                    console.log(res);
                    console.log(res);
                    this.lectureBookers = res.data.data;
                    console.log("lectureBookers");
                    console.log(this.lectureBookers);
                }).catch(err=>{console.log(err)});
            }
        },
        created() {
            this.getTodayLecture();
        },
        mounted() {
        }
    }
</script>

<style scoped>
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
