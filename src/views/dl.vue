<template>
  <div>
    <van-nav-bar
      style="background-color: #07c160; color: #fff"
      title="登录"
      left-arrow
    />

    <van-field
      left-icon="phone-o"
      v-model="username"
      type="tel"
      placeholder="请输入手机号码"
      label="手机号"
    />

    <van-field
      left-icon="guide-o"
      center
      clearable
      label="密码"
      v-model="password"
      type="password"
      placeholder="请输入密码"
    >
    </van-field>

    <van-button
      type="primary"
      size="large"
      @click="clickdl"
      style="
        width: 320px;
        margin-top: 40px;
        margin-right: 40px;
        margin-left: 40px;
      "
      >登录</van-button
    >

    <router-link to="/zhuce">前往注册</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    clickdl() {
      this.$http
        .post("/user/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            // let { userInfo,token,uid,tokenExpired} = res;
        
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("tokenExpired", res.data.tokenExpired);

            this.$store.commit("save", ["uid", res.data.uid]);
            this.$store.commit("save", ["token", res.data.token]);
            this.$store.commit("save", ["userInfo", res.data.userInfo]);
            this.$store.commit("save", ["isLogin", true]);
            this.$router.push("/my");
          }
         
        })
        .catch((reg) => {
          console.log(reg);
        });
    },
  },
};
</script>

<style>
</style>