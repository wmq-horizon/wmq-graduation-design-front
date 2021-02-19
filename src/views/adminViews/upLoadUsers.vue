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
        <el-upload
          :format ="['xlsx','xls']"
          class="upload-demo"
          drag
          action="http://localhost:8088/api/upload/excelFile"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </div>
  </div>
</template>

<script>
    export default {
        name: "upLoadUsers",
        data () {
            return {
                input3:'',
                select:''
            };
        },
        methods: {
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
