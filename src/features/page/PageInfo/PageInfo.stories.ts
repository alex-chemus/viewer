import PageInfo from './PageInfo.vue'
import { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'Page/PageInfo',
  component: PageInfo
} as Meta<typeof PageInfo>

const Template: StoryFn<typeof PageInfo> = (args) => ({
  components: { PageInfo },
  setup() { return { args } },
  template: `<PageInfo v-bind="args" />`
})

export const Default = Template.bind({})
Default.args = {
  data: {
    title: 'Kenobi',
    genreList: [
      {
        key: 'some-genre',
        value: 'Some Genre'
      },
      {
        key: 'another-genre',
        value: 'Another Genre'
      }
    ],
    imDbRating: '7.0',
    plot: '- hello there! - general Kenobi!',
    year: '2022',
    directors: 'a Dude',
    stars: 'Ewan McGregor',
    runtimeStr: '1h 20m',
    companies: 'Disney',
    coutnries: 'USA',
    boxOffice: {
      budget: '100000$',
      cumulativeWorldwideGross: '100000$',
    },
    similars: [
      {
        title: 'Kenobi',
        year: '2022',
        imDbRating: '10',
        image: '',
        id: 'hello-there',
        type: 'series'
      },
      {
        title: 'Kenobi',
        year: '2022',
        imDbRating: '10',
        image: '',
        id: 'hello-there',
        type: 'series'
      }
    ],
    id: "1234",
    image: 'data:image/jpeg;base64,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'
  }
}