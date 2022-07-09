<template>
 <div>
    <el-menu
    :default-active="navbarActiveIndex"
    class="navbar-main"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-menu/>
</div>
</template>
<script>
import {ref} from "vue"
 export default {
name: 'navBar',
data(){
 return {
msg:'navbar for showing menu'
}},
setup(){
   const navbarActiveIndex= ref(0)
}
}
 </script>
<style scoped>
</style>