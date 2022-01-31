<template>
  <article class="card" v-if="data" data-test="card">
    <div class="card-body">
      <div class="image-container mb-3">
        <ImageItem 
          :url="data.image" 
          :styles="{
            maxHeight: '100%',
            maxWidth: '100%'
          }"
        ></ImageItem>
      </div>

      <h5 class="card-title mb-1" :title="data.title">{{ data.title }}</h5>

      <div class="wrapper mb-3">
        <p class="card-text year m-0">{{ data.year }}</p>
        <p :class="dyeCard(data.imDbRating)">{{ data.imDbRating }}</p>
      </div>

      <div class="wrapper">
        <button class="btn btn-primary">Add</button>
        <router-link :to="`/${data.type}/${data.id}`" class="btn btn-warning">Info</router-link>
      </div>
    </div>
  </article>

  <article v-else class="card card-placeholder">
  </article>
</template>


<script>
import ImageItem from '@/components/ImageItem/ImageItem.vue'

export default {
  name: 'Card',

  props: ['data'],

  components: { ImageItem },

  methods: {
    dyeCard(rating) {
      let colorClass
      if (rating > 8) colorClass = 'text-success'
      else if (rating > 6) colorClass = 'text-warning'
      else colorClass = 'text-danger'
      return `card-text rating ${colorClass} m-0`
    }
  }
}
</script>


<style lang="scss" scoped>
  @import '@/common.scss';

  .card {
    box-shadow: var(--shadow);

    &-placeholder {
      height: 350px;
    }
  }

  .image-container {
    height: 200px;
    width: 100%;
    @include flex(center, center);
  }

  .wrapper {
    @include flex(space-between, center);
  }

  .year {
    font-style: italic;
  }

  .rating {
    font-weight: bold;
  }

  .card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn {
    box-shadow: var(--small-shadow);
  }
</style>