<script setup lang="ts">
import { computed, defineProps, inject, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Key } from '@/store';

import ImageItem from '@/components/ImageItem/ImageItem.vue';
import { Content, ICard, IStorage } from '@/types';
import useWatchlist from '@/hooks/useWatchlist';
import toIPage from '@/utils/toIPage';

const props = defineProps<{
  data: ICard, // todo: create a card content type (ICard)
}>();

const key = inject<Key>('key');
const { getters, commit } = useStore(key);
const router = useRouter();
const contentType = ref<Content | null>(null)

// define content type if none
onMounted(async () => {
  if (!props.data.type) {
    try {
      const path = `${getters.url}/Title/${getters.apiKey}/${props.data.id}`;
      const res = await axios.get(path);
      if (res.data.errorMessage?.length || res.status !== 200) {
        throw new Error(`The server sent errorMessage: ${res.data.errorMessage}`);
      }
      commit('addPage', toIPage(res.data));
      contentType.value = res.data.type === 'Movie' ? 'movies' : 'series';
    } catch (err) {
      console.log('failed to fetch in Card:', err);
      router.push('/notfound');
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

const colorClass = computed(() => {
  if (!props.data.imDbRating) return ''
  let colorClass;
  if (+props.data.imDbRating > 8) colorClass = 'text-success';
  else if (+props.data.imDbRating > 6) colorClass = 'text-warning';
  else colorClass = 'text-danger';
  return `card-text rating ${colorClass} m-0`;
})
</script>

<template>
  <article class="card" v-if="data" data-test="card">
    <div class="card-body">
      <div class="image-container mb-3">
        <ImageItem
          :url="data.image"
          :styles="{
            maxHeight: '100%',
            maxWidth: '100%'
          }"
        ></ImageItem>
      </div>

      <h5 class="card-title mb-1" :title="data.title">{{ data.title }}</h5>

      <div class="wrapper mb-3 text-wrapper">
        <p v-if="data.year" class="card-text year m-0">{{ data.year }}</p>
        <p :class="colorClass">{{ data.imDbRating }}</p>
      </div>

      <div class="wrapper">
        <button @click.prevent="addToWatchList" class="btn btn-primary" data-test="addBtn">Add</button>
        <button @click="seeInfo" class="btn btn-warning">Info</button>
      </div>
    </div>
  </article>

  <article v-else class="card card-placeholder">
  </article>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

.card {
  box-shadow: var(--shadow);
  background-color: #fbfbfb;
  color: #262626;

  &-placeholder {
    height: 350px;
  }
}

.image-container {
  height: 200px;
  width: 100%;
  @include flex(center, center);
}

.wrapper {
  @include flex(space-between, center);
}

.text-wrapper {
  min-height: 1em;
}

.year {
  font-style: italic;
}

.rating {
  font-weight: bold;
}

.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn {
  box-shadow: var(--small-shadow);
}
</style>
