<template>
  <div class="mytag">
    <div class="top">
      <van-nav-bar
        title="个人信息"
        left-arrow
        style="
          background-color: #07c160;
          font-size: 19px;
          text-align: center;
          line-height: 52px;
          color: #fff;
        "
           to="/my"
      />
    </div>
    <van-cell title="头像" is-link />
    <van-cell title="昵称" is-link />
    <van-cell title="性别" is-link />
    <van-cell title="生日" @click="show = true" is-link />
    <van-calendar v-model="show" @confirm="onConfirm" />

    <div class="buttom-text">
      <van-button type="primary" size="large" style="width: 320px"
        >确定</van-button
      >
    </div>
  </div>
</template>



<script>
import { Calendar, Cell, CellGroup } from "vant";
export default {
  data() {
    return {
      show: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 7, 31),
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    onClickLeft() {
  
    },
  },

  components: {
    [Calendar.name]: Calendar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
};
</script>


<style>
.buttom-text {
  margin-top: 40px;
  margin-right: 36px;
  margin-left: 36px;
}
</style>