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
              <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="讲座编号" value="1"></el-option>
                  <el-option label="讲座名称" value="2"></el-option>
                  <el-option label="宣讲室" value="3"></el-option>
                  <el-option label="讲师" value="4"></el-option>
                  <el-option label="日期" value="5"></el-option>
                  <el-option label="时间" value="6"></el-option>
                  <el-option label="量化分" value="7"></el-option>

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
        name: "lectureHome",
        data() {
            return {
                saveInfo:[],
                searchData:'',
                limit: 5,
                total: null,
                page: 1,
                select:'',//下拉框选择条件
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
                        width: 270
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
                this.page =1;
                this.searchByconditions();
            },
            searchByconditions(){
                console.log(this.select);
                let list = [];
                if (this.select==="1"){
                    list = this.saveInfo.filter((item, index) =>
                        item.lecNumber.includes(this.searchData)
                    );
                }else if (this.select==="2" || this.select===""){
                    list = this.saveInfo.filter((item, index) =>
                        item.title.includes(this.searchData)
                    );
                }else if(this.select==="3"){
                    list = this.saveInfo.filter((item, index) =>
                        item.lecRoom.includes(this.searchData)
                    );
                }else if(this.select==="4"){
                    list = this.saveInfo.filter((item, index) =>
                        item.speaker.includes(this.searchData)
                    );
                }else if(this.select==="5"){
                    list = this.saveInfo.filter((item, index) =>
                        item.lecDate.includes(this.searchData)
                    );
                }else if(this.select==="6"){
                    list = this.saveInfo.filter((item, index) =>
                        item.lecTime.includes(this.searchData)
                    );
                }else if(this.select==="7"){
                    list = this.saveInfo.filter((item, index) =>
                        item.lecScore==includes(this.searchData)
                    );
                }else{
                    list = this.saveInfo;
                }
                this.lecture.sel = list.filter((item, index) =>
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
                let testData = this.lecture.sel.slice();
                for (let i = 0; i < testData.length; i++) {
                    if (testData[i].lecNumber === row.lecNumber) {
                        console.log("不等于Null");
                        testData[i] = this.editItem;
                        testData[i].edit = false;
                    }
                }
                this.lecture.sel = testData;
                if(this.editItem!=null){
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
                }
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
                    this.saveInfo = res.data.data;
                    this.search();
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.getInitTableInfo();
        },

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
