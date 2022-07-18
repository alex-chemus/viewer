<script setup lang="ts">
import { ref } from 'vue';
import { Content, IStorage } from '@shared';
import WatchlistContent from '../WatchlistContent/WatchlistContent.vue'

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
  <WatchlistContent 
    :movies="movies"
    :series="series"
    @remove-item="removeItem"
  />
</template>
