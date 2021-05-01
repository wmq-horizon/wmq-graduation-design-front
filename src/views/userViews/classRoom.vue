<template>
    <div>
      <vue-canvas-nest :config="{color:'0,96,128 ', count: 800}" :el="'#area'">
      </vue-canvas-nest>
      <el-header>
        <!--    导航菜单-->
        <homeComponent></homeComponent>
      </el-header>
      <div id="area" class="wrapper">
        <div class="cinema-wrapper">
          <el-card class="box-card  login_box">
            <div slot="header" class="clearfix title">
              <span>{{lectureInfo.title}}</span>
            </div>
            <!--              内容简介-->
            <div class="item">{{lectureInfo.lecDate}}
              <el-divider direction="vertical"></el-divider>
              {{lectureInfo.lecTime}}
              <el-divider direction="vertical"></el-divider>
              地点：{{lectureInfo.lecRoom}}
              <el-divider direction="vertical"></el-divider>
            </div>

            <div class="item">讲座编号：{{lectureInfo.lecNumber}}
              <el-divider direction="vertical"></el-divider>
              量化分{{lectureInfo.lecScore}}
            </div>
            <div class="item">讲师：{{lectureInfo.speaker}},{{lectureInfo.introduction}}</div>
            <div class="item">{{lectureInfo.content}}</div>
          </el-card>
          <div class="btn-wrapper">
            <div class="btn-buy" @click="buySeat">
              选定座位
            </div>
          </div>
          <!--      框框框起来的座位的信息部分-->
          <div class="seat-wrapper">
            <!--        解释座位是否可选，以及展示座位展示的状态-->
            <div class="illustration">
              <div class="illustration-img-wrapper unselected-seat">
              </div>
              <span class="illustration-text">可选</span>
              <div class="illustration-img-wrapper selected-seat">
              </div>
              <span class="illustration-text">已选</span>
              <div class="illustration-img-wrapper bought-seat">
              </div>
              <span class="illustration-text">不可选</span>
            </div>
            <div class="screen">
              龙湖剧场
            </div>
            <div class="screen-center">
              投影仪处
              <!--          中心线-->
              <div class="mid-line"></div>
            </div>
            <div class="inner-seat-wrapper" ref="innerSeatWrapper">
              <!--         用双重循环渲染出一层一层的座位信息-->
              <div v-for="row in seatRow">
                <!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
                <div v-for="col in seatCol"
                     v-if="seatArray.length>0"
                     class="seat"
                     :style="{width:seatSize+'px',height:seatSize+'px'}">
                  <div class="inner-seat"
                       @click="handleChooseSeat(row-1,col-1)"
                       v-if="seatArray[row-1][col-1]!=='-1'"
                       :class="seatArray[row-1][col-1]==='2'?'bought-seat':(seatArray[row-1][col-1]==='1'?'selected-seat':'unselected-seat')">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <foots></foots>
    </div>
