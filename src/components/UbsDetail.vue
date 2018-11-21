<template>
	<div>
		{{ubs.nom_estab}}
		<router-link :to="{ name: 'home' }"> Voltar </router-link>
	</div>
</template>

<script>
	export default{
		props: ["ubs_list"],
		computed:{
			ubs(){
				var my_ubs = this.ubs_list.find(ubs => ubs.cod_cnes === this.$route.params.id)
				return my_ubs ? my_ubs : this.defaultUbs()
			}
		},
		methods:{
			defaultUbs(){
				return {vlr_latitude: null, vlr_longitude: null, cod_munic: null, cod_cnes: null, nom_estab: null, dsc_endereco: null, dsc_bairro: null, dsc_cidade: null, dsc_telefone: null, dsc_estrut_fisic_ambiencia: null, dsc_adap_defic_fisic_idosos: null, dsc_equipamentos: null, dsc_medicamentos: null}
			}
		}
	}
</script>