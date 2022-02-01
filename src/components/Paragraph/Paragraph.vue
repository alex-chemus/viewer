<template>
  <div class="wrapper mb-3">
    <h5 class="m-0">{{ title }}:</h5>
    <p class="m-0 ms-2">{{ data }}</p>
  </div>
</template>

<script>
export default {
  name: 'Paragraph',

  props: ['data', 'title']
}
</script>


<style lang="scss" scoped>
@import '@/common.scss';

.wrapper {
  @include flex(flex-start, baseline);
}
</style>