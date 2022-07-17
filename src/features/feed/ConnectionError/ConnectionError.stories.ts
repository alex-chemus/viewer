import ConnectionError from './ConnectionError.vue'
import { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'Feed/ConnectionError',
  component: ConnectionError
} as Meta<typeof ConnectionError>

const Template: StoryFn<typeof ConnectionError> = (args) => ({
  components: { ConnectionError },
  setup() { return { args } },
  template: `<ConnectionError v-bind="args" />`
})

export const Default = Template.bind({})
