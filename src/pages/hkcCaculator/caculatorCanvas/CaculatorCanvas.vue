<template>
 <div class="cacl-canvas-main">
   <span v-show="ifMapPlus" class="cacl-canvas-name">{{canvasName}}</span>
   <div ref="vNode" class="cacl-canvas" ></div>
   <div class="cacl-canvas-option">
    <input v-show="!ifDraw" type="text" v-model="step" placeholder="请输入步长值" @blur="refreshCanvas">
  </div>
</div>
</template>
<script>
import{onActivated,onMounted, ref} from "vue"
import * as echarts from 'echarts';
export default {
name: 'caculator-cavas',
data(){
 return {
msg:'map of data detail by cavas'
}},
setup(props,context){
    const vNode=ref(null)
    const step=ref(10)
    //判断是否渲染大图细节
    const ifMapPlus=context.attrs.ifMapPlus
    //判断是否有数据进行渲染
    const ifDraw=ref(false)
    const detail = context.attrs.detail
    const canvasName=ref("")
    const methods={
      refreshCanvas(){
        methods.mapDrawCanvas()
        console.log(context);
      },
      mapDrawCanvas(){
        if(detail[2]){
          // 设置名称
          let _n=detail[1]
          canvasName.value=_n[0][1]+"-"+_n[0][2]+"-"+_n[0][3] 
        // 创建一个依赖于数据的热点图
        var myChart = echarts.init(vNode.value);
        var option;
        var axisData;
          var mapData = detail[2]
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
            show:ifMapPlus,
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
              show: false
            },
            show:ifMapPlus
          },
          yAxis: {
            type: 'category',
            data: axisData.yAxis,
            splitArea: {
              show: true
            },
            show:ifMapPlus
          },
          visualMap: {
            min: 0,
            max: 20,
            calculable: true,
            orient: 'horizontal',
            left: '10%',
            bottom: '5%',
            show:ifMapPlus
          },
          series: [
            {
              name: 'Single Point',
              type: 'heatmap',
              data: axisData.valueArr,
              label: {
                show: ifMapPlus
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
    // 挂载时自动调用一次
    onMounted(()=>{
      methods.mapDrawCanvas()
    })    
    
    return{
        vNode,
        step,
        ifDraw,
        canvasName,
        ifMapPlus,
        ...methods
    }
  }
}
 </script>
<style scoped>
    .cacl-canvas-main{
      width: 100%;
      height: 100%;
      position: relative;
    }
    .cacl-canvas{
      width: 100%;
      height: 100%;
      background-color: rgba(240, 240, 240, 0.1);
      border-radius: 20px;
    }
    .cacl-canvas /deep/ canvas{
      margin-left: -10px!important
    }
    .cacl-canvas-name{
      width: 100%;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translate(-50%,0);
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
      left: 50%;
      transform: translate(-50%,0)
    }
</style>