<template>
  <h1>I am App</h1>
  <router-view></router-view>
  <router-link to='/popular-series'>Popular series</router-link>
  <router-link to='/popular-movies'>Popular series</router-link>
</template>


<script>
export default {
  name: 'App'
}
</script>


<style lang='scss'>
  @import '@src/style.scss';
</style>