<template>
  <div>
    <headerBar></headerBar>
    <div>
      <el-col :span="4"><menuComponent></menuComponent></el-col>
      <el-col :span="20">
        <div>
          <el-col :span="24" class="table-title">
            <div style="margin-top: 15px;margin-bottom: 10px;margin-right: 15%;">
              <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="用户编号" value="1"></el-option>
                  <el-option label="用户名" value="2"></el-option>
                  <el-option label="角色" value="3"></el-option>
                  <el-option label="状态" value="4"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
        </div>
        <el-table
          :data="userInfo"
          style="width: 100%;">
          <el-table-column v-for="item in columns" v-bind:key="item.id" :label="item.label" :prop="item.prop"
                           :width="item.width">
            <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input size="mini" :placeholder="scope.row[item.prop]" v-model="editItem[item.prop]"></el-input>
            </span>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
             <span class="el-tag el-tag--success el-tag--mini" style="cursor: pointer;"
                   @click="saveRow(scope.row,scope.$index)">
               保存
             </span>
              <span class="el-tag el-tag--primary el-tag--mini" style="cursor: pointer;"
                    @click="editRow(scope.row,scope.$index)">
               编辑
             </span>
              <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;"
                    @click="deleteRow(scope.$index,userInfo,scope.row)">
               删除
             </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="page" :page-sizes="[1, 2,5, 8]" :page-size="limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </div>
  </div>
</template>

<script>
    export default {
        name: "studentCenter",
        data() {
            return {
                editItem: {//接收编辑的讲座信息
                    uid:'',
                    name:'',
                    integrity:'',
                    role:'',
                    score:'',
                    status:'',
                    edit:false,
                },
                columns: [{
                    prop: "uid",
                    label: "用户编号",
                    width: 150,
                }, {
                    prop: "name",
                    label: "用户昵称",
                    width: 150
                }, {
                    prop: "integrity",
                    label: "诚信值",
                    width: 150
                }, {
                    prop: "role",
                    label: "角色",
                    width: 150
                }, {
                    prop: "score",
                    label: "量化分",
                    width: 150
                }, {
                    prop: "status",
                    label: "状态",
                    width: 150
                }],
                userInfo:[{
                    uid:'',
                    name:'',
                    integrity:'',
                    role:'',
                    score:'',
                    status:''
                }],
                saveInfo:[],
                searchData:'',
                limit: 5,
                total: null,
                page: 1,
                select:'',//下拉框选择条件
            }
        },
        methods: {
            search(){
                this.page =1;
                this.searchByconditions();
            },
            searchByconditions(){
                console.log(this.select);
                let list = [];
                if (this.select==="2"){
                    list = this.saveInfo.filter((item, index) =>
                        item.name.includes(this.searchData)
                    );
                }else if (this.select==="1" || this.select===""){
                    list = this.saveInfo.filter((item, index) =>
                        item.uid.includes(this.searchData)
                    );
                }else if(this.select==="3"){
                    list = this.saveInfo.filter((item, index) =>
                        item.role.includes(this.searchData)
                    );
                }else if(this.select==="4"){
                    list = this.saveInfo.filter((item, index) =>
                        item.status==this.searchData
                    );
                }else{
                    list = this.saveInfo;
                }
                this.userInfo = list.filter((item, index) =>
                    index < this.page * this.limit && index >= this.limit * (this.page - 1)
                );
                this.total = list.length;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.limit = val;
                this.searchByconditions();
            },
            // 当当前页改变
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val;
                this.searchByconditions();
            },
            saveRow(row) { //保存
                let testData = this.userInfo.slice();
                //将编辑好的数据同时在前端展示出来
                for (let i = 0; i < testData.length; i++) {
                    if (testData[i].uid === row.uid) {
                        testData[i].uid = row.uid;
                        testData[i].role = row.role;
                        testData[i].name = this.editItem.name==''?row.name:this.editItem.name;
                        testData[i].integrity = this.editItem.integrity==''?row.integrity:this.editItem.integrity;
                        testData[i].score = this.editItem.score==''?row.score:this.editItem.score;
                        testData[i].status = this.editItem.status==''?row.status:this.editItem.status;
                        testData[i].edit = false;
                    }
                }
                this.userInfo = testData;
                if(this.editItem!=null){
                    this.$axios.post("/admin/updateUserInfo", {
                        //uid、role不允许被修改
                        uid:row.uid,
                        name:this.editItem.name==''?row.name:this.editItem.name,
                        integrity:this.editItem.integrity==''?row.integrity:this.editItem.integrity,
                        score:this.editItem.score==''?row.score:this.editItem.score,
                        status:this.editItem.status==''?row.status:this.editItem.status,
                    }).then(res => {
                        console.log(res);
                      if(res.data.code===200){
                          const h = this.$createElement;
                          this.$notify({
                              title: '成功！',
                              message: h('i', { style: 'color: teal'}, res.data.setMessage)
                          });
                      }else{
                          const h = this.$createElement;
                          this.$notify({
                              title: '失败！',
                              message: h('i', { style: 'color: teal'}, "修改失败！")
                          });
                      }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            // 相当于开关，打开开关则允许表格被编辑
            editRow(row, index) { //编辑
                let testData = this.userInfo.slice();
                for (let i = 0; i < testData.length; i++) {
                    if (testData[i].uid === row.uid) {
                        testData[i].edit = true;
                        const h = this.$createElement;
                        this.$notify({
                            title: '编辑模式',
                            message: h('i', { style: 'color: teal'}, "不必填写整行信息，填写您想修改的部分即可！")
                        });
                    }
                }
                this.userInfo = testData;
            },
            deleteRow(index,datas,row) { //删除
                datas.splice(index, 1);
                console.log(row);
                this.$axios.get("/admin/deleteUser?uid="+row.uid).then(res=>{
                    const h = this.$createElement;
                    this.$notify({
                        title: '成功！',
                        message: h('i', { style: 'color: teal'}, '删除成功！')
                    });
                }).catch(err=>{
                    console.log(err);
                    const h = this.$createElement;
                    this.$notify({
                        title: '失败！',
                        message: h('i', { style: 'color: teal'}, '删除失败！')
                    });
                });
            }
            ,
            // 当每页数量改变
        },
        created() {
            this.$axios.get("/admin/users").then(res=>{
                this.saveInfo = res.data.data;
                this.search()
            }).catch(err=>{
                console.log(err);
            })
        }
    }
</script>

<style scoped>
  .table-title{
    background:rgba(67,74,80,0.5);
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
