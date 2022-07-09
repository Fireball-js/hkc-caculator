import { createRouter, createWebHashHistory } from 'vue-router'
import loginPage from '../pages/loginModule/routes'
import caculator from '../pages/hkcCaculator/routes'

const routes = [
  ...loginPage,
  ...caculator
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router


