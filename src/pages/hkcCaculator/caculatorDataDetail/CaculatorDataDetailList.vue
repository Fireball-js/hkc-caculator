<template>
 <div>
    <el-tabs
    v-model="listName"
    type="card"
    closable
    @edit="dataListEdit"
  >
    <el-tab-pane
      v-for="i in dataList"
      :key="i[0]"
      :label="i[0]"
      :name="i[0]"
    >
    <CaculatorDataDetail :dataDetail="i"></CaculatorDataDetail>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import {reactive,ref} from "vue"
import {useStore} from "@/store/index"
import CaculatorDataDetail from "./CaculatorDataDetail.vue"
export default {
name: 'data-detail-list',
data(){
 return {
msg:'a data detail list'
}},
components:{CaculatorDataDetail},
setup(){
    const store=useStore()
    const dataList=reactive(store.dataDetail)
    console.log(dataList);
    const listName=ref()
    const methods={
      dataListEdit(){
        console.log("edit");
      }
    }
    return{
      dataList,
      listName,
      ...methods
    }
}
}
 </script>
<style scoped>
</style>