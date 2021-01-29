<template>
<div>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="grid-content" style="padding-left:3%;float: left">
        <img src="../../assets/校徽.png" height="50" width="50"/>
        <img src="../../assets/标题.png" height="50" width="250"/>
      </div>
    </el-col>
  </el-row>
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
          prop="date"
          label="讲座编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="标题"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="宣讲室"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="讲师"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="量化分"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作"
          width="100">
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
                  select: ''
              }
        },
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
