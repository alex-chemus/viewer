<script setup lang="ts">
import { ref } from 'vue';
import { Content } from '@/types';
import WatchlistItem from '@/components/WatchlistItem/WatchlistItem.vue';

const movies = ref<any[] | null>(null);
const series = ref<any[] | null>(null);

const getLocalData = () => {
  if (localStorage.getItem('watchlist')) {
    // console.log('got watchlist from localstorage')
    const localData = JSON.parse(localStorage.getItem('watchlist') as string);
    movies.value = localData.movies.map((item: any, i: number) => ({ ...item, i }));
    series.value = localData.series.map((item: any, i: number) => ({ ...item, i }));
  }
};

getLocalData();

type RemoveItemProps = {
  contentType: Content,
  id: string
}

const removeItem = ({ contentType, id }: RemoveItemProps) => {
  const watchlist = JSON.parse(localStorage.getItem('watchlist') as string);
  const antiType = contentType === 'movies' ? 'series' : 'movies';
  const updWatchlist = {
    [antiType]: watchlist[antiType],
    [contentType]: watchlist[contentType].filter((item: any) => item.id !== id),
  };
  localStorage.setItem('watchlist', JSON.stringify(updWatchlist));
  getLocalData();
};

/* export default {
  name: 'Watchlist',

  components: { WatchlistItem },

  setup() {
    const movies = ref(null)
    const series = ref(null)

    const getLocalData = () => {
      if (localStorage.getItem('watchlist')) {
        //console.log('got watchlist from localstorage')
        const localData = JSON.parse(localStorage.getItem('watchlist'))
        movies.value = localData.movies.map((item, i) => ({ ...item, i }))
        series.value = localData.series.map((item, i) => ({ ...item, i }))
      }
    }

    getLocalData()

    const removeItem = ({ type, id }) => {
      const watchlist = JSON.parse(localStorage.getItem('watchlist'))
      const antiType = type === 'movies' ? 'series' : 'movies'
      const updWatchlist = {
        [antiType]: watchlist[antiType],
        [type]: watchlist[type].filter(item => item.id !== id)
      }
      localStorage.setItem('watchlist', JSON.stringify(updWatchlist))
      getLocalData()
    }

    return { removeItem, movies, series }
  }
} */
</script>

<template>
  <section class="container pt-5">
    <div class="row justify-content-around">
      <div class="col-xxl-4 col-md-6 mb-5 mw-100vw">
        <h3 class="text-center mb-4">Movies</h3>
        <ul v-if="movies?.length" class="list-group">
          <WatchlistItem
            v-for="movie in movies"
            :key="movie.i"
            :data="movie"
            @remove="removeItem"
          />
        </ul>
        <h4 v-else class="text-center">¯\_(ツ)_/¯</h4>
      </div>

      <div class="col-xxl-4 col-md-6 mb-5 mw-100vw">
        <h3 class="text-center mb-4">Series</h3>
        <ul v-if="series?.length" class="list-group">
          <WatchlistItem
            v-for="serie in series"
            :key="serie.i"
            :data="serie"
            @remove="removeItem"
          />
        </ul>
        <h4 v-else class="text-center">¯\_(ツ)_/¯</h4>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

* {
  color: var(--text-color);
}

div, ul {
  min-width: 0;
}

.mw-100vw {
  max-width: 100vw;
}
</style>
