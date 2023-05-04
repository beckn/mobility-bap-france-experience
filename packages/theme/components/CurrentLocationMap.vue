<template>
  <div v-show="enable">
    <div id="map"></div>
  </div>
</template>
<script>
//import { useUiState } from '~/composables':
//const { sLocation } = useUiState();
export default {
  props: {
    enable: {
      type: Boolean,
      default: false
    },
    disablepulse: {
      type: Boolean,
      default: false
    },
    upadateMap: {
      type: String
    }
  },
  data: () => ({
    mapCenter: {
      lat: '',
      lag: ''
    },
    map: null,
    zoom: 18,
    marker: null
  }),

  mounted() {
    if (this.disablepulse === true) {
      this.enableLocation();
    } else
      this.setMap(
        parseFloat(`${this.$store.state.sLocation.lat}`),
        parseFloat(`${this.$store.state.sLocation.long}`)
      );
  },
  methods: {
    // current location of user autodetect
    enableLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          (this.mapCenter.lat = position.coords.latitude),
            (this.mapCenter.lag = position.coords.longitude),
            this.setMap(this.mapCenter.lat, this.mapCenter.lag);
          this.codeLatLng(this.mapCenter.lat, this.mapCenter.lag);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    setMap(ln, lt) {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: ln, lng: lt },
        zoom: this.zoom
      });
      this.myMarker(ln, lt);
    },
    myMarker(ln, lt) {
      const pulse = '/icons/pulseMarker.svg';
      const movingIcon = this.disablepulse ? icon : pulse;
      this.marker = new google.maps.Marker({
        position: { lat: ln, lng: lt },
        map: this.map,
        draggable: this.disablepulse ? true : false,
        icon: movingIcon
      });
      this.markerpos();
    },
    markerpos() {
      const that = this;
      google.maps.event.addListener(that.marker, 'dragstart', function (evt) {
        that.mapCenter.lat = evt.latLng.lat().toFixed(3);
        that.mapCenter.lag = evt.latLng.lng().toFixed(3);
      });
      google.maps.event.addListener(that.marker, 'dragend', function (evt) {
        that.mapCenter.lat = evt.latLng.lat().toFixed(3);
        that.mapCenter.lag = evt.latLng.lng().toFixed(3);
        that.codeLatLng(that.mapCenter.lat, that.mapCenter.lag);
      });
    },
    codeLatLng(lat, lng) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { latLng: new google.maps.LatLng(lat, lng) },
        (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              localStorage.setItem('SourceLocation', JSON.stringify(results[1]))
              //formatted address
              this.$emit(
                'Currentlocation',
                lat,
                lng,
                results[0].formatted_address
              );
            } else {
              alert('No results found');
            }
          } else {
            alert('Geocoder failed due to: ' + status);
          }
        }
      );
    }
  },
  watch: {
    upadateMap: function (newVal, oldVal) {
      // watch it
      this.setMap(
        parseFloat(`${this.$store.state.sLocation.lat}`),
        parseFloat(`${this.$store.state.sLocation.long}`)
      );
    }
  },
  name: 'CurrentLocationMap'
};
</script>
<style lang="scss" scoped>
div#map {
  @media (max-height: 667px) {
    height: 400px;
  }

  height: 500px;
  width: 100%;
  overflow: hidden;
}
</style>
