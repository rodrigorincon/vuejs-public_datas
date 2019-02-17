import Vue from 'vue'
import VueRouter from 'vue-router'

import './main.scss'

import routes from './routes.js'

import { Ubs } from './util/Ubs.js'
import { EventBus } from './util/event-bus'

import ubs from './assets/ubs.csv'
Vue.use(VueRouter)

const _ubs = ubs instanceof Array ? ubs : [ubs]
const ubsList = _ubs
  .map(x => new Ubs(x))
  .sort(
    (a, b) =>
      a.cod_munic < b.cod_munic ? -1 : a.cod_munic > b.cod_munic ? 1 : 0
  )

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data () {
    return {
      ubsList: [],
      loading_datas: true
    }
  },
  created () {
    this.ubsList = ubsList
    this.loading_datas = false
    EventBus.$on('filter', this.filterUbs)
    EventBus.$on('favorites', this.favoritesProc)
  },
  methods: {
    filterUbs (name, filterType) {
      this.loading_datas = true
      name = name.toLowerCase()
      filterType = filterType.toLowerCase()
      if (filterType === '') {
        this.ubsList = ubsList
      } else if (filterType === 'nome') {
        this.ubsList = ubsList.filter(ubs =>
          ubs.nom_estab.toLowerCase().includes(name)
        )
      } else if (filterType === 'endereco') {
        this.ubsList = ubsList.filter(ubs =>
          ubs
            .endereco()
            .toLowerCase()
            .includes(name)
        )
      }
      this.loading_datas = false
    },
    favoritesProc (showFav) {
      if (showFav) {
        var list = []
        var keys = Object.keys(localStorage).slice(0, localStorage.length - 1)
        keys.forEach(key =>
          list.push(new Ubs(JSON.parse(localStorage.getItem(key))))
        )
        this.ubsList = list
      } else {
        this.ubsList = ubsList
      }
    }
  },
  router: new VueRouter({ routes })
})
