<template>
	<div class="ubsTable">
		<table border="1">
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
					<td> {{ubs.endereco() }} </td>
					<td> <router-link :to="{ name: 'ubs', params: {id: ubs.cod_cnes} }"> Mais </router-link></td>
					<td> </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>	
	export default {
		props: ["ubs_list"]
	}
</script>

<style>
.ubsTable{
	padding-top: 10px;
}
</style>