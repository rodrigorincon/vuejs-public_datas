<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="zoom"
      style="width:100%;  height: 400px;"
      ref="map"
    >
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
export default {
  props: {
    ubs_to_mark: { type: Array },
    zoom: { default: 3, type: Number }
  },
  data() {
    return {
      center: { lat: -15.7940, lng: -47.8828 }
    };
  },
  mounted(){
    this.$refs.map.options.maxZoom = 18
  },
  watch:{
    ubs_to_mark: function(new_markers){
      const bounds = new google.maps.LatLngBounds()
      new_markers.forEach(ubs => {
        bounds.extend(ubs.position())
      })
      this.$refs.map.fitBounds(bounds)
    }
  },
  methods: {
    showUbsDetails: function(id){
      this.$router.push('/ubs/'+id)
    }
  }
};
</script>