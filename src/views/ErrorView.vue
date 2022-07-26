<script setup lang="ts">
import { ref } from 'vue'
const message = ref<string>('')
message.value = localStorage.getItem('errorMessage')
</script>

<template>
  <div class="container">
    <h2 class="mb-3">Sorry, an error occured</h2>
    <h3>{{ message }}</h3>
  </div>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

.container {
  @include flex(center, center);
  flex-direction: column;
}

h2, h3 {
  text-align: center;
  color: var(--text-color);
}
</style>