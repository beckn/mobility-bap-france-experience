<template>
  <div>
    <slot name="locationInput">
      <div class="position-relative">
        <input
          ref="locationAutocomplete"
          v-model="location"
          type="text"
          placeholder="Entrer l'emplacement"
          aria-label="Sélectionnez l'emplacement"
          class="
            sf-header__search
            be-search-location
            sf-search-bar
            sf-header__search
            be-search-location
          "
          v-e2e="'app-location-sidebar-input'"
        />
        <SfButton class="button-pos sf-button--pure">
          <span class="sf-search-bar__icon">
            <SfIcon color="var(--c-text)" size="18px" icon="search" />
          </span>
        </SfButton>
      </div>
      <ul class="location-list" v-if="show">
        <li
          v-for="(result, i) in searchResults"
          :key="i"
          @click="getLocationDetails(result)"
          v-e2e="'app-location-sidebar-input-options'"
        >
          <SfButton class="button-pos sf-button--pure pos-left">
            <span class="sf-search-bar__icon">
              <SfIcon color="var(--c-text)" size="10px" icon="marker" />
            </span>
          </SfButton>
          {{ result.structured_formatting.main_text }}
          <p>{{ result.structured_formatting.secondary_text }}</p>
        </li>
        <!-- <p> lat:{{`${this.mapCenter.lat} and lag ${this.mapCenter.lag}`}}  </p> -->
      </ul>
    </slot>
    <template>
      <div id="cafe-map"></div>
      <div v-if="!show">
        <div id="location-btn">
          <div>
            <div class="popover-bg">
              <div class="popover-content position-relative">
                <br />
                <div>
                  <h4>Définir l'emplacement</h4>
                  <div class="close" @click="reload()"></div>
                </div>

                <hr style="width:100%;" />
                <h6 style="font-weight:400; padding: 0%;">
                  <p>Localisation actuelle</p>
                  {{ this.location }}
                </h6>
                <hr style="width:100%;" />

                <SfButton @click="$emit('toggleLocationDrop')" id="btn">
                  Définir l'emplacement</SfButton
                >

                <!-- <ModalComponent class="modalclass" /> -->
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
export default {
  data: () => ({
    location: '',
    searchResults: [],
    service: null,
    geocodeService: null,
    mapCenter: {
      lat: '',
      lag: ''
    },
    map: null,
    zoom: 14,
    show: true,
    marker: null

    // map:{lg:this.mapCenter.lag,lt:this.mapCenter.lat,}
    // mapCen}ter:{lag:this.log,lag:this.log}
  }),
  created() {
    this.service = new window.google.maps.places.AutocompleteService();
    this.geocodeService = new window.google.maps.Geocoder();
  },
  mounted() {
    this.$refs.locationAutocomplete.focus();
  },
  methods: {
    reload() {
      window.location.reload();
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = [];
        return;
      }
      this.searchResults = predictions;
    },

    getLocationDetails(selectedLocation) {
      this.location = selectedLocation.description;
      this.geocodeService
        .geocode({ placeId: selectedLocation.place_id })
        .then((response) => {
          this.$emit(
            'locationSelected',
            response.results[0].geometry.location.lat(),
            response.results[0].geometry.location.lng(),
            selectedLocation.description
          );
          this.show = !this.show;
          this.mapCenter.lat = response.results[0].geometry.location.lat();
          this.mapCenter.lag = response.results[0].geometry.location.lng();
          this.getlocation();

          // eslint-disable-next-line no-alert
        })
        .catch((err) => alert(err));
    },
    getlocation() {
      this.map = new google.maps.Map(document.getElementById('cafe-map'), {
        center: { lat: this.mapCenter.lat, lng: this.mapCenter.lag },
        zoom: this.zoom
      });
      this.marker = new google.maps.Marker({
        position: { lat: this.mapCenter.lat, lng: this.mapCenter.lag },
        map: this.map
      });
    }
  },
  watch: {
    location(newValue) {
      if (newValue) {
        this.service.getQueryPredictions(
          {
            input: this.location,
            types: ['geocode']
          },
          this.displaySuggestions
        );
      }
    }
  },
  name: 'LocationSearchBar',
  components: {
    SfButton,
    SfIcon
  }
};
</script>
<style lang="scss" scoped>
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
