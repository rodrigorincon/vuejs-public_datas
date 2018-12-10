import Vue from 'vue'

import KEYS from './util/secrets'

import VueRouter from 'vue-router'
import routes from './routes.js'
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: {
    key: KEYS.GOOGLE_API_KEY,
    libraries: "places"
  }
});

import Papa from 'papaparse'
import axios from 'axios'

import {Ubs} from "./util/Ubs.js"
import {EventBus} from './util/event-bus';

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
    this.loading_datas = true
    axios.get("http://repositorio.dados.gov.br/saude/unidades-saude/unidade-basica-saude/ubs.csv",
    {
      mode: 'no-cors'
    }).then(response =>{
      var listOfArrays = Papa.parse(response.data,{header: true}).data
      this.populateUbsList(listOfArrays)
      this.ubs_list = ubs_list
      this.loading_datas = false
    })
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
