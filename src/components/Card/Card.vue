<script setup lang="ts">
import { computed, defineProps, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { Key } from '@/store'

import ImageItem from '@/components/ImageItem/ImageItem.vue'
import { Content } from '@/types'

const props = defineProps<{
  data: any, // todo: create a card content type (ICard)
}>()

const key = inject<Key>('key')
const { getters, commit } = useStore(key)
const router = useRouter()

const defineType = async (): Promise<never | Content> => {
  if (!props.data?.type) {

    try {
      const path = `${getters.url}/Title/${getters.apiKey}/${props.data.id}`
      const res = await axios.get(path)
      if (res.data.errorMessage?.length || res.status !== 200) {
        throw new Error(`The server sent errorMessage: ${res.data.errorMessage}`)
      }
      commit('addPage', res.data)
      const type = res.data.type === 'Movie' ? 'movies' : 'series'
      //console.log(res.data)
        return type
    } catch (err) {
      console.log('failed to fetch in Card:', err)
      router.push('/notfound')
      throw new Error()
    }

  } else {
    //console.log('data is passed:', data.type)
    //router.push(`/${data.type}/${data.id}`)
    return props.data.type
  }
}

const seeInfo = async (event: MouseEvent) => {
  event.preventDefault()
  const type = await defineType()
  //console.log(type)
  router.push(`/${type}/${props.data.id}`)
}

const addCard = async () => {
  if (!localStorage.getItem('watchlist')) {
    const watchlist = {
      movies: [],
      series: []
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }

  const watchlist = JSON.parse(localStorage.getItem('watchlist') as string)
  const contentType = await defineType()
  if (watchlist[contentType].find((item: any) => item.id === props.data.id)) return
  //console.log('type', type)
  watchlist[contentType].push({
    title: props.data.title,
    rating: props.data.imDbRating,
    type: contentType,
    id: props.data.id
  })
  localStorage.setItem('watchlist', JSON.stringify(watchlist))
}

const colorClass = computed(() => {
  let colorClass
  if (props.data.imDbRating > 8) colorClass = 'text-success'
  else if (props.data.imDbRating > 6) colorClass = 'text-warning'
  else colorClass = 'text-danger'
  return `card-text rating ${colorClass} m-0`
})

/*export default {
  name: 'Card',

  props: ['data'],

  components: { ImageItem },

  methods: {
    dyeCard(rating) {
      let colorClass
      if (rating > 8) colorClass = 'text-success'
      else if (rating > 6) colorClass = 'text-warning'
      else colorClass = 'text-danger'
      return `card-text rating ${colorClass} m-0`
    }
  },

  setup(props) {
    // check if data has title and other fields
    // if not, get full page by id and set it to the store

    const { getters, commit } = useStore()
    const router = useRouter()

    const data = toRaw(props.data)
    //console.log('data.value is', props.data.value)

    const defineType = async () => {
      if (!data?.type) {
        //console.log('data is not defined')
        try {
          const res = await axios.get(`${getters.url}/Title/${getters.apiKey}/${data.id}`)
          if (res.data.errorMessage?.length || res.status !== 200) {
            throw new Error(`The server sent errorMessage: ${res.data.errorMessage}`)
          }
          commit('addPage', res.data)
          const type = res.data.type === 'Movie' ? 'movies' : 'seires'
          //console.log(res.data)
           return type
        } catch (err) {
          console.log('failed to fetch in Card:', err)
          router.push('/notfound')
        }
      } else {
        //console.log('data is passed:', data.type)
        //router.push(`/${data.type}/${data.id}`)
        return data.type
      }
    }

    const seeInfo = async event => {
      event.preventDefault()
      const type = await defineType()
      //console.log(type)
      router.push(`/${type}/${data.id}`)
    }

    const addCard = async () => {
      if (!localStorage.getItem('watchlist')) {
        const watchlist = {
          movies: [],
          series: []
        }
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
      }
      const watchlist = JSON.parse(localStorage.getItem('watchlist'))
      const type = await defineType()
      if (watchlist[type].find(item => item.id === data.id)) return
      //console.log('type', type)
      watchlist[type].push({
        title: data.title,
        rating: data.imDbRating,
        type,
        id: data.id
      })
      localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }

    return { seeInfo, addCard }
  }
}*/
</script>


<template>
  <article class="card" v-if="data" data-test="card">
    <div class="card-body">
      <div class="image-container mb-3">
        <ImageItem 
          :url="data.image" 
          :styles="{
            maxHeight: '100%',
            maxWidth: '100%'
          }"
        ></ImageItem>
      </div>

      <h5 class="card-title mb-1" :title="data.title">{{ data.title }}</h5>

      <div class="wrapper mb-3 text-wrapper">
        <p v-if="data.year" class="card-text year m-0">{{ data.year }}</p>
        <p :class="colorClass">{{ data.imDbRating }}</p>
      </div>

      <div class="wrapper">
        <button @click="addCard" class="btn btn-primary" data-test="addBtn">Add</button>
        <button @click="seeInfo" class="btn btn-warning">Info</button>
      </div>
    </div>
  </article>

  <article v-else class="card card-placeholder">
  </article>
</template>


<style lang="scss" scoped>
@import '@/common.scss';

.card {
  box-shadow: var(--shadow);
  background-color: #fbfbfb;
  color: #262626;

  &-placeholder {
    height: 350px;
  }
}

.image-container {
  height: 200px;
  width: 100%;
  @include flex(center, center);
}

.wrapper {
  @include flex(space-between, center);
}

.text-wrapper {
  min-height: 1em;
}

.year {
  font-style: italic;
}

.rating {
  font-weight: bold;
}

.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn {
  box-shadow: var(--small-shadow);
}
</style>