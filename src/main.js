import Vue from 'vue'

import VueRouter from 'vue-router'
import routes from './routes.js'
Vue.use(VueRouter)

import Papa from 'papaparse'
import axios from 'axios'

import {Ubs} from "./util/Ubs.js"

var ubs_list = []

import {EventBus} from './util/event-bus';

new Vue({
  el: '#app',
  data(){
    return{
      ubs_list: []
    }
  },
  created(){
    axios.get("http://repositorio.dados.gov.br/saude/unidades-saude/unidade-basica-saude/ubs.csv",
    {
      mode: 'no-cors'
    }).then(response =>{
      var listOfArrays = Papa.parse(response.data,{header: true}).data
      this.populateUbsList(listOfArrays)
      this.ubs_list = ubs_list
    })
    EventBus.$on('filter', this.filterUbs )
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
      name        = name.toLowerCase()
      filter_type = filter_type.toLowerCase()
      if(filter_type == ""){
        this.ubs_list = ubs_list
      }else if(filter_type == "nome"){
        this.ubs_list = ubs_list.filter(ubs => ubs.nom_estab.toLowerCase().includes(name) )
      }else if(filter_type == "endereco"){
        this.ubs_list = ubs_list.filter(ubs => ubs.endereco().toLowerCase().includes(name) )
      }
    }
  },
  router: new VueRouter({routes})
})
