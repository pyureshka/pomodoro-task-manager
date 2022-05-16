<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h4 class="orange-text text-darken-3">Нужна помощь?</h4>
    </div>
    <div class="col s6 offset-s3">
    <hr>
    <ul class="collapsible" data-collapsible="accordion" ref="collap">
    <li>
      <div class="collapsible-header"><i class="material-icons">access_alarm</i>Что такое метод помидора?</div>
      <div class="collapsible-body"><span>вот</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">list</i>Как правильно планировать?</div>
      <div class="collapsible-body"><span>вот так</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">whatshot</i>Как редактировать задачу?</div>
      <div class="collapsible-body"><span>Откройте задачу. Вы можете отредактировать все поля, кроме времени pom. Чтобы сохранить измнения, нажмите кнопку "сохранить"</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">whatshot</i>Как удалить задачу?</div>
      <div class="collapsible-body"><span>Крайняя кнопка с крестиком в списке задач удаляет задачу</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">whatshot</i>Можно ли восстановить задачу?</div>
      <div class="collapsible-body"><span>К сожалению, пока эта функция не доступна, поэтому будьте аккуратны при удалении или редактировании задачи!</span></div>
    </li>
    </ul>
    <h6 class="center-align">Не нашли ответа на вопрос? <br> Можете написать на почту:</h6>
    <p class="center-align">example@mail.ru</p>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min'
export default {
  mounted () {
    M.Collapsible.init(this.$refs.collap)
  }
}
</script>

<style lang="scss">
hr {
  background-color: #ef6c00;
  border-color: #ef6c00;
}
.collapsible {
  background-color: #92bfbd52;
}
</style>
