import WatchlistContent from './WatchlistContent.vue'
import { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'Watchlist/WatchlistContent',
  component: WatchlistContent,
  argTypes: {
    onRemoveItem: {}
  }
} as Meta<typeof WatchlistContent>

const Template: StoryFn<typeof WatchlistContent> = (args) => ({
  components: { WatchlistContent },
  setup() { return { args } },
  template: `<WatchlistContent v-bind="args" />`
})

export const Full = Template.bind({})
Full.args = {
  movies: [
    {
      i: 0,
      data: {
        title: 'Morbius',
        imDbRating: '10',
        type: 'movies',
        id: '1234'
      }
    },
    {
      i: 1,
      data: {
        title: 'Minions',
        imDbRating: '10',
        type: 'movies',
        id: '1234'
      }
    },
  ],
  series: [
    {
      i: 0,
      data: {
        title: 'The Boys',
        imDbRating: '7.0',
        type: 'series',
        id: '1234'
      }
    },
    {
      i: 1,
      data: {
        title: 'Peaky Blinders',
        imDbRating: '9.9',
        type: 'series',
        id: '1234'
      }
    }
  ]
}

export const Empty = Template.bind({})