import { createRouter, createWebHashHistory } from 'vue-router'
import MainTask from '@/AllPages/MainTask.vue'
import ListT from '@/AllPages/ListT.vue'
import PomodoroTimer from '@/AllPages/PomodoroTimer'
import HomeP from '@/AllPages/HomePage'
import HelpPage from '@/AllPages/HelpPage'
import SettingPage from '@/AllPages/SettingPage'
import TaskOpen from '@/AllPages/TaskOpen'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeP },
    { path: '/create', component: MainTask },
    { path: '/task/:id', component: TaskOpen },
    { path: '/list', component: ListT },
    { path: '/pom', component: PomodoroTimer },
    { path: '/help', component: HelpPage },
    { path: '/settings', component: SettingPage }
  ]
})
