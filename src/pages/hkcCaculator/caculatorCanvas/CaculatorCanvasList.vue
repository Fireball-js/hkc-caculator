<template>
<div class="map-main">
    <div v-for="(i,inx) in dataList" 
        :key="i[0]" 
        v-show="!ifshow" 
        class="map-box" 
        @click.capture="openDetail(inx)"
    >
        <CaculatorCanvas  :detail="i" :ifMapPlus="false"></CaculatorCanvas>
        <div class="map-title">{{i[0]}}</div>
    </div>
    <div class="map-box-open" v-if="ifshow">
        <CaculatorCanvas :detail="ifOpen" :ifMapPlus="true"></CaculatorCanvas>
        <div class="map-title">{{ifMapTitle}}<el-icon @click="closeDetail"><CloseBold /></el-icon></div>
        
    </div>
</div>
</template>
<script>
import {useStore} from "@/store/index"
import CaculatorCanvas from "./CaculatorCanvas.vue"
import {reactive,ref} from "vue"
export default {
name: 'canvas-data-list',
data(){
 return {
msg:'map list for detail'
}},
components:{CaculatorCanvas},
setup(){
    const store=useStore()
    const dataList=reactive(store.dataDetail)
    const listNode=ref(null)
    //渲染大图
    const ifOpen=ref("")
    //大小图切换
    const ifshow=ref(false)
    //大图title
    const ifMapTitle=ref()
    
    const methods={
        // 大图
        openDetail(_n){
            ifshow.value=true
            ifOpen.value=dataList[_n]
            ifMapTitle.value=dataList[_n][0]
            console.log(ifOpen.value);
        },
        closeDetail(){
            ifshow.value=false
        }
    }
   
    return{
        ...methods,
        dataList,
        listNode,
        ifOpen,
        ifshow,
        ifMapTitle
    }
}
}
 </script>
<style scoped>
    .map-main{
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        margin: 50px;
    }
    .map-box{
        width: 200px;
        height: 200px;
        margin: 20px;
        padding: 30px 10px 10px 10px;
        box-shadow:0 0 10px 3px rgba(143, 143, 143, 0.5);
        position: relative;
        cursor: pointer;
    }
    .map-box-open{
        width: 700px;
        height: 500px;
        margin:50px 100px;
        padding: 30px 10px 10px 10px;
        box-shadow:0 0 10px 3px rgba(143, 143, 143, 0.5);
        position: relative;
        cursor: pointer;
    }
    .map-box:hover{
        box-shadow:0 0 20px 10px rgba(143, 143, 143, 0.5);
    }
    .map-title{
        width: 100%;
        color: white;
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translate(-50%,0);
        border-bottom: 1px solid rgba(216, 216, 216, 0.3)
    }
    .map-title /deep/ .el-icon{
        position: absolute;
        right: 5px;
    }
</style>