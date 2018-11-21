import Vue from 'vue'

import VueRouter from 'vue-router'
import routes from './routes.js'
Vue.use(VueRouter)

var ubs_list = [
	{vlr_latitude: -10.9112370014188, vlr_longitude: -37.0620775222768, cod_munic: 280030, cod_cnes: 3492, nom_estab: "US OSWALDO DE SOUZA", dsc_endereco: "TV ADALTO BOTELHO", dsc_bairro: "GETULIO VARGAS", dsc_cidade: "Aracaju", dsc_telefone: "7931791326", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"},
	{vlr_latitude: -23896, vlr_longitude: -53.41, cod_munic: 411885, cod_cnes: 6811299, nom_estab: "UNIDADE DE ATENCAO PRIMARIA SAUDE DA FAMILIAA", dsc_endereco: "RUA GUILHERME BRUXEL", dsc_bairro: "CENTRO", dsc_cidade: "Perobal", dsc_telefone: "3337411423", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"}
]

new Vue({
  el: '#app',
  data(){
    return{
      ubs_list: []
    }
  },
  created(){
  	this.ubs_list = ubs_list
  },
  router: new VueRouter({routes})
})
