<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { Content } from '@/types'

defineProps<{
  item: any, // IPopupItem
}>()

const route = useRoute()
const contentType = ref<Content>(route.params.type as Content || 'movies')

/* export default {
  name: 'PopupItem',

  props: ['item'],

  setup() {
    const route = useRoute()
    const type = ref(route.params.type ?? 'movies')

    return { type }
  }
} */
</script>

<template>
  <li class="group-list-item p-2">
    <div class="wrapper me-3">
      <h6 class="mb-2" :title="item.title">{{ item.title }}</h6>
      <i class="m-0" :title="item.description">{{ item.description }}</i>
    </div>

    <router-link
      :to="`/${contentType}/${item.id}`"
      class="btn btn-warning"
    >Info</router-link>
  </li>
</template>

<!--<style lang="scss" scoped>
@import '@/common.scss';

li {
  @include flex(space-between, center);
  max-width: 100vw;
  min-width: 0;

  &:not(:last-child) {
    border-bottom: 1px solid #bbb;
  }
}

.wrapper {
  flex-shrink: 2;
  min-width: 0;
}

h6, i {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  min-height: 0;
}
</style>-->
