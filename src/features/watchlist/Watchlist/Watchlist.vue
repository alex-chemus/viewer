<script setup lang="ts">
import { ref } from 'vue';
import { Content, IStorage } from '@shared';
import WatchlistItem from '../WatchlistItem/WatchlistItem.vue';

type List = {
  i: number,
  data: IStorage
}

const movies = ref<List[] | null>(null);
const series = ref<List[] | null>(null);

const getLocalData = () => {
  if (localStorage.getItem('watchlist')) {
    const localData = JSON.parse(localStorage.getItem('watchlist') as string);
    movies.value = localData.movies
      .map((item: IStorage, i: number) => ({ data: item, i }))
    series.value = localData.series
      .map((item: IStorage, i: number) => ({ data: item, i }))
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
</script>

<template>
  <section class="container pt-5">
    <div class="row justify-content-around">
      <div class="col-xxl-4 col-md-6 mb-5 mw-100vw">
        <h3 class="text-center mb-4">Movies</h3>
        <ul v-if="movies?.length" class="list-group">
          <WatchlistItem
            v-for="item in movies"
            :key="item.i"
            :data="item.data"
            @remove="removeItem"
          />
        </ul>
        <h4 v-else class="text-center">¯\_(ツ)_/¯</h4>
      </div>

      <div class="col-xxl-4 col-md-6 mb-5 mw-100vw">
        <h3 class="text-center mb-4">Series</h3>
        <ul v-if="series?.length" class="list-group">
          <WatchlistItem
            v-for="item in series"
            :key="item.i"
            :data="item.data"
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
