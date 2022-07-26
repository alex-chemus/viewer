<script setup lang="ts">
import useDebounce from '../useDebounce';
import axios from 'axios';
import { useStore } from 'vuex';
import { ref, defineProps, inject } from 'vue';
import { IPopupItem } from '../types'
import { Key } from '@/store'
import { Content } from '@shared';
import SearchContent from '../SearchContent/SearchContent.vue'

const props = defineProps<{
  contentType: Content
}>();

const key = inject<Key>('key');
const { getters } = useStore(key);

const searchedList = ref<IPopupItem[] | null>(null);
const isLoading = ref<boolean>(false);
const isOpened = ref<boolean>(false)

const getSearchedData = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;

  if (target.value.trim() === '') return;

  isLoading.value = true
  isOpened.value = true
  const inputValue = target.value;
  const urlType = props.contentType === 'movies' 
    ? 'SearchMovie' : 'SearchSeries';

  axios(`${getters.url}/${urlType}/${getters.apiKey}/${inputValue}`)
    .then((res) => {
      if (res.data.errorMessage?.length || res.status !== 200) {
        throw new Error(res.data.errorMessage);
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
      searchedList.value = list
    })
    .catch((err) => {
      console.log(`failed to search ${props.contentType}`, err);
    });
};

const onInput = useDebounce(getSearchedData, 1000);

const closePopup = () => {
  isOpened.value = false
}
</script>

<template>
  <SearchContent 
    :searchedList="searchedList"
    :isOpened="isOpened"
    :contentType="contentType"
    @close-popup="closePopup"
    @input="onInput"
  />
</template>
