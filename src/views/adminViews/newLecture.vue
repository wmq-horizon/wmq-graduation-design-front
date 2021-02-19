<template>
  <div>
    <headerBar></headerBar>
    <div>
      <el-col :span="4">
        <menuComponent></menuComponent>
      </el-col>
      <el-col :span="20">
        <div>
          <el-col :span="24" class="table-title">
            <div style="margin-top: 15px;margin-bottom: 10px;margin-right: 15%;text-align: left">
              /新增讲座
            </div>
          </el-col>
        </div>
        <div style="padding-left:10%;">
          <el-col :span="20" class="add-form">
            <!--          form表单-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                     style="padding-right:5%">
              <el-form-item label="宣讲室" prop="region" style="padding-top: 3%">
                <el-col :span="11">
                  <el-select v-model="ruleForm.region" placeholder="请选择宣讲室">
                    <el-option label="龙湖剧场" value="龙湖剧场"></el-option>
                    <el-option label="学生活动中心" value="学生活动中心"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="量化分" prop="score">
                    <el-input v-model="ruleForm.score"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="讲座编号" prop="lec_number">
                <el-input v-model="ruleForm.lec_number"></el-input>
              </el-form-item>
              <el-form-item label="讲座名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="讲师" prop="speaker">
                <el-input v-model="ruleForm.speaker"></el-input>
              </el-form-item>
              <el-form-item label="讲师简介" prop="speaker_desc">
                <el-input v-model="ruleForm.speaker_desc"></el-input>
              </el-form-item>
              <el-form-item label="讲座时间" required>
                <el-col :span="7">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.date1"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="15">
                  <el-time-select
                    placeholder="起始时间"
                    v-model="ruleForm.startTime"
                    :picker-options="{
      start: '08:00',
      step: '02:00',
      end: '20:00'
    }">
                  </el-time-select>
                  <el-time-select
                    placeholder="结束时间"
                    v-model="ruleForm.endTime"
                    :picker-options="{
      start: '10:00',
      step: '02:00',
      end: '22:00',
      minTime: ruleForm.startTime
    }">
                  </el-time-select>

                </el-col>


              </el-form-item>
              <el-form-item label="讲座简介" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
        name: "createNewLecture",
        data() {
            return {

                ruleForm: {
                    name: '',
                    region: '',
                    // date1为日期
                    date1: '',
                    startTime: '',
                    endTime: '',
                    speaker: '',
                    speaker_desc: '',
                    desc: '',
                    score: '',
                    lec_number: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入讲座名称', trigger: 'blur'},
                        {min: 0, message: '至少一个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择宣讲室', trigger: 'change'}
                    ],
                    speaker: [
                        {required: true, message: '请输入讲师姓名', trigger: 'change'}
                    ],
                    speaker_desc: [
                        {required: true, message: '请输入讲师简介信息', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写讲座简介', trigger: 'blur'}
                    ],
                    lec_number: [
                        {required: true, message: '请输入讲座编号', trigger: 'blur'}
                    ],
                    score: [
                        {min: 0, required: true, message: '请设置讲座量化分', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm.date2);
                        this.$axios.post('/admin/createNewLecture', {
                            lecNumber: this.ruleForm.lec_number,
                            lecRoom: this.ruleForm.region,
                            title: this.ruleForm.name,
                            speaker: this.ruleForm.speaker,
                            introduction: this.ruleForm.speaker_desc,
                            lecScore: this.ruleForm.score,
                            lecDate: this.ruleForm.date1,
                            lecTime: this.ruleForm.startTime+"-"+this.ruleForm.endTime,
                            content: this.ruleForm.desc,
                        }).then(res => {

                            console.log(res)
                        }).catch(err => {
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
  .table-title {
    background-color: #B3CCB6;
    color: white;
  }

  .add-form {
    background-color: #DDDDDD;
    /*padding-top:5%;*/
  }
</style>
