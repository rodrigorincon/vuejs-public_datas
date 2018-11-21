<template>
	<div>
		<div style="text-align: left;">
			<h1>{{ubs.nom_estab}}</h1>
			<h4>{{ endereco() }}</h4>
			<h4>{{ formatPhone(ubs.dsc_telefone) }}</h4>
		</div>
		<div style="width: 100%;">
			<div style="width=50%;">
				
			</div>
			<div style="width=50%;">
				<ul>
					<li>Código da UBS: <strong>{{ubs.cod_cnes}}</strong></li>
					<li>Estrutura física: <strong>{{ubs.dsc_estrut_fisic_ambiencia}}</strong></li>
					<li>Adaptação para deficientes e idosos: <strong>{{ubs.dsc_adap_defic_fisic_idosos}}</strong></li>
					<li>Qualidade dos equipamentos: <strong>{{ubs.dsc_equipamentos}}</strong></li>
					<li>Qualidade dos médicos: <strong>{{ubs.dsc_medicamentos}}</strong></li>
				</ul>
			</div>
		</div>
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
			},
			endereco(){
				return this.ubs.dsc_endereco + ", " + this.ubs.dsc_bairro + ", " + this.ubs.dsc_cidade
			},
			formatPhone(phone){
				return "("+phone.substr(0,2)+") "+phone.substr(2,4)+"-"+phone.substr(6)
			}
		}
	}
</script>