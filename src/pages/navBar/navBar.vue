<template>
<div class="navbar-main">
    <div class="navbar-logo" @click="toLogin">
        <img src="@/assets/logo.png">
        <p>HKC-Caculator <em>@demo</em></p>
    </div>
    <div class="navbar-menu">
    <el-menu
        :default-active="navbarActiveIndex"
        class="navbar-menu-el"
        mode="horizontal"
        @select="handleSelect"
    >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">数据大屏</el-menu-item>
        <el-menu-item index="3">数据管理</el-menu-item>
        <el-menu-item index="4">版本</el-menu-item>
    </el-menu>
    </div>
</div>
</template>
<script>
    import {useStore} from "@/store/index"
    import { useRouter } from "vue-router"
    // import {ref} from "vue"
 export default {
name: 'navBar',
data(){
 return {
msg:'navbar for showing menu'
}},
setup(){
    const store=useStore()
    const router=useRouter()
    const navbarActiveIndex= store.navbarActiveIndex
    const methods={
        handleSelect(_k){
            _k=_k*1
            switch(_k){
            case 1:
                router.push("/");
                break;
            case 2:
                router.push("/hkccaculator")
                break;
        }
        },
        toLogin(){
            router.push("/")
        }
    }
   return{
    navbarActiveIndex,
    ...methods
   }
}
}
 </script>
<style scoped>
.navbar-main{
    width: 1800px;
    display: flex;
    /* background-image: linear-gradient(45deg, #b005ff,#01112b, #220392) */
}
/*#region logo part  */
.navbar-logo{
    width: 240px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0);
    position: relative;
    margin: 0 50px 0 0;
    top:15px;
    left: 30px;
    flex-grow: 3;
    cursor: pointer;
}
.navbar-logo img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    top: 0px;
    left: 0px;
}
.navbar-logo p{
    display: inline;
    font-family: "MV Boli";
    font-size: 20px;
    margin: 0;
    color: white;
    position: absolute;
    top: -4px;
    left: 48px   
}
.navbar-logo em{
    font-style: normal;
    font-family: 'Times New Roman';
    font-size:14px ;
    position: relative;
    top: 18px;
    left: -108px
}
/*#endregion   */
/*#region menu part  */
.navbar-menu{
    background-color: rgba(0, 0, 0, 0);
    flex-grow: 5
}
.navbar-menu /deep/ .el-menu{
    background-color: rgba(0, 0, 0, 0);
    border: none
}
.navbar-menu /deep/ .el-menu-item:not(.is-disabled):hover{
    color: rgb(250, 253, 77);
    background-color: rgba(0, 0, 0, 0)
}
.navbar-menu /deep/ .el-menu-item{
    color: white;
    font-size: 700;
    font-size: 16px;
    margin: 10px 100px 0 0;
    border:none!important

}
.navbar-menu /deep/ .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal {
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px 20px 0 0
}
.navbar-menu /deep/ .el-menu--horizontal>.el-menu-item.is-active{
    color: rgb(14, 216, 243)!important;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px 20px 0 0
}
/*#endregion   */
</style>