import { shallowMount } from '@vue/test-utils'
import {Ubs} from "@/util/Ubs.js"
import UbsTable from '@/components/UbsTable.vue'
import Pagination from '@/components/Pagination.vue'


describe('UbsTable', () => {
  it('textando renderizacao: renders tr for each item in props.ubs_list', () => {
    const ubs_list = [
		new Ubs({vlr_latitude: -10.9112370014188, vlr_longitude: -37.0620775222768, cod_munic: 280030, cod_cnes: 3492, nom_estab: "US OSWALDO DE SOUZA", dsc_endereco: "TV ADALTO BOTELHO", dsc_bairro: "GETULIO VARGAS", dsc_cidade: "Aracaju", dsc_telefone: "7931791326", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"}),
		new Ubs({vlr_latitude: -23896, vlr_longitude: -53.41, cod_munic: 411885, cod_cnes: 6811299, nom_estab: "UNIDADE DE ATENCAO PRIMARIA SAUDE DA FAMILIAA", dsc_endereco: "RUA GUILHERME BRUXEL", dsc_bairro: "CENTRO", dsc_cidade: "Perobal", dsc_telefone: "3337411423", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"})
	]
    const wrapper = shallowMount(UbsTable, {
      propsData: { ubs_list }
    })
    expect(wrapper.findAll('tr')).toHaveLength(ubs_list.length)
  })
})

describe('Pagination', () => {
  const ubs_list = [
	new Ubs({vlr_latitude: -10.9112370014188, vlr_longitude: -37.0620775222768, cod_munic: 280030, cod_cnes: 3492, nom_estab: "US OSWALDO DE SOUZA", dsc_endereco: "TV ADALTO BOTELHO", dsc_bairro: "GETULIO VARGAS", dsc_cidade: "Aracaju", dsc_telefone: "7931791326", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"}),
	new Ubs({vlr_latitude: -23896, vlr_longitude: -53.41, cod_munic: 411885, cod_cnes: 6811299, nom_estab: "UNIDADE DE ATENCAO PRIMARIA SAUDE DA FAMILIAA", dsc_endereco: "RUA GUILHERME BRUXEL", dsc_bairro: "CENTRO", dsc_cidade: "Perobal", dsc_telefone: "3337411423", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"}),
	new Ubs({vlr_latitude: -23896, vlr_longitude: -53.41, cod_munic: 411885, cod_cnes: 6811299, nom_estab: "UNIDADE DE ATENCAO PRIMARIA SAUDE DA FAMILIAA", dsc_endereco: "RUA GUILHERME BRUXEL", dsc_bairro: "CENTRO", dsc_cidade: "Perobal", dsc_telefone: "3337411423", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"}),
	new Ubs({vlr_latitude: -23896, vlr_longitude: -53.41, cod_munic: 411885, cod_cnes: 6811299, nom_estab: "UNIDADE DE ATENCAO PRIMARIA SAUDE DA FAMILIAA", dsc_endereco: "RUA GUILHERME BRUXEL", dsc_bairro: "CENTRO", dsc_cidade: "Perobal", dsc_telefone: "3337411423", dsc_estrut_fisic_ambiencia: "Desempenho acima da média", dsc_adap_defic_fisic_idosos: "Desempenho mediano ou um pouco abaixo da média", dsc_equipamentos: "Desempenho muito acima da média" , dsc_medicamentos: "Desempenho acima da média"})
  ] 
  
  it('textando atributos: o valor inicial de actualPage deve ser 0', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: { list: ubs_list, perPage: 2 }
    })
    var pagination = wrapper.vm
    expect(pagination.actualPage).toBe(0)
  })

  it('textando metodos: ao chamar sendToLast o valor de actualPage deve ser 1', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: { list: ubs_list, perPage: 2 }
    })
    var pagination = wrapper.vm
    
    pagination.sendToLast()
    expect(pagination.actualPage).toBe(1)
  })
})