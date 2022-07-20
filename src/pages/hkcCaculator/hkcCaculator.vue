<!-- 用户权限管理界面 -->
<template>
  <div class="cacl-main">
    <div>
      <NavBar />
    </div>
    <div class="cacl-sub-navbar">
      <SubNavBar></SubNavBar>
    </div>
    <div class="cacl-sub-window" :max="5">
      <router-view v-slot="{Component}" >
        <keep-alive >
          <component :is="Component" v-if="$route.meta.keepAlive"/>
        </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive"/>
      </router-view>
    </div>
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
  min-height: 100vh;
  padding-bottom: 50px;
  background-image: linear-gradient(45deg, #b005ff,#01112b, #220392);
  box-sizing: border-box
}
.cacl-sub-navbar{
  position: absolute;
}
.cacl-sub-window{
  margin-left:200px
}
</style>