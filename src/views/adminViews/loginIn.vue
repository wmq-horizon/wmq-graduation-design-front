<template>
  <div>
    <div class="center">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="name"
          label="账号"
          :rules="[
      { required: true, message: '请输入账号', trigger: 'blur' },
      { type: 'string', message: '请输入正确的账号格式', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="dynamicValidateForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[{
      required: true, message: '请输入正确的密码', trigger: 'blur'},
      { type: 'string', message: '请输入正确的密码', trigger: ['blur', 'change'] }]"
        >
          <el-input v-model="dynamicValidateForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">登录</el-button>
          <el-button @click="register('dynamicValidateForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
    export default {
        name: "loginIn",
        data() {
            return {
                dynamicValidateForm: {
                    password:'',
                    name: ''
                }
            };
        },
        methods: {
            logOut(){
                this.$axios.get("/user/logOut").then(res=>{
                    console.log("logout");
                    console.log(res);
                }).catch(err=>{console.log(err)});
            },
            // loginIn() {
            //     this.$axios.post("/user/login", {
            //         uid: this.userId,
            //         password: this.passWord,
            //         role:'student'
            //     }).then(res => {
            //         console.log(res);
            //         if(res.data.code===200){
            //             sessionStorage.setItem("session",res.data.data);
            //         }
            //         console.log("session");
            //         console.log(res.data.data);
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                          this.$axios.post("/user/login", {
                              uid: this.dynamicValidateForm.name,
                              password: this.dynamicValidateForm.password,
                              role:'admin'
                          }).then(res => {
                              console.log(res.data);
                              if(res.data.code!==200){
                                  console.log("登录失败")
                              }
                              if(res.data.setMessage!=='admin'){
                                  console.log('权限不足')
                              }
                              if((res.data.code===200&&res.data.setMessage==='admin')||res.data.setMessage==='已经登录'){
                                  sessionStorage.setItem("session",res.data.data);
                                  window.location.href='/lectureHome';
                                  console.log("session");
                                  console.log(res.data.data);
                              }

                          }).catch(err => {
                              console.log(err)
                          })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            register(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped>
  .center {
    width: 400px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    margin: auto;
    padding-top: 10%;
  }
</style>
