import { shallowMount } from "@vue/test-utils"
import Card from '@/components/Card/Card.vue'
import axios from 'axios'
import { createStore } from 'vuex'
import initStore from '@/store'

jest.mock('axios')
const store = createStore(initStore)

describe('Card.vue', () => {

  /*let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Card, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: jest.fn(() => {})
          }
        }
      }
    })
  })*/

  test('should not fetch data if it is pased to the props', () => {
    const title = 'Зеленый слоник'
    const year = 1242
    const imDbRating = 5

    const wrapper = shallowMount(Card, {
      props: {
        data: { title, year, imDbRating, type: 'movies', image: '' }
      },
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: jest.fn(() => {})
          }
        }
      }
    })

    const button = wrapper.get('[data-test="addBtn"]')
    button.trigger('click')

    expect(axios.get.mock.calls.length).toBe(0)
  })

  test('should have card placeholder by default', () => {
    const  wrapper = shallowMount(Card, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: jest.fn(() => {})
          }
        }
      }
    })

    const placeholder = wrapper.find('.card-placeholder').exists()
    const card = wrapper.find('[data-test="card"]').exists()

    expect(placeholder).toBeTruthy()
    expect(card).toBeFalsy()
  })

  test('should have card classes', () => {
    const title = 'Зеленый слоник'
    const year = 1242
    const imDbRating = 5

    const wrapper = shallowMount(Card, {
      props: {
        data: { title, year, imDbRating }
      }, 
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: jest.fn(() => {})
          }
        }
      }
    })

    const cardTitle = wrapper.get('.card-title')
    const cardYear = wrapper.get('.year')
    const cardRating = wrapper.get('.rating')

    expect(cardTitle.text()).toBe(`${title}`)
    expect(cardYear.text()).toBe(`${year}`)
    expect(cardRating.text()).toBe(`${imDbRating}`)
  })

  test('should fetch data if it\'s not passed to props', () => {
    const title = 'Зеленый слоник'
    const year = 1242
    const imDbRating = 5

    const wrapper = shallowMount(Card, {
      props: {
        data: { title, year, imDbRating }
      },
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: jest.fn(() => {})
          }
        }
      }
    })

    const button = wrapper.get('[data-test="addBtn"]')
    button.trigger('click')

    expect(axios.get.mock.calls.length).toBe(1)
  })

})