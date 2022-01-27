<template>
  <img v-if="src" :src="src" :style="styles" alt="">
  <div v-else class="placeholder" ref="placeholder"></div>
</template>


<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ImageItem',

  props: ['url', 'styles'],

  setup(props) {
    const src = ref(null)
    const placeholder = ref(null)
    const img = ref(null)

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        src.value = props.url
      }
    }, {
      threshold: 1,
      rootMargin: '200px',
    })

    onMounted(() => {
      observer.observe(placeholder.value)
    })

    return { src, img, placeholder }
  }
}
</script>


<style lang="scss" scoped>
  @import '@/common.scss';

  .placeholder {
    height: 100%;
    width: 100%;
    background-color: var(--secondary-color);
  }
</style>