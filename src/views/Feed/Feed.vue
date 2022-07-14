<script setup lang="ts">
import axios from 'axios';
import { ref, watch, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { Key } from '@/store';

import { Content, ICard } from '@/types';
import Loader from '@/components/Loader/Loader.vue';
import Card from '@/components/Card/Card.vue';
import ConnectionError from '@/components/ConnectionError/ConnectionError.vue';
import Search from '@/components/Search/Search.vue';

const key = inject<Key>('key');
const { getters } = useStore(key);
const route = useRoute();

const cardsList = ref<ICard[] | 'Error' | null>(null); // ICard[]
const loadTo = ref(21);

const contentType = ref<Content>(route.params.type as Content | 'movies');
const storageItem = contentType.value === 'movies' ? 'popularMovies' : 'popularSeries';
const urlRequest = contentType.value === 'movies' ? 'MostPopularMovies' : 'MostPopularTVs';

const fetchData = async () => {
  try {
    console.log('assign data locally');
    const res = await axios.get(`${getters.url}/${urlRequest}/${getters.apiKey}`);
    const isError = res.data.errorMessage !== '' || res.status !== 200;
    if (isError) throw new Error('Error');

    const list: ICard[] = [];
    console.log('res.data: ', res.data)

    res.data.items.forEach((item: any, i: number) => { // ICard
      list.push({
        title: item.title,
        year: item.year,
        imDbRating: item.imDbRating,
        image: item.image,
        id: item.id,
        type: contentType.value,
        i,
      } as ICard);
    });

    // console.log('assign cardsList', type.value)
    cardsList.value = list.slice(0, loadTo.value);
    localStorage.setItem(storageItem, JSON.stringify({ list, time: Date.now() }));
    return null;
  } catch (err) {
    cardsList.value = 'Error';
    return null;
  }
};

const getData = () => {
  console.log('get data');
  // if data is stored locally, retrieve it to the ref
  if (JSON.parse(localStorage.getItem(storageItem) as string)) {
    const localData = JSON.parse(localStorage.getItem(storageItem) as string);
    cardsList.value = localData.list.slice(0, loadTo.value);
    // if the data is expired (1h), fetch it again
    if (Date.now() - localData.time > 3600000) { // 3_600_000
      fetchData();
    }
  } else { // fetch data if it's not stored locally
    console.log('fetch new data');
    fetchData();
  }
};

watch(() => route.params, getData);
onMounted(getData)

const loadMore = () => {
  loadTo.value += 20;
  getData();
};
</script>

<template>
  <ConnectionError v-if="cardsList === 'Error'" />

  <section v-else-if="cardsList && cardsList.length > 0" class="container pt-5">
    <div class="row justify-content-center mb-4">
      <div class="col-xl-6 col-lg-8 col-12">
        <Search
          :contentType="contentType"
        />
      </div>
    </div>

    <h1 class="mb-3 text-center">Popular {{ contentType }}</h1>

    <div class="row justify-content-center mb-3">
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

  <Loader v-else size="180" />
</template>

<style lang="scss" scoped>
@import '@/common.scss';

h1 {
  color: var(--text-color);
}

.container {
  min-width: 0;
}

.loadMore {
  margin: 0 auto;
}
</style>