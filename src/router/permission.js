import router from './index'
import store from '@/store'

const WhihtList = ['/login']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (WhihtList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
