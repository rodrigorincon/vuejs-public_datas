<template>
	<div class="search">
		<input type="text" v-model="searchText" placeholder="Nome ou cidade da UBS" @keyup.enter="search" class="input-search">
		<select v-model="select_value">
			<option disabled value="">Filtrar por</option>
			<option>Nome</option>
			<option>Endereco</option>
		</select>
		<button @click="search">Pesquisar</button>
		<button @click="clean">Limpar</button>
		<button @click="favoritos">{{favoriteTextBtn}}</button>
	</div>
</template>

<script>
	import {EventBus} from '../util/event-bus';

	export default{
		data(){
			return{
				searchText: "",
				select_value: "",
				favoriteShowed: false
			}
		},
		computed:{
			favoriteTextBtn(){
				return this.favoriteShowed ? "Mostrar todos" : "Mostrar favoritos"
			}
		},
		methods:{
			search(){
				if(this.select_value === ""){
					alert("selecione uma opção de filtro")
					return;
				}
				EventBus.$emit('filter', this.searchText, this.select_value)
			},
			clean(){
				this.searchText = ""
				this.select_value = ""
				EventBus.$emit('filter', this.searchText, this.select_value)
			},
			favoritos(){
				this.searchText = ""
				this.select_value = ""
				this.favoriteShowed = !this.favoriteShowed
				EventBus.$emit('favorites', this.favoriteShowed)
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