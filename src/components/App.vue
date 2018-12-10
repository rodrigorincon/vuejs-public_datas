<template>
  <div>
    <div>
      <search></search>
      <div v-if="!loading && ubs_list.length > 0">
        <pagination :list="ubs_list" :perPage="25" firstBtnText="Primeiros" lastBtnText="Últimos" prevBtnText="Anteiores" nextBtnText="Próximos">
          <template slot-scope="props">
            <google-map :ubs_to_mark="props.listPaginated" />
            <ubs-table :ubs_list="props.listPaginated"></ubs-table>
          </template>
        </pagination>
      </div>
      <div v-else-if="!loading && ubs_list.length == 0">
        <p>Não há dados a serem mostrados.</p>
      </div>
      <div v-else>
        <img src="../assets/ajax-loader.gif">    
      </div>
    </div>
  </div>
</template>

<script>
import Search from "./Search.vue"
import UbsTable from "./UbsTable.vue"
import GoogleMap from "./GoogleMap.vue";
import Pagination from "./Pagination.vue";

export default {
  props: ["ubs_list", "loading"],
  components:{
    Search,
    UbsTable,
    GoogleMap,
    Pagination
  }
}
</script>
