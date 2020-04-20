<template>
  <div id="app">
    <m-header></m-header>
    <tab />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import MHeader from './components/m-header/m-header.vue'
import Tab from './components/tab/tab.vue'

export default {
  name: 'App',  
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
</style>
