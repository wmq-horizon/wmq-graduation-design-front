<template>
<div>
  <headerBar></headerBar>
  <div>
    <el-col :span="4"><menuComponent></menuComponent></el-col>
    <el-col :span="20">
      <div>
        <el-col :span="24" class="table-title">
          <div style="margin-top: 15px;margin-bottom: 10px;margin-right: 15%;">
            <el-input placeholder="请输入搜索内容" v-model="searchData" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="宣讲室编号" value="1"></el-option>
                <el-option label="宣讲室名称" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </el-col>
      </div>
      <el-table
        :data="tableData"
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
                  @click="deleteRow(scope.$index,tableData,scope.row)">
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
        name: "classRoomHome",
        data(){
            return{
                saveInfo:[],
                searchData:'',
                limit: 5,
                total: null,
                page: 1,
                select: '',
                editItem: {//接收编辑的讲座信息
                    roomNumber:'',
                    roomName:'',
                    rowCount:'',
                    colCount:'',
                },
                tableData:[{
                    roomNumber:'',
                    roomName:'',
                    rowCount:0,
                    colCount:0,
                    edit:false,
                }],
                columns: [{
                    prop: "roomNumber",
                    label: "宣讲室编号",
                    width: 200,
                }, {
                    prop: "roomName",
                    label: "宣讲室名称",
                    width: 300
                }, {
                    prop: "rowCount",
                    label: "总行数",
                    width: 200
                }, {
                    prop: "colCount",
                    label: "总列数",
                    width: 200
                }],
            }
        },
        methods:{
            search(){
                this.page =1;
                this.searchByconditions();
            },
            searchByconditions(){
                console.log(this.select);
                let list = [];
                if (this.select==="1"){
                    list = this.saveInfo.filter((item, index) =>
                        item.roomNumber.includes(this.searchData)
                    );
                }else if (this.select==="2" || this.select===""){
                    list = this.saveInfo.filter((item, index) =>
                        item.roomName.includes(this.searchData)
                    );
                }else{
                    list = this.saveInfo;
                }
                this.tableData = list.filter((item, index) =>
                    index < this.page * this.limit && index >= this.limit * (this.page - 1)
                );
                this.total = list.length;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.limit = val;
                this.searchByconditions();
            },
            // 当前页改变
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val;
                this.searchByconditions();
            },
            deleteRow(index,datas,row) { //删除
                datas.splice(index, 1);
                console.log(row);
                this.$axios.get("/admin/deleteRoom?roomNumber="+row.roomNumber).then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                }).catch(err=>{
                    console.log(err);
                });
            }
            ,
            editRow(row,index){
                console.log(row);
                console.log(index);
                let testData = this.tableData.slice();
                for (let i = 0; i < testData.length; i++) {
                    console.log(i);
                    if (testData[i].roomNumber === row.roomNumber) {
                        testData[i].edit = true;
                        console.log("查看数据刷新");
                        console.log(testData);
                    }
                }
                this.tableData = testData;
            },
            saveRow(row) { //保存
                let testData = this.tableData.slice();
                for (let i = 0; i < testData.length; i++) {
                    console.log(i);
                    if (testData[i].roomNumber === row.roomNumber) {
                        testData[i] = this.editItem;
                        testData[i].edit = false;
                    }
                }
                this.tableData = testData;
                if(this.editItem!=null){
                    this.$axios.post("/admin/updateLectureRoom", {
                        roomNumber:this.editItem.roomNumber,
                        roomName:this.editItem.roomName,
                        rowCount:this.editItem.rowCount,
                        colCount:this.editItem.colCount,
                        seat1:row.roomNumber,
                    }).then(res => {
                        console.log(res);
                        const h = this.$createElement;

                        this.$notify({
                            title: '标题名称',
                            message: h('i', { style: 'color: teal'}, res.data.setMessage)
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            getInitTableInfo(){
                this.$axios.get('/admin/getClassRoomInfo').then(res=>{
                    console.log("res");
                    this.saveInfo=res.data.data;
                    this.search();
                    console.log(this.tableData);
                }).catch(err=>{
                    console.log(err);
                })
            },
        },
        created() {
            this.getInitTableInfo();
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
