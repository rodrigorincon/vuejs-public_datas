<template>
  <div class="ubsTable">
    <table>
      <thead>
        <th>Nome</th>
        <th>Endereço</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="ubs in ubsList" :key="ubs.cod_cnes">
          <td>{{ubs.nom_estab}}</td>
          <td>{{ubs.endereco() }}</td>
          <td>
            <router-link class="fas fa-info-circle" :to="{ name: 'ubs', params: {id: ubs.cod_cnes} }" tag="button"></router-link>
            <button @click="ubs.changeFavorite()" :class="['fa-star',ubs.isSaved ? 'fas': 'far']"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
	props: ['ubsList']
};
</script>

<style>
.ubsTable {
	padding-top: 10px;
}
</style>
