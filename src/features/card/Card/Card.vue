<script setup lang="ts">
import { computed, defineProps, inject, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Key } from '@/store';

import { ICard } from '../types';
import { toIPage } from '@features/page';
import { Content, useWatchlist, IStorage } from '@shared'
import CardContent from '../CardContent/CardContent.vue'


const props = defineProps<{
  data: ICard,
}>();

const key = inject<Key>('key');
const { getters, commit } = useStore(key);
const router = useRouter();
const contentType = ref<Content | null>(null)

// define content type if none
onMounted(async () => {
  if (!props.data.type) {
    //console.log('card data: ', props.data)
    try {
      const path = `${getters.url}/Title/${getters.apiKey}/${props.data.id}`;
      const res = await axios.get(path);
      if (res.data.errorMessage?.length || res.status !== 200) {
        throw new Error(res.data.errorMessage);
      }
      commit('addPage', toIPage(res.data));
      contentType.value = res.data.type === 'Movie' ? 'movies' : 'series';
    } catch (err) {
      console.log('failed to fetch in Card:', err);
      localStorage.setItem('errorMessage', err)
      router.push('/error');
      throw new Error();
    }
  } else {
    contentType.value = props.data.type;
  }
})

const seeInfo = () => {
  if (contentType.value)
    router.push(`/${contentType.value}/${props.data.id}`)
}

const toStorageData = computed(() => ({
  title: props.data.title,
  imDbRating: props.data.imDbRating,
  type: props.data.type,
  id: props.data.id
} as IStorage))

const addToWatchList = useWatchlist(contentType, toStorageData)
</script>

<template>
  <CardContent 
    :card-data="data" 
    @add-to-watchlist="addToWatchList" 
    @see-info="seeInfo" 
  />
</template>
