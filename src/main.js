import Vue from 'vue'
import VueRouter from 'vue-router'

import './main.scss'

import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/regular.min.css'

import routes from './routes.js'

import { Ubs } from './util/Ubs.js'
import { EventBus } from './util/event-bus'
import { get } from 'axios'
import Papa from 'papaparse'

Vue.use(VueRouter)

let ubsList = []

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
    this.loading_datas = true
    get('/dist/ubs.csv', {
      mode: 'no-cors'
    })
      .then(({ data }) => {
        var csv = Papa.parse(data, { header: true })
        this.populateUbsList(csv.data)
      })
      .finally(e => {
        this.loading_datas = false
      })
    EventBus.$on('filter', this.filterUbs)
    EventBus.$on('favorites', this.favoritesProc)
  },
  methods: {
    populateUbsList (ubs) {
      const _ubs = ubs instanceof Array ? ubs : [ubs]
      ubsList = _ubs
        .map(x => new Ubs(x))
        .filter(ubs => ubs.cod_munic)
        .sort((a, b) =>
          a.cod_munic < b.cod_munic ? -1 : a.cod_munic > b.cod_munic ? 1 : 0
        )
      this.ubsList = ubsList
    },
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
