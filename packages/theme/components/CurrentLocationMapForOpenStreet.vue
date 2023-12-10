<template>
  <div v-show="enable" id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="15" :center="center">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker :lat-lng="center"></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'CurrentLocationMapForOpenStreet',
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
  data() {
    return {
      customMarker: null,
      center: [0, 0] // Default center
    };
  },
  mounted() {
    this.customMarker = this.$L.icon({
      iconUrl: '/icons/pulseMarker.svg',
      iconSize: [100, 100]
    });

    this.enableLocation();
  },
  watch: {
    upadateMap: function (newVal, oldVal) {
      this.center = [this.$store.state.sLocation.lat, this.$store.state.sLocation.long];
    }
  },

  methods: {
    enableLocation() {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('experienceType')) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.center = [position.coords.latitude, position.coords.longitude];
              resolve();
            },
            (error) => {
              console.log(error.message);
              reject(error.message);
            }
          );
        } else {
          const stringifiedImportedOrderObject = localStorage.getItem('importedOrderObject')
          const parsedImportedOrderObject = JSON.parse(stringifiedImportedOrderObject)
          this.center =
            parsedImportedOrderObject?.message?.order?.item?.[0].tags?.Paris === 'Y'
              ? [48.8566, 2.3522]
              : [13.45274, -16.57803];
          resolve();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
div#map-wrap {
  @media (max-height: 667px) {
    height: 400px !important;
  }

  height: 500px !important;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 0;
}
</style>

