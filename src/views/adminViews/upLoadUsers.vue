<template>
  <div>
    <headerBar></headerBar>
    <div>
      <el-col :span="4"><menuComponent></menuComponent></el-col>
      <el-col :span="20">
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <el-image
              style="width: 100%; height: 150px"
              :src="url"
              :fit="fit"></el-image>
          </div>
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
                fits: ['fill'],
                url: 'https://th.bing.com/th/id/R696cbd8d94fa49aaebcda05b0d743e69?rik=wKr1tM3dQHvPCA&riu=http%3a%2f%2fimg1.juimg.com%2f180307%2f330863-1P30F4451260.jpg&ehk=glVNmqCsWZ7eypF7OvjvDiEm%2fLsq4NiNl%2bD4d8jZvdg%3d&risl=&pid=ImgRaw',
                input3:'',
                select:''
            };
        },
        methods: {
        }
    }
</script>

<style scoped>
  .upload-demo{
    margin-top: 3%;
  }
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