</template>
<script>
    import vueCanvasNest from 'vue-canvas-nest'
    import {WOW} from 'wowjs'
    import 'animate.css'
    export default {
        name: "classRoom",
        components: {vueCanvasNest},
        data() {
            return {
                //教室座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
                seatArray:[],
                dataArray:[],
                //教室座位行数
                //问题，当输入的行数和列数为10和10的时候画出的座位列表不对
                seatSize: '',
                //推荐选座最大数量，会导致上面的绿色按钮出现不同的数量
                // smartChooseMaxNum: 1,
                  seatRow: 10,
                  seatCol: 20,
                  classRoom:{
                    room_number:'',
                    room_name:'',
                    row_count:'',
                    col_count:'',
                    seatInfo:[]
                  },
                // 从homePage传递过来的参数
                bookInfo:{
                    stuNumber:sessionStorage.getItem("session"),
                    roomName:'',
                    lecNumber:'',
                    rrow:'',
                    collumn:'',
                    time:'',
                    date:'',
                    score:'',
                    title:''
                },
                lectureInfo:{
                    lecNumber: '',
                    lecRoom: '',
                    lecScore: '',
                    letDate: '',
                    lecTime: '',
                    speaker: '',
                    title: '',
                    content: '',
                    stuNumber: this.uid,
                }
            }
        },
        computed: {},
        methods: {

            //辅助函数：返回每一行的某个合理位置的座位数组，起始的行数和列数以及结束的位置
            generateRowResult: function (row, startPos, endPos) {
                let result = [];
                for (let i = startPos; i <= endPos; i++) {
                    result.push([row, i])
                }
                return result
            },
            //重置座位
            //选定且购买座位， 此处可以向后，将原来选定的座位状态为1全部设置成为购买状态2
            buySeat: function () {
                //遍历seatArray，将值为1的座位变为2
                let oldArray = this.seatArray.slice();
                let count = 0;
                for (let i = 0; i < this.seatRow; i++) {
                    for (let j = 0; j < this.seatCol; j++) {
                        count ++;
                        if(oldArray[i][j]==='1'){
                            this.$axios.post('/student/buySeat',{
                                stuNumber:this.bookInfo.stuNumber,
                                roomNumber:this.bookInfo.roomNumber,
                                lecNumber:this.bookInfo.lecNumber,
                                rrow:i,
                                collumn:j,
                                commented:count,
                                title:this.bookInfo.title,
                                time:this.bookInfo.time,
                                date:this.bookInfo.date,
                                score:this.bookInfo.score,
                            }).then(res=>{
                                if(res.data.code===200){
                                    console.log('修改成功');

                                    oldArray[i][j] ='2';
                                    this.seatArray = oldArray.slice();
                                    this.$notify({
                                        title: '提示',
                                        message: '预约成功，记得现场签到！预约信息请到个人中心查看',
                                        duration: 0
                                    });
                                }else{
                                    console.log("修改失败！");
                                    oldArray[i][j] ='0';
                                    this.seatArray = oldArray.slice();
                                    const h = this.$createElement;
                                    this.$notify({
                                        title: '预定失败！',
                                        message: h('i', { style: 'color: teal'}, res.data.setMessage)
                                    });
                                }
                            }).catch(err=>{
                                console.log(err);
                                const h = this.$createElement;
                                oldArray[i][j] ='0';
                                this.seatArray = oldArray.slice();
                                this.$notify({
                                    title: '预定失败！',
                                    message: h('i', { style: 'color: teal'}, '')
                                });
                            });
                        }
                    }
                }
                this.seatArray = oldArray.slice();
            },
            //处理座位选择逻辑，手动用鼠标选择单个座位
            handleChooseSeat: function (row, col) {
                let count = 0;
                for(let i = 0 ;i<this.classRoom.row_count;i++){
                    for(let  j = 0;j<this.classRoom.col_count;j++){
                        if(this.seatArray[i][j] ==='1'){
                            count ++;
                        }
                        if(count>=2){
                            break;
                        }
                    }
                }
                if(count<1 ||  this.seatArray[row][col] ==='1'){
                    let seatValue = this.seatArray[row][col];
                    let newArray = this.seatArray;
                    if (seatValue === '2') return;
                    if (seatValue === '1') {
                        newArray[row][col] = '0'
                    } else if (seatValue === '0') {
                        newArray[row][col] = '1'
                    }
                    this.seatArray = newArray.slice();
                }else{
                    const h = this.$createElement;
                    this.$notify({
                        title: '不可选',
                        message: h('i', { style: 'color: teal'}, '每人只能选择一个座位，请先取消已选座位')
                    });
                }

            },

            //初始座位数组，包括座位的相关信息和不是座位的相关信息
            getParams:function(){
                this.bookInfo.roomNumber = this.$route.query.roomName;
                this.bookInfo.lecNumber = this.$route.query.lecNumber;

                this.bookInfo.time = this.$route.query.time;
                this.bookInfo.date = this.$route.query.date;
                this.bookInfo.score = this.$route.query.score;
                this.bookInfo.title= this.$route.query.lecTitle;
                console.log("stuNumber:"+this.bookInfo.stuNumber);
                // 获取数据渲染座位列表
                this.$axios.get('/student/getSeatInfo?roomName='+this.bookInfo.roomNumber+'&lecNumber='+this.bookInfo.lecNumber).then(res=>{
                    console.log(res.data.data);
                    this.dataArray = res.data.data;
                    this.classRoom.row_count = this.dataArray[0].rowCount;
                    this.classRoom.col_count = this.dataArray[0].colCount;
                    this.tempArray = Array(this.classRoom.row_count).fill(0).map(() => Array(this.classRoom.col_count).fill(0));
                    let count = 0;
                    let array_zero = [];
                    for (let item in this.dataArray[0]){
                        count++;
                        if(count>4){
                            array_zero.push(this.dataArray[0][item]);
                        }
                    }
                    count = 0;
                    for(let x=0;x<parseInt(this.classRoom.row_count);x++){
                        for(let j=0;j<parseInt(this.classRoom.col_count);j++){
                            this.tempArray[x][j] = array_zero[count];
                            count++;
                        }
                    }
                    this.seatArray = this.tempArray;
                }).catch(err=>{
                    console.log("请求出错啦");
                    console.log(err)
                });
                this.$axios.get("student/getLectureByNumber?lecNumber="+this.bookInfo.lecNumber).then(res=>{
                    console.log(res);
                    this.lectureInfo=res.data.data;
                }).catch(err=>{
                    console.log(err);
                })

            },
        },
        //挂载的时候初始化座位的相关信息。
        mounted: function () {
            // 可以通过 $refs 得到组件，进而调用组件的变量和方法,根据座位的容量设置座位的宽度，能取到座位跨度就是座位宽度，不能取到座位宽度就为0
            this.seatSize = this.$refs.innerSeatWrapper
                ? parseInt(parseInt(window.getComputedStyle(this.$refs.innerSeatWrapper).width, 10) / this.seatCol, 10)
                : 0;
            this.getParams();
        }
    }
