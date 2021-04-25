<template>
  <div>
    <headerBar></headerBar>
    <vue-canvas-nest :config="{color:'34,139,34 ', count: 100}" :el="'#area'">
    </vue-canvas-nest>
    <el-main id="area">
      <div>
        <el-col :span="4">
          <menuComponent></menuComponent>
        </el-col>
        <el-col :span="20">
          <el-card class="box-card wow fadeIn" data-wow-duration="4" style="text-align: left">
            <div v-if="changePassword===0">
              <div><span>编号：{{user.uid}}</span></div>
              <el-divider></el-divider>
              <div><span>昵称：{{user.name}}</span></div>
              <el-divider></el-divider>
              <div><span>诚信值：{{user.integrity}}</span></div>
              <el-divider></el-divider>
              <div><span>量化分：{{user.score}}</span></div>
              <el-divider></el-divider>
              <div>
                <span v-if="user.role==='admin'">角色：管理员</span>
                <span v-if="user.role==='student'">角色：学生</span>
              </div>
              <el-divider></el-divider>
            </div>
            <div v-if="changePassword===1">
              <el-input placeholder="请输入原始密码" v-model="oldPassword" show-password></el-input>
              <el-input placeholder="请输入新密码" v-model="newPassword" show-password></el-input>
              <el-input placeholder="请再次确认新密码" v-model="confirmPassword" show-password></el-input>
            </div>
            <div style="color: green;margin-left: 30%;text-shadow: #99a9bf" >
              <span type="text" v-if="changePassword===0" @click="changePasswords">修改密码</span>
              <span type="text" v-if="changePassword===1" @click="changeAction">确认修改</span>
            </div>
            <div v-if="changePassword===1"><el-button type="text" style="margin-top: 20px;color: black" @click="showMyInfo">返回</el-button></div>
          </el-card>
        </el-col>
      </div>
    </el-main>

  </div>
</template>

<script>
    import vueCanvasNest from 'vue-canvas-nest'
    import {WOW} from 'wowjs'
    import 'animate.css'

    export default {
        name: "personalInfo",
        components: {vueCanvasNest},
        data() {
            return {
                changePassword: 0,
                oldPassword:'',
                newPassword:'',
                confirmPassword:'',
                user: {
                    uid: '',
                    name: '',
                    password: '',
                    integrity: 0,
                    role: '',
                    score: 0,
                    status: 0,
                }
            }
        },
        methods: {
            showMyInfo(){
                this.changePassword = 0;
            },
            changeAction(){
                //向后台发送请求
                let password1  = this.$md5(this.oldPassword);
                let password2 = this.$md5(this.newPassword);
                if(this.newPassword===this.confirmPassword){
                    this.$axios.get("/changePassword?oldPassword="+password1+"&newPassword="+password2).then(res=>{
                        console.log(res);
                        if(res.data.code==200){
                            const h = this.$createElement;
                            this.$notify({
                                title: '修改成功',
                                message: h('i', { style: 'color: teal'}, '恭喜你，修改密码成功，请记牢您的新密码')
                            });
                            this.changePassword = 0;
                            this.oldPassword="";
                            this.newPassword  = "";
                            this.confirmPassword = "";
                        }else{
                            const h = this.$createElement;
                            this.$notify({
                                title: '修改失败',
                                message: h('i', { style: 'color: teal'}, '请重新尝试')
                            });
                        }

                    }).catch(err=>{
                        console.log(err);
                    });
                }
            },
            changePasswords() {
               console.log("xiu");
               this.changePassword = 1;
            },
            getUserInfo() {
                this.$axios.get('/student/hello').then(res => {
                    this.user = res.data.data;
                    console.log(this.user);
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        mounted() {
            this.getUserInfo();
            let options = {live: false};
            let wow = new WOW(options);
            wow.init();
        }
    }
</script>

<style scoped>
  .box-card {
    box-shadow: 10px 10px 5px #888;
    padding-left: 100px;
    margin: 50px 250px 80px 160px;
    background:rgba(67,74,80,0.3);
  }
  .el-input{
    padding-bottom: 20px;
  }
</style>
