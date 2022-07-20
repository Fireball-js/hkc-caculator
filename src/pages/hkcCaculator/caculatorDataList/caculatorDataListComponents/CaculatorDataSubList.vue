<template>
 <div class="datalist-form"  v-if="refreshList">
    <el-table :data="dataList" style="width: 100%">
      <el-table-column label="查询结果列表">
        <el-table-column prop="time" label="时间" width="300" />
        <el-table-column prop="fileName" label="文件名称" width="300" />
        <el-table-column prop="eqName" label="测量设备" width="300" />
        <el-table-column prop="prName" label="产品类别" width="300" />
      </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="datalist">
            <el-button link type="primary" size="small" @click="dataDetailQuery(datalist.row.fileName)"
              >详细</el-button>
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
</div>
</template>
<script>
import {  ref,watchEffect } from 'vue'
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
  const refreshList=ref(false)
  let dataList=ref([])
  const methods={
    dataDetailQuery(_i){
        store.dataDetailQuery(_i)
        router.push({name:"datadetail"})
    }
  }
    watchEffect(
      ()=>{
          dataList.value=store.dataList
          refreshList.value=store.refreshList
      })
  return {
    refreshList,
    dataList,
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