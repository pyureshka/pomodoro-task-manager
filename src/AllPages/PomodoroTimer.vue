<template>
  <div class="row">
    <div class="col s6 offset-s3">

      <div class="card-panel">

      <div class="input-field col s6 offset-s3">
        <select v-model="selected" ref="select">
          <option value="" disabled selected>выберите задачу</option>
          <option v-for="task in tasksArr" :key="task.id" :value="task.id">{{ task.title }}</option>
        </select>
      </div>
      <button v-if="selected" class="btn-floating btn-small waves-effect waves-red btnClear" @click="selected = 0"><i class="material-icons close">close</i></button>

          <p class="text"> время работы </p>
          <button :disabled="disBtnL" @click="inc" class="btn-floating btn-small waves-effect waves-light btnL"><i class="material-icons">chevron_left</i></button>
          {{ currentTime }}
          <button :disabled="disBtnR" @click="dec" class="btn-floating btn-small waves-effect waves-light btnR"><i class="material-icons">chevron_right</i></button>

          <p class="text"> время перерыва </p>
          <button @click="incB" :disabled="disBtnLBr" class="btn-floating btn-small waves-effect waves-light btnL"><i class="material-icons">chevron_left</i></button>
          {{ currentTimeBreak }}
          <button @click="decB" :disabled="disBtnRBr" class="btn-floating btn-small waves-effect waves-light btnR"><i class="material-icons">chevron_right</i></button>
          <div class="stRs">
            <button @click="runCount(), (active = true)" class="btn-floating btn-large waves-effect waves-light orange darken-1 start" :disabled="disRun"><i class="small material-icons">play_arrow</i></button>
            <!-- <button @click="stopCount" class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">pause_circle_filled</i></button> -->
            <button @click="resetCount()" class="btn-floating btn-large waves-effect waves-light orange darken-1 reset" :disabled="disReset"><i class="material-icons">replay</i></button>
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
      selected: 0,
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
          if (this.selected !== 0) {
            this.timePomCount()
          }
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
    timePomCount () {
      this.$store.dispatch('incPom', this.selected)
    },
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
.card-panel {
  background-color: #fdf8ee54;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.btn-floating:hover {
  background-color: #ab4e02;
}
.btn-floating {
  background-color: rgb(255, 173, 105);
}
.close {
  color:#ef6c00
}
.btnClear {
  background-color: rgba(239, 86, 30, 0);
}
.btnClear:hover {
  background-color: rgb(255, 249, 244);
}
.text {
  margin: 0 11rem;
}
.btnL {
  margin-left: 12rem;
  margin-right: 1rem;
}
.btnR {
    margin-left: 1rem;
    margin-right: 10rem;
}
.stRs {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
.start{
  margin-right: 1rem;
}
.reset {
  margin-left: 1rem;
}
.col {
 color:#ef6c00;
 font-size: 52px;
}
p {
  color: #ef6c00;
  font-size: 24px;
  margin: 10px;
}
</style>
