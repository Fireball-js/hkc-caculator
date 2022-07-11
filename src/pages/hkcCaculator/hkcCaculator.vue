<!-- 用户权限管理界面 -->
<template>
 <div class="cacl-main">
  <div>
    <NavBar />
  </div>
  <div class="cacl-sub-navbar">
    <SubNavBar></SubNavBar>
  </div>
  这里是caculator 
  <router-view></router-view>
</div>
</template>
<script>
  // import {ref} from "vue"
  import {useStore} from "@/store/index"

  import NavBar from "@/pages/navBar/navBar.vue"
  import SubNavBar from "@/pages/hkcCaculator/caculator/SubNavBar"
export default {
name: 'HKC-caculator',
data(){
     return {
    msg:'main page of caculator'
}},
components:{NavBar,SubNavBar},
setup(){
  const store = useStore()
  return{
    store
  } 
}
}
 </script>
<style scoped>
.cacl-main{
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(45deg, #b005ff,#01112b, #220392);
  box-sizing: border-box
}
</style>