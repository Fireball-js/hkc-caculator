<template>
 <div class="data-form">
    <CaculatorDataListSearch/>
    <CaculatorDataSubList/>
</div>
</template>
<script>
import CaculatorDataListSearch from './caculatorDataListComponents/CaculatorDataListSearch.vue'
import CaculatorDataSubList from './caculatorDataListComponents/CaculatorDataSubList.vue'
export default {
name: 'caculator-data-list',
data(){
 return {
msg:'data list for data detail'
}},
components:{CaculatorDataListSearch,CaculatorDataSubList}
}
 </script>
<style scoped>
.data-form{
    width: 1300px;
    margin: auto
} 
</style>