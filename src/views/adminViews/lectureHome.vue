<template>
<div>
  <headerBar></headerBar>
  <div>
    <el-col :span="4"><menuComponent></menuComponent></el-col>
    <el-col :span="20">
      <div>
        <el-col :span="24" class="table-title">
          <div style="margin-top: 15px;margin-bottom: 10px;margin-right: 15%;">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="讲座编号" value="1"></el-option>
                <el-option label="讲座名称" value="2"></el-option>
                <el-option label="宣讲室" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;">
        <el-table-column class="table-column"
          prop="lecNumber"
          label="讲座编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="lecRoom"
          label="宣讲室"
          width="130">
        </el-table-column>
        <el-table-column
          prop="speaker"
          label="讲师"
          width="100">
        </el-table-column>
        <el-table-column
          prop="lecScore"
          label="量化分"
          width="100">
        </el-table-column>
        <el-table-column
          prop="lecDate"
          label="日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="lecTime"
          label="时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button style="float: left; padding-right: 3px;" type="text">
              <span style="color: red" @click="delItem(scope.row,scope.$index)">删除</span>
            </el-button>
            <el-button style="float: left; padding-right: 3px;" type="text">
              <span @click="editItem(scope.row,scope.$index)">编辑</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</div>
</template>

<script>
    export default {
        name: "lectureHome",
        data(){
              return{
                  input1: '',
                  input2: '',
                  input3: '',
                  select: '',
                  tableData:[{
                      content:'',
                      introduction:'',
                      lecDate:'',
                      lecNumber:'',
                      lecRoom:'',
                      lecScore:'',
                      lecTime:'',
                      speaker:'',
                      title:''
                  }]
              }
        },
        methods:{
            delItem(row,index){
                // console.log(row);
                console.log(index);
            },
            editItem(row,index){
                console.log(row);
                console.log(index);
            },

            getInitTableInfo(){
                this.$axios.get('/student/getSeatInfo?roomName=testRoom').then(res=>{
                    console.log("登录管理员之后的数据为：");
                    console.log(res.data.data);}).catch(err=>{
                    console.log(err);
                });
                this.$axios.get('/student/lectureInfo').then(res=>{
                    console.log("res");
                    this.tableData=res.data.data;
                    console.log(this.tableData);

                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        created() {
            this.getInitTableInfo();
        }
    }
</script>

<style scoped>
  .table-title{
      background-color:#B3CCB6;
  }
  .table-column{
    background-color: #B3CCB6;
  }
  /*搜索框的样式*/
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
