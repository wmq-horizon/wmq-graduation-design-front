<template>
  <el-container>
    <el-header>{{lecName}}</el-header>
    <el-main>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">.</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
              <el-form-item
                label="学号"
                prop="stuNumber"
                :rules="[
      { required: true, message: '学号不能为空'},
    ]"
              >
                <el-input v-model.number="numberValidateForm.stuNumber" autocomplete="off"></el-input>

              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('numberValidateForm')">签到</el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "signPage",
        data() {
            return {
                numberValidateForm: {
                    stuNumber: '',
                },
                title: '',
                lecName:'',
            }
        },
        methods: {
            getParam() {
                this.lecName = this.$route.query.lecName;
                this.lecNumber = this.$route.query.lecNumber;
                console.log(this.lecName);
                console.log(this.lecNumber);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.get("/signUp?stuNumber="+this.numberValidateForm.stuNumber+"&lecNumber="+this.lecNumber).then(res=>{
                            console.log(res);
                        }).catch(err=>{
                            console.log(err);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        mounted() {
            this.getParam();
        }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
