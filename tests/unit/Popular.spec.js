import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import Popular from '@/views/Popular/Popular.vue'
import initStore from '@/store' 
import routes from '@/routes'

const store = createStore(initStore)
const router = createRouter({
  routes,
  history: createWebHistory()
})

jest.mock('axios')

describe('Popular.vue', () => {
  test('should fetch data only once', async () => {
    router.push('/popular/movies')
    await router.isReady()

    const wrapper = shallowMount(Popular, {
      global: {
        plugins: [store, router]
      }
    })

    /*
      todo: воссоздать баг в меньшем масштабе
    */

    // initial get movies from request
    expect(axios.get.mock.calls.length).toBe(1)
    console.log(axios.get.mock.results[0][0])

    router.push('/watchlist')
    await router.isReady()
    router.push('/popular/movies')
    await router.isReady()

    // get movies from local storage
    expect(axios.get.mock.calls.length).toBe(1)
    //console.log(axios.get.mock.calls[0][0])

    //router.push('/watchlist')
    //await router.isReady()
    router.push('/popular/series')
    await router.isReady()

    // get serires from request
    //expect(axios.get.mock.calls.length).toBe(2)
    //console.log(axios.get.mock.calls[1][0])
  })

  /*test('should redirect to NotFound', () => {
    expect(() => 1).toBe(1)
  })*/
})