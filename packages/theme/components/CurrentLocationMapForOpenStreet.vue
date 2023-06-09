<template>
  <div v-show="enable" id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="15" :center="center">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
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
      center: [13.45274, -16.57803]
    };
  },
  mounted() {
    this.customMarker = this.$L.icon({
      iconUrl: '/icons/pulseMarker.svg',
      iconSize: [100, 100]
    });
  },
  watch: {
    upadateMap: function(newVal, oldVal) {
      this.center = [
        this.$store.state.sLocation.lat,
        this.$store.state.sLocation.long
      ];
    }
  },

  methods: {
    enableLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = [position.coords.latitude, position.coords.longitude];
        },
        (error) => {
          console.log(error.message);
        }
      );
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
