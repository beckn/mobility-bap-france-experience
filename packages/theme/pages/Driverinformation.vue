<template>
  <div>
    <div class="top-bar header-top">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div>Informations sur le conducteur</div>
    </div>
    <template>
      <div id="cafe-map"></div>
      <div>
        <div id="location-btn">
          <div>
            <div class="popover-bg">
              <div class="popover-content position-relative">
                <div>
                  <DriverInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
import { ref, computed } from '@vue/composition-api';
import Select from '../components/select.vue';
import DriverInfo from '../pages/DriverInfo.vue';
//import { useUiState } from '~/composables';
export default {
  data: () => ({
    service: null,
    geocodeService: null,
    map: null,
    marker: null,
    SourceLocation: '',
    destloc: ''
  }),
  // created() {
  //   this.service = new window.google.maps.places.AutocompleteService();
  //   this.geocodeService = new window.google.maps.Geocoder();
  // },
  mounted() {
   // const { dLocation, sLocation } = useUiState();
    this.SourceLocation = `${this.$store.state.sLocation.addres}`;
    this.destloc = `${this.$store.state.dLocation.addres}`;
    this.getlocation();
  },
  methods: {
   
    calculateAndDisplayRoute(start, end, map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setOptions({
        polylineOptions: {
          strokeColor: 'black'
        }
      });
      directionsRenderer.setMap(map);
      directionsService
        .route({
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        })
        .then((response, status) => {
          directionsRenderer.setDirections(response);
        })
        .catch((e) => {
          console.error('error', e);
          window.alert('Directions request failed due to ' + e.message);
        });
    },
    getlocation() {
      const start = new google.maps.LatLng(18.5204, 73.8567);
      this.map = new google.maps.Map(document.getElementById('cafe-map'), {
        center: start,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.calculateAndDisplayRoute(
        this.SourceLocation,
        this.destloc,
        this.map
      );
    },
    marker() {
      this.marker = new google.maps.Marker({
        position: { lat: this.mapCenter.lat, lng: this.mapCenter.lag },
        map: this.map
      });
    }
  },

  name: 'Driverinformation',
  components: {
    SfButton,
    SfIcon,
    Select,
    DriverInfo
  },
  setup(_, { root }) {
    const goBack = () => {
      root.$router.back();
    };

    return {
      goBack
    };
  }
};
</script>
<style lang="scss" scoped>
.top-bar {
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-around;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
}

.icon_back {
  position: absolute;
  left: 0;
  margin: 10px;
}
.button-pos {
  position: absolute;
  right: 0;
  top: 0;
}
.sf-search-bar__icon {
  padding-left: 80%;
}
div#cafe-map {
  width: 100%;
  @media (max-height: 667px) {
    height: 400px;
  }
  //height: 280px;
  height: 500px;
  position: fixed;
}
#btn {
  width: 100%;
  margin-bottom: 0%;
}

#location-btn {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: rgba(50, 50, 50, 0.75);
  height: 150px;
}
.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 1;
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>
