import Loader from './Loader.vue'
import { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'Shared/Loader',
  component: Loader
} as Meta<typeof Loader>

const Template: StoryFn<typeof Loader> = (args) => ({
  components: { Loader },
  setup() { return { args } },
  template: `<Loader v-bind="args" />`
})

export const Default = Template.bind({})
Default.args = {
  size: 180
}