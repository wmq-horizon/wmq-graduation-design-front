<template>
  <div class="body">
    <div class="center">
      <el-card class="box-card" style="opacity:0.9">
        <div slot="header" style="height:50px;line-height: 30px">
          <span>欢迎您！</span>
          <el-button style="float: right; padding:0" type="text" @click="registe"><span
            v-if="registStatus===0">注册</span><span v-else>登录</span></el-button>
        </div>
        <div>
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" style="float:left">
            <!--            如果用户点击了登录则显示登录框-->
            <div v-if="registStatus===1">
              <el-form-item
                prop="uid"
                label="账号">
                <el-input v-model="ruleForm.uid"></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
              </el-form-item>
              <el-form-item
                prop="name"
                label="昵称">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="registeUser('ruleForm')">注册</el-button>
              </el-form-item>
            </div>
            <div v-if="registStatus===0">
              <el-form-item
                prop="uid"
                label="账号">
                <el-input v-model="ruleForm.uid"></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
    export default {
        name: "loginIn",
        data() {
            return {
                registStatus: 0,
                ruleForm: {
                    password: '',
                    name: '',
                    uid: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 0, message: '至少一个字符', trigger: 'blur'}
                    ],
                    // uid: [
                    //     {required: true, message: '请输入账号', trigger: 'change'}
                    // ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ],
                }
            };
        },
        methods: {
            // 根据登录注册按钮改变登录注册form表单
            registe() {
                if (this.registStatus === 0) {
                    this.registStatus = 1;
                } else if (this.registStatus === 1) {
                    this.registStatus = 0;
                }
            },
            registeUser(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/registe", {
                            uid: this.ruleForm.uid,
                            password: this.$md5(this.ruleForm.password),
                            name: this.ruleForm.name,
                        }).then(res => {
                            console.log(res);
                        }).then(err => {
                            console.log(err);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/login", {
                            uid: this.ruleForm.uid,
                            password: this.$md5(this.ruleForm.password),
                            role: 'admin'
                        }).then(res => {
                            console.log(res.data);
                            if (res.data.code !== 200) {
                                console.log("登录失败");
                                const h = this.$createElement;
                                this.$notify({
                                    title: '登录失败',
                                    message: h('i', { style: 'color: teal'}, '登录失败')
                                });
                            }
                            if (res.data.setMessage !== 'admin') {
                                console.log('权限不足');
                                const h = this.$createElement;
                                this.$notify({
                                    title: '权限不足',
                                    message: h('i', { style: 'color: teal'}, '对不起，您的权限不足')
                                });

                            }
                            if ((res.data.code === 200 && res.data.setMessage === 'admin') || res.data.setMessage === '已经登录') {
                                if(res.data.setMessage === '已经登录'){
                                    const h = this.$createElement;
                                    this.$notify({
                                        title: '已经登录',
                                        message: h('i', { style: 'color: teal'}, '您已经登录了')
                                    });
                                }
                                sessionStorage.setItem("session", res.data.data);
                                window.location.href = '/admin/todayLecture';
                                sessionStorage.setItem("status", "true");
                                sessionStorage.setItem("role", "admin");
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
        },
        created() {
            let secret = this.$md5('1234567');
            console.log("加密之后的密码为："+secret);
        }
    }
</script>

<style scoped>
  .el-card {

  }

  .center {
    width: 400px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    margin: auto;
    padding-top: 10%;
  }

  .body {
    background: url(../../assets/管理员登录背景.png);
    background-size: 100% 100%;
  }
</style>
