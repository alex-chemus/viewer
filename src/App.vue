<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches)

function toggleTheme() {
  const main = document.querySelector('main') as HTMLElement
  if (main.classList.contains('dark')) {
        main.classList.remove('dark')
        main.classList.add('light')
      } else {
        main.classList.remove('light')
        main.classList.add('dark')
      }
}

// todo: theme swither with svg
/*export default {
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
}*/
</script>


<template>
  <main :class="isDark ? 'dark' : 'light'">
    <nav class="nav justify-content-start">
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
          to="/popular/movies" 
          :class="$route.path==='/popular-movies' || $route.path==='/' 
            ? 'nav-link btn-hide text-primary' 
            : 'nav-link btn-hide'"
        >
          Popular movies
        </router-link>
      </div>
      <div class="nav-item">
        <router-link 
          to='/popular/series' 
          :class="$route.path==='/popular-series' 
            ? 'nav-link btn-hide text-primary' 
            : 'nav-link btn-hide'"
        >
          Popular series
        </router-link>
      </div>
      <div class="nav-item toggle px-2 py-1">
        <!-- <button class="btn" @click="toggleTheme"> -->
        <button class="btn btn-primary" @click="toggleTheme">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8.00001" cy="8.00001" r="5.46366" stroke="currentColor" stroke-width="1"/>
            <rect x="7.60976" width="1" height="2.34146" fill="currentColor"/>
            <rect x="16" y="7.60976" width="1" height="2.34146" transform="rotate(90 16 7.60976)" fill="currentColor"/>
            <rect x="14.11" y="13.363" width="1" height="2.34146" transform="rotate(135 14.11 13.363)" fill="currentColor"/>
            <rect x="2.50311" y="13.9149" width="1" height="2.34146" transform="rotate(-135 2.50311 13.9149)" fill="currentColor"/>
            <rect x="4.15877" y="3.60689" width="1" height="2.34146" transform="rotate(135 4.15877 3.60689)" fill="currentColor"/>
            <rect x="12.2592" y="4.15877" width="1" height="2.34146" transform="rotate(-135 12.2592 4.15877)" fill="currentColor"/>
            <rect x="2.34146" y="7.60976" width="1" height="2.34146" transform="rotate(90 2.34146 7.60976)" fill="currentColor"/>
            <rect x="7.60976" y="13.6585" width="1" height="2.34146" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </nav>
    <router-view :key="$route.fullPath"></router-view>
  </main>
</template>


<style lang='scss' scoped>
  @import '@/common.scss';

  main.dark {
    --main-bg-color: #212529;
    --bg-color: #262626; // $dark
    --shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
    --large-shadow: 0 .5rem 2rem rgba(0, 0, 0, .25);
    --text-color: #FBFBFB; //$light;
    --secondary-color: #bbb;
  }

  main.light {
    --main-bg-color: #f5f5f5;
    --bg-color: #fbfbfb; // $light
    --shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
    --large-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
    --text-color: #262626; //$dark;
    --secondary-color: #6c757d; //$secondary;
  }

  main {
    --primary-color: #1266F1;
    --accent-color: #FFA900;
    --small-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);

    background-color: var(--main-bg-color);
    height: 100%;
    max-width: 100vw;
    display: grid;
    grid-template-rows: auto 1fr;
    //@include flex(flex-start, stretch);
    //flex-direction: column;
  }

  .nav {
    box-shadow: var(--large-shadow);
    background-color: var(--bg-color);
    position: sticky;
    top: 0;
    //position: -webkit-sticky;
    //align-self: flex-start;
    flex-grow: 0;
    width: 100%;
    z-index: 1;
    //justify-self: start;
  }

  .nav-item {
    align-self: center;
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
    align-self: center;

    button {
      aspect-ratio: 1 / 1;
      @include flex(center, center);
      padding: .5rem;
      border-radius: 20%;
      //transition: all .15s, color none;
    }
  }

  .nav-link {
    color: var(--secondary-color);
  }
</style>