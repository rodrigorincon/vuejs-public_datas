import Vue from 'vue'
import VueRouter from 'vue-router'

import './main.css'

import routes from './routes.js'

import { Ubs } from './util/Ubs.js'
import { EventBus } from './util/event-bus'

import ubs from './assets/ubs.csv'
Vue.use(VueRouter)

var ubsList = []

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
    this.populateUbsList(ubs)
    this.ubsList = ubsList
    this.test = ubsList
    this.loading_datas = false
    EventBus.$on('filter', this.filterUbs)
    EventBus.$on('favorites', this.favoritesProc)
  },
  methods: {
    populateUbsList (arrayOrObject) {
      if (arrayOrObject instanceof Array) {
        arrayOrObject.forEach(elem => {
          this.populateUbsList(elem)
        })
      } else {
        ubsList.push(new Ubs(arrayOrObject))
      }
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
