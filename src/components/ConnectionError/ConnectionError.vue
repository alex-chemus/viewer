<template>
  <div class="container">
    <h2 class="mb-3">Sorry, but something went wrong</h2>
    <h3>¯\_(ツ)_/¯</h3>
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
