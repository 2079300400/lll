<template>
  <div class="text-top">
    <h2>关键时刻</h2>
    <div class="text-top-mytag">
      <img src="" />
    </div>

    <div class="text-banner"></div>

    <div class="text-bootm">
      <div class="pinglun">写评论</div>
      <van-icon class="icon" name="comment-o" />
      <van-icon class="icon" name="star-o" color='black' />
      <van-icon class="icon" name="good-job-o" color='red'/>
      <van-icon class="icon" name="share-o"  />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    click() {
     
      this.$http
        .post("/api/get_article_detail")
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

<style>
.text-bootm {
  border-top: 1px rgb(181, 176, 176) solid;
  margin-bottom: 0px;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
}
.text-banner {
  height: 450px;
}
.pinglun {
  width: 150px;
  height: 25px;
  border: 1px rgb(181, 176, 176) solid;
  border-radius: 40px;
  margin: 20px;
  text-align: center;
  line-height: 25px;
  margin-top: 5px;
}
.icon {
  font-size: 20px;
  margin: 5px;
  margin-top: 8px;
}
</style>