<template>
  <nav class="nav shadow-sm justify-content-start">
    <div class="nav-item">
      <router-link 
        to='/watchlist' 
        :class="$route.path==='/watchlist' 
          ? 'nav-link text-primary' 
          : 'nav-link text-secondary'"
      >
        Watchlist
      </router-link>
    </div>
    <div class="nav-item">
      <router-link 
        to="/popular-movies" 
        :class="$route.path==='/popular-movies' || $route.path==='/' 
          ? 'nav-link btn-hide text-primary' 
          : 'nav-link btn-hide text-secondary'"
      >
        Popular movies
      </router-link>
    </div>
    <div class="nav-item">
      <router-link 
        to='/popular-series' 
        :class="$route.path==='/popular-series' 
          ? 'nav-link btn-hide text-primary' 
          : 'nav-link btn-hide text-secondary'"
      >
        Popular series
      </router-link>
    </div>
  </nav>
  <router-view></router-view>
</template>


<script>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export default {
  name: 'App',
}
</script>


<style lang='scss' scoped>
  @import '@src/common.scss';

  #app {
    @include fullscreen();
  }

  .btn-hide {
    @media (min-width: 0) {
      display: none;
    }
    @include media-breakpoint-up(sm) {
      display: block;
    }
  }
</style>