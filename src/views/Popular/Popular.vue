<template>
  <section v-if="cardsList?.length > 0" class="container pt-5">
    <div class="row justify-content-center mb-3">
      <div class="col-xl-6 col-lg-8 col-12">
        <Search 
          :type="type"
        />
      </div>
    </div>

    <div class="row justify-content-center mb-4">
      <div v-for="card in cardsList" :key="card.i" class="col-xl-2 col-lg-3 col-sm-4 col-8 py-3">
        <Card :data="card"></Card>
      </div>
    </div>

    <div class="row justify-content-center">
      <button 
        v-if="cardsList.length < 100"
        class="btn btn-primary loadMore col-auto mb-3"
        @click="loadMore"
      >Load more</button>
    </div>
  </section>
  <ConnectionError v-else-if="cardsList === 'Error'"></ConnectionError>
  <Loader v-else size="180" />
</template>


<script>
import axios from 'axios'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import Loader from '@/components/Loader/Loader.vue'
import Card from '@/components/Card/Card.vue'
import ConnectionError from '@/components/ConnectionError/ConnectionError.vue'
import Search from '@/components/Search/Search.vue'

export default {
  name: 'Popular',

  components: { Loader, Card, ConnectionError, Search },

  setup() {
    const { getters } = useStore()
    const route = useRoute()
    const router = useRouter()
    const cardsList = ref(null)
    const loadTo = ref(21)

    const type = ref(route.params.type ?? 'movies')
    console.log('type:', type.value)
    if (type.value !== 'movies' && type.value !== 'series') {
      router.push('/notfound')
    }
    const storageItem = type.value === 'movies' ? 'popularMovies' : 'popularSeries'
    const urlRequest = type.value === 'movies' ? 'MostPopularMovies' : 'MostPopularTVs'

    const fetchData = async () => {
      try {
        const res = await axios.get(`${getters.url}/${urlRequest}/${getters.apiKey}`)
        if (res.data.errorMessage !== '' || res.status !== 200) throw new Error('Error')
        //cardsList.value = res.data.items.slice(0, loadTo.value)
        const list = []
        res.data.items.forEach((item, i) => {
          list.push({
            title: item.title,
            year: item.year,
            imDbRating: item.imDbRating,
            image: item.image,
            id: item.id,
            type,
            i
          })
        })
        cardsList.value = list.slice(0, loadTo.value)
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
        cardsList.value = localData.list.slice(0, loadTo.value)
        // if the data is expired (1h), fetch it again
        if (Date.now() - localData.time > 3_600_000) {
          fetchData()
        }
      } else { // fetch data if it's not stored locally
        fetchData()
      }
    }

    watch(() => route.params, getData())

    const loadMore = () => {
      loadTo.value += 20
      getData()
    }

    return { cardsList, loadMore, type }
  }
}
</script>


<style lang='scss' scoped>
@import '@/common.scss';

.container {
  min-width: 0;
}

.loadMore {
  margin: 0 auto;
}
</style>