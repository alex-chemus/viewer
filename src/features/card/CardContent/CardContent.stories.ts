import CardContent from './CardContent.vue'
import { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'Card/CardContent',
  component: CardContent
} as Meta<typeof CardContent>

const Template: StoryFn<typeof CardContent> = (args) => ({
  components: { CardContent },
  setup() { return { args } },
  template: `<CardContent v-bind="args" />`
})

export const Full = Template.bind({})
Full.args = {
  cardData: {
    title: 'Kenobi',
    year: '2022',
    imDbRating: '10',
    image: '',
    id: 'hello-there',
    type: 'series'
  }
}

export const Minimum = Template.bind({})
Minimum.args = {
  title: 'Kenobi',
  image: '',
  id: 'hello-there'
}