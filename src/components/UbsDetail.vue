<template>
  <div>
    <div style="text-align: left;">
      <h1>{{ubs.nom_estab}}</h1>
      <p>{{ubs.endereco()}}</p>
      <p>
        <i class="fas fa-phone"></i>
        {{ubs.formatPhone()}}
      </p>
    </div>
    <div style="width: 100%;">
      <div class="half">
        <google-map :ubs_to_mark="[ubs]" :zoom="18" :calcRoute="true"/>
      </div>
      <div class="half">
        <ul>
          <li v-if="ubs.cod_cnes">
            <i class="fas fa-hospital-symbol"></i>
            Código da UBS:
            <strong>{{ubs.cod_cnes}}</strong>
          </li>
          <li v-if="ubs.dsc_estrut_fisic_ambiencia">
            <i class="fas fa-hospital"></i>Estrutura física:
            <strong>{{ubs.dsc_estrut_fisic_ambiencia}}</strong>
          </li>
          <li v-if="ubs.dsc_adap_defic_fisic_idosos">
            <i class="fab fa-accessible-icon"></i>
            Adaptação para deficientes e idosos:
            <strong>{{ubs.dsc_adap_defic_fisic_idosos}}</strong>
          </li>
          <li v-if="ubs.dsc_equipamentos">
            <i class="fas fa-stethoscope"></i>
            Qualidade dos equipamentos:
            <strong>{{ubs.dsc_equipamentos}}</strong>
          </li>
          <li v-if="ubs.dsc_medicamentos">
            <i class="fas fa-user-md"></i>
            Qualidade dos médicos:
            <strong>{{ubs.dsc_medicamentos}}</strong>
          </li>
        </ul>
      </div>
    </div>
    <router-link :to="{ name: 'home' }">Voltar</router-link>
  </div>
</template>

<script>
import { Ubs } from '../util/Ubs.js';
import GoogleMap from './GoogleMap.vue';

export default {
	props: ['ubsList'],
	computed: {
		ubs() {
			var my_ubs = this.ubsList.find(
				ubs => ubs.cod_cnes === this.$route.params.id
			);
			return my_ubs ? my_ubs : new Ubs();
		}
	},
	components: {
		GoogleMap
	}
};
</script>
