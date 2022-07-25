<template>
 <div class="datalist-form"  v-if="refreshList">
    <el-table :data="dataList" style="width: 100%" @selection-change="ChooseDataList" ref="dataTableRef">
      <el-table-column label="查询结果列表">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="time" label="时间" width="300" />
        <el-table-column prop="fileName" label="文件名称" width="300" />
        <el-table-column prop="eqName" label="测量设备" width="300" />
        <el-table-column prop="prName" label="产品类别" width="300" />
      </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="datalist">
            <el-button link type="primary" size="small" @click="dataDetailQuery(datalist.row.fileName)"
              >详细</el-button>
            <!-- <el-button link type="primary" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="dataDetailListQuery">查询</el-button>
        <el-button @click="resetChoose">重选</el-button>
      </div>
</div>
</template>
<script>
import {  reactive, ref,watchEffect } from 'vue'
import {useStore} from "@/store/index"
import { useRouter } from 'vue-router'
export default {
name: 'data-list',
data(){
 return {
msg:'a list show data info'
}},
setup(){
  const store=useStore()
  const router=useRouter()
  const dataTableRef=ref()
  const refreshList=ref(false)
  const dataListChoosed=reactive([])
  let dataList=ref([])
  const methods={
    //单个数据请求
    dataDetailQuery(_i){
      let _arr=[]
      _arr.push(_i)
        store.dataDetailQuery(_arr)
        router.push({name:"datadetail"})
    },
    // 多选框
    ChooseDataList(val){
      dataListChoosed.value=val
      // console.log(dataListChoosed.value);
    },
    // 重选
    resetChoose(){
      dataTableRef.value.clearSelection()
      // console.log(dataListChoosed);
    },
    //提交多个表单
    dataDetailListQuery(){
    let _arr = dataListChoosed.value.map((i)=>{
      return i.fileName
    })
    console.log(_arr);
    store.dataDetailQuery(_arr)
    // router.push({name:"datadetail"})
    }
  }
    watchEffect(
      ()=>{
          dataList.value=store.dataList
          refreshList.value=store.refreshList
          // console.log(store.dataList);
      })
  return {
    refreshList,
    dataList,
    dataTableRef,
    ...methods
  }
}
}

 </script>
<style scoped>
.datalist-form{
    width: 100%;
    margin-left: 50px;
}
.datalist-form /deep/.el-table__cell{
    text-align: center
}

.datalist-form .el-table{
    border-radius: 20px
}
</style>