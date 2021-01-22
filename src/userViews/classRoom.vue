<template>
  <div class="wrapper">
    <div class="cinema-wrapper">
      <h1 class="title">学校公开讲座预约管理系统</h1>
<!--      标题下面的按钮-->
      <div class="btn-wrapper">
        <div class="btn-buy" @click="buySeat">
          选定座位
        </div>
        <div class="btn-buy" @click="resetSeat">
          重置座位
        </div>
        <!--智能选择-->
        <template v-for="(item,index) in smartChooseMaxNum">
          <div class="btn-buy smart" @click="smartChoose(index+1)">
            推荐选座{{index+1}}人
          </div>
        </template>
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
</template>
<script>
    export default {
        name: "classRoom",
        data() {
            return {
                //教室座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
                seatArray:[],
                dataArray:[],
                temArray:[],
                //教室座位行数
                //问题，当输入的行数和列数为10和10的时候画出的座位列表不对
                seatSize: '',
                //推荐选座最大数量，会导致上面的绿色按钮出现不同的数量
                smartChooseMaxNum: 3,
                  seatRow: 10,
                  seatCol: 20,
                  classRoom:{
                    room_number:'',
                    room_name:'',
                    row_count:'',
                    col_count:'',
                    seatInfo:[]
                  },
            }
        },
        computed: {},
        methods: {
            getSeatInfo(){
                this.$axios.get('/classRoomInfo/getClassRoomInfo').then(res=>{
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
                    let count1 = 0;
                    for(let x=0;x<parseInt(this.classRoom.row_count);x++){
                        for(let j=0;j<parseInt(this.classRoom.col_count);j++){
                            count1++;
                            this.tempArray[x][j] = array_zero[count1];
                        }
                    }
                    console.log(this.tempArray);
                    this.initSeatArray();
                }).catch(err=>{
                    console.log(err);
                });
            },
            //智能推荐座位的函数，按照座位的方向进行搜索
            //向前后某个方向进行搜索的函数,参数是起始行，终止行,推荐座位个数，
            searchSeatByDirection: function (fromRow, toRow, num) {
                /*
                 * 推荐座位规则
                 * (1)初始状态从座位行数的一半处的后一排的中间开始向左右分别搜索，取离中间最近的，如果满足条件，
                 *    记录下该结果离座位中轴线的距离，后排搜索完成后取距离最小的那个结果座位最终结果，优先向后排进行搜索，
                 *    后排都没有才往前排搜，前排逻辑同上
                 * (2)只考虑并排且连续的座位，不能不在一排或者一排中间有分隔
                 * */
                /*
                 * 保存当前方向搜索结果的数组,元素是对象,result是结果数组，offset代表与中轴线的偏移距离
                 * {
                 *   result:Array([x,y])
                 *   offset:Number
                 * }
                 */

                let currentDirectionSearchResult = [];
                // 判断出谁是小一点的函数，谁是大一点的函数，没有判断row和座位组数的大小，传递进来对的座位行数的大小
                let largeRow = fromRow > toRow ? fromRow : toRow,
                    smallRow = fromRow > toRow ? toRow : fromRow;

                for (let i = smallRow; i <= largeRow; i++) {
                    //每一次的搜索,找出该次里中轴线最近的一组座位
                    let tempRowResult = [],
                        // Infinity是无穷大，声明距离中心线最小的变量
                        minDistanceToMidLine = Infinity;
                    for (let j = 0; j <= this.seatCol - num; j++) {
                        //如果有合法位置， 双重循环选择数组内的座位数，I为行数，j为列数，调用check函数
                        if (this.checkRowSeatContinusAndEmpty(i, j, j + num - 1)) {
                            //计算该组位置距离中轴线的距离:该组位置的中间位置到中轴线的距离；parseInt(xy);y为解析数字的基数，这里表示出来即为10进制
                            let resultMidPos = parseInt((j + num / 2), 10);
                            //计算现在的距离到中心线的距离
                            let distance = Math.abs(parseInt(this.seatCol / 2) - resultMidPos);
                            //如果距离较短则更新，即如果合理的话就更新
                            if (distance < minDistanceToMidLine) {
                                minDistanceToMidLine = distance;
                                //该行的最终结果
                                tempRowResult = this.generateRowResult(i, j, j + num - 1)
                            }
                        }
                    }
                    //保存该行的最终结果，往数组中加入压入数据，currentDirectionSearchResult是干嘛用的
                    currentDirectionSearchResult.push({
                        result: tempRowResult,
                        offset: minDistanceToMidLine
                    })
                }


                //处理后行的搜索结果:找到距离中轴线最短的一个
                //注意这里的逻辑需要区分前后行，对于后行是从前往后，前行则是从后往前找
                // IsBackDire是一个boolean类型的变量；minDistanceToMid和minDistanceToMidLine的差别是什么
                let isBackDir = fromRow < toRow;
                let finalReuslt = [], minDistanceToMid = Infinity;
                //如果前行小于后行
                if (isBackDir) {
                    //后向情况,从前往后，将currentDirectionSearchResult中存储的位置一个一个的存储到最后的结果当中
                    currentDirectionSearchResult.forEach((item) => {
                        if (item.offset < minDistanceToMid) {
                            finalReuslt = item.result;
                            minDistanceToMid = item.offset;
                        }
                    });
                } else {
                    //前排情况，从后往前找，将结果导致再逐个的取出
                    currentDirectionSearchResult.reverse().forEach((item) => {
                        if (item.offset < minDistanceToMid) {
                            finalReuslt = item.result;
                            minDistanceToMid = item.offset;
                        }
                    })
                }
                //直接返回结果
                return finalReuslt
            },
            //辅助函数:智能推荐的选座操作
            chooseSeat: function (result) {
                // slice() 方法可从已有的数组中返回选定的元素，返回其中的所有的元素，存储到oldArray中
                let oldArray = this.seatArray.slice();
                // oldArray用来存储变量，result用来
                for (let i = 0; i < result.length; i++) {
                    //选定座位
                    oldArray[result[i][0]][result[i][1]] = 1;
                }
                this.seatArray = oldArray;
            },
            //推荐选座,参数是推荐座位数目，调用上面的两个函数
            smartChoose: function (num) {
                //找到影院座位水平垂直中间位置，parseInt的第一个参数要求是string
                let rowStart = parseInt((this.seatRow - 1) / 2, 10) ;
                //先从前排往后排搜索，参数为开始行、结束行和座位的格式，backResult表示从前往后
                let backResult = this.searchSeatByDirection(rowStart, this.seatRow - 1, num);
                if (backResult.length > 0) {
                    this.chooseSeat(backResult);
                    return
                }
                //再从中间排往前排搜索，forwardResult表示从后往前，参数为开始行、终止行即为尾行、座位数
                let forwardResult = this.searchSeatByDirection(rowStart - 1, 0, num);
                // 如果找到的结果大于0，则调用choose方法选择座位
                if (forwardResult.length > 0) {
                    this.chooseSeat(forwardResult);
                    return
                }
                //提示用户无合法位置可选，什么时候提示无合法位置可选
                alert('无合法位置可选!')
            },
            /*辅助函数，判断每一行座位从i列到j列是否全部空余且连续，返回的是一个bool函数
             */
            checkRowSeatContinusAndEmpty: function (rowNum, startPos, endPos) {
                let isValid = true;
                for (let i = startPos; i <= endPos; i++) {
                    if (this.seatArray[rowNum][i] !== 0) {
                        isValid = false;
                        break;
                    }
                }
                return isValid
            },
            //辅助函数：返回每一行的某个合理位置的座位数组，起始的行数和列数以及结束的位置
            generateRowResult: function (row, startPos, endPos) {
                let result = [];
                for (let i = startPos; i <= endPos; i++) {
                    result.push([row, i])
                }
                return result
            },
            //重置座位
            resetSeat: function () {
                //将所有座位的值变为0，也就是重置座位为初始状态
                let oldArray = this.seatArray.slice();
                for (let i = 0; i < this.seatRow; i++) {
                    for (let j = 0; j < this.seatCol; j++) {
                        if (oldArray[i][j] !== -1) {
                            oldArray[i][j] = 0
                        }
                    }
                }
                this.seatArray = oldArray;
            },
            //选定且购买座位， 此处可以向后，将原来选定的座位状态为1全部设置成为购买状态2
            buySeat: function () {
                //遍历seatArray，将值为1的座位变为2
                let oldArray = this.seatArray.slice();
                for (let i = 0; i < this.seatRow; i++) {
                    for (let j = 0; j < this.seatCol; j++) {
                        if (oldArray[i][j] === 1) {
                            oldArray[i][j] = 2
                        }
                    }
                }
                this.seatArray = oldArray;
            },
            //处理座位选择逻辑，手动用鼠标选择单个座位
            handleChooseSeat: function (row, col) {
                // 保存传递进来的行列的值
                let seatValue = this.seatArray[row][col];
                // 定义新的数组为将要接收信息的数组，可以直接在oldArray上进行修改吗
                let newArray = this.seatArray;
                //如果是已购座位，直接返回
                if (seatValue === 2) return;
                //如果是已选座位点击后变未选
                if (seatValue === 1) {
                    newArray[row][col] = 0
                } else if (seatValue === 0) {
                    newArray[row][col] = 1
                }
                //必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
                this.seatArray = newArray.slice();
                console.log(this.seatArray);
                // 输出的是二维数组
            },
            //初始座位数组，包括座位的相关信息和不是座位的相关信息
            initSeatArray: function () {
                // 初始化二维数组并且填充0
                // let tempSeatArray;
                 // tempSeatArray = Array(this.seatRow).fill(0).map(() => Array(this.seatCol).fill(0));
                // this.seatArray = tempSeatArray;
                console.log("hello");
                console.log(this.tempArray);
                console.log("nihao");
                this.seatArray = this.tempArray;
                console.log(this.seatArray);
                // 可以通过 $refs 得到组件，进而调用组件的变量和方法,根据座位的容量设置座位的宽度，能取到座位跨度就是座位宽度，不能取到座位宽度就为0
                this.seatSize = this.$refs.innerSeatWrapper
                    ? parseInt(parseInt(window.getComputedStyle(this.$refs.innerSeatWrapper).width, 10) / this.seatCol, 10)
                    : 0;
                // 初始化不是座位的地方
                for (let i = 0; i < 9; i++) {
                    this.seatArray[i][0] = -1;
                }
                // 前八行倒数第一列和第二列全部
                for (let i = 0; i < 9; i++) {
                    this.seatArray[i][this.seatArray[0].length - 1] = -1;
                    this.seatArray[i][this.seatArray[0].length - 2] = -1;
                }
                //倒数第三行前九列全部为非座位。
                for (let i = 0; i < 9; i++) {
                    this.seatArray[i][this.seatArray[0].length - 3] = -1;
                }
                //第二行全部为非座位
                for (let i = 0; i < this.seatArray[0].length; i++) {
                    this.seatArray[2][i] = -1;
                }
            },
        },
        //挂载的时候初始化座位的相关信息。
        mounted: function () {
            this.getSeatInfo();

        }
    }
</script>

<style scoped>
  .wrapper {
    height: 100%;
    padding: 40px;
    box-sizing:border-box;
  }

  .cinema-wrapper {
    height: 100%;
  }

  .title {
    text-align: center;
  }

  .seat-wrapper {
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
    background: url('./../assets/selected.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .unselected-seat {
    background: url('./../assets/unselected.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .bought-seat {
    background: url('./../assets/bought.png') center center no-repeat;
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
    background-color: #ffa349;
    color: #ffffff;
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
  }

  .smart {
    background-color: #39ac6a;
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
</style>
