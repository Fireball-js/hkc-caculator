<template>
    <div class="data-detail-main">
        <el-table :data="dataTitle" border style="width: 100%">
            <el-table-column align="center" label="详细数据">
                <el-table-column prop="0" align="center" label=""></el-table-column>
                <el-table-column prop="1" align="center" label="设备名称"></el-table-column>
                <el-table-column prop="2" align="center" label="产品名称"></el-table-column>
                <el-table-column prop="3" align="center" label="日期"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table :data="dataDetail" border style="width: 100%">
            <el-table-column prop="0" align="center" label="No."  />
            <el-table-column prop="1" align="center" label="X-axis"  />
            <el-table-column prop="2" align="center" label="Y-axis"  />
            <el-table-column prop="3" align="center" label="value"  />
        </el-table>
   </div>
   </template>
   <script>
import {  reactive } from 'vue'
// import { useRouter } from 'vue-router'
export default {
name: 'caculator-data-details',
data(){
    return {
   msg:'detail data for cavas map'
}},
setup(props,context){
    // const router=useRouter()
    const dataTitle=reactive(context.attrs.dataDetail[1])
    const dataDetail=reactive(context.attrs.dataDetail[2])
    // console.log(context.attrs.dataDetail);
    // console.log(dataTitle);
    // console.log(dataDetail.value);
    const methods={
        test(){
            console.log(dataDetail);
        }
    }
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
    margin:  auto

}
</style>