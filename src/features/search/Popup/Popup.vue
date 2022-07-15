<script setup lang="ts">
import { defineProps, watch, computed } from 'vue';
import PopupItem from '../PopupItem/PopupItem.vue';
import { IPopupItem } from '../types';
import { Loader } from '@shared';

const props = defineProps<{
  searchedList: IPopupItem[] | null
}>();

watch(() => props.searchedList, () => {
  console.log('searched list: ', props.searchedList)
})

// list of search results (movies and series)
const resultsList = computed(() => {
  if (!props.searchedList) return null
  return props.searchedList
    .map((item: any, i: number) => ({ i, ...item }))
})
</script>

<template>
  <div class="popup">
    <div v-if="!resultsList" class="loader-container">
      <Loader size="70" />
    </div>

    <ul v-else-if="resultsList" class="list-group">
      <PopupItem v-for="item in resultsList" :key="item.i" :item="item" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

.popup {
  //border: 1px solid red;
  width: 100%;
  min-height: 100px;
  background: white;
  position: absolute;
  top: 120%;
  left: 0;
  //z-index: 2;
  border-radius: .25rem;
  box-shadow: var(--large-shadow);
}

.loader-container {
  width: 100%;
  @include flex(center, center);
  padding-top: 15px;
}

ul {
  max-width: 100vw;
  min-width: 0;
  //border: 1px solid red;
}
</style>
