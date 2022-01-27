<template>
  <article class="card">
    <!-- <img :src="data.image" alt="Image" class="card-img-top"> -->
    <div class="card-body">
      <!-- <div class="card-img-top mb">
        <img :src="data.image" alt="Image">
      </div> -->
      
      <!-- <div class="wrapper">
        <h5 class="card-title mb-1" :title="data.title">{{ data.title }}</h5>
        <p :class="dyeCard(data.imDbRating)">{{ data.imDbRating }}</p>
      </div>
      
      <p class="card-text mb-3 year">{{ data.year }}</p> -->
      
      <div class="image-container mb-3">
        <!--<img :src="data.image" alt="Image" class="mb-3">-->
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
        <router-link to="/" class="btn btn-warning">Info</router-link>
      </div>
    </div>
  </article>
</template>


<script>
import ImageItem from '@src/components/ImageItem/ImageItem.vue'

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
  @import '@src/common.scss';

  .card {
    box-shadow: var(--shadow);
  }

  .image-container {
    height: 200px;
    width: 100%;
    @include flex(center, center);

    /*img {
      max-height: 100%;
      max-width: 100%;
    }*/
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

  /*img {
    display: block;
    margin: 0 auto;
  }*/

  .card-title {
    //width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn {
    box-shadow: var(--small-shadow);
  }
</style>