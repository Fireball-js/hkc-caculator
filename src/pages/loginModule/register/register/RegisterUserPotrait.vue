<template>
 <div>
    <div>
       <el-upload class="register-potrait"  
       action="http://localhost:8082/userregister/portrait" 
       :show-file-list="false"
       :name="name"
       :on-success="handlePotraitSuccess"
       >
            <el-avatar :size="100" :src="portraitUrl" />
        </el-upload>
    </div>
</div>
</template>
<script>
import{ref} from "vue"
import defaultPortrait from "@/assets/portrait.png"
export default {
name: 'registerUserPortrait',
data(){
 return {
    msg:'用于用户的头像提交'
}},
setup(props,context){
    const portraitUrl=ref(defaultPortrait)
    const name=ref("register-portrait")
    const method=ref("post")
    const userId=ref()
    const methods={
        handlePotraitSuccess(res){
           userId.value=res
           context.emit("userId",userId)
        }
    }
    return{
        portraitUrl,
       
        ...methods,
        method,
        name
    }
}
}
 </script>
<style scoped>
    .register-potrait{
        width: 100px;
        height: 100px;
margin: auto
    }
</style>