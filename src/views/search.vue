<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        :placeholder="hotword"
        @cancel="$router.back()"
        @input="onSearchInput"
        @search="onSearch"
      />
    </form>
    <!-- 搜索结果 -->
    <!-- trim去掉字符串的前后空格 -->
    <div class="search-result" v-show="value.trim().length">
      <van-cell
        :title="item.title"
        v-for="item in searchResult"
        :key="item._id"
        @click="searchResultTap(item.title)"
      >
      </van-cell>
    </div>
    <!-- 历史记录 -->
    <div class="search-history">
      <van-cell title="搜索历史">
        <div @click="clear">
            <span>全部删除</span>
            <van-icon name="delete" />
        </div>
      </van-cell>
      <van-cell @click="historyTap(item)" :title="item" v-for="item in searchHistory" :key="item._id">
        <van-icon @click.stop="del(index)" name="close" />
      </van-cell>
    </div>
  </div>
</template>

<script>
import { search } from "@/utils/api";
import { Search,Icon } from "vant";
function debounce(fn, t = 500) {
  let timer = null;
  return function (...arg) {
    clearTimeout(timer);
    timer = setTimeout((v) => {
      fn.apply(this,arg);
    }, t);
  };
}
export default {
  data() {
    return {
      value: "",
      searchResult: [],
      searchHistory: [],
      hotword:"前端"
    };
  },
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon,
  },
  created(){
    let searchHistory = localStorage.getItem('searchHistory')
    if(searchHistory){
        this.searchHistory = JSON.parse(searchHistory)||[]
    }
  },
  methods: {
    onSearch(e){
      e = e.trim();
      e = e||this.hotword
      this.searchResultTap(e)
    //   console.log(e);
    },
    onSearchInput:debounce(function(e) {
        console.log(e);
      e = e.trim();
      if (e.length === 0) {
        this.searchResult = [];
        return;
      }
      search({
        key_word: e,
      }).then((res) => {
        if (res.code == 0) {
          this.searchResult = res.data;
        }
      });
    }),
    searchResultTap(title){
        title = title.trim()

        let index =this.searchHistory.findIndex(v=>v===title)
        if(index>=0){
            this.searchHistory.splice(index,1)
        }
        this.searchHistory.unshift(title)
        localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
        this.$router.push('/searchList?key_word='+title)
    },
    del(index){
        this.searchHistory.splice(index,1)
        localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
    },
    clear(){
        this.searchHistory = []
        localStorage.setItem('searchHistory',JSON.stringify([]))
    },
    historyTap(title){
        this.searchResultTap(title)
    }
  },
};
</script>

<style lang="less">
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
  background-color: #eee;
}
</style>