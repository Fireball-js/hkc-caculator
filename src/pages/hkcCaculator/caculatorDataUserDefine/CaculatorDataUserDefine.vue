<template>
 <div>
    这里是用户自定义页
</div>
</template>
<script>
 export default {
name: 'caculator-Data-User-Define',
data(){
 return {
msg:'data modified by users'
}},
setup(){
    document.cookie="aaa=123"
    let aaa=document.cookie.split(";").map(i=>{
        return i.split("=")
    })
    let bl=aaa.some(i=>{
       return i.includes("token")
    })
    console.log(bl);
}
}
 </script>
<style scoped>
</style>