<template>
<div>
<headerBar></headerBar>
  <div>
    <el-col :span="4"><menuComponent></menuComponent></el-col>
    <el-col :span="20">
      <div>
        <el-col :span="24" class="table-title">
          <div style="margin-top: 15px;margin-bottom: 10px;margin-right: 15%;text-align: left">
            /新增宣讲室
          </div>
        </el-col>
      </div>
      <div style="padding-left:15%;">
        <el-col :span="15" class="add-form" >
          <!--          form表单-->
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-right:5%">
            <el-form-item label="宣讲室编号" prop="roomNumber"  style="padding-top: 3%">
              <el-input v-model="ruleForm.roomNumber"></el-input>
            </el-form-item>
            <el-form-item label="宣讲室名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="行数" prop="rowCount">
              <el-input v-model="ruleForm.rowCount"></el-input>
            </el-form-item>
            <el-form-item label="列数" prop="colCount">
              <el-input v-model="ruleForm.colCount"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </el-col>
  </div>
</div>
</template>

<script>
    export default {
        name: "newRoom",
        data(){
            return {
                ruleForm: {
                    name: '',
                    roomNumber:'',
                    rowCount:'',
                    colCount:'',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入讲座名称', trigger: 'blur' },
                        { min: 0, message: '至少一个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择宣讲室', trigger: 'change' }
                    ],
                    speaker: [
                        { required: true, message: '请输入讲师姓名', trigger: 'change' }
                    ],
                    speaker_desc: [
                        { required: true, message: '请输入讲师简介信息', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写讲座简介', trigger: 'blur' }
                    ],
                    lec_number:[
                        { required: true, message: '请输入讲座编号', trigger: 'blur' }
                    ],
                    score:[
                        { min:0,required: true, message: '请设置讲座量化分', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/admin/newRoom',{
                           colCount:this.ruleForm.colCount,
                           rowCount:this.ruleForm.rowCount,
                            roomName:this.ruleForm.name,
                            roomNumber:this.ruleForm.roomNumber
                        }).then(res=>{

                            console.log(res)
                        }).catch(err=>{
                            console.log(err)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
  .table-title{
    background-color:#B3CCB6;
    color:white;
  }
  .add-form{
    background-color: #DDDDDD;
    /*padding-top:5%;*/
  }
</style>
