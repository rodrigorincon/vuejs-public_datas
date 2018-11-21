<template>
	<div class="ubsTable">
		<table border="1" v-if="ubs_list.length > 0">
			<thead>
				<th></th>
				<th>Nome</th>
				<th>Endereço</th>
				<th>Mais</th>
				<th>Salvar nos favoritos</th>
			</thead>
			<tbody>
				<tr v-for="ubs in ubs_list">
					<td></td>
					<td> {{ubs.nom_estab}} </td>
					<td> {{ endereco(ubs) }} </td>
					<td> <router-link :to="{ name: 'ubs', params: {id: ubs.cod_cnes} }"> Mais </router-link></td>
					<td> </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		props: ["ubs_list"],
		methods:{
			endereco(ubs){
				return ubs.dsc_endereco + ", " + ubs.dsc_bairro + ", " + ubs.dsc_cidade
			}
		}
	}
</script>

<style>
.ubsTable{
	padding-top: 10px;
}
</style>