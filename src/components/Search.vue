<template>
	<div class="search">
		<input type="text" v-model="searchText" placeholder="Nome da UBS" @keyup.enter="search" class="input-search">
		<button @click="search">Pesquisar</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				searchText: ""
			}
		},
		methods:{
			search(){

			}
			
		}
	}
</script>

<style>
.search{
	padding-top: 5px;
	padding-bottom: 5px;
	text-align: center;
}
.input-search{
	width: 50%;
}
</style>