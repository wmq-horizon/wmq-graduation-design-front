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
                                score:item.lecScore,
                                }}"> 签到页面</router-link>
            </div>
            <div class="text item">讲座编号：{{item.lecNumber}}
              <el-divider direction="vertical"></el-divider>
              量化分{{item.lecScore}}
              <el-divider direction="vertical"></el-divider>
              <el-link :href="'http://127.0.0.1:8088/api/qrCode?lecNumber='+item.lecNumber+'&score='+item.lecScore" target="_blank" type="primary">现场签到</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="reduceIntegrity(item.lecNumber)">扣诚信值</el-button>
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
                        <span v-if="scope.row.arrived===0" style="color: red">待签到</span>
                        <span v-if="scope.row.arrived===1">已签到</span>
                        <span v-if="scope.row.arrived===2" style="background-color: grey">缺席</span>
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
            reduceIntegrity(lecNumber){
                this.$axios.get("admin/reduceIntegrity?lecNumber="+lecNumber).then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        const h = this.$createElement;
                        this.$notify({
                            title: '成功！',
                            message: h('i', { style: 'color: teal'},res.data.setMessage),
                        });
                    }else{
                        const h = this.$createElement;
                        this.$notify({
                            title: '失败！',
                            message: h('i', { style: 'color: teal'},res.data.setMessage),
                    });
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
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
                this.$axios.get("admin/signedInfo").then(res => {
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
    background:rgba(67,74,80,0.5);
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
