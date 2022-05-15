<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h4 class="orange-text text-darken-3"> Настройки </h4>
    </div>
    <div class="col s6 offset-s3">
    <hr>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tasks () {
      return this.$store.getters.tasks
    }
  }
}
</script>

<style lang="scss">
hr {

    background-color: #ef6c00;
    border-color: #ef6c00;
}
</style>
