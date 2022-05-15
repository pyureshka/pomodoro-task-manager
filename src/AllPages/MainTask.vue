<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h4 class="orange-text text-darken-3">Новая задача</h4>
      <hr>

      <form @submit.prevent="subT">
        <div class="input-field col s12">
           <i class="material-icons prefix">create</i>
           <input v-model="title" id="first_name" type="text" required />
           <label for="first_name" >название</label>
        </div>

        <div class="input-field col s12">
          <textarea v-model="description" id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">описание</label>
        </div>

        <div class="input-field col s12">
          <div class="chips chips-placeholder" ref="chips"></div>
        </div>

        <div class="input-field col s3">
          <input id="calendar" type="text" class="datepicker" ref="datepicker">
          <label for="calendar">срок сдачи</label>
        </div>

        <div class="input-field col s6 offset-s3">
          <button class="btn waves-effect waves-light" type="submit" name="action">добавить</button>
        </div>
      </form>
    </div>
        <br>
  </div>
  <div class="fixed-action-btn">
  <router-link to="/list" class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">arrow_back</i></router-link>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min'
export default {
  name: 'MainTask',
  data: () => ({
    title: '',
    description: '',
    chips: null,
    date: null
  }),

  mounted () {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'введите тег',
      secondaryPlaceholder: '+тег'
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      minDate: new Date()
    })
  },

  methods: {
    subT () {
      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        timePom: 0,
        status: false,
        tags: this.chips.chipsData,
        date: this.date.date
      }

      this.$store.dispatch('createTask', task)
      this.$router.push('/list')
    }
  }
  // unmounted () {
  //   if (this.date && this.date.destroy) {
  //     this.date.destroy()
  //   }
  //   if (this.chips && this.chips.destroy) {
  //     this.chips.destroy()
  //   }
  // }
}
</script>

<style lang="scss">
hr {
  background-color: #ef6c00;
  border-color: #ef6c00;
}
.input-field .prefix.active {
  color: #ef6c00;
}
.input-field label {
  color: #242424af;
}
.btn:hover, .btn-floating:hover {
  background-color: #ab4e02;
}
.btn, .btn-floating {
  background-color: #ef6c00;
}
// not working ???
.input-field textarea:focus + label, .input-field input[type=text]:focus + label {
  color: #ef6c00;
}
.input-field input[type=text]:focus, .input-field textarea:focus, .chips.focus {
  border-bottom: 1px solid #ef6c00;
  box-shadow: 0 1px 0 0 #ef6c00;
}
</style>
