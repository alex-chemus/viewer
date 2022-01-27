import { shallowMount } from "@vue/test-utils"
import Card from '@/components/Card/Card.vue'

describe('Card.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Card)
  })

  test('should have card placeholder by default', () => {
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
      }
    })

    const cardTitle = wrapper.get('.card-title')
    const cardYear = wrapper.get('.year')
    const cardRating = wrapper.get('.rating')

    expect(cardTitle.text()).toBe(`${title}`)
    expect(cardYear.text()).toBe(`${year}`)
    expect(cardRating.text()).toBe(`${imDbRating}`)
  })
})