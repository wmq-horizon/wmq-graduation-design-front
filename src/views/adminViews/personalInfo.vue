<template>
  <div>
   <headerBar></headerBar>
    <div>
      <el-col :span="4"><menuComponent></menuComponent></el-col>
      <el-col :span="20">
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <el-image
              style="width: 100%; height: 200px"
              :src="url"
              :fit="fit"></el-image>
          </div>
        </div>
        <el-card class="box-card wow lightSpeedIn">
<!--          <div><span style="font-weight:bold;">我的信息</span></div>-->
<!--          <el-divider></el-divider>-->
          <div><span>编号：{{user.uid}}</span></div>
          <el-divider></el-divider>
          <div><span>昵称：{{user.name}}</span></div>
          <el-divider></el-divider>
          <div><span>诚信值：{{user.integrity}}</span></div>
          <el-divider></el-divider>
          <div><span>量化分：{{user.score}}</span></div>
          <el-divider></el-divider>
          <div><span>角色：{{user.role}}</span></div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
    export default {
        name: "personalInfo",
        data(){
            return{
                fits: ['fill'],
                url: 'https://tse3-mm.cn.bing.net/th/id/OIP.Q84dPkecBmJ9UyTIV8AiEAHaEo?pid=ImgDet&rs=1',
                user:{
                    uid:'',
                    name:'',
                    password:'',
                    integrity:0,
                    role:'',
                    score:0,
                    status:0,
                }
            }
        },
        methods:{
            getUserInfo(){
                this.$axios.get('/student/hello').then(res=>{
                    this.user = res.data.data;
                    console.log(this.user);
                    console.log(res);
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

</style>