</script>

<style scoped>
  .wrapper {
    height: 100%;
    box-sizing:border-box;
  }

  .cinema-wrapper {
    padding-top: 30px;
    padding-bottom: 100px;
    height: 90%;
    background:rgba(0,96,128,0.1);
  }

  .title {
    text-align: center;
  }

  .seat-wrapper {
    background-color: white;
    height: 700px;
    width: 1000px;
    border: 1px dotted #c5c5c5;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .screen {
    margin: 0 auto;
    height: 30px;
    width: 300px;
    background-color: #e3e3e3;
    border-radius: 0 0 30px 30px;
    color: #585858;
    line-height: 30px;
    text-align: center;
  }

  .inner-seat-wrapper {
    position: absolute;
    top: 120px;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .seat {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-seat {
    width: 80%;
    height: 80%;
    cursor: pointer;
  }

  .selected-seat {
    background: url('./../../assets/selected.png') center center no-repeat;
    background-size: 100% 100%;
    /*background-blend-mode: lighten;*/
  }

  .unselected-seat {
    background: url('./../../assets/unselected.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .bought-seat {
    background: url('./../../assets/bought.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .screen-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    font-size: 13px;
    border-radius: 5px;
    top: 50px;
    background-color: #f6f6f6;
    color: #636363;
    border: 1px solid #b1b1b1;
  }

  .mid-line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    width: 1px;
    height: 800px;
    border-left: 1px dashed #919191;
  }

  .btn-wrapper {
    margin: 20px auto;
    width: 1000px;
    height: 30px;
    text-align: center;
  }

  .btn-buy {
    height: 100%;
    line-height: 30px;
    font-size: 14px;
    border-radius: 5px;
    padding: 0 5px;
    background-color: black;
    color: #ffffff;
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
  }

  .smart {
    background-color: #006080;
  }

  .illustration {
    position: absolute;
    left: 0;
    top: 0;
    height: 35px;
    width: 300px;
  }

  .illustration-img-wrapper {
    width: 25px;
    height: 25px;
    position: relative;
    top: 50%;
    display: inline-block;
    transform: translateY(-50%);
    margin-left: 10px;
  }

  .illustration-text {
    display: inline-block;
    height: 100%;
    line-height: 35px;
    font-size: 14px;
    position: relative;
    top: -2px;
  }
  .item {
    font-size: 14px;
    text-align: left;
  }
  /*登录卡片内容*/
  .box-card {
    width: 75%;
    margin:30px auto;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
