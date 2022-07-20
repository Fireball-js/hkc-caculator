<template>
 <div >
    <!-- 用户提表单请求数据 -->
    <div class="datalist-form" v-loading="loading" element-loading-background="rgba(122, 122, 122, 0.8)">
        <!-- 数据的时间 -->
       <div class="datalist-date">
           <el-date-picker
               v-model="dataDate"
               type="daterange"
               unlink-panels
               range-separator="---"
               start-placeholder="开始时间"
               end-placeholder="结束时间"
               size="default"
               format="YYYY/MM/DD"
               value-format="x"
               :default-time="defaultTime"
           />
       </div>
        <!-- 数据的测量设备类别 -->
       <div class="datalist-eq">
           <el-cascader
           v-model="dataEq"
             :options="dataeq"
             :props="props"    
             collapse-tags
             collapse-tags-tooltip
             clearable
             placeholder="测量设备"
             @visible-change="ifShowListFn"
           />
       </div>
        <!-- 数据的产品类别 -->
       <div class="datalist-p">
           <el-cascader
           v-model="dataP"
             :options="datap"
             :props="props"
             collapse-tags
             collapse-tags-tooltip
             clearable
             placeholder="产品类别"
             @blvisible-changeur="ifShowListFn"
           />
       </div>
       <div class="datalist-update" v-if="ifShowList">
           <div class="datalist-update-eq">
               <p>设备列表</p>
               <span v-for="i in dataEq" :key="i">{{i}}</span>
           </div>
           <div class="datalist-update-p">
               <p>产品列表</p>
               <span v-for="i in dataP" :key="i">{{i}}</span>
           </div>
           <div class="datalist-update-btn" @click="requestDataList"><i>提交</i></div>
       </div>
   </div>
</div>
</template>
<script>
import {ref, reactive} from 'vue'
import {useStore} from "@/store/index"
 export default {
name: 'data-listquery',
data(){
 return {
msg:'module for data list query'
}},
setup(){
    const dataDate=ref("")
    const dataEq=ref("")
    const dataP=ref("")
    const dataQuery=reactive([dataDate,dataEq,dataP])
    const ifShowList=ref(false)
    const store=useStore()
    const loading=ref(false)
//时间格式锁定00-24
    const defaultTime=reactive([
        new Date(2000,1,1,0,0,0),
        new Date(2000,2,1,23,59,59)
    ])
    // 表单格式
    const  props={
        "multiple":true,
        "emitPath":false
    } 
    const methods={
        //清单是否弹出
        ifShowListFn(_t){
            if(_t==false){
            if(dataEq.value!=[]||dataP.value!=[]){
                ifShowList.value=true
            }}
        },
        requestDataList(){
            loading.value=true
            let _t=setTimeout(()=>{
                loading.value=false
                clearTimeout(_t)
            },1100)
            store.requestDataList(dataQuery)
        }
    }
    //表单选项
    //*********设备选项
    const dataeq=reactive([
            {
                value:"ads",
                label:"ADS",
                children:[
                    {
                        value:"ads01",
                        label:"ADS01"
                    },
                    {
                        value:"ads02",
                        label:"ADS02"
                    },
                    {
                        value:"ads03",
                        label:"ADS03"
                    },
                    {
                        value:"ads04",
                        label:"ADS04"
                    },
                    {
                        value:"ads05",
                        label:"ADS05"
                    },
                    {
                        value:"ads06",
                        label:"ADS06"
                    },
            ]
            },
            {
                value:"ttp",
                label:"TTP",
                children:[
                    {
                        value:"ttp01",
                        label:"TTP01"
                    },
                    {
                        value:"ttp02",
                        label:"TTP02"
                    }
            ]
            }
        
])
    //*********产品类别
    const datap=reactive([
            {
                value:"43英寸",
                label:"43inch",
                children:
                [
                    {
                    value:"430fd",
                    label:"430FD"
                    },
                    {
                    value:"430hd",
                    label:"430HD"
                    }
                ]
            },
            {
                value:"23英寸",
                label:"23inch",
                children:
                [
                    {
                    value:"238fd",
                    label:"238FD"
                    },
                    {
                    value:"238hd",
                    label:"238HD"
                    }
                ]
            }
        ])
    return {
        dataDate,
        defaultTime,
        props,
        dataeq,
        datap,
        dataEq,
        dataP,
        ifShowList,
        loading,
        ...methods,
    }
}
}
 </script>
<style scoped>
     .datalist-form{
    width: 1000px;
    margin: 40px 50px;
    padding: 40px;
    border-radius: 15px;
    background-color: rgba(254, 255, 211, 0.3);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between
    
  }
  /* .datalist-date, .datalist-eq,.datalist-p{

  } */
  .datalist-update{
      width: 80%;
      background-color: rgba(224, 224, 224, 0.8);
      margin: 20px 0px;
      padding: 20px ;
      display: flex;
      border-radius: 20px;
      justify-content: left;
  }
  .datalist-update-eq,
  .datalist-update-p{
    width: 40%;
    margin-left: 40px
  }
  .datalist-update-btn{
    width: 60px;
    height: 100%;
    /* border-left: 1px solid black; */
    margin-left:20px;
    padding-left:auto 20px;
    cursor: pointer;
    position:relative;
    border-radius: 0 20px 20px 0
  }
  .datalist-update-btn i{
    width: 50px;
    margin:-10px 0 0 -5px;
    font-style: normal;
    position: absolute;
    top: 50%;
    left: 16%
}
  .datalist-update-btn:hover{
   background-color: rgb(203, 252, 252)
    /* background-color: gray */
  }
  .datalist-update p{
    margin:0;
    padding-bottom: 10px;
    border-bottom: 1px solid gray
  }
  .datalist-update span{
      width: 30px;
      height: 20px;
      margin: 20px;
      display: inline-block
  }
</style>