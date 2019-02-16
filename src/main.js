import Vue from 'vue'


import VueRouter from 'vue-router'
import routes from './routes.js'
Vue.use(VueRouter)

import {Ubs} from "./util/Ubs.js"
import {EventBus} from './util/event-bus';

import ubs from './assets/ubs.csv'

var ubs_list = []

new Vue({
  el: '#app',
  data(){
    return{
      ubs_list: [],
      loading_datas: true
    }
  },
  created(){
    this.populateUbsList(ubs)
    this.ubs_list = ubs_list
    this.loading_datas = false
    EventBus.$on('filter', this.filterUbs )
    EventBus.$on('favorites', this.favoritesProc )
  },
  methods:{
    populateUbsList(arrayOrObject){
      if(arrayOrObject instanceof Array){
        arrayOrObject.forEach(elem =>{
          this.populateUbsList(elem)
        })
      }else{
        ubs_list.push( new Ubs(arrayOrObject) )
      }
    },
    filterUbs(name, filter_type){
      this.loading_datas = true
      name        = name.toLowerCase()
      filter_type = filter_type.toLowerCase()
      if(filter_type == ""){
        this.ubs_list = ubs_list
      }else if(filter_type == "nome"){
        this.ubs_list = ubs_list.filter(ubs => ubs.nom_estab.toLowerCase().includes(name) )
      }else if(filter_type == "endereco"){
        this.ubs_list = ubs_list.filter(ubs => ubs.endereco().toLowerCase().includes(name) )
      }
      this.loading_datas = false
    },
    favoritesProc(showFav){
      if(showFav){
        var list = []
        var keys = Object.keys(localStorage).slice(0, localStorage.length-1)
        keys.forEach(key => list.push( new Ubs( JSON.parse( localStorage.getItem(key) ) ) ) )
        this.ubs_list = list
      }else{
        this.ubs_list = ubs_list
      }
    }
  },
  router: new VueRouter({routes})
})
