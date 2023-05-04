<template>
  <div style="margin: 10px;">
    <div class="top-bar header-top">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div class="pagetittle">
        Geofence
      </div>
    </div>
    <div id="map"></div>
    <div style=" margin: 8px;">
      <SfButton
        id="btn2"
        class="button-pos sf-button--pure color-primary"
        @click="goHome"
        v-e2e="'home-search-button'"
        ><label for="btn">Go Back to Home</label>
      </SfButton>
    </div>
  </div>
</template>
<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
import { ref, onMounted } from '@vue/composition-api';

export default {
  components: {
    SfButton,
    SfIcon
  },

  data: () => ({
    mapCenter: {
      lat: null,
      lag: null
    },
    zoom: 14,
    polygoneCoords: null
  }),

  mounted() {
    const arr1 = sessionStorage.getItem('poligon');
    const arr = JSON.parse(arr1);
    console.log(arr);

    const polygon1 = arr.map((coord) => coord.split(',').map(Number));
    console.log(polygon1);

    const objArr = polygon1.map((pair) => ({ lat: pair[0], lng: pair[1] }));

    this.polygoneCoords = objArr;
    console.log(this.polygoneCoords);
    this.mapCenter.lat = parseFloat(objArr[0].lat);
    this.mapCenter.lag = parseFloat(objArr[0].lng);

    this.Map();
  },
  methods: {
    Map() {
      const myPolygon = new google.maps.Polygon({
        paths: this.polygoneCoords,
        strokeColor: 'rgba(0, 0, 0, 1)',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'rgba(243, 122, 32, 0.4)',
        fillOpacity: 0.35
      });

      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.mapCenter.lat, lng: this.mapCenter.lag },
        zoom: this.zoom
      });
      myPolygon.setMap(map);
    }
  },
  watch: {
    //   upadateMap: function(newVal, oldVal) {
    //     // watch it
    //     console.log('N:',newVal, 'O:',oldVal)
    //   }
  },
  name: 'Geofence',
  setup(_, context) {
    const goBack = () => {
      context.root.$router.back();
    };

    const goHome = () => {
      context.root.$router.push('Policies');
    };

    return {
      goBack,
      goHome
    };
  }
};
</script>
<style lang="scss" scoped>
div#map {
  @media (max-height: 667px) {
    height: 300px;
  }
  height: 550px;
  width: 100%;
  overflow: hidden;
}
.top-bar {
  padding-right: 40%;
  padding-left: 10px;
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
}
.pagetittle {

  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 29px;
  /* identical to box height, or 181% */

  text-align: center;

  color: #181725;
}
#btn2 {
  width: 328px;
  height: 48px;
  background: #f37a20;
  border-radius: 4px;
  width: 100%;
  margin-top: 5%;

  label {
    font-weight: 600;
    letter-spacing: 0.8px;
    font-size: 17px;
    color: aliceblue;
  }
}
</style>
