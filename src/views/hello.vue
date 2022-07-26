<template>
  <div>
    HelloWorld
    <br />
    东风谷早苗
    {{ $route.params.name }}
    {{ $route.params.age }}
    <!-- <div>
            <a href="https://t.bilibili.com/?spm_id_from=333.1007.0.0">东风谷早苗</a>
        </div> -->
    <br />
    <input type="text" v-model="username" />
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    console.log(this.$route);
    let { name, age } = this.$route;
  },
  mounted() {
    console.log(this.$route.params);
    this.getData();
  },
  methods: {
    getData(index) {
      axios
        .get(
          `https://840f52df-329a-455d-ae39-6a1a4128349f.bspapp.com/api/getHotCartoonList?type=1&changeData=${index}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>