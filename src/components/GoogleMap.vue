<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="zoom"
      style="width:100%;  height: 400px;"
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
  props: ["ubs_to_mark"],
  data() {
    return {
      center: { lat: -15.7940, lng: -47.8828 },
      zoom: 3
    };
  },

  methods: {
    showUbsDetails: function(id){
      this.$router.push('/ubs/'+id)
    }
  }
};
</script>