import { shallowMount } from "@vue/test-utils"
import ImageItem from '@/components/ImageItem/ImageItem.vue'
// by default, there's no intersection observer, 
// so toggling cannot be tested :(
import 'intersection-observer'

describe('ImageItem.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ImageItem)
  })

  test('should be a placeholder on start', () => {
    const img = wrapper.find('img').exists()
    const placeholder = wrapper.find('.placeholder').exists()

    expect(img).toBeFalsy()
    expect(placeholder).toBeTruthy()
  })
})