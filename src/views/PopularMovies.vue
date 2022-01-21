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
    const { state, commit } = useStore()
    const moviesList = ref(null)

    const moviesCards = computed(() => state.moviesCards)
    console.log(moviesCards.value.length)

    if (moviesCards.value.length) {
      moviesList.value = moviesCards
    } else {
      axios
        .get(`${state.url}/MostPopularMovies/${state.apiKey}`)
        .then(res => {
          console.log('fetch', res.data.items)
          moviesList.value = res.data.items
          const list = []
          res.data.items.forEach(item => {
            list.push({
              title: item.title,
              year: item.year,
              imDbRating: item.imDbRating,
              image: item.image
            })
          });
          commit('addMoviesCards', list)
        })
    }

    return { moviesList }
  }
}
</script>


<style lang='scss' scoped>
  @import '@src/common.scss';
</style>