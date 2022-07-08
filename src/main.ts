import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
//import initStore from './store'
import { store, Key } from './store'
import routes from './routes'
import './style.scss'

const key: Key = Symbol()

//const store = createStore(initStore)
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

createApp(App)
  .provide('key', key)
  .use(router)
  .use(store, key)
  .mount('#app')