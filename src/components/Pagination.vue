<template>
	<div>
		<button @click="sendToFirst" v-if="firstLastBtn" :disabled="!isFirstClickable()">
			{{firstBtnText}}
		</button>
		<button @click="sendToPrev" v-if="nextPrevBtn" :disabled="!isPrevClickable()">
			{{prevBtnText}}
		</button>
		<button v-for="page in pagesToShow()" @click="sendTo(page)" :disabled="page == actualPage">
				{{page}}
			</button>
		<button @click="sendToNext" v-if="nextPrevBtn" :disabled="!isNextClickable()">
			{{nextBtnText}}
		</button>
		<button @click="sendToLast"  v-if="firstLastBtn" :disabled="!isLastClickable()">
			{{lastBtnText}}
		</button>
		<br>
		<slot :list-paginated="objectsToShow"></slot>
	</div>
</template>

<script>
	export default{
		props: {
			firstLastBtn: {
				type: Boolean,
				required: false,
      			default: true
			},
			nextPrevBtn: {
				type: Boolean,
				required: false,
      			default: true	
			},
			firstBtnText: {
				type: String,
				required: false,
      			default: "<<"
			},
			lastBtnText: {
				type: String,
				required: false,
      			default: ">>"
			},
			prevBtnText: {
				type: String,
				required: false,
      			default: "<"
			},
			nextBtnText: {
				type: String,
				required: false,
      			default: ">"
			},
			list: {
				type: Array,
				required: true
			},
			perPage: {
				type: Number,
				required: false,
				default: 10	
			},
			limit: {
				type: Number,
				required: false,
				default: 5	
			}
		},
		data(){
			return{
				actualPage: 0
			}
		},
		computed:{
			objectsToShow(){
				var initial = this.actualPage*this.perPage
				return this.list.slice(initial , initial+this.perPage)
			},
			lastPageNumber(){
				var numberPages = Math.ceil(this.list.length/this.perPage)
				return numberPages > 0 ? numberPages-1 : 0
			}
		},
		watch:{
			list(){
				this.actualPage = 0
			}
		},
		methods:{
			sendToFirst(){
				this.actualPage = 0
			},
			sendToLast(){
				this.actualPage = this.lastPageNumber
			},
			sendToPrev(){
				if(this.isFirstClickable()){
					this.actualPage--
				}
			},
			sendToNext(){
				if(this.isLastClickable()){
					this.actualPage++
				}
			},
			sendTo(pageNumber){
				this.actualPage = pageNumber	
			},
			totalPages(){
				return Array.from(Array(this.lastPageNumber+1).keys())
			},
			pagesToShow(){
				var qtdBeforeActual = Math.ceil(this.limit/2)
				var first = this.actualPage-qtdBeforeActual
				if(first < 0){
					first = 0
				}
				return this.totalPages().slice(first, first+this.limit)
			},
			isFirstClickable(){
				return this.actualPage > 0
			},
			isLastClickable(){
				return this.actualPage < this.lastPageNumber
			},
			isPrevClickable(){
				return this.isFirstClickable()
			},
			isNextClickable(){
				return this.isLastClickable()
			}
		}
	}
</script>

<style>
	
</style>