<script setup lang="ts">
import useDebounce from '@/hooks/useDebounce';
import axios from 'axios';
import { useStore } from 'vuex';
import {
  ref, defineProps, inject, computed
} from 'vue';
import Popup from '@/components/Popup/Popup.vue';
import { IPopupItem } from '@/types'
import { Key } from '@/store'
import { Content, Loader, useWatchlist } from '@shared';

const props = defineProps<{
  contentType: Content
}>();

const key = inject<Key>('key');
const { getters } = useStore(key);

const searchedList = ref<IPopupItem[] | null>(null);
const isLoading = ref<boolean>(false);
const form = ref<HTMLFormElement | null>(null);
const isOpened = ref<boolean>(false)

const getSearchedData = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;

  if (target.value.trim() === '') return;

  isLoading.value = true
  isOpened.value = true
  const inputValue = target.value;
  const urlType = props.contentType === 'movies' ? 'SearchMovie' : 'SearchSeries';

  axios(`${getters.url}/${urlType}/${getters.apiKey}/${inputValue}`)
    .then((res) => {
      if (res.data.errorMessage?.length || res.status !== 200) {
        throw new Error(`The server sent errorMessage: ${res.data.errorMessage}`);
      }
      isLoading.value = false
      console.log('search data: ', res.data)

      const list: IPopupItem[] = []
      res.data.results.forEach((item: any) => {
        list.push({
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          resultType: item.resultType
        } as IPopupItem)
      })
      searchedList.value = list //toIPopupItem(res.data.results)
    })
    .catch((err) => {
      console.log(`failed to search ${props.contentType}`, err);
    });
};

const onInput = useDebounce(getSearchedData, 1000);

const closePopup = () => {
  console.log('close popup')
  isOpened.value = false
}

const backdropClasses = computed(() => {
  return ['backdrop', { '--open': isOpened.value }]
})
</script>

<template>
  <form @submit.prevent="() => {}" ref="form">
    <input
      type="text"
      class="form-control"
      :placeholder="`Search ${contentType}`"
      @input="onInput"
    />

    <Popup
      v-if="isOpened"
      :searchedList="searchedList"
    />
  </form>
  <div :class="backdropClasses" @click="closePopup"></div>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

input {
  width: 100%;
}

svg {
  width: 1em;
  color: white;
}

form {
  @include flex(center, center);
  position: relative;
  z-index: 2;
  //max-width: 100vw;
}

input {
  min-width: 0;
  min-height: 0;
}

.backdrop {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(0 0 0 / .5);
  display: none;

  &.--open {
    display: block;
  }
}
</style>
