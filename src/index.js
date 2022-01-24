import App from './App.vue'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import initStore from './store'
import routes from './routes'
import './style.scss'

const store = createStore(initStore)
const router = createRouter({
  routes,
  history: createWebHistory() //createWebHashHistory() //createWebHistory(),
  //mode: 'history'
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')