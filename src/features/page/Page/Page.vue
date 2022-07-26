<script setup lang="ts">
import { ref, inject, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { Key } from '@/store';

import { IPage } from '../types'
import toIPage from '../toIPage';
import { useWatchlist, Content, IStorage } from '@shared'
import PageContent from '../PageContent/PageContent.vue'

const data = ref<IPage | null>(null); // IPage

const key = inject<Key>('key');
const { commit, getters } = useStore(key);
const route = useRoute();
const router = useRouter();

const contentType = ref<Content>(route.params.type as Content || 'movies');
const contentId = route.params.id as string;

onMounted(() => {
  if (getters.hasPage(contentId)) { // if content data is cached
    data.value = getters.getPage(contentId);
  } else { // else fetch content data
    axios(`${getters.url}/Title/${getters.apiKey}/${contentId}`)
      .then((res) => {
        if (res.data.errorMessage?.length || res.status !== 200) 
          throw new Error(res.data.errorMessage)
          
        data.value = toIPage(res.data);
        commit('addPage', data.value);
      })
      .catch((err) => {
        console.log('error in Page:', err);
        localStorage.setItem('errorMessage', err)
        router.push('/error');
      });
  }
})

const toStorageData = computed(() => {
  if (!data.value) return data.value
  console.log(data.value)
  return {
    title: data.value.title,
    imDbRating: data.value.imDbRating,
    type: contentType.value,
    id: data.value.id
  } as IStorage
})

const addToWatchList = useWatchlist(contentType.value, toStorageData)
</script>

<template>
  <PageContent 
    :page-data="data"
    :content-type="contentType"
    @add-to-watchlist="addToWatchList"
  />
</template>
