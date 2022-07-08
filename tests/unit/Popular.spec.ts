import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import { createStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import Popular from '@/views/Popular/Popular.vue'
import initStore from '@/store' 

const store = createStore(initStore)

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => {}
  }))
}))

jest.mock('axios')

describe('Popular.vue', () => {
  test('should fetch data', async () => {
    useRoute.mockImplementationOnce(() => ({
      params: 'movies'
    }))

    const push = jest.fn()
    useRouter.mockImplementationOnce(() => ({ push }))

    axios.get.mockResolvedValue(Promise.resolve({
      status: 200,
      data: {
        errorMessage: '',
        items: [
          {
            title: 'spider man',
            year: 2001,
            imDbRating: 7.3,
            image: ''
          },
          {
            title: 'batman',
            year: 2005,
            imDbRating: 6.9,
            image: ''
          },
        ]
      }
    }))
    shallowMount(Popular, {
      global: {
        plugins: [store]
      }
    })

    // initial get movies from request
    expect(axios.get.mock.calls.length).toBe(1)
  })

  test('should redirect to NotFound', () => {
    useRoute.mockImplementationOnce(() => ({
      params: 'abobasterus'
    }))

    const push = jest.fn()
    useRouter.mockImplementationOnce(() => ({ push }))

    shallowMount(Popular, {
      global: {
        plugins: [store]
      }
    })

    // should redirect, cuz params are incorrect
    expect(push.mock.calls.length).toBe(1)
  })
})