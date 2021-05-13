<template>
  <el-container>
    <el-header>每一堂讲座，都是一次心灵的旅行！</el-header>
    <vue-canvas-nest :config="{color:'0,96,128 ', count: 500}" :el="'#area'">
    </vue-canvas-nest>
    <el-main id="area">
        <el-card class="box-card">
            <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
              <el-form-item
                label="学号"
                prop="stuNumber"
                :rules="[
      { required: true, message: '学号不能为空'},
    ]"
              >
                <el-input v-model.number="numberValidateForm.stuNumber" autocomplete="off"><el-button slot="append" @click="submitForm('numberValidateForm')">签到</el-button></el-input>

              </el-form-item>
              <el-form-item>
<!--                <el-button type="primary" @click="submitForm('numberValidateForm')">签到</el-button>-->
              </el-form-item>
            </el-form>
        </el-card>
    </el-main>
  </el-container>
</template>

<script>
    import vueCanvasNest from 'vue-canvas-nest'
    export default {
        name: "signPage",

        components: {vueCanvasNest},
        data() {
            return {
                numberValidateForm: {
                    stuNumber: '',
                },
                title: '',
                lecName:'',
                lecNumber:'',
                score:'',
            }
        },
        methods: {
            getParam() {
                //从哪个页面传过来的数据
                this.lecName = this.$route.query.lecName;
                this.lecNumber = this.$route.query.lecNumber;
                this.score = this.$route.query.score;
                console.log(this.lecName);
                console.log(this.lecNumber);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.get("/sign?stuNumber="+this.numberValidateForm.stuNumber+"&lecNumber="+this.lecNumber+'&score='+this.score).then(res=>{
                            console.log(res);
                            console.log("测试签到");
                            if(res.data.code===200){
                                const h = this.$createElement;
                                this.$notify({
                                    title: '',
                                    message: h('i', { style: 'color: teal'}, res.data.setMessage)
                                });
                            }else{
                                const h = this.$createElement;
                                this.$notify({
                                    title: '签到失败',
                                    message: h('i', { style: 'color: teal'}, "签到失败，请稍后再试！")
                                });
                            }
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
    background-color: rgba(0,96,128,0.5);
    text-align: center;
    line-height: 60px;
    font-size: 32px;
  }

  .el-main {
    background-color: rgba(0,96,128,0.05);
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 100%;

  }

  body > .el-container {
    /*margin-bottom: 40px;*/
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
    margin-bottom: 40%;
  }
</style>
