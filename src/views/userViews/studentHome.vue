<template>
  <el-container>
    <vue-canvas-nest :config="{color:'0,96,128 ', count: 800}" :el="'#area'">
    </vue-canvas-nest>
    <el-header>
      <!--    导航菜单-->
      <homeComponent></homeComponent>
    </el-header>
    <el-container id="area">
        <el-aside >
          <el-card class="box-card">
            <div>
              <span style="font-weight:bold;" v-if="changePassword===0">我的信息</span>
              <span style="font-weight:bold;" v-if="changePassword===1">修改密码</span>
            </div>
            <el-divider></el-divider>
            <div v-if="changePassword===0" style="min-width: 180px">
              <div><span> {{user.uid}}  </span></div>
              <el-divider></el-divider>
              <div><span>昵称：{{user.name}}</span></div>
              <el-divider></el-divider>
              <div><span>诚信值：{{user.integrity}}</span></div>
              <el-divider></el-divider>
              <div><span>量化分：{{user.score}}</span></div>
              <el-divider></el-divider>
              <div>
                <span v-if="user.role==='admin'">我是管理员</span>
                <span v-if="user.role==='student'">我是学生</span>
              </div>
              <el-divider></el-divider>
            </div>
            <div v-if="changePassword===1" style="padding-bottom: 30px;width:180px">
              <el-input placeholder="请输入原始密码" v-model="oldPassword" show-password></el-input>
              <el-input placeholder="请输入新密码" v-model="newPassword" show-password></el-input>
              <el-input placeholder="请再次确认新密码" v-model="confirmPassword" show-password></el-input>
            </div>
            <div >
              <span type="text" v-if="changePassword===0" @click="changePasswords">修改密码</span>
              <span type="text" v-if="changePassword===1" @click="changeAction">确认修改</span>
            </div>
            <div v-if="changePassword===1"><el-button type="text" style="margin-top: 20px;color: black" @click="showMyInfo">返回</el-button></div>
          </el-card>
        </el-aside>
        <el-main>
          <div v-for=" (item,index) in lectures" :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix title">
                <span>{{item.title}}</span>
              </div>
              <!--              内容简介-->
              <div class="text item">{{item.date}}
                <el-divider direction="vertical"></el-divider>
                {{item.time}}
                <el-divider direction="vertical"></el-divider>
                地点：{{item.lecRoom}}
                <el-divider direction="vertical"></el-divider>
                量化分{{item.score}}
              </div>
              <div class="text item">讲师：{{item.speaker}},{{item.introduction}}</div>
              <div class="text item">{{item.content}}</div>
              <div class="text item">
                <div v-if="item.commented===0">
                  <el-collapse>
                    <el-collapse-item title="写评价">
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="写下您的心得或者建议"
                        v-model="item.comments">
                      </el-input>
                        <el-button type="text" @click="doComment(item.comments,item.title,item.commented)" style="float:right">提交</el-button>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                <div v-if="item.commented===1">
                  <span>已评价</span><br>
                  <span> {{item.comments}}</span>
                </div>
              </div>
            </el-card>
          </div>
        </el-main>
    </el-container>
    <foots></foots>
  </el-container>
</template>
<script>
    import {WOW} from 'wowjs'
    import 'animate.css'
    import vueCanvasNest from 'vue-canvas-nest'
    export default {
        name: "student_home",
        components: {vueCanvasNest},
        data(){
            return{
                changePassword: 0,
                oldPassword:'',
                newPassword:'',
                confirmPassword:'',
                user:{
                    uid:'',
                    name:'',
                    password:'',
                    integrity:0,
                    role:'',
                    score:0,
                    status:0,
                },
                lectures:[{
                    time:'',
                    date:'',
                    score:0,
                    commented:0,
                    comments:'',
                    lecRoom:'',
                    title:'',
                    speaker:'',
                    introduction:'',
                    content:'',
                }],
                // comments:'',
            }
        },
        methods:{
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
                }else{
                    const h = this.$createElement;
                    this.$notify({
                        title: '修改失败',
                        message: h('i', { style: 'color: teal'}, '两次输入的密码不一致')
                    });
                }
            },
            changePasswords() {
                console.log("xiu");
                this.changePassword = 1;
            },
            // moreComments(title){
            //   this.$axios.get("student/getMoreComments?title="+title).then(res=>{
            //       console.log(res);
            //   }).catch(err=>{
            //       console.log(err);
            //   })
            // },

            doComment(comments,title,commented){
                if(commented==0){
                    const h = this.$createElement;
                    this.$notify({
                        title: '不能评价！',
                        message: h('i', { style: 'color: teal'}, "您未现场签到，不能评价")
                    });
                }else if(commented==1){
                    this.$axios.put("student/doComment",{
                        stuNumber:this.user.uid,
                        title:title,
                        comments:comments,
                        lecNumber:"lecNumber"
                    }).then(res=>{
                        // 评价成功之后修改前端页面
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    })
                }

            },
            getUserInfo(){
                this.$axios.get('/student/hello').then(res=>{
                    this.user = res.data.data;
                    console.log(this.user);
                    console.log(res);
                    this.lectures = res.data.data;
                    this.$axios.get('/student/participated?stuNumber='+this.user.uid).then(res=>{
                        console.log(res);
                        this.lectures = res.data.data;
                    }).catch(err=>{
                        console.log(err);
                    });
                }).catch(err=>{
                    console.log(err);
                });


            }
        },
        mounted() {
            this.getUserInfo();
            let options={live:false};
            let wow=new WOW(options);
            wow.init();
        }
    }
</script>

<style scoped>

  /*整体布局*/
  .el-header {
    text-align: center;
    float: left;
    line-height: 2%;
  }

  .el-aside .box-card{
    text-align: center;
    line-height: 100%;
    background: rgba(0,96,128,0.3);
    position: fixed;
    box-shadow: 7px 7px 4px #888;
  }

  #area{
    padding: 50px 100px 30px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 2%;
    text-align: left;
  }

  .title {
    background: rgba(0,96,128,0.1);
    font-size: 20px;
    color: black;
    border-radius: 5px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .box-card {
    margin-bottom: 3%;
  }
  .el-main{
    min-height:750px;
  }
  .el-input{
    padding-bottom: 20px;
  }
</style>
