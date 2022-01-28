<template>
  <section v-if="cardsList?.length === 100" class="container pt-5">
    <div class="row justify-content-center">
      <div v-for="card in cardsList" :key="card.i" class="col-xl-2 col-lg-3 col-sm-4 col-8 py-3">
        <Card :data="card"></Card>
      </div>
    </div>
  </section>
  <ConnectionError v-else-if="cardsList === 'Error'"></ConnectionError>
  <Loader v-else></Loader>
</template>


<script>
import axios from 'axios'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import Loader from '@/components/Loader/Loader.vue'
import Card from '@/components/Card/Card.vue'
import ConnectionError from '@/components/ConnectionError/ConnectionError.vue'

export default {
  name: 'Popular',

  components: { Loader, Card, ConnectionError },

  setup() {
    const { state } = useStore()
    const route = useRoute()
    const router = useRouter()
    const cardsList = ref(null)

    const type = route.params.type
    //console.log('route params', route.params)
    if (type !== 'movies' && type !== 'series') {
      //console.log('wrong type:', type==='movies')
      router.push('/notfound')
    }
    const storageItem = type==='movies' ? 'popularMovies' : 'popularSeries'
    const urlRequest = type==='movies' ? 'MostPopularMovies' : 'MostPopularTVs'

    const fetchData = async () => {
      try {
        const res = await axios.get(`${state.url}/${urlRequest}/${state.apiKey}`)
        if (res.data.errorMessage !== '' || res.status !== 200) throw new Error('Error')
        cardsList.value = res.data.items
        const list = []
        res.data.items.forEach((item, i) => {
          list.push({
            title: item.title,
            year: item.year,
            imDbRating: item.imDbRating,
            image: item.image,
            i
          })
        })
        localStorage.setItem(storageItem, JSON.stringify({ list, time: Date.now() }))
        return null
      } catch (err) {
        cardsList.value = 'Error'
        return null
      }
    }

    const getData = () => {
      // if data is stored locally, retrieve it to the ref 
      if (JSON.parse(localStorage.getItem(storageItem))) {
        const localData = JSON.parse(localStorage.getItem(storageItem))
        cardsList.value = localData.list
        // if the data is expired (1h), fetch it again
        if (Date.now() - localData.time > 3_600_000) {
          fetchData()
        }
      } else { // fetch data if it's not stored locally
        fetchData()
      }
    }

    watch(() => route.params, getData())

    return { cardsList }
  }
}
</script>


<style lang='scss' scoped>
  @import '@/common.scss';

  .container {
    min-width: 0;
  }
</style>