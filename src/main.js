import Vue from 'vue'

import VueRouter from 'vue-router'
import routes from './routes.js'
Vue.use(VueRouter)

import {Ubs} from "./util/Ubs.js"

var ubs_list = [
	new Ubs({vlr_latitude: -10.9112370014188, vlr_longitude: -37.0620775222768, cod_munic: 280030, cod_cnes: 3492, nom_estab: "US OSWALDO DE SOUZA", dsc_endereco: "TV ADALTO BOTELHO", dsc_bairro: "GETULIO VARGAS", dsc_cidade: "Aracaju", dsc_telefone: "7931791326", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"}),
	new Ubs({vlr_latitude: -23896, vlr_longitude: -53.41, cod_munic: 411885, cod_cnes: 6811299, nom_estab: "UNIDADE DE ATENCAO PRIMARIA SAUDE DA FAMILIAA", dsc_endereco: "RUA GUILHERME BRUXEL", dsc_bairro: "CENTRO", dsc_cidade: "Perobal", dsc_telefone: "3337411423", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"})
]

import {EventBus} from './util/event-bus';

new Vue({
  el: '#app',
  data(){
    return{
      ubs_list: []
    }
  },
  created(){
  	this.ubs_list = ubs_list
    EventBus.$on('filter', this.filterUbs )
  },
  methods:{
    filterUbs(name, filter_type){
      name        = name.toLowerCase()
      filter_type = filter_type.toLowerCase()
      if(filter_type == ""){
        this.ubs_list = ubs_list
      }else if(filter_type == "nome"){
        this.ubs_list = ubs_list.filter(ubs => ubs.nom_estab.toLowerCase().includes(name) )
      }else if(filter_type == "cidade"){
        this.ubs_list = ubs_list.filter(ubs => ubs.dsc_cidade.toLowerCase().includes(name) )
      }
    }
  },
  router: new VueRouter({routes})
})
