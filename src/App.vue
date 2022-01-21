<template>
  <main :class="isDark ? 'dark' : 'light'">
    <nav class="nav justify-content-start p-2">
      <div class="nav-item">
        <router-link 
          to='/watchlist' 
          :class="$route.path==='/watchlist' 
            ? 'nav-link text-primary' 
            : 'nav-link'"
        >
          Watchlist
        </router-link>
      </div>
      <div class="nav-item">
        <router-link 
          to="/popular-movies" 
          :class="$route.path==='/popular-movies' || $route.path==='/' 
            ? 'nav-link btn-hide text-primary' 
            : 'nav-link btn-hide'"
        >
          Popular movies
        </router-link>
      </div>
      <div class="nav-item">
        <router-link 
          to='/popular-series' 
          :class="$route.path==='/popular-series' 
            ? 'nav-link btn-hide text-primary' 
            : 'nav-link btn-hide'"
        >
          Popular series
        </router-link>
      </div>
      <div class="nav-item toggle">
        <button class="btn btn-primary" @click="toggleTheme">Toggle theme</button>
      </div>
    </nav>
    <router-view></router-view>
  </main>
</template>


<script>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

// todo: theme swither with svg

export default {
  name: 'App',

  setup() {
    const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

    function toggleTheme(e) {
      //console.log('click', e)
      const main = document.querySelector('main')
      if (main.classList.contains('dark')) {
        main.classList.remove('dark')
        main.classList.add('light')
      } else {
        main.classList.remove('light')
        main.classList.add('dark')
      }
    }

    return { isDark, toggleTheme }
  }
}
</script>


<style lang='scss' scoped>
  @import '@src/common.scss';

  main.dark {
    background: $dark;
    --shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);;
    --text-color: #FBFBFB //$light;
    --secondary-color: #eee;
  }

  main.light {
    --shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
    --text-color: #262626; //$dark;
    --secondary-color: #6c757d; //$secondary;
  }

  main {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .nav {
    box-shadow: var(--shadow);
  }

  .btn-hide {
    @media (min-width: 0) {
      display: none;
    }
    @include media-breakpoint-up(sm) {
      display: block;
    }
  }

  .toggle {
    margin-left: auto;
  }

  .nav-link {
    color: var(--secondary-color);
  }
</style>