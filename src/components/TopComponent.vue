<template>
	<div>
		<input type="text" v-model="searchText" placeholder="Nome da UBS" @keyup.enter="search">
		<button @click="search">Pesquisar</button>
	</div>
</template>

<script>
	export default{
		name: "header",
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