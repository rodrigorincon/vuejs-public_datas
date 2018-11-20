<template>
	<div class="global">
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
					<td> {{ endereco(ubs) }} </td>
					<td> </td>
					<td> </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		props: ["ubs_list"],
		data() {
			return{

			}
		},
		methods:{
			endereco(ubs){
				return ubs.dsc_endereco + ", " + ubs.dsc_bairro + ", " + ubs.dsc_cidade
			}
		}
	}
</script>

<style>
.global{
	padding-top: 10px;
}
</style>