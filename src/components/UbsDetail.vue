<template>
	<div>
		<div style="text-align: left;">
			<h1>{{ubs.nom_estab}}</h1>
			<h4>{{ubs.endereco()}}</h4>
			<h4>{{ubs.formatPhone()}}</h4>
		</div>
		<div style="width: 100%;">
			<div style="width=50%;">
				
			</div>
			<div style="width=50%;">
				<ul>
					<li v-if="ubs.cod_cnes">
						Código da UBS: <strong>{{ubs.cod_cnes}}</strong>
					</li>
					<li v-if="ubs.dsc_estrut_fisic_ambiencia">
						Estrutura física: <strong>{{ubs.dsc_estrut_fisic_ambiencia}}</strong>
					</li>
					<li v-if="ubs.dsc_adap_defic_fisic_idosos">
						Adaptação para deficientes e idosos: <strong>{{ubs.dsc_adap_defic_fisic_idosos}}</strong>
					</li>
					<li v-if="ubs.dsc_equipamentos">
						Qualidade dos equipamentos: <strong>{{ubs.dsc_equipamentos}}</strong>
					</li>
					<li v-if="ubs.dsc_medicamentos">
						Qualidade dos médicos: <strong>{{ubs.dsc_medicamentos}}</strong>
					</li>
				</ul>
			</div>
		</div>
		<router-link :to="{ name: 'home' }"> Voltar </router-link>
	</div>
</template>

<script>
	import {Ubs} from "../util/Ubs.js"

	export default{
		props: ["ubs_list"],
		computed:{
			ubs(){
				var my_ubs = this.ubs_list.find(ubs => ubs.cod_cnes === this.$route.params.id)
				return my_ubs ? my_ubs : new Ubs()
			}
		}
	}
</script>