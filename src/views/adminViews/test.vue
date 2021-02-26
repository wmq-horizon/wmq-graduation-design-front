<!--<template>-->
<!--  <div>-->
<!--    <headerBar></headerBar>-->
<!--    <div>-->
<!--      <el-col :span="4"><menuComponent></menuComponent></el-col>-->
<!--      <el-col :span="20">-->
<!--        <div>-->
<!--          <el-col :span="24" class="table-title">-->
<!--            <div style="margin-top: 15px;margin-bottom: 10px;margin-right: 15%;">-->
<!--              <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">-->
<!--                <el-select v-model="select" slot="prepend" placeholder="请选择">-->
<!--                  <el-option label="讲座编号" value="1"></el-option>-->
<!--                  <el-option label="讲座名称" value="2"></el-option>-->
<!--                  <el-option label="宣讲室" value="3"></el-option>-->
<!--                </el-select>-->
<!--                <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--              </el-input>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </div>-->
<!--        <el-table-->
<!--          :data="tableData"-->
<!--          style="width: 100%;">-->
<!--          <el-table-column class="table-column"-->
<!--                           prop="lecNumber"-->
<!--                           label="讲座编号"-->
<!--                           width="100">-->
<!--            <template slot-scope="scope">-->
<!--            <span v-if="scope.row.edit">-->
<!--              <el-input size="mini" :placeholder="tableData" v-model="scope.lecNumber"></el-input>-->
<!--            </span>-->
<!--            </template>-->
<!--          </el-table-column>-->

<!--          <el-table-column-->
<!--            prop="title"-->
<!--            label="标题">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="lecRoom"-->
<!--            label="宣讲室"-->
<!--            width="130">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="speaker"-->
<!--            label="讲师"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="lecScore"-->
<!--            label="量化分"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="lecDate"-->
<!--            label="日期"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="lecTime"-->
<!--            label="时间"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="operation"-->
<!--            label="操作"-->
<!--            width="150">-->
<!--            <template slot-scope="scope">-->
<!--              <el-button style="float: left; padding-right: 3px;" type="text">-->
<!--                <span style="color: red" @click="delItem(scope.row,scope.$index)">删除</span>-->
<!--              </el-button>-->
<!--              <el-button style="float: left; padding-right: 3px;" type="text">-->
<!--                <span @click="editItem(scope.row,scope.$index)">编辑</span>-->
<!--              </el-button>-->
<!--              <el-button style="float: left; padding-right: 3px;" type="text">-->
<!--                <span @click="saveItem(scope.row,scope.$index)">确定</span>-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-col>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "lectureHome",-->
<!--        data(){-->
<!--            return{-->
<!--                input1: '',-->
<!--                input2: '',-->
<!--                input3: '',-->
<!--                select: '',-->
<!--                tableData:[{-->
<!--                    content:'',-->
<!--                    introduction:'',-->
<!--                    lecDate:'',-->
<!--                    lecNumber:'',-->
<!--                    lecRoom:'',-->
<!--                    lecScore:'',-->
<!--                    lecTime:'',-->
<!--                    speaker:'',-->
<!--                    title:''-->
<!--                }],-->
<!--                item:{-->
<!--                    content:'',-->
<!--                    introduction:'',-->
<!--                    lecDate:'',-->
<!--                    lecNumber:'',-->
<!--                    lecRoom:'',-->
<!--                    lecScore:'',-->
<!--                    lecTime:'',-->
<!--                    speaker:'',-->
<!--                    title:''-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        methods:{-->
<!--            saveItem(row){-->
<!--                row.edit = false;-->
<!--            },-->
<!--            delItem(row,index){-->
<!--                console.log("row");-->
<!--                console.log(row);-->
<!--                console.log("index");-->
<!--                console.log(index);-->
<!--                console.log(row.lecNumber);-->
<!--                this.$axios.get('/admin/delItem?lecNumber='+row.lecNumber).then(res=>{-->
<!--                    console.log(res);-->
<!--                    if(res.data.data.code ===200){-->
<!--                        this.$message('删除内容成功！');-->
<!--                    }-->
<!--                }).catch(err=>{-->
<!--                    this.$message('删除失败！');-->
<!--                    console.log(err);-->
<!--                })-->
<!--            },-->
<!--            editItem(row,index){-->
<!--                // this.$alert('编辑信息', '编辑讲座信息', {-->
<!--                //     confirmButtonText: '确定',-->
<!--                //     callback: action => {-->
<!--                //         this.$message({-->
<!--                //             type: 'info',-->
<!--                //             message: `action: ${ action }`-->
<!--                //         });-->
<!--                //     }-->
<!--                // });-->
<!--                // this.$axios.get('/admin/edit?'+row.lecNumber).then(res=>{-->
<!--                //     console.log(res)-->
<!--                // }).catch(err=>{-->
<!--                //     console.log(err);-->
<!--                // });-->
<!--                console.log(row);-->
<!--                console.log(index);-->
<!--                // for (let i of this.master_user.data) {-->
<!--                //     if (i.isSet) return this.$message.warning("请先保存当前编辑11项");-->
<!--                // }-->
<!--                // this.master_user.sel = row-->
<!--                row.edit = true-->
<!--            },-->
<!--            getInitTableInfo(){-->
<!--                this.$axios.get('/student/getSeatInfo?roomName=testRoom').then(res=>{-->
<!--                    console.log("登录管理员之后的数据为：");-->
<!--                    console.log(res.data.data);}).catch(err=>{-->
<!--                    console.log(err);-->
<!--                });-->
<!--                this.$axios.get('/student/lectureInfo').then(res=>{-->
<!--                    console.log("res");-->
<!--                    this.tableData=res.data.data;-->
<!--                    console.log(this.tableData);-->

<!--                }).catch(err=>{-->
<!--                    console.log(err);-->
<!--                })-->
<!--            }-->
<!--        },-->
<!--        created() {-->
<!--            this.getInitTableInfo();-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--  .table-title{-->
<!--    background-color:#B3CCB6;-->
<!--  }-->
<!--  .table-column{-->
<!--    background-color: #B3CCB6;-->
<!--  }-->
<!--  /*搜索框的样式*/-->
<!--  .el-select .el-input {-->
<!--    width: 130px;-->
<!--  }-->
<!--  .input-with-select .el-input-group__prepend {-->
<!--    background-color: #fff;-->
<!--  }-->

<!--</style>-->
