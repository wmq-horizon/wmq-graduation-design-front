<template>
<el-container>
  <el-header>
    <!--    导航菜单-->
    <homeComponent></homeComponent>
  </el-header>
  <el-container>
    <div class="charts">
      <div id = 'barChart' style="width:600px;height:400px" class="wow slideInLeft chartItem" data-wow-duration="4"></div>
      <div id="pieChart" style="width: 600px;height: 400px" class="wow slideInRight chartItem" data-wow-duration="4"></div>
      <div id="topRoomChart" style="width: 600px;height: 400px" class="wow slideInLeft chartItem" data-wow-duration="4"></div>
    </div>

  </el-container>
  <el-footer>
    四川师范大学 讲座信息网
  </el-footer>
  <el-footer>
    <span>联系人：王女士</span>
    <el-divider direction="vertical"></el-divider>
    <span>联系电话：15760232967 </span>
  </el-footer>

</el-container>
</template>
<script>
    import {WOW} from 'wowjs'
    import 'animate.css'
    export default {
        name: "popularityList",
        data(){
            return{

            }
        },
        methods:{
            getTopLecture(){
                let barChart = this.$echarts.init(document.getElementById('barChart'));
                var titles = [];
                var lecNumbers = [];
                var counts = [];
                this.$axios.get("/student/getTopLecture").then(res=>{
                    console.log("res");
                    console.log(res);
                    for(let i = 0;i<res.data.data.length;i++){
                        titles.push(res.data.data[i].title);
                        lecNumbers.push(res.data.data[i].lecNumber);
                        counts.push(res.data.data[i].totalLecture);
                    }
                    console.log(res.data.data);
                    let option = {
                        title: {
                            text: '最受欢迎的10个讲座:单位/个）',
                            // subtext: '分析最受欢迎的10个讲座',
                            // sublink: 'http://e.weibo.com/1341556070/AjQH99che'
                        },
                        xAxis: {
                            type: 'category',
                            data: lecNumbers
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            // data: [120, {
                            //     value: 200,
                            //     itemStyle: {
                            //         color: '#a90000'
                            //     }
                            // }, 150, 80, 70, 110, 130],
                            data: counts,
                            type: 'bar'
                        }]
                    };
                    barChart.setOption(option);
                    console.log(res)
                }).catch(err=>{console.log(err)})
            },
            getTopSpeakers(){
                let data = [];
                let itemMap={
                    value:0,
                    name:'',
                };
                let pieChart = this.$echarts.init(document.getElementById('pieChart'));
                this.$axios.get("student/getTopThreeSpeaker").then(res=>{
                    console.log(res);
                    for(let i = 0;i<res.data.data.length;i++){
                        console.log("itemMap");
                        itemMap.name = res.data.data[i].speaker;
                        itemMap.value = res.data.data[i].totalLecture;
                        data.push({name:res.data.data[i].speaker,value:res.data.data[i].totalLecture});
                        console.log(itemMap);
                    }
                    console.log("data");
                    console.log(data);
                    let option = {
                        title: {
                            text: '讲师人气度',
                            subtext: '分析最受欢迎的讲师的第一名和第二名',
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
                }).catch(err=>{
                    console.log(err);
                });
            },
            getTopRoom(){
               let topRoomChart = this.$echarts.init(document.getElementById('topRoomChart'));
               let names = [];
               let values = [];
               this.$axios.get("/student/topRoom").then(res=>{
                   console.log(res);
                   // for(let i = 0 ;i<res.data.data.length;i++){
                   //     roomNumbers.push(res.data.data[i].roomNumber);
                   //     roomCount.push(res.data.data[i].roomCount);
                   // }
                   let option = {
                       title: {
                           text: '最实用的教室',
                           subtext: '分析使用最多的教室的第一名和第二名',
                           // left: 'center'
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

               }).catch(err=>{
                   console.log(err);
               });
            }
        },
        created(){},
        mounted(){
            this.getTopLecture();
            this.getTopSpeakers();
            this.getTopRoom();
            let options={live:false};
            let wow=new WOW(options);
            wow.init();
            },

    }
</script>

<style scoped>
  .chartItem{
    margin-top: 5%;
  }
  .charts{
    margin-left: 30%;
    margin-bottom: 3%;
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
