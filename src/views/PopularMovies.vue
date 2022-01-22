<template>
  <Loader></Loader>
</template>


<script>
import Loader from '@components/Loader.vue'
import axios from 'axios'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PopularMovies',

  components: { Loader },

  setup() {
    const { state } = useStore()
    const moviesList = ref(null)

    const fetchData = async () => {
      const res = await axios.get(`${state.url}/MostPopularMovies/${state.apiKey}`)
      console.log('fetch data')
      moviesList.value = res.data.items
      const list = []
      res.data.items.forEach(item => {
        list.push({
          title: item.title,
          year: item.year,
          imDbRating: item.imDbRating,
          image: item.image
        })
      })
      localStorage.setItem('popularMovies', { list, time: Date.now() })
      return null
    }

    // if data is stored locally, retrieve it to the ref 
    if (localStorage.getItem('popularMovies')) {
      const popularMovies = localStorage.getItem('popularMovies')
      moviesList.value = popularMovies.list
      // if the data is expired (1h), fetch it again
      if (Date.now() - popularMovies.time < 3_600_000) {
        fetchData()
          .then(() => {
            moviesList.value = localStorage.getItem('popularMovies').list
          })
      }
    } else { // fetch data if it's not stored locally
      fetchData()
    }

    return { moviesList }
  }
}
</script>


<style lang='scss' scoped>
  @import '@src/common.scss';
</style>