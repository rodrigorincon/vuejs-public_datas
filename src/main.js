import Vue from 'vue'

import KEYS from './util/secrets'

import VueRouter from 'vue-router'
import routes from './routes.js'
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: {
    key: KEYS.GOOGLE_API_KEY,
    libraries: "places" // necessary for places input
  }
});

import Papa from 'papaparse'
import axios from 'axios'

import {Ubs} from "./util/Ubs.js"

var ubs_list = []

import {EventBus} from './util/event-bus';



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
  },
  methods:{
    populateUbsList(arrayOrObject){
      if(ubs_list.length < 10){
        if(arrayOrObject instanceof Array){
          arrayOrObject.forEach(elem =>{
            this.populateUbsList(elem)
          })
        }else{
          ubs_list.push( new Ubs(arrayOrObject) )
        }
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
    }
  },
  router: new VueRouter({routes})
})
