<template>
    <div class="data-detail-main">
        <el-table :data="dataTitle.value" border style="width: 100%">
            <el-table-column align="center" label="详细数据">
                <el-table-column prop="0" align="center" label=""></el-table-column>
                <el-table-column prop="1" align="center" label="设备名称"></el-table-column>
                <el-table-column prop="2" align="center" label="产品名称"></el-table-column>
                <el-table-column prop="3" align="center" label="日期"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table :data="dataDetail.value" border style="width: 100%">
            <el-table-column prop="0" align="center" label="No."  />
            <el-table-column prop="1" align="center" label="X-axis"  />
            <el-table-column prop="2" align="center" label="Y-axis"  />
            <el-table-column prop="3" align="center" label="value"  />
        </el-table>
   </div>
   </template>
   <script>
import {  reactive, watchEffect } from 'vue'
import {useStore} from "@/store/index"
// import { useRouter } from 'vue-router'
export default {
name: 'caculator-data-details',
data(){
    return {
   msg:'detail data for cavas map'
}},
setup(){
    const store=useStore()
    // const router=useRouter()
    const dataDetail=reactive({})
    const dataTitle=reactive({})
    const methods={
        test(){
            console.log(dataDetail);
        }
    }
    watchEffect(()=>{
        dataDetail.value=store.dataDetail.data
        dataTitle.value=store.dataDetail.title
    })
    return{
        dataDetail,
        ...methods,
        dataTitle
    }
}
}
    </script>
<style scoped>
.data-detail-main{
    width: 1000px;
    margin: 100px 200px

}
</style>