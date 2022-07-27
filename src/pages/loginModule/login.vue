<!-- 用户登录界面 -->
<template>
  <div class="login-bcg">
    <navBar />
    <div class="login-main">
      <!-- 用户头像 -->
      <div  class="login-user-pic">
        <img :src="portraitUrl" v-if="status">
      </div>
    <el-form :model="form" :rules="rules">
      <!-- 用户登录 -->
      <div class="login-input">
      <el-form-item prop="username">
        <span class="login-input-icon"><el-icon><Avatar /></el-icon></span>
        <el-input   v-model="form.username" placeholder="username" />
      </el-form-item>
      <el-form-item >
        <span class="login-input-icon"><el-icon><Hide /></el-icon></span>
        <el-input type="password" v-model="form.password" placeholder="password"/>
      </el-form-item>
    </div>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="userLogin" color="rgba(0,0,0,0.1)">登录</el-button>
        <el-button type="warning" @click="userRegister" color="rgba(0,0,0,0.1)">注册</el-button>
        <el-button type="danger" @click="userAuthority" color="rgba(0,0,0,0.1)">权限管理</el-button>
      </el-form-item>
    </el-form>
    </div>
   </div>
</template>

<script scoped>
  import axios from "axios"
  import{reactive,ref} from "vue"
  import {useStore} from "@/store/index"
  import{useRouter,useRoute} from "vue-router"
  import navBar from "../navBar/navBar.vue"
export default {
  name: 'LoginRegister',
data(){
  const msg="用户注册登录页面，以及跳转权限管理页面"
  return{
  msg
  }
},
components:{navBar},
setup(){
  const $router=useRouter()
  const $route=useRoute()
  const store=useStore()
  const portraitUrl=ref("@/assets/portrait.png")
  const status=ref(false)
  
  // 定义el-item表单需要的数据
  const form =reactive({
  username:"",
  password:"",
 })

 var methods={
  // 用户登录
  userLogin:function(){
    axios.post("http://localhost:8082/login",form).then((_d)=>{
      if(_d.data.loginStatus==true){
        document.cookie="token="+_d.data.token
        store.navbarActiveIndex="2"
        store.subnavIndex="3"
        $router.push("/hkccaculator/datalist")
      }
    })
  },
  // 用户注册
  userRegister:function(){
    $router.push("/register")
},
  // 权限管理
  userAuthority:function(){
    console.log($route);
  },
  // 判断用户存在及刷新头像
  getUserPortrait:function(_v,_r,callback){
    axios.get("http://localhost:8082/username?username="+form.username).then(_d=>{
      if(_d.data.status==1){
        status.value=true
        portraitUrl.value=_d.data.url
      }else{
        callback(new Error("该用户不存在！"))
      }
    })
  }
}


//定义表单校验
const rules=reactive({
    username:[{validator:methods.getUserPortrait,trigger:"blur"}]
  })

 return {
  form,
  ...methods,
  portraitUrl,
  status,
  rules
 }
},
}
</script>

<style scoped > 
/*#region  用户登录 */
/* 登录页面大背景 */
.login-bcg{
  width: 100%;
  height: calc(100vh);
  box-sizing: border-box;
  background-image: linear-gradient(45deg, #b005ff,#01112b, #220392);
 
}
/* 登录页面毛玻璃 */
.login-main{
  width: 390px;
  height: 430px;
  padding: 30px;
  margin: auto;
  box-sizing: border-box;
  backdrop-filter: blur(100px);
  box-shadow: 0 0 20px 10px rgb(68, 15, 138);
  background-image:url("@/assets/bcg1.png");
  position: relative;
  top: 200px
}
.login-user-pic ,
.login-user-pic img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto
}
.login-user-pic{
  background-image: url("@/assets/portrait.png");
  background-repeat: no-repeat;
  background-size: contain
}
.login-user-pic img{
border: 1px solid rgba(240,240,240,0.5)
}

.login-bcg .el-form{
  margin-top:50px
}
.login-input .el-form-item{
  width:300px ;
  margin:30px auto ;
  /* position: relative; */
  left: -60px;
}
.login-input-icon{
  width: 10px;
  height: 10px;
  color: rgba(238, 238, 238, 0.6);
  position: absolute;
  left:-1px;
  top:3px;
}
.login-main /deep/ .el-input__inner{
  color: rgb(206, 255, 71);
}

.login-main /deep/ .el-input__wrapper{
background-color: rgba(0,0,0,0);
border-bottom: 1px solid white;
padding-left: 25px;
box-shadow: none;
border-radius: 0;
font-size: 16px
}


/*#endregion*/
 
 /*#region 按钮  */
 .login-btn{
  width: 300px;
  margin: 10px auto
 }
 .login-btn /deep/ .el-form-item__content{
  justify-content: space-between;
  
 }
 .login-btn .el-button--primary{
  width:300px
 }
 .login-btn .el-button--warning,
 .login-btn .el-button--danger{
  margin: 10px 0;
  width: 140px;
 }
.login-btn /deep/ span{
  color: rgba(240, 240, 240, 0.8)
}
 /*#endregion   */
</style>
