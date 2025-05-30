import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  // Tambahkan route lain di sini
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router