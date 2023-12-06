<template>
  <client-only>
    <div class="s-footer">
      <client-only>
        <div class="s-p-addcart" @click="toggleLocationDrop">
          <button v-e2e="'footer-button'" :value="buttonText" class="sf-button f-button" :class="{
            'color-primary ': buttonEnable,
            'is-disabled--button': !buttonEnable
          }" :disabled="!buttonEnable" link="" @click="changeItemNumber('add')">
            <slot name="buttonIcon" />
            <div class="f-btn-text">{{ buttonText }}</div>
          </button>
        </div>
      </client-only>
      <!-- <template>
        <div id="location" class="location-drop">
          <SfSidebar
            :visible="!!isLocationdropOpen"
            :button="false"
            title="Ride is Confirmed"
            @click="goBack"
            @close="toggleLocationDrop"
            class="sidebar sf-sidebar--right"
          >
            <transition name="fade">
              <client-only>
                <LocationSearch
                  :b_name="b_name"
                  @locationSelected="locationSelected"
                  @toggleLocationDrop="toggleLocationDrop"
                  v-e2e="'app-location-sidebar'"
                />
              </client-only>
            </transition>
          </SfSidebar>
        </div>
      </template> -->
    </div>
  </client-only>
</template>
<script>
import { SfCircleIcon, SfButton, SfSidebar, SfIcon } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import LocationSearch from './LocationSearch.vue';
import ModalComponent from '../components/ModalComponent.vue';
import { useUiState } from '~/composables';
import Dropdown from '../components/Dropdown.vue';
import DropdownContent from '../components/DropdownContent.vue';
export default {
  name: 'ConfirmRide',
  components: {
    SfCircleIcon,
    SfButton,
    SfSidebar,
    SfIcon,
    LocationSearch,
    ModalComponent,
    Dropdown,
    DropdownContent
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    value: { type: Number, default: 1 },
    maxLimit: { type: Number, default: 100 },
    totalPrice: { type: Number, default: 0 },
    totalItem: { type: Number, default: 0 },
    footerEnable: { type: Boolean, default: true },
    buttonEnable: { type: Boolean, default: true },
    buttonText: { type: String, default: '' }
  },
  data() {
    return {
      isActive: false
    };
  },
  setup(props, { root, emit }) {
    const { selectedLocation, updateLocation } = useUiState();
    const isLocationdropOpen = ref(false);
    const _value = ref(props.value);
    const _maxLimit = ref(props.maxLimit);
    const isShow = ref(false);
    const location = ref(selectedLocation?.value?.address);
    const currentUser = root.$store.$fire.auth.currentUser;
    const b_name = ref('confirmride');
    const toggleLocationDrop = () => {
      root.$router.push('/Driverinformation')

      //isLocationdropOpen.value = !isLocationdropOpen.value;
    };
    const goBack = () => {
      root.$router.back();
      //toggleSearchVisible(true);
    };
    const toggleIsShow = () => {
      isShow.value = !isShow.value;
    };
    const openHamburger = false;
    const locationSelected = (latitude, longitude, address) => {
      location.value = address;
      // toggleLocationDrop();
      updateLocation({
        latitude: latitude,
        longitude: longitude,
        address: address
      });
    };
    const changeItemNumber = (type) => {
      emit('updateItemCount', _value);

    };
    return {
      b_name,
      changeItemNumber,
      _value,
      _maxLimit,
      isLocationdropOpen,
      toggleLocationDrop,
      isShow,
      toggleIsShow,
      location,
      locationSelected,
      currentUser,
      openHamburger,
      goBack
    };
  },
  computed: {
    isLocationSelected() {
      return this.location !== '';
    },
    locationText() {
      return this.location !== '' ? 'Your location' : 'Set location';
    },
    isAuthenticatedUser() {
      return this.currentUser !== null;
    }
  }
  /* mounted:{
    show() {
      return  localStorage.removeItem('cartData');
    }
  }*/
};
</script>
<style lang="scss" scoped>
.sf-circle-icon {
  --icon-color: #f37a20;
}

.layout-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.notShown {
  visibility: hidden !important;
  position: absolute;
}

.button-pos {
  display: flex;
  align-items: center;
  height: 5px;
  padding-left: 5px;
}

.location-icon {
  display: flex;
  width: 125px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
}

.sign-in-text {
  color: #f37a20;
}

.userIcon {
  background-color: #f37a20;
}

.user-cart-content {
  display: flex;
  justify-content: space-between;
  width: 7rem;
}

.profile-tooltip {
  position: relative;
}

.profile-tooltip::before,
.profile-tooltip::after {
  --scale: 0;
  --arrow-size: 10px;
  --tooltip-color: #333;
  position: absolute;
  top: -0.25rem;
  left: 50%;
  transform: translateX(-50%) translateY(var(--translate-y, 0)) scale(var(--scale));
  transition: 150ms transform;
  transform-origin: bottom center;
}

.profile-tooltip::before {
  --translate-y: calc(-100% - var(--arrow-size));
  content: attr(data-tooltip);
  color: white;
  padding: 0.5rem;
  border-radius: 0.3rem;
  text-align: center;
  width: max-content;
  margin-left: -2rem;
  background: var(--tooltip-color);
}

.profile-tooltip:hover::before,
.profile-tooltip:hover::after {
  --scale: 1;
}

.profile-tooltip::after {
  --translate-y: calc(-1 * var(--arrow-size));
  content: '';
  border: var(--arrow-size) solid transparent;
  border-top-color: var(--tooltip-color);
  transform-origin: top center;
}

.s-footer .sf-button {
  width: 100% !important;
}

.color-def {
  background: #cacaca;
}
</style>
