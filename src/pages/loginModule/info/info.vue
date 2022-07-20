<template>
 <div>

</div>
</template>
<script>
import {  ElMessageBox } from 'element-plus'
import {onMounted} from "vue"
import { useRouter } from 'vue-router'
export default {
name: 'login-info',
data(){
 return {
msg:'a message for asking login '
}},
setup(){
    const router=useRouter()
    onMounted(()=>{
        ElMessageBox.alert('请登录用户', '未登录', {
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: () => {
            router.push("/")
        },
        })
    })
    }
}      

 </script>
<style scoped>
</style>