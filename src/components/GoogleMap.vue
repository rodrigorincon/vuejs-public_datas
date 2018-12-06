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
    zoom: { default: 3, type: Number },
    calcRoute: { default: false, type: Boolean }
  },
  data() {
    return {
      center: { lat: -15.7940, lng: -47.8828 }
    };
  },
  mounted(){
    this.$refs.map.options.maxZoom = 18
    if(this.calcRoute){
      this.getMyPosition()
      this.calcRouteToUbs()
    }
  },
  watch:{
    ubs_to_mark: function(new_markers, old_markers){
      if(new_markers.length == 1 && new_markers[0].cod_cnes !== null && this.$vnode.key == 2){
        const bounds = new google.maps.LatLngBounds()
        new_markers.forEach(ubs => {
          bounds.extend(ubs.position())
        })
        this.$refs.map.fitBounds(bounds)
        if(this.calcRoute){
          this.getMyPosition()
          this.calcRouteToUbs()
        }
      }
    }
  },
  methods: {
    showUbsDetails: function(id){
      this.$router.push('/ubs/'+id)
    },
    getMyPosition: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
      const bounds = new google.maps.LatLngBounds()
      bounds.extend(this.center)
      bounds.extend(this.ubs_to_mark[0].position())
      this.$refs.map.fitBounds(bounds)
      console.log("aqui")
      console.log(this.ubs_to_mark[0].position())
      console.log(this.center)
    },
    calcRouteToUbs: function(){
      var map = new google.maps.Map(document.getElementById('map'), {})
      console.log(this.$refs.map)
      console.log(map)
      var directionsDisplay = new google.maps.DirectionsRenderer({
          map: this.$refs.map.$mapObject
      });
      var directionsService = new google.maps.DirectionsService
      directionsService.route({
        origin: this.center,
        destination: this.ubs_to_mark[0].position(),
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        avoidTolls: true,
        avoidFerries: true,
        avoidHighways: false
      },function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //directionsDisplay.setDirections(response);
            console.log("funfou")
        } else {
            alert('Não foi possível calcular uma rota até a UBS ' + status);
        }
      });
    }
  }
};
</script>