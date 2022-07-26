import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      isRoot:true,
      isLogin:true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/publish.vue'),
    meta:{
      isRoot:true
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/my.vue'),
    meta:{
      isRoot:true
    }
  },
  {
    path: '/mytag',
    name: 'mytag',
    component: () => import('../views/mytag.vue')
  },
  {
    path: '/dl',
    name: 'dl',
    component: () => import('../views/dl.vue'),
    meta:{
      isLogin:true
    }
  },
  {
    path: '/sosuo',
    name: 'sosuo',
    component: () => import('../views/sosuo.vue')
  },
  {
    path: '/text',
    name: 'text',
    component: () => import('../views/text.vue')
  },
  {
    path: '/zhuce',
    name: 'zhuce',
    component: () => import('../views/zhuce.vue'),
    meta:{
      isLogin:true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
