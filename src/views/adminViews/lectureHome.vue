<template>
  <div>
    <headerBar></headerBar>
    <div>
      <el-col :span="4"><menuComponent></menuComponent></el-col>
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
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </div>
        <el-table  :data="lecture.sel">
          <el-table-column type="index"></el-table-column>
          <el-table-column v-for="item in lecture.columns" v-bind:key="item.id" :label="item.label" :prop="item.prop" :width="item.width" >
            <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input size="mini" :placeholder="scope.row[item.prop]" v-model="lecture.sel[item.prop]"></el-input>
            </span>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
             <span class="el-tag el-tag--success el-tag--mini" style="cursor: pointer;" @click="saveRow(scope.row,scope.$index)">
               确定
             </span>
              <span class="el-tag el-tag--primary el-tag--mini" style="cursor: pointer;" @click="editRow(scope.row,scope.$index)">
               编辑
             </span>
              <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="deleteRow(scope.$index,lecture.sel)">
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
        data(){
            return{
                input3:'',
                select:'',
                lecture:{
                    sel:[{
                        content:'',
                        introduction:'',
                        lecDate:'',
                        lecNumber:'',
                        lecRoom:'',
                        lecScore:'',
                        lecTime:'',
                        speaker:'',
                        title:'',
                        edit:true,
                    }],
                    columns:[{
                        prop:"lecNumber",
                        label:"讲座编号",
                        width:100
                    },{
                        prop:"title",
                        label:"标题",
                        width:230
                    },{
                        prop:"lecRoom",
                        label:"宣讲室",
                        width:130
                    },{
                        prop:"speaker",
                        label:"讲师",
                        width:100
                    },{
                        prop:"lecScore",
                        label:"量化分",
                        width:100
                    },{
                        prop:"lecDate",
                        label:"日期",
                        width:100
                    },{
                        prop:"lecTime",
                        label:"时间",
                        width:100
                    },{
                        prop:"edit",
                        label:"可编辑",
                        width:100
                    }],
                    data:[],
                }
            }
        },
        methods: {
            saveRow(row) { //保存
                // let data = JSON.parse(JSON.stringify(this.lecture.sel));
                // for (let k in data) {
                //     row[k] = data[k]; //将sel里面的value赋值给这一行。ps(for....in..)的妙用，细心的同学发现这里我并没有循环对象row
                // }
                row.edit = false;
            },
            editRow(row) { //编辑
                // for (let i of this.lecture.data) {
                //     if (i.isSet) return this.$message.warning("请先保存当前编辑11项");
                // }
                // this.lecture.sel = row;
                row.edit = true;

            },
            deleteRow(rows) { //删除
                rows.splice(index, 1)
            }
            ,
            getInitTableInfo(){
                this.$axios.get('/student/lectureInfo').then(res=>{
                    console.log("res");
                    this.lecture.sel=res.data.data;
                    console.log(this.lecture.sel);
                }).catch(err=>{
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
  .table-title{
    background-color:#B3CCB6;
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
