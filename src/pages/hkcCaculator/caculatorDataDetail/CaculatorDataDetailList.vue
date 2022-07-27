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
import {reactive,onMounted} from "vue"
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
    const listName=dataList[0][0]
    const methods={
      dataListEdit(){
        console.log("edit");
      }
    }
    onMounted(()=>{
      document.body.onselectstart = function(){
        return false;
      }
      let tagNode=document.querySelector(".el-tabs__nav")
      tagNode.addEventListener("mousedown",function(ed){
        var _x=ed.clientX
        let _xcur=Number(tagNode.getAttribute("style").replace(/[^\d]/g,' '))
        //移动距离计算
        tagNode.onmousemove=function(em){
          let _xmove=em.clientX-_x
          let _offset=_xmove-_xcur
          let _t=setTimeout(() => {
            tagNode.setAttribute("style",`transform: translateX(${_offset}px);`)
            clearTimeout(_t)
          }, 50);
          //关闭事件
          document.onmouseup=function(){
            tagNode.onmousemove=null
          }
        }
      })
    })
    return{
      dataList,
      listName,
      ...methods
    }
}
}
 </script>
<style scoped>
  .el-tabs{
    margin: 50px 50px 50px 50px;
  }
  .el-tabs /deep/ .el-tabs__item{
    font-size:18px;
    font-weight: 700;
    color: rgba(165, 165, 165, 0.8)
  }
  .el-tabs /deep/ .el-tabs__item.is-active{
    color: white
  }
  .el-tabs /deep/ .el-tabs__item:hover{
    color: white
  }
</style>