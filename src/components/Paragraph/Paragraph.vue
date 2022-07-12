<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  title: string,
  data: string | number
}>()
</script>

<template>
  <div class="wrapper mb-3">
    <h5 class="m-0">{{ title }}:</h5>
    <p class="m-0 ms-2">{{ data }}</p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

.wrapper {
  @include flex(flex-start, baseline);
}
</style>
