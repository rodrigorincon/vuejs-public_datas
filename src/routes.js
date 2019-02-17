import App from './components/App.vue'
import UbsDetail from './components/UbsDetail.vue'

export default [
  { path: '/', name: 'home', component: App },
  { path: '/ubs/:id', name: 'ubs', component: UbsDetail },

  // default route, when none of the above matches (404 page)
  { path: '*', redirect: { name: 'home' } }
]
