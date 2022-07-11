<template>
 <div>
    <el-menu
    :default-active="subnavIndex"
    class="sub-navbar-main"
    @select="subnavSelect"
  >
    <el-menu-item index="1">
        <template #title>
            <el-icon><Coin /></el-icon>
            <span>数据大图</span>
          </template>
    </el-menu-item>
    <el-menu-item index="2">
        <template #title>
            <el-icon><Document /></el-icon>
            <span>数据详情</span>
          </template>
    </el-menu-item>
    <el-menu-item index="3">
        <template #title>
            <el-icon><Fold /></el-icon>
            <span>数据列表</span>
          </template>
    </el-menu-item>
    <el-menu-item index="4">
        <template #title>
            <el-icon><Reading /></el-icon>
            <span>用户自定义</span>
          </template>
    </el-menu-item>
    </el-menu>
</div>
</template>
<script>
import {ref} from "vue"
import {useRouter} from "vue-router"
export default {
name: 'sub-navbar',
data(){
    return {
    msg:'left sub nav bar for data change'
}},
setup(){
    const subnavIndex=  ref("0")
    const Router=  useRouter()

    const methods={
        subnavSelect(_inx){
            _inx=_inx*1
            switch(_inx){
                case(1):Router.push({name:"datacanvas"})
                break;
                case(2):Router.push({name:"datadetail"})
                break;
                case(3):Router.push({name:"datalist"})
                break;
                case(4):Router.push({name:"datauserdefine"})
                break;
            }
        }
    }
    return{
        subnavIndex,
        ...methods
    }
}
}
 </script>
<style scoped>
.sub-navbar-main{
    width: 200px;
    background-color: rgba(0, 0, 0, 0);
    border:none;
    margin-top: 50px
}
.sub-navbar-main /deep/ .el-menu-item{
    height: 100px;
    font-size: 16px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
}
.sub-navbar-main /deep/ .el-menu-item:hover{
    background-color: rgba(0, 0, 0, 0)
}
.sub-navbar-main /deep/ .is-active{
    background-color: rgba(0, 0, 0, 0)

}
</style>