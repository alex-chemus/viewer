import App from './App.vue'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import initStore from './store'
import routes from './routes'
import './style.scss'

const store = createStore(initStore)
const router = createRouter({
  routes,
  history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')