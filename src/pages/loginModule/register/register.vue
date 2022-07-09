<!-- 用户注册界面 -->
<template>
 <div class="register-bg">
  <div class="register-main">
    <!-- 注册界面 -->
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :label-position="labelPosition"
    >
    <!-- 用户头像提交 -->
    <div class="register-portrait">
      <RegisterUserPortrait @userId="userId"/>
    </div>
    <!-- 用户密码验证 -->
    <div class="register-info">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码确认" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <!-- 用户权限注册 -->
    <el-form-item label="权限" prop="authority">
        <el-radio-group v-model="ruleForm.authority">
            <el-radio-button label="Admin" />
            <el-radio-button label="Engineer" />
            <el-radio-button label="Operator" />
        </el-radio-group>
    </el-form-item>
    <!-- 提交重置按钮 -->
    <el-form-item >
      <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
      <el-button @click="resetForm(ruleFormRef)" color="rgba(255,36,36,0.8)">重置</el-button>
      <el-button @click="toLogin" color="rgba(97,255,70,0.8)">返回</el-button>
    </el-form-item>
  </div>
  </el-form>
</div>
</div>
</template>
<script>
// 工具
import axios from "axios"
import {reactive, ref } from 'vue'  
import {useRouter} from "vue-router"
// 组件
import RegisterUserPortrait from "./register/RegisterUserPotrait.vue"  
export default {
name: 'AuthorityManagement',
data(){
return{
    msg:'for user register',
}
},
components:{RegisterUserPortrait},
setup(){
    // 表单验证
    const ruleFormRef=ref()
    const userId=ref("00000000")
    const ruleForm=reactive({
      pass:"",
      checkPass:"",
      username:"",
      authority:"",
      userId:userId.value
    })

    const labelPosition=ref("left")
    const $router=useRouter()
    const methods={
      //注册提交
      submitForm(formEl){
        if(!formEl) return
        formEl.validate((valid)=>{
          if(valid){
            axios.post("http://localhost:8082/userregister",ruleForm)
          }else{
            console.log("err");
            return false
          }
        })
      },
      // 回退
      toLogin(){
        $router.push('./')
      },
      // 重置表单
      resetForm(formEl){
        if (!formEl) {
          return
        }else{
          formEl.resetFields()
        }        
      },
      // 接收id
      userId(_id){
        userId.value=_id
      }
      }
      // 校验用户名
      function validateUsername(_r,_v,callback){
        if(_v==""){
          callback(new Error("用户名不能为空!"))
        }else{
          axios.get("http://localhost:8082/username",{params:{username:ruleForm.username}})
          .then((res)=>{
            if(res.data.status==0){
              callback()
            }else{
              callback(new Error("用户名重复！"))
            }
          })
        }
      }
      //校验一次密码
       function validatePass(_r,_v,callback){
          if(_v==""){
            callback(new Error("密码不能为空！"))
          }else{
            callback()
          }
        }

      // 校验二次密码
       function validatecheckPass(_r,_v,callback){
        if(_v==""){
            callback(new Error("密码不能为空！"))
          }else{
            if(_v!==ruleForm.pass){
              callback(new Error("密码不一致，请重新输入"))
              ruleForm.checkPass=""
            }else{
              callback()
            }
          }
      }
      // 校验rule的设置
      const rules=reactive({
        username:[{validator:validateUsername,trigger:"blur"}],
        pass:[{validator:validatePass,trigger:"blur"}],
        checkPass:[{validator:validatecheckPass,trigger:"blur"}],
      })
    

    return{
      ...methods,
      ruleFormRef,
      ruleForm,
      rules,
      labelPosition
    }
}
}
 </script>
<style scoped>
.register-bg{
  width: 100%;
  height: calc(100vh);
  padding-top: 150px;
  box-sizing: border-box;
  background-image: linear-gradient(45deg, #b005ff,#01112b, #220392);
}
.register-main{
  width: 500px;
  height: 450px;
  margin:auto;
  padding-right: 40px;

}
.register-portrait{
  margin-bottom :40px;
  padding-left: 40px;
  padding-top:30px;
  cursor: pointer;
}
.register-info{
  width: 500px;
  height: 250px;
  padding-right: 20px
}
.register-info /deep/ .el-form-item__content{
  margin-left: -50px
}
</style>