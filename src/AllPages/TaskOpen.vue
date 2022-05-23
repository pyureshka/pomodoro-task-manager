<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <div v-if="task">
        <h4 class="orange-text text-darken-3">{{task.title}}</h4>
        <hr>
          <form @submit.prevent="subminUpdateTask">
          <div class="input-field col s12">
            <textarea v-model="description" id="textarea1" class="materialize-textarea"></textarea>
            <label for="textarea1">описание</label>

            <div class="chips chips-placeholder" ref="chips"></div>
          </div>

          <div class="input-field col s3">
            <input id="calendar" type="text" class="datepicker" ref="datepicker">
            <label for="calendar">срок сдачи</label>
          </div>

          <div class="input-field col s6 offset-s3">
            <button class="btn waves-effect waves-light" type="submit" name="action">сохранить</button>
          </div>
        </form>
      </div>

      <div v-else>
        <h4 class="orange-text text-darken-3">Задача не найдена :( </h4>
      </div>
    </div>
    <div class="fixed-action-btn">
      <router-link to="/list" class="btn-floating btn-large waves-effect waves-light orange darken-1"><i class="material-icons">arrow_back</i></router-link>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min'
export default {
  computed: {
    task () {
      return this.$store.getters.taskById(+this.$route.params.id)
    }
  },

  data: () => ({
    description: '',
    chips: null,
    date: null
  }),

  mounted () {
    this.description = this.task.description
    this.chips = M.Chips.init(this.$refs.chips, {
      data: this.task.tags,
      placeholder: 'введите тег',
      secondaryPlaceholder: '+тег'
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      minDate: new Date(),
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    })
  },

  methods: {
    subminUpdateTask () {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        tags: this.chips.chipsData,
        date: this.date.date
      })
      this.$router.push('/list')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-floating {
  background-color: #ef6c00;
}
.btn:hover, .btn-floating:hover {
  background-color: #ab4e02;
}
hr {
  background-color: #ef6c00;
  border-color: #ef6c00;
}
textarea {
  min-height: 100px;
}
</style>
