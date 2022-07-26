<template>
  <div>
    <div class="zhuce-top">
      <van-nav-bar
        title="注册"
        left-arrow
        style="
          background-color: #07c160;
          font-size: 19px;
          text-align: center;
          line-height: 52px;
          color: #fff;
        "
      />
    </div>
    <van-field left-icon="phone-o" v-model="mobile" label="手机号" />
    <van-field left-icon="shield-o" type="password" v-model="password" label="密码" />
    <van-field
      left-icon="guide-o"
      center
      clearable
      label="短信验证码"
      placeholder="请输入短信验证码"
      v-model="vercode"
    >
      <template #button>
        <van-button size="small"  @click="clickaa" 
          >发送验证码</van-button
        >
      </template>
    </van-field>
        <van-button type="primary" @click="clickbb" size="large" style="
    width:320px;
    margin-top:40px;
    margin-right:40px;
    margin-left: 40px;">注册</van-button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      mobile: "",
      password: "",
      vercode:'',
      type:''
    };
  },
  methods: {
    clickaa() {
       this.$http
        .post("/user/sendSms", { mobile: this.mobile,type:'register'})
        .then((res) => {
          console.log(res);
        })
        .catch((reg) => {
          console.log(reg);
        });
    },
     clickbb() {
      this.$http
        .post("/user/reg", { username: this.mobile, password: this.password,vercode:this.vercode })
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