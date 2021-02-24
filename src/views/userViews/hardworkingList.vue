<template>
  <el-container>
    <!--      头部包括校徽和标题-->
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content" style="padding-left:3%;float: left">
          <img src="../../assets/校徽.png" height="50" width="50"/>
          <img src="../../assets/标题.png" height="50" width="250"/>
        </div>
      </el-col>
    </el-row>
    <el-header>
      <!--    导航菜单-->
      <homeComponent></homeComponent>
    </el-header>
    <el-container>
      <div id="topStudent" style="width: 600px;height: 400px"></div>
      <div id="topScoreStudent" style="width: 600px;height: 400px"></div>
      <div id="topIntegrityStudent" style="width: 800px;height: 600px"></div>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "hardworkingList",
        methods:{
            getTopStudent(){
                let names = [];
                let stuNumbers = [];
                let stuCount = [];
                let topStudentChart = this.$echarts.init(document.getElementById('topStudent'));
                this.$axios.get("student/getTopStudent").then(res=>{
                    console.log("get/topStudent");
                    console.log(res);
                    for(let i = 0;i<res.data.data.length;i++){
                        names.push(res.data.data[i].name);
                        stuNumbers.push(res.data.data[i].stuNumber);
                        stuCount.push(res.data.data[i].stuCount);
                    }
                    // 查询预定讲座次数最多的10名学生并且排序
                    let option = {
                        xAxis: {
                            type: 'category',
                            data: names
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data:stuCount,
                            type: 'bar',
                        }]
                    };
                    topStudentChart.setOption(option);
                }).catch(err=>{
                    console.log(err)
                });

            },
            getTopScoreStudent(){
                let names = [];
                let scores = [];
                let topScoreStudent = this.$echarts.init(document.getElementById('topScoreStudent'));
                this.$axios.get("student/topScoreUser").then(res=>{
                    for(let i = 0;i<res.data.data.length;i++){
                        names.push(res.data.data[i].name);
                        scores.push(res.data.data[i].score);
                    }
                    let option = {
                        angleAxis: {
                            type: 'category',
                            data: names,
                        },
                        radiusAxis: {
                        },
                        polar: {
                        },
                        series: [{
                            type: 'bar',
                            data:scores,
                            coordinateSystem: 'polar',
                            name: 'A',
                            stack: 'a',
                            emphasis: {
                                focus: 'series'
                            }
                        }, {
                            type: 'bar',
                            data: [2, 4, 6, 1, 3, 2, 1],
                            coordinateSystem: 'polar',
                            name: 'B',
                            stack: 'a',
                            emphasis: {
                                focus: 'series'
                            }
                        }, {
                            type: 'bar',
                            data: [1, 2, 3, 4, 1, 2, 5],
                            coordinateSystem: 'polar',
                            name: 'C',
                            stack: 'a',
                            emphasis: {
                                focus: 'series'
                            }
                        }],
                        legend: {
                            show: true,
                            data: ['A', 'B', 'C']
                        }
                    };
                    topScoreStudent.setOption(option);
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            },
            getTopIntegrityStudent(){
                let names = [];
                let integrities = [];
                let topIntegrityStudent = this.$echarts.init(document.getElementById('topIntegrityStudent'));
                this.$axios.get('student/topIntegrityUser').then(res=>{
                    console.log(res);
                    for(let i = 0;i <res.data.data.length;i++){
                        names.push(res.data.data[i].name);
                        integrities.push(res.data.data[i].integrity);
                    }
                   let option = {
                        xAxis: {
                            type: 'category',
                            data: names,
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: integrities,
                            type: 'line',
                        }]
                    };
                    topIntegrityStudent.setOption(option);
                }).catch(err=>{
                    console.log(err);
                });
            },
        },
        mounted(){
            this.getTopStudent();
            this.getTopScoreStudent();
            this.getTopIntegrityStudent();
        },
    }
</script>

<style scoped>
  #myCharts{
    background-color: #B3CCB6;
  }
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
