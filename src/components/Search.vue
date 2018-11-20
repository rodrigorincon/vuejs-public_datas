<template>
	<div class="global">
		<input type="text" v-model="searchText" placeholder="Nome da UBS" @keyup.enter="search">
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
.global{
	padding-top: 5px;
	padding-bottom: 5px;
	text-align: center;
}
input{
	width: 50%;
}
</style>