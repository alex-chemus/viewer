<script setup="" lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { IPopupItem } from '../types';
import Popup from '../Popup/Popup.vue'
import { Content } from '@shared';

const props = defineProps<{
  searchedList: IPopupItem[] | null,
  isOpened: boolean,
  contentType: Content
}>()

/* eslint-disable */
defineEmits<{
  (e: 'close-popup'): void,
  (e: 'input', event: InputEvent): void
}>()
/* esling-enable */

const backdropClasses = computed(() => {
  return ['backdrop', { '--open': props.isOpened }]
})
</script>

<template>
  <form @submit.prevent="() => {}" ref="form">
    <input
      type="text"
      class="form-control"
      :placeholder="`Search ${contentType}`"
      @input="e => $emit('input', e as InputEvent)"
    />

    <Popup
      v-if="isOpened"
      :searchedList="searchedList"
    />
  </form>
  <div 
    :class="backdropClasses" 
    @click="$emit('close-popup')">
  </div>
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
