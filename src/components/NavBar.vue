<template>
<div id="app">
<div class="navbar-fixed">
    <nav class="blue-text text-darken-2">
      <div class="nav-wrapper orange darken-3">
        <router-link to="/" active-class="active" class="brand-logo center"><i class="material-icons">brightness_5</i></router-link>

        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><router-link to="/task" exact active-class="active">Task</router-link></li>
          <li><router-link to="/list" exact active-class="active">List</router-link></li>
          <li><router-link to="/pom" exact active-class="active">Pomodoro</router-link></li>
        </ul>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/"><i class="material-icons">settings</i></router-link></li>
          <li><router-link to="/"><i class="material-icons">help_outline</i></router-link></li>
        </ul>
      </div>
    </nav>
</div>
</div>
</template>

<script></script>
<style lang="scss"></style>
