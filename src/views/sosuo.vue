<template>
    <form action="/">
  <van-search
    show-action
    v-model="key_word"
    placeholder="请输入搜索关键词"
  />
</form>
</template>

<script>
import { Search } from 'vant';
export default {
    data() {
     return{
        key_word:''
     }   
    },
    components:{
        [Search.name]:Search
    },
    methods:{
clicksuoso(){
  this.$http.post('/api/search',{key_word:this.key_word})
    .then((res) => {
          console.log(res);
        })
        .catch((reg) => {
          console.log(reg);
        });
}
    }
    
}
</script>

<style>

</style>