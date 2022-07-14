<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { Key } from '@/store';

import { Content, ICard, IPage } from '@/types';
import Loader from '@/components/Loader/Loader.vue';
import PageContent from '@/components/PageContent/PageContent.vue';
import Card from '@/components/Card/Card.vue';

const data = ref<any | null>(null); // IPage

const key = inject<Key>('key');
const { commit, getters } = useStore(key);
const route = useRoute();
const router = useRouter();

const contentType = ref<Content>(route.params.type as Content || 'movies');
const contentId = route.params.id as string;

const fillPageData = (data: any) => ({
  genreList: data.genreList,
  imDbRating: data.imDbRating,
  plot: data.plot,
  year: data.year,
  directors: data.directors,
  stars: data.stars,
  runtimeStr: data.runtimeStr,
  companies: data.companies,
  boxOffice: data.boxOffice,
  countries: data.countries,
  similars: data.similars
} as IPage)

// вынести это в lyfecycle hook
if (getters.hasPage(contentId)) { // if content data is cached
  data.value = getters.getPage(contentId);
} else { // else fetch content data
  axios(`${getters.url}/Title/${getters.apiKey}/${contentId}`)
    .then((res) => {
      if (res.data.errorMessage?.length || res.status !== 200) throw new Error('failed to fetch ', res.data.errorMessage)
      data.value = fillPageData(res.data);
      console.log(data.value);
      commit('addPage', data.value);
    })
    .catch((err) => {
      console.log('error in Page:', err);
      router.push('/notfound');
    });
}

// todo: make it shared
const addToWatchList = async () => {
  // create watchlist if there's none in the local storage
  if (!localStorage.getItem('watchlist')) {
    const watchlist = {
      movies: [],
      series: [],
    };
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  const watchlist = JSON.parse(localStorage.getItem('watchlist') as string);

  const isInList = watchlist[contentType.value].find((item: any) => item.id === data.value.id);
  if (isInList) return;

  watchlist[contentType.value].push({
    title: data.value.title,
    rating: data.value.imDbRating,
    type: contentType.value,
    id: data.value.id,
  });
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
};

const similars = computed(() => 
  data.value.similars
    .map((item: any, i: number) => ({
      title: item.title,
      imDbRating: item.imDbRating,
      image: item.image,
      id: item.id,
      i
    } as ICard))
)
</script>

<template>
  <section v-if="data" class="container-md pt-5">
    <div class="row">
      <div class="col-12 col-xl-4 col-md-6 poster-container">
        <img :src="data.image" alt="Poster" class="poster">
      </div>
      <PageContent :data="data" :type="contentType" />
    </div>

    <div class="row justify-content-center mb-5">
      <button class="col-auto btn btn-primary" @click="addToWatchList">Add to the watchlist</button>
    </div>

    <h3 class="text-center mb-3">Similars</h3>

    <div class="row justify-content-center mb-4">
      <div
        v-for="card in similars"
        :key="card.i"
        class="col-xl-2 col-lg-3 col-sm-4 col-8 py-3"
      >
        <Card :data="card" />
      </div>
    </div>
  </section>

  <Loader v-else size="180" />
</template>

<style lang="scss" scoped>
@import '@/common.scss';

.poster {
  max-width: 100%;
  border-radius: 1rem;

  @media (max-width: 768px) {
    max-height: 70vh;
    box-shadow: var(--large-shadow);
  }
}

* {
  color: var(--text-color);
}

.poster-container {
  @include flex(center, flex-start);

  @media (max-width: 768px) {
    padding: 0;
  }
}
</style>
