<template>
  <div>
    <div>
      <search></search>
      <ubs-table :ubs_list="ubs_list"></ubs-table>
    </div>
  </div>
</template>

<script>
import Search from "./Search.vue"
import UbsTable from "./UbsTable.vue"

export default {
  props: ["ubs_list"],
  components:{
    Search,
    UbsTable
  }
}
</script>
