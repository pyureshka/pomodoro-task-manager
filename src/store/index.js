import { createStore } from 'vuex'

export default createStore({
  state: {
    tasksArr: JSON.parse(localStorage.getItem('tasksArr') || '[]'),
    donePom: JSON.parse(localStorage.getItem('donePom') || 0)
  },
  getters: {
    tasksArr: s => s.tasksArr,
    taskById: s => id => s.tasksArr.find(t => t.id === id),

    taskCompleted (state) {
      return state.tasksArr.filter(task => {
        return task.status
      })
    },
    taskActive (state) {
      return state.tasksArr.filter(task => {
        return task.status === false
      })
    }
  },
  mutations: {
    createTask (state, task) {
      state.tasksArr.push(task)
      localStorage.setItem('tasksArr', JSON.stringify(state.tasksArr))
    },

    deleteTask (state, id) {
      const tasks = state.tasksArr.concat()
      const idx = tasks.findIndex(t => t.id === id)

      // console.log(state.tasksArr[idx])
      state.tasksArr.splice(idx, 1)
      localStorage.setItem('tasksArr', JSON.stringify(state.tasksArr))
    },
    updateTask (state, { id, description, tags, date }) {
      const tasks = state.tasksArr.concat()
      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx]

      tasks[idx] = { ...task, date, description, tags }

      state.tasksArr = tasks
      localStorage.setItem('tasksArr', JSON.stringify(state.tasksArr))
    },

    updateStatus (state, id) {
      const tasks = state.tasksArr.concat()
      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx]

      task.status = !task.status
      state.tasksArr = tasks
      localStorage.setItem('tasksArr', JSON.stringify(state.tasksArr))
    },

    inc (state) {
      //  пока так, пока здесь
      const upDate = new Date()
      const test = new Date()
      test.setHours(0, 0, 0, 0)
      if (upDate.getHours() === test.getHours()) {
        state.donePom = 0
      }
      state.donePom++
      localStorage.setItem('donePom', JSON.stringify(state.donePom))
    }
  },
  actions: {
    createTask ({ commit }, task) {
      commit('createTask', task)
    },
    updateTask ({ commit }, task) {
      commit('updateTask', task)
    },
    updateStatus ({ commit }, id) {
      commit('updateStatus', id)
    },
    deleteTask ({ commit }, id) {
      commit('deleteTask', id)
    }
  }
})
