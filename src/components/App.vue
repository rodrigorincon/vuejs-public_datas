<template>
  <div>
    <div>
      <search></search>
      <div v-if="!loading && ubsList.length > 0">
        <pagination
          :list="ubsList"
          :perPage="25"
          firstBtnText="Primeiros"
          lastBtnText="Últimos"
          prevBtnText="Anteiores"
          nextBtnText="Próximos"
        >
          <template slot-scope="props">
            <div class="half">
              <google-map :ubs_to_mark="props.listPaginated"/>
            </div>
            <div class="half">
              <ubs-table :ubs-list="props.listPaginated"></ubs-table>
            </div>
          </template>
        </pagination>
      </div>
      <div v-else-if="!loading && ubsList.length == 0">
        <p>Não há dados a serem mostrados.</p>
      </div>
      <div v-else>
        <img src="../assets/ajax-loader.gif">
      </div>
    </div>
  </div>
</template>

<script>
import Search from './Search.vue';
import UbsTable from './UbsTable.vue';
import GoogleMap from './GoogleMap.vue';
import Pagination from './Pagination.vue';

export default {
	props: ['ubsList', 'loading'],
	components: {
		Search,
		UbsTable,
		GoogleMap,
		Pagination
	}
};
</script>
