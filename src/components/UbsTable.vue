<template>
	<div class="ubsTable">
		<table border="1">
			<thead>
				<th></th>
				<th>Nome</th>
				<th>Endereço</th>
				<th>Mais Info</th>
				<th></th>
			</thead>
			<tbody>
				<tr v-for="ubs in ubs_list">
					<td>
						<i :class="{'fas fa-star': ubs.isSaved}"></i>
					</td>
					<td> {{ubs.nom_estab}} </td>
					<td> {{ubs.endereco() }} </td>
					<td> <router-link :to="{ name: 'ubs', params: {id: ubs.cod_cnes} }"> <i class="fas fa-info-circle"></i> </router-link></td>
					<td>
						<strong v-if="ubs.isSaved" @click="ubs.changeFavorite()">
							Tirar dos favoritos
						</strong>
						<strong v-else @click="ubs.changeFavorite()">
							Salvar nos favoritos
						</strong>
					</td>
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