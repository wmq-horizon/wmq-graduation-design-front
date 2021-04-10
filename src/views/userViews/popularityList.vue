<template>
  <el-container>
    <vue-canvas-nest :config="{color:'0,96,128 ', count: 800}" :el="'#area'">
    </vue-canvas-nest>
    <el-header>
      <!--    导航菜单-->
      <homeComponent></homeComponent>
    </el-header>
    <el-main id="area">
      <!--    1-->
      <el-row>
        <el-col :span="12">
          <el-card class="box-card wow fadeIn chartItem" data-wow-duration="4">
            <div id="topScoreStudent" style="width: 600px;height: 450px;float:left"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="text-card wow fadeIn chartItem" data-wow-duration="4">

          </el-card>
        </el-col>
      </el-row>
      <!--    2-->
      <el-row>
        <el-col :span="12">
          <el-card class="text-card-left wow fadeIn chartItem" data-wow-duration="4">
          </el-card>
        </el-col>
        <el-col :span="12">
          <div>
            <el-card class="wow fadeInUp chartItem box-card" data-wow-duration="4">
              <div id="topIntegrityStudent" style="width: 600px;height: 400px;float:left"></div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <!--    3-->
      <el-row>

        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div>
              <el-card class="wow fadeInUp chartItem box-card" data-wow-duration="4">
                <div id="topRoomChart" style="width: 600px;height: 450px;float:left"></div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-card class="text-card wow fadeIn chartItem" data-wow-duration="4">

            </el-card>
          </div>
        </el-col>
      </el-row>
      <!--    4-->
      <el-row>
        <el-col :span="12">
          <el-card class="text-card-left wow fadeIn chartItem" data-wow-duration="4">

          </el-card>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div>
              <el-card class="wow fadeInUp chartItem box-card" data-wow-duration="4">
                <div id="barChart" style="width: 600px;height: 400px;float:left"></div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--    5-->
      <el-row>

        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div>
              <el-card class="wow fadeInUp chartItem box-card" data-wow-duration="4">
                <div id="pieChart" style="width: 600px;height: 400px;float:left"></div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <el-card class="text-card wow fadeIn chartItem" data-wow-duration="4">

          </el-card>
        </el-col>
      </el-row>
      <!--    6-->
      <el-row>
        <el-col :span="12">
          <el-card class="text-card-left wow fadeIn chartItem" data-wow-duration="4">
          </el-card>
        </el-col>
        <el-col :span="12">
          <div>
            <el-card class="wow fadeInUp chartItem box-card" data-wow-duration="4">
              <div id="topStudent" style="width: 600px;height: 400px;float:left"></div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <foots></foots>
  </el-container>
</template>
<script>
    import {WOW} from 'wowjs'
    import 'animate.css'
    import vueCanvasNest from 'vue-canvas-nest'

    export default {
        name: "popularityList",
        components: {vueCanvasNest},
        data() {
            return {}
        },
        methods: {
            getTopStudent() {
                let names = [];
                let stuNumbers = [];
                let stuCount = [];
                let topStudentChart = this.$echarts.init(document.getElementById('topStudent'));
                this.$axios.get("student/getTopStudent").then(res => {
                    console.log("get/topStudent");
                    console.log(res);
                    for (let i = 0; i < res.data.data.length; i++) {
                        names.push(res.data.data[i].name);
                        stuNumbers.push(res.data.data[i].stuNumber);
                        stuCount.push(res.data.data[i].stuCount);
                    }
                    // 查询预定讲座次数最多的10名学生并且排序
                    let option = {
                        title: {
                            text: '勤奋学生榜',
                            subtext: '参加讲座次数最多的10名学生',
                            left: 'center'
                        },
                        color:'#006080',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: names
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: stuCount,
                            type: 'bar',
                        }]
                    };
                    topStudentChart.setOption(option);
                }).catch(err => {
                    console.log(err)
                });

            },
            getTopScoreStudent() {
                let names = [];
                let scores = [];
                let topScoreStudent = this.$echarts.init(document.getElementById('topScoreStudent'));
                this.$axios.get("student/topScoreUser").then(res => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        names.push(res.data.data[i].name);
                        scores.push(res.data.data[i].score);
                    }
                    let option = {
                        title: {
                            text: '量化分最多的10名学生',
                            subtext: '分析量化分最多的10名学生',
                            left: 'left'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        angleAxis: {
                            type: 'category',
                            data: names,
                        },
                        radiusAxis: {},
                        polar: {},
                        series: [{
                            color: '#006080',
                            type: 'bar',
                            data: scores,
                            coordinateSystem: 'polar',
                            name: '分数',
                            stack: '分数',
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
                }).catch(err => {
                    console.log(err);
                })
            },
            getTopIntegrityStudent() {
                let names = [];
                let integrities = [];
                let topIntegrityStudent = this.$echarts.init(document.getElementById('topIntegrityStudent'));
                this.$axios.get('student/topIntegrityUser').then(res => {
                    console.log(res);
                    for (let i = 0; i < res.data.data.length; i++) {
                        names.push(res.data.data[i].name);
                        integrities.push(res.data.data[i].integrity);
                    }
                    let option = {
                        title: {
                            text: '诚信学生',
                            subtext: '分析诚信值最高的10名学生',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
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
                }).catch(err => {
                    console.log(err);
                });
            },
            getTopLecture() {
                let barChart = this.$echarts.init(document.getElementById('barChart'));
                var titles = [];
                var lecNumbers = [];
                var counts = [];
                this.$axios.get("/student/getTopLecture").then(res => {
                    console.log("res");
                    console.log(res);
                    for (let i = 0; i < res.data.data.length; i++) {
                        titles.push(res.data.data[i].title);
                        lecNumbers.push(res.data.data[i].lecNumber);
                        counts.push(res.data.data[i].totalLecture);
                    }
                    console.log(res.data.data);
                    let option = {
                        title: {
                            text: '预约次数最多的10个讲座:单位/个）',
                        },
                        color:'#006080',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: lecNumbers
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: counts,
                            type: 'bar'
                        }]
                    };
                    barChart.setOption(option);
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            },
            getTopSpeakers() {
                let data = [];
                let itemMap = {
                    value: 0,
                    name: '',
                };
                let pieChart = this.$echarts.init(document.getElementById('pieChart'));
                this.$axios.get("student/getTopThreeSpeaker").then(res => {
                    console.log(res);
                    for (let i = 0; i < res.data.data.length; i++) {
                        console.log("itemMap");
                        itemMap.name = res.data.data[i].speaker;
                        itemMap.value = res.data.data[i].totalLecture;
                        data.push({name: res.data.data[i].speaker, value: res.data.data[i].totalLecture});
                        console.log(itemMap);
                    }
                    console.log("data");
                    console.log(data);
                    let option = {
                        title: {
                            text: '演讲者气度',
                            subtext: '分析最受欢迎的讲师的前三位',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                        },
                        series: [
                            {
                                name: '人气占比',
                                type: 'pie',
                                radius: '50%',
                                data: data,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    pieChart.setOption(option);
                }).catch(err => {
                    console.log(err);
                });
            },
            getTopRoom() {
                let topRoomChart = this.$echarts.init(document.getElementById('topRoomChart'));
                let names = [];
                let values = [];
                this.$axios.get("/student/topRoom").then(res => {
                    console.log(res);
                    let option = {
                        title: {
                            text: '使用次数最多的宣讲室',
                            subtext: '分析使用最多的宣讲室的第一名和第二名',
                            // left: 'center'
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        series: [{
                            type: 'treemap',
                            data: [{
                                name: res.data.data[0].roomNumber,            // First tree
                                value: res.data.data[0].roomCount,

                            }, {
                                name: res.data.data[1].roomNumber,            // Second tree
                                value: res.data.data[1].roomCount,
                            }]
                        }]
                    };
                    topRoomChart.setOption(option);
                    console.log(res);

                }).catch(err => {
                    console.log(err);
                });
            }
        },
        created() {
        },
        mounted() {
            this.getTopStudent();
            this.getTopScoreStudent();
            this.getTopIntegrityStudent();
            this.getTopLecture();
            this.getTopSpeakers();
            this.getTopRoom();
            let options = {live: false};
            let wow = new WOW(options);
            wow.init();
        },

    }
</script>

<style scoped>

  .el-row {
    margin: 50px 50px 100px;
  }

  .chartItem {
    margin-top: 10%;
  }

  .text-card {
    width: 70%;
    height: 450px;
    border-radius: 30px;
    margin: auto auto auto 0;
    box-shadow: 7px 7px 4px #888;
  }

  .text-card-left {
    width: 70%;
    height: 450px;
    border-radius: 30px;
    margin: auto 0 auto auto;

    box-shadow:2px 5px 1px   #888;
  }

  .box-card {
    width: 100%;
    height: 450px;
    margin: auto;
    background: rgba(0, 96, 128, 0.05);
    box-shadow: 7px 7px 4px #888;
  }

  body > .el-container {
    margin-bottom: 40px;

  }


  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }

</style>
