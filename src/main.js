import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import DashboardView from './views/DashboardView.vue'
import TasksView from './views/TasksView.vue'
import ScheduleView from './views/ScheduleView.vue'
import GoalsView from './views/GoalsView.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DashboardView },
    { path: '/tasks', component: TasksView },
    { path: '/schedule', component: ScheduleView },
    { path: '/goals', component: GoalsView },
  ],
})

createApp(App).use(router).mount('#app')