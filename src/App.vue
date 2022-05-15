<template>
  <div id="app">
<div class="navbar-fixed">
    <nav class="orange darken-1">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo center">PomPom</router-link>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <!-- <li><router-link to="/task">TASK</router-link></li> -->
          <li><router-link to="/list">ЗАДАЧИ</router-link></li>
          <li><router-link to="/pom">POMODORO<span class="new badge deep-orange darken-3" data-badge-caption="пом">{{ $store.state.donePom }}</span></router-link></li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/settings"><i class="material-icons">settings</i></router-link></li>
          <li><router-link to="/help"><i class="material-icons">help_outline</i></router-link></li>
        </ul>
      </div>
    </nav>
</div>
  <div class="conteiner">
    <router-view />
  </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
nav {
  padding: 0 6rem;
  font-size: 36px;
}
@import "~materialize-css/dist/css/materialize.min"
</style>
