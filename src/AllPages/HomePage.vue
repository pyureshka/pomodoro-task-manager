<template>
  <div class="row">
    <div class="col s6 offset-m3">
      <h4 class="orange-text text-darken-3">Сделай так, чтобы всё получилось</h4>
    </div>
    <div class="col s6 offset-s3">
    <p class="flow-text">
      Все мы способны добиваться своих целей и при этом сохранять душевное спокойствие.
      Все мы способны быть сконцентрированными и качественно выполнять свою работу.
      <br>
      <br>
      <span class="pom">PomPom</span> – это инструмент, который поможет вам держать свою жизнь под контролем, уделяя время как работе, так и отдыху.
      <br>
      </p>
      <p class="flow-text center-align">Баланс – это возможно</p>
    <div class="center">
      <button @click="showAlert" class="btn btn-medium waves-effect waves-light orange darken-1">начать!</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showAlert () {
      // Use sweetalert2
      this.$swal({
        title: 'Привет!',
        html: 'Во вкладке <b>"задачи"</b> вы можете распланировать свои дела, ' +
        'добавить к задачам теги, срок сдачи и описание.<br><br>' +
        'Таймер помидора находится во вкладке <b>"pomodoro"</b>. <br>' +
        'Вы можете указать перед запуском таймера задачу, над которой собираетесь работать, тогда в нее автоматически будет записано количество законченных таймеров - помов',
        confirmButtonColor: '#ef6c00'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pom {
  color: #ef6c00;
  font-weight: 400;
}
b {
  color: #ef6c00;
}
.center {
  justify-content: center;
}
</style>
