import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getuserInfo } from '@/utils/api'
export default new Vuex.Store({
  //保存的数据 
  state: {
    uid: '',
    token: '',
    userInfo: {},
    isLogin: false
  },
  getters: {

  },
  mutations: {
    //对数据进行修改

    save(state, [key, val]) {
      state[key] = val
    },
    clear(state) {
      state['uid'] = '',
        state['token'] = '',
        state['userInfo'] = {},
        state['isLogin'] = false
    }
  },
  actions: {

    //调接口
    getuserInfo({ commit }, token) {
      getuserInfo({
        token
      }).then(res => {
        console.log(res);
        let { uid, userInfo } = res.data
        commit('save', ['token', token])
        commit('save', ['userInfo', userInfo])
        commit('save', ['uid', uid])
        commit('save', ['isLogin', true])
      }).catch(reg => {
        console.log(reg);
      })
    }



  },
  modules: {


  }
})
