<template>
 <div class="cacl-canvas-main">
   <span class="cacl-canvas-name">{{canvasName}}</span>
   <div ref="vNode" class="cacl-canvas"></div>
   <div class="cacl-canvas-option">
    <input v-show="!ifDraw" type="text" v-model="step" placeholder="请输入步长值" @blur="refreshCanvas">
    <span  v-show="ifDraw">没有数据</span>
  </div>
</div>
</template>
<script>
import{onActivated, ref} from "vue"
import * as echarts from 'echarts';
import {useStore} from "@/store/index"
export default {
name: 'caculator-cavas',
data(){
 return {
msg:'map of data detail by cavas'
}},
setup(){
    const vNode=ref(null)
    const store=useStore()
    const step=ref()
    const ifDraw=ref(false)
    const canvasName=ref("")
    const methods={
      refreshCanvas(){
        methods.mapDrawCanvas()
      },
      mapDrawCanvas(){
        if(store.dataDetail.data){
          // 设置名称
          let _n=store.dataDetail.title
          canvasName.value=_n[0][1]+"-"+_n[0][2]+"-"+_n[0][3] 
        // 创建一个依赖于数据的热点图
        var myChart = echarts.init(vNode.value);
        var option;
        var axisData;
          var mapData = store.dataDetail.data
          .map(function (item) {
            return [item[2], item[1], item[3] || '-',item[0]];
          });
          mapData=mapSort(mapData)
          mapData =repeatSort(mapData)
          axisData= axisCacl(mapData)
        }else{
          //数组为空时创造axisData=[]避免报错
          axisData= {valueArr:[],xAxis:[],yAxis:[]}
        }     
        //二维数组排序
        function mapSort(data){
          let _arr=data.sort((a,b)=>{
              return a[1]-b[1]
          })
          _arr=data.sort((a,b)=>{
              return a[0]-b[0]
          })
          return _arr
        }

        // 数据计算在同一格的处理
        function repeatSort(data){
        //  按照echarts处理xy轴坐标
        data.forEach((i)=>{
          i[1]=Math.floor(i[1]/step.value)
          i[0]=Math.floor(i[0]/step.value)
        })
        //  坐标小于步长时导致数据重复的修改
        let addP=[]
          for(let i=1;i<data.length;i++){
          // y方向加行数
          if(data[i][0]==data[i-1][0] && data[i][1]<data[i-1][1]){
            addP.push(i)
          }
          //x方向重复项目
          if(data[i][0]==data[i-1][0] && data[i][1]==data[i-1][1]){
            ++data[i][1]
          } 
          }
          (function addY(a){
            for(let i of a){
              for(let j=i;j<data.length;j++){
                ++data[j][0]
              }
            }
          })(addP)
          return data
        }

        // 计算x y轴坐标
        function axisCacl(mapData){
          let xMax=mapData[mapData.length-1][1]
          let xMin=mapData[0][1]
          let yMax=mapData[mapData.length-1][0]
          let yMin=mapData[0][0]
          let xAxis=[];
          let yAxis=[];
          for(let i=xMin;i<=xMax;i++){
            xAxis.push(i)
          }
          for(let j=yMin;j<=yMax;j++){
            yAxis.push(j)
          }
          // 渲染数据xy轴收归首行首列
          var xSpace=mapData[0][1]
          var ySpace=mapData[0][0]
          var valueArr=mapData.map((i)=>{
            return [i[1]-xSpace,i[0]-ySpace,i[2]]
          })
          return {xAxis,yAxis,valueArr}
        }
        option = {
          tooltip: {
            position: 'top'
          },
          grid: {
            width:"90%",
            height: '70%',
            top: '10%'
          },
          xAxis: {
            type: 'category',
            data: axisData.xAxis,
            splitArea: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: axisData.yAxis,
            splitArea: {
              show: true
            }
          },
          visualMap: {
            min: 0,
            max: 20,
            calculable: true,
            orient: 'horizontal',
            left: '10%',
            bottom: '5%',
          },
          series: [
            {
              name: 'Single Point',
              type: 'heatmap',
              data: axisData.valueArr,
              label: {
                show: true
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        try{
        option && myChart.setOption(option);
        ifDraw.value=false
      }catch{
        console.log("当前节点不存在");
        ifDraw.value=true
      }
     }
    }
   onActivated(()=>{
      methods.mapDrawCanvas()
   })
  
    
    return{
        vNode,
        step,
        ifDraw,
        canvasName,
        ...methods
    }
  }
}
 </script>
<style scoped>
    .cacl-canvas{
        width: 720px;
        height: 500px;
        margin: 100px 325px;
        background-color: rgba(240, 240, 240, 0.1);
        border-radius: 20px;
        padding-right: 35px;
    }
    .cacl-canvas-main{
      position: relative;
    }
    .cacl-canvas-name{
      position: absolute;
      top: 10px;
      left: 40%;
      color: rgba(240, 240, 240, 0.8)
    }
    .cacl-canvas-option input{
      background-color: rgba(240,240,240,0.2);
      border: none;
      text-align: center;
      font-weight: 700;
      color: white;
      position:absolute;
      bottom: 7%;
      left: 45%
    }
    .cacl-canvas-option span{
      position: absolute;
      bottom: 50%;
      left: 48%;
      font-size: 20px;
      color: rgba(240, 240, 240, 0.7);

    }
</style>