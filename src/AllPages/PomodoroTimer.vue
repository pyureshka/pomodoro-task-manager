<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h4 class="orange-text text-darken-3">
        <i class="material-icons prefix medium">access_alarm</i> Таймер pomodoro
      </h4>
      <hr>

      <div class="card-panel">
      <!-- болванка -->
      <div class="input-field col s12 ">
        <!-- не читает ид -->
        <select ref="select">
          <option value="" disabled selected>выберите задачу</option>
          <option v-for="task in tasksArr" :key="task.id" >{{ task.title }}</option>
        </select>
      </div>
      <div v-if="active">
        <h5> Хорошей работы! </h5>
      </div>

        <div class="time">
          <p> время работы </p>
          <button :disabled="disBtnL" @click="inc" class="btn waves-effect waves-light"><i class="material-icons">chevron_left</i></button>
          {{ currentTime }}
          <button :disabled="disBtnR" @click="dec" class="btn waves-effect waves-light"><i class="material-icons">chevron_right</i></button>
        </div>

        <div class="time">
          <p> время перерыва </p>
          <button @click="incB" :disabled="disBtnLBr" class="btn waves-effect waves-light"><i class="material-icons">chevron_left</i></button>
          {{ currentTimeBreak }}
          <button @click="decB" :disabled="disBtnRBr" class="btn waves-effect waves-light"><i class="material-icons">chevron_right</i></button>
        </div>
        <div class="test">
          <button @click="runCount(), (active = true)" class="btn-floating btn-large waves-effect waves-light orange darken-1" :disabled="disRun"><i class="small material-icons">play_arrow</i></button>
          <!-- <button @click="stopCount" class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">pause_circle_filled</i></button> -->
          <button @click="resetCount()" class="btn-floating btn-large waves-effect waves-light orange darken-1" :disabled="disReset"><i class="material-icons">replay</i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min'
import sound from '@/assets/end.mp3'
export default {
  data () {
    return {
      disRun: false,
      disReset: true,
      disBtnR: false,
      disBtnL: false,
      disBtnRBr: false,
      disBtnLBr: false,

      timeWork: 1500, // 25min
      timePassed: 1500,
      timeBreak: 300, // 5min
      timePassedBreak: 300,
      active: false,
      activeBreak: false,
      timerId: 0,
      timerIdB: 0
    }
  },
  methods: {
    playAudio () {
      const audio = new Audio(sound)
      audio.play()
    },
    run () {
      this.disRun = true
      this.disReset = false
      this.disBtnL = true
      this.disBtnR = true
      this.disBtnLBr = true
      this.disBtnRBr = true
    },
    stop () {
      this.disRun = false
      this.disReset = true
      this.disBtnL = false
      this.disBtnR = false
      this.disBtnLBr = false
      this.disBtnRBr = false
    },
    runCount () {
      this.run()
      this.timePassed = this.timeWork
      this.timeWork = Date.now() + this.timeWork * 1000 // время окончания

      this.timerId = setInterval(() => {
        this.timePassed = Math.round((this.timeWork - Date.now()) / 1000)
        if (this.timePassed < 0) {
          clearInterval(this.timerId)
          this.playAudio()
          this.runBreak()
          this.pomCount()
          this.timeWork = 0
          this.active = false
        }
      }, 1000)
    },
    runBreak () {
      this.activeBreak = true
      this.timePassedBreak = this.timeBreak
      this.timeBreak = Date.now() + this.timeBreak * 1000 // время окончания

      this.timerIdB = setInterval(() => {
        this.timePassedBreak = Math.round((this.timeBreak - Date.now()) / 1000)
        if (this.timePassedBreak < 0) {
          clearInterval(this.timerIdB)
          this.playAudio()
          this.stop()
          this.timeBreak = 300
          this.timeWork = 1500
          this.activeBreak = false
        }
      }, 1000)
    },
    resetCount () {
      this.stop()
      this.active = false
      this.activeBreak = false
      clearInterval(this.timerIdB)
      clearInterval(this.timerId)
      this.timeWork = 1500
      this.timeBreak = 300
    },

    inc () {
      this.timeWork += 300
      this.disBtnR = false
      if (this.timeWork === 5400) {
        this.disBtnL = true
      }
    },
    dec () {
      this.timeWork -= 300
      this.disBtnL = false
      if (this.timeWork === 0) {
        this.disBtnR = true
      }
    },
    incB () {
      this.timeBreak += 300
      this.disBtnRBr = false
      if (this.timeBreak === 5400) {
        this.disBtnLBr = true
      }
    },
    decB () {
      this.timeBreak -= 300
      this.disBtnLBr = false
      if (this.timeBreak === 0) {
        this.disBtnRBr = true
      }
    },

    // dont use, not done
    stopCount () {
      const start = Date.now()

      this.pauseTimerId = setInterval(() => {
        this.pauseCountSec = Date.now() - start
      }, 1000)
    },
    // test: function () {
    //   console.log(this.selected)
    //   // this.$store.dispatch('incPom', id)
    // },
    pomCount () {
      this.$store.commit('inc')
    }
  },
  computed: {
    tasksArr () {
      return this.$store.getters.tasksArr
    },
    currentTime: function () {
      if (this.active) {
        let minFormated = Math.trunc(this.timePassed / 60)
        let secFormated = this.timePassed % 60

        minFormated = minFormated < 10 ? '0' + minFormated : minFormated
        secFormated = secFormated < 10 ? '0' + secFormated : secFormated

        return minFormated + ':' + secFormated
      } else {
        let minFormated = Math.trunc(this.timeWork / 60)
        let secFormated = this.timeWork % 60

        minFormated = minFormated < 10 ? '0' + minFormated : minFormated
        secFormated = secFormated < 10 ? '0' + secFormated : secFormated

        return minFormated + ':' + secFormated
      }
    },
    currentTimeBreak: function () {
      if (this.activeBreak) {
        let minFormated = Math.trunc(this.timePassedBreak / 60)
        let secFormated = this.timePassedBreak % 60

        minFormated = minFormated < 10 ? '0' + minFormated : minFormated
        secFormated = secFormated < 10 ? '0' + secFormated : secFormated

        return minFormated + ':' + secFormated
      } else {
        let minFormated = Math.trunc(this.timeBreak / 60)
        let secFormated = this.timeBreak % 60

        minFormated = minFormated < 10 ? '0' + minFormated : minFormated
        secFormated = secFormated < 10 ? '0' + secFormated : secFormated

        return minFormated + ':' + secFormated
      }
    }
  },
  mounted () {
    M.FormSelect.init(this.$refs.select)
  }
}
</script>

<style lang="scss" scoped>
hr {
  background-color: #ef6c00;
  border-color: #ef6c00;
}
.card-panel {
  background-color: #fff0cf36;
}
.btn-floating:hover,.btn:hover {
  background-color: #ab4e02;
}
.btn-floating, .btn {
  background-color: rgb(255, 173, 105);
}
.col {
 color:#ef6c00;
 font-size: 54px;
}
.test {
  padding: 0 14rem;
}
.btn-floating {
  margin: 0 5px;
}
.time {
    padding: 0 9rem;
}
p {
  color: #ef6c00;
  font-size: 24px;
}
</style>
