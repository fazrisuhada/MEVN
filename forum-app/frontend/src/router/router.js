import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthenticationStore } from '@/stores/authStore';
import { useGlobalToast } from '@/composables/useGlobalToast';
import About from '@/views/AboutView.vue';
import DetailQuestion from '@/components/Questions/DetailQuestion.vue';

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  { 
    path: '/about', 
    name: 'About', 
    component:About 
  },
  { 
    path: '/question/:id', 
    name: 'DetailQuestion', 
    component:DetailQuestion 
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: DashboardView,
    meta: {
      requiredAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const authStore = await useAuthenticationStore()
  
  if (to.meta.requiredAuth && !authStore.currentUser) {
    return { path: '/', query: { redirected: 'auth-required' } }
  }
})

// Tampilkan toast setelah navigasi selesai
router.afterEach((to, from) => {
  const { showWarn } = useGlobalToast()
  
  // Cek jika ada query parameter yang menandakan redirect karena auth
  if (to.query.redirected === 'auth-required') {
    setTimeout(() => {
      showWarn(
        'Access Denied', 
        'You must be logged in to access this page.',
        4000,
        false,
        true
      )
    }, 100)
    
    // Bersihkan query parameter
    router.replace({ path: to.path })
  }
})

export default router