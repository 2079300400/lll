<template>
  <div id="app">
    <router-view />
    <van-tabbar
      active-color="#07c160"
      inactive-color="#000"
      route
      v-model="active"
      v-if="$route.meta.isRoot"
    >
      <van-tabbar-item replace to="/" icon="home-o" @click="clickacc"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/publish" icon="add-o">发布</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  created() {
    //当页面刷新时，保留信息
    let token = localStorage.getItem("token");
    let tokenExpired = localStorage.getItem("tokenExpired");
    if (token) {
      let now = new Date().getTime();
      if (now >= Number(tokenExpired)) {
        console.log(token);
        localStorage.getItem("token");
        localStorage.removeItem("tokenExpired");
        this.$toast("身份过期");
        return
      }
      this.$store.dispatch('getuserInfo',token)
        console.log(token);

    }
  },
  methods: {
    clickacc() {
      this.$http
        .post("/api/get_article_list", {
          cate_id: this.cate_id,
          skip: this.skip,
          limit: this.limit,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((reg) => {
          console.log(reg);
        });
    },
  },
};
</script>