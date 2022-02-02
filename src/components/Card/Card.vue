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
        <p :class="dyeCard(data.imDbRating)">{{ data.imDbRating }}</p>
      </div>

      <div class="wrapper">
        <button @click="addCard" class="btn btn-primary">Add</button>
        <button @click="seeInfo" class="btn btn-warning">Info</button>
      </div>
    </div>
  </article>

  <article v-else class="card card-placeholder">
  </article>
</template>


<script>
import { toRaw, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'

import ImageItem from '@/components/ImageItem/ImageItem.vue'

export default {
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

    const defineType = () => {
      if (!data.type) {
        console.log('fetch page from card')
        console.log('data', data)
        axios(`${getters.url}/Title/${getters.apiKey}/${data.id}`)
          .then(res => {
            if (res.data.errorMessage?.length || res.status !== 200) {
              throw new Error(`The server sent errorMessage: ${res.data.errorMessage}`)
            }
            commit('addPage', res.data)
            const type = res.data.type === 'Movie' ? 'movies' : 'seires'
            return type
            //router.push(`/${type}/${data.id}`)
          })
          .catch(err => {
            console.log('error in Card:', err)
            router.push('/notfound')
          })
      } else {
        //console.log(data)
        //router.push(`/${data.type}/${data.id}`)
        return data.type
      }
    }

    const seeInfo = event => {
      event.preventDefault()
      const type = defineType()
      router.push(`/${type}/${data.id}`)
      /*if (!data.type) {
        console.log('fetch page from card')
        console.log('data', data)
        axios(`${getters.url}/Title/${getters.apiKey}/${data.id}`)
          .then(res => {
            if (res.data.errorMessage?.length || res.status !== 200) {
              throw new Error(`The server sent errorMessage: ${res.data.errorMessage}`)
            }
            commit('addPage', res.data)
            const type = res.data.type === 'Movie' ? 'movies' : 'seires'
            router.push(`/${type}/${data.id}`)
          })
          .catch(err => {
            console.log('error in Card:', err)
            router.push('/notfound')
          })
      } else {
        //console.log(data)
        router.push(`/${data.type}/${data.id}`)
      }*/
    }

    const addCard = () => {
      if (!localStorage.getItem('watchlist')) {
        const watchlist = {
          movies: [],
          series: []
        }
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
      }
      const watchlist = JSON.parse(localStorage.getItem('watchlist'))
      const type = defineType()
      if (watchlist[type].find(item => item.id === data.id)) return
      console.log('type', type)
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
}
</script>


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