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
        <div class="collapsible-body"><span>«Метод помидора» – техника управления временем, предложенная Франческо Чирилло в конце 1980-х. Методика предполагает увеличение эффективности работы при меньших временных затратах
          за счёт глубокой концентрации и коротких перерывов.<br>
          Рабочий или учебный процесс делится на отрезки времени, условно названных помидорами. Один такой интервал длится 30 минут: 25 минут работы и 5 минут отдыха.
        </span>
        </div>
      </li>

      <li>
        <div class="collapsible-header"><i class="material-icons">list</i>Как правильно планировать?</div>
        <div class="collapsible-body"><span>
          <ol>
          <li>Планируйте в удобное время<br></li>
          <li>Составьте колесо баланса<br></li>
          Колесо жизненного баланса – эффективное упражнение, которое позволяет найти слабые места в важных сферах вашей жизни. <br>
          <li>Цели должны вдохновлять <br></li>
          Часто, мы неосознанно живем чужими установками, мечтами и представлениями. Ваша задача – отделить собственные «надо» от социальных. Следующим шагом станет определение ваших «хочу». Именно эти искренние и персональные желания должны стать основой ваших целей.
          <li>Планируйте четко и тактично</li>
          Не распыляйтесь на все и сразу. Приоритизируйте цели и поставьте их в каждой сфере вашей жизни. Избегайте ситуации, когда у вас 5 карьерных целей и всего одна в области личностного роста.
          <br><br><b>Следуйте своему пути и у вас все получится!</b>
          </ol>
          </span>
        </div>
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
