<template>
  <article class="card" v-if="card" data-test="card">
    <div class="card-body">
      <div class="image-container mb-3">
        <ImageItem 
          :url="card.image" 
          :styles="{
            maxHeight: '100%',
            maxWidth: '100%'
          }"
        ></ImageItem>
      </div>

      <h5 class="card-title mb-1" :title="card.title">{{ card.title }}</h5>

      <div class="wrapper mb-3">
        <p v-if="card.year" class="card-text year m-0">{{ card.year }}</p>
        <p :class="dyeCard(card.imDbRating)">{{ card.imDbRating }}</p>
      </div>

      <div class="wrapper">
        <button class="btn btn-primary">Add</button>
        <router-link :to="`/${card.type}/${card.id}`" class="btn btn-warning">Info</router-link>
      </div>
    </div>
  </article>

  <article v-else class="card card-placeholder">
  </article>
</template>


<script>
import { ref, toRefs, computed, toRef, toRaw, reactive } from 'vue'
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

    const data = reactive(toRaw(props.data))
    console.log(data.value.title)

    //const { data } = toRefs(props)
    //const data = toRef(props, 'data')
    //console.log(data.value)

    /*if (!card.value.type) {
      console.log('fetch page from card')
      axios(`${getters.url}/Title/${getters.apiKey}/${card.value.id}`)
        .then(res => {
          if (res.data.errorMessage?.length || res.status !== 200) {
            throw new Error(`The server sent errorMessage: ${res.data.errorMessage}`)
          }
          card.value = {
            title: res.data.title,
            year: res.data.year,
            imgDbRating: res.data.imgDbRating,
            type: res.data.type === 'Movie' ? 'movie' : 'series',
            image: res.data.image
          }
          commit('addPage', card.value)
        })
        .catch(err => {
          console.log('error in Card:', err)
          router.push('/notfound')
        })
    }*/

    //return { card }
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