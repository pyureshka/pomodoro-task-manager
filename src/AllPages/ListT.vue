<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h4 class="orange-text text-darken-3">Мои задачи</h4>
      <hr>

      <!-- болванка
      <div class="col s4">
        <select ref="select">
          <option value="" disabled selected>выберите тег</option>
          <option v-for="task in tasksFilter" :key="task.id"><span>{{ task.tags[0]['tag'] }}</span></option>
        </select>
      </div> -->

      <div class="filter">
        <button @click="filter = 'all'" class="btn waves-effect waves-light btn-small">Все</button>
        <button @click="filter = 'active'" class="btn waves-effect waves-light btn-small">Активные</button>
        <button @click="filter = 'completed'" class="btn waves-effect waves-light btn-small">Завершенные</button>
      </div>

      <table class="highlight centered" v-if="tasksFilter.length">
        <thead>
          <tr>
              <th>статус</th>
              <th>название</th>
              <th>срок сдачи</th>
              <th>пом</th>
              <th></th>
              <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="task in tasksFilter" :key="task.id">
           <td><label><input type="checkbox" v-model="task.status" @click="updateStatus(task.id)"/><span></span></label></td>
           <td>{{task.title}}</td>
           <td v-if="task.date">{{new Date (task.date).toLocaleDateString()}}</td>
           <td v-else>--</td>
           <td>{{task.timePom}}</td>
           <td><router-link class="btn btn-small " :to=" '/task/' + task.id"><i class="material-icons">open_in_new</i></router-link></td>
           <td><button @click="deleteTask(task.id)" class="btn-floating btn-small waves-effect waves-red test"><i class="material-icons close">close</i></button></td>
          </tr>
        </tbody>
      </table>
      <p v-else><i class="material-icons">sentiment_very_dissatisfied</i> задач нет</p>
    </div>

      <div class="fixed-action-btn">
      <router-link to="/create" class="btn-floating btn-large waves-effect waves-light orange darken-1 add" ><i class="material-icons">add</i></router-link>
      </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min'
export default {

  data: () => {
    return {
      filter: 'all'
    }
  },

  computed: {
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskActive
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasksArr
      }
      return this.$store.getters.taskArr
    }
    // tasksArr () {
    //   return this.$store.getters.tasksArr
    // }
  },

  methods: {
    deleteTask (id) {
      this.$store.dispatch('deleteTask', id)
    },
    updateStatus (id) {
      this.$store.dispatch('updateStatus', id)
    }
  },
  mounted () {
    M.FormSelect.init(this.$refs.select)
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
.btn {
  background-color: rgb(255, 173, 105);
}
.test {
  background-color: rgba(237, 84, 29, 0);
}
.test:hover {
  background-color: #ffefe2c2;
}
table.highlight > tbody > tr:hover {
  background-color: #92bfbd52;
}
p {
  color: #ef6c00;
  font-size: 24px;
}
th {
  color: #ef6c00;
}
button {
  margin-left: 10px;
}
.close {
  color:#ef6c00
}
.filter {
  padding-left: 19rem;
}
</style>
