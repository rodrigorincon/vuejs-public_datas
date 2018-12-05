<template>
  <div>
    <div>
      <search></search>
      <div v-if="!loading && ubs_list.length > 0">
        <google-map :ubs_to_mark="ubs_list" />
        <ubs-table :ubs_list="ubs_list"></ubs-table>
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

export default {
  props: ["ubs_list", "loading"],
  components:{
    Search,
    UbsTable,
    GoogleMap
  }
}
</script>
