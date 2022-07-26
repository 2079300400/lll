import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// 在main.ts/.js中设置过滤器： 全局utc格式转换为日期格式==》2021-09-14 
Vue.filter('dateFormatYMD', function (originVal) {
  if (originVal == null || originVal === '') return ''
  const dt = new Date(originVal);
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}年${m.substring(m.length - 2, m.length)}月${d.substring(d.length - 2, d.length)}`; // 2021-09-14 19:36:10
})


import '@/components/vant-global/index.js'

axios.defaults.baseURL = 'https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http'
Vue.prototype.$http = axios




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
