import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import initStore from './store'
import routes from './routes'
import './style.scss'

const store = createStore(initStore)
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')