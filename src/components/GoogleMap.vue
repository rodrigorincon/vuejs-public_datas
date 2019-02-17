<template>
  <div>
    <div v-if="!hasKey" class="map error">
      <div>
        <p>
          Para exibir o mapa é necessário uma
          <a
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
          >Chave do Google Maps</a>
        </p>
        <p>
          A chave deve ser adicionada no arquivo
          <code>src/util/secrets.js</code>
        </p>
        <p>
          Para evitar subir sua chave rode
          <code>npm run secrets</code>
        </p>
      </div>
    </div>
    <gmap-map v-if="hasKey" :center="center" :zoom="zoom" class="map" ref="map">
      <gmap-marker
        v-for="ubs in ubs_to_mark"
        :key="ubs.cod_cnes"
        :position="ubs.position()"
        @click="showUbsDetails(ubs.cod_cnes)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import Vue from 'vue';
import { GOOGLE_API_KEY } from '../util/secrets';
import * as VueGoogleMaps from 'vue2-google-maps';

if (GOOGLE_API_KEY) {
	Vue.use(VueGoogleMaps, {
		load: {
			key: GOOGLE_API_KEY,
			libraries: 'places'
		}
	});
}

export default {
	props: {
		ubs_to_mark: { type: Array },
		zoom: { default: 3, type: Number }
	},
	data() {
		return {
			hasKey: Boolean(GOOGLE_API_KEY),
			center: { lat: -15.794, lng: -47.8828 }
		};
	},
	mounted() {
		this.$refs.map.options.maxZoom = 18;
	},
	watch: {
		ubs_to_mark: function(new_markers) {
			const bounds = new google.maps.LatLngBounds();
			new_markers.forEach(ubs => {
				bounds.extend(ubs.position());
			});
			this.$refs.map.fitBounds(bounds);
		}
	},
	methods: {
		showUbsDetails: function(id) {
			this.$router.push('/ubs/' + id);
		}
	}
};
</script>
<style lang="scss">
.map {
	align-items: center;
	background: #bdbdbd;
	width: 100%;
	min-height: 400px;
	height: calc(100vh - 4rem);
	&.error {
		text-align: center;
		display: flex;
		> div {
			flex: 1;
		}
	}
}
</style>
