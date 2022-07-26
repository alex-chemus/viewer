<script setup lang="ts">
import axios from 'axios';
import { ref, watch, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { Key } from '@/store';

import { Content } from '@shared';
import { ICard } from '@features/card';
import FeedContent from '../FeedContent/FeedContent.vue'

const key = inject<Key>('key');
const { getters } = useStore(key);
const route = useRoute();

type ListItem = {
  data: ICard,
  i: number
}

const cardsList = ref<ListItem[] | null>(null);
const isError = ref<boolean>(false)
const loadTo = ref(21);

const contentType = ref<Content>(route.params.type as Content | 'movies');
const storageItem = contentType.value === 'movies' 
  ? 'popularMovies' : 'popularSeries';
const urlRequest = contentType.value === 'movies' 
  ? 'MostPopularMovies' : 'MostPopularTVs';

const fetchData = async () => {
  try {
    const res = await axios.get(`${getters.url}/${urlRequest}/${getters.apiKey}`);
    const isError = res.data.errorMessage !== '' || res.status !== 200;
    if (isError) throw new Error('Error');

    const list: ListItem[] = [];

    res.data.items.forEach((item: any, i: number) => { // ICard
      list.push({
        data: {
          title: item.title,
          year: item.year,
          imDbRating: item.imDbRating,
          image: item.image,
          id: item.id
        } as ICard,
        i
      })
    });

    cardsList.value = list.slice(0, loadTo.value);
    localStorage.setItem(storageItem, JSON.stringify({ list, time: Date.now() }));
    return null;
  } catch (err) {
    isError.value = true
    return null;
  }
};

const getData = () => {
  // if data is stored locally, retrieve it to the ref
  if (JSON.parse(localStorage.getItem(storageItem) as string)) {
    const localData = JSON.parse(localStorage.getItem(storageItem) as string);
    cardsList.value = localData.list.slice(0, loadTo.value);
    // if the data is expired (1h), fetch it again
    if (Date.now() - localData.time > 3600000) { // 3_600_000
      console.log('fetch data')
      fetchData();
    }
  } else { // fetch data if it's not stored locally
    fetchData();
  }
};

watch(() => route.params, getData);
onMounted(getData)

const onObserve = () => {
  loadTo.value += 20
  getData()
}
</script>

<template>
  <FeedContent 
    :cardsList="cardsList"
    :isError="isError"
    :contentType="contentType"
    @observe="onObserve"
  />
</template>