import { shallowMount } from '@vue/test-utils'
import Test from '@/components/Test.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Test)
    expect(wrapper.text()).toContain('Test')
  })
})