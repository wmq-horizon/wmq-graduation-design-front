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
            <div style="margin-top: 15px;margin-bottom: 10px;margin-right: 15%;">
              <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="讲座编号" value="1"></el-option>
                  <el-option label="讲座名称" value="2"></el-option>
                  <el-option label="宣讲室" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
        </div>
<!--        搜索框-->
        <el-table size="mini" :data="lecture.sel" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column v-for="item in lecture.columns" v-bind:key="item.id" :label="item.label" :prop="item.prop"
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
                    @click="deleteRow(scope.$index,lecture.sel,scope.row)">
               删除
             </span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </div>
  </div>
</template>

<script>
    export default {
        name: "lectureHome",
        data() {
            return {
                input3: '',
                select: '',
                // rules: {
                //     input3: [
                //         { required: true, message: '请输入搜索条件', trigger:'blur'},
                //         { min: 0, message: '至少一个字符', trigger: 'blur' }
                //     ]
                // },
                editItem: {
                    content: '',
                    introduction: '',
                    lecDate: '',
                    lecNumber: '',
                    lecRoom: '',
                    lecScore: '',
                    lecTime: '',
                    speaker: '',
                    title: '',
                },
                lecture: {
                    sel: [{
                        content: '',
                        introduction: '',
                        lecDate: '',
                        lecNumber: '',
                        lecRoom: '',
                        lecScore: '',
                        lecTime: '',
                        speaker: '',
                        title: '',
                        edit: false,
                    }],
                    columns: [{
                        prop: "lecNumber",
                        label: "讲座编号",
                        width: 100,
                    }, {
                        prop: "title",
                        label: "标题",
                        width: 230
                    }, {
                        prop: "lecRoom",
                        label: "宣讲室",
                        width: 130
                    }, {
                        prop: "speaker",
                        label: "讲师",
                        width: 100
                    }, {
                        prop: "lecScore",
                        label: "量化分",
                        width: 100
                    }, {
                        prop: "lecDate",
                        label: "日期",
                        width: 100
                    }, {
                        prop: "lecTime",
                        label: "时间",
                        width: 100
                    }],
                    data: [],
                }
            }
        },
        methods: {
            search(){
                if(this.select==="讲座编号"){
                    console.log("根据讲座编号查找");
                    this.$axios.get("/admin/searchLecturByNnumber?lecNumber="+this.input3).then(res=>{
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    })

                }
                if(this.select==="讲座名称"){
                    console.log("根据讲座名称问查找");
                    this.$axios.get("/admin/searchLectureByName?lecName="+this.input3).then(res=>{
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    });
                }
                if(this.select==="宣讲室"){
                    console.log("根据宣讲室名称查找");
                    this.$axios.get("/admin/searchLectureByRoom?lecRoom="+this.input3).then(res=>{
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            },
            saveRow(row) { //保存
                let testData = this.lecture.sel.slice();
                for (let i = 0; i < testData.length; i++) {
                    if (testData[i].lecNumber === row.lecNumber) {
                        testData[i] = this.editItem;
                        testData[i].edit = false;
                    }
                }
                this.lecture.sel = testData;
                this.$axios.post("/admin/updateLecture", {
                    lecNumber:this.editItem.lecNumber,
                    lecRoom:this.editItem.lecRoom,
                    title:this.editItem.title,
                    speaker:this.editItem.speaker,
                    lecScore:this.editItem.lecScore,
                    lecDate:this.editItem.lecDate,
                    lecTime:this.editItem.lecTime,
                    introduction:this.editItem.introduction,
                    content:this.editItem.content,
            }).then(res => {
                console.log(res);
                }).catch(err => {
                console.log(err);
                });
            },
            // 相当于开关，打开开关则允许表格被编辑
            editRow(row, index) { //编辑
                console.log(row);
                let testData = this.lecture.sel.slice();
                for (let i = 0; i < testData.length; i++) {
                    console.log(i);
                    if (testData[i].lecNumber === row.lecNumber) {
                        testData[i].edit = true;
                        console.log("查看数据刷新");
                        console.log(testData);
                    }
                }
                this.lecture.sel = testData;
            },

            deleteRow(index,datas,row) { //删除
                datas.splice(index, 1);
                console.log(row);
                // scope.$index,lecture.sel
                this.$axios.get("/admin/deleteLecture?lecNumber="+row.lecNumber).then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.$message("成功删除讲座");
                    }
                }).catch(err=>{
                    console.log(err);
                });
            }
            ,
            getInitTableInfo() {
                this.$axios.get('/student/lectureInfo').then(res => {
                    console.log("res");
                    this.lecture.sel = res.data.data;
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.getInitTableInfo();
        }
    }
</script>

<style scoped>
  .table-title {
    background-color: #B3CCB6;
  }

  .table-column {
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
