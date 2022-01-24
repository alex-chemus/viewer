<template>
  <section v-if="moviesList" class="container pt-5">
    <div class="row justify-content-center">
      <div v-for="movie in moviesList" :key="movie.i" class="col-xl-2 col-lg-3 col-sm-4 col-8 py-3">
        <Card :data="movie"></Card>
      </div>
    </div>
  </section>
  <Loader v-else></Loader>
</template>


<script>
import Loader from '@components/Loader/Loader.vue'
import Card from '@components/Card/Card.vue'
import axios from 'axios'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PopularMovies',

  components: { Loader, Card },

  setup() {
    const { state } = useStore()
    const moviesList = ref(null)

    const fetchData = async () => {
      const res = await axios.get(`${state.url}/MostPopularMovies/${state.apiKey}`)
      console.log('fetch data')
      moviesList.value = res.data.items
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
      localStorage.setItem('popularMovies', JSON.stringify({ list, time: Date.now() }))
      return null
    }

    // if data is stored locally, retrieve it to the ref 
    if (JSON.parse(localStorage.getItem('popularMovies'))) {
      const popularMovies = JSON.parse(localStorage.getItem('popularMovies'))
      console.log(popularMovies)
      moviesList.value = popularMovies.list
      console.log('get from local storage')
      // if the data is expired (1h), fetch it again
      if (Date.now() - popularMovies.time > 3_600_000) {
        fetchData()
          .then(() => {
            moviesList.value = JSON.parse(localStorage.getItem('popularMovies')).list
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

  .container {
    min-width: 0;
  }
</style>