<template>
  <div id="app">
    <Navbar />
    <div class="conteiner">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min"
</style>
