<template>
  <client-only>
    <div class="location-content">
      <client-only>
        <div v-if="!enableLoader" class="s-p-addcart" @click="toggleLocationDrop">
          <button class="color-primary sf-button add-btn" @click="changeItemNumber('add')">
            Select
          </button>
        </div>
      </client-only>

      <div v-if="enableLoader" key="loadingCircle" class="loader-circle ">
        <LoadingCircle :enable="enableLoader" />
      </div>
    </div>
  </client-only>
</template>
<script>
import { SfCircleIcon, SfButton, SfSidebar, SfIcon } from '@storefront-ui/vue';
import { computed, ref, watch } from '@vue/composition-api';
import LocationSearch from './LocationSearch.vue';
import ModalComponent from '../components/ModalComponent.vue';
import { useUiState } from '~/composables';
import LoadingCircle from '../components/LoadingCircle';
import { useQuote } from '@vue-storefront/beckn';
import Dropdown from '../components/Dropdown.vue';
import DropdownContent from '../components/DropdownContent.vue';
import helpers from '../helpers/helpers';
export default {
  name: 'Location',
  components: {
    SfCircleIcon,
    SfButton,
    SfSidebar,
    SfIcon,
    LocationSearch,
    ModalComponent,
    Dropdown,
    DropdownContent,
    LoadingCircle
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    value: { type: Number, default: 1 },
    maxLimit: { type: Number, default: 100 },
    index: { type: Number, default: 0 },
    product: { type: Object },
    relatedBpp: { type: Object }
  },
  data() {
    return {
      isActive: false
    };
  },
  setup(props, { root, emit }) {
    const {
      selectedLocation,
      updateLocation
      //setquoteData,
      //setTransactionId,
      //cartItem,
      //token,
      //TransactionId,
      //experienceId
    } = useUiState();
    const isLocationdropOpen = ref(false);
    const _value = ref(props.value);
    const _productIndex = ref(props.index);
    const _maxLimit = ref(props.maxLimit);
    const isShow = ref(false);
    const enableLoader = ref(false);
    const location = ref(selectedLocation?.value?.address);
    const currentUser = root.$store.$fire.auth.currentUser;
    const _relatedBpp = computed(() => props.relatedBpp);

    const toggleLocationDrop = () => {
      isLocationdropOpen.value = !isLocationdropOpen.value;
    };
    const { init, poll, pollResults, stopPolling, polling } = useQuote();
    const isQuoteData = ref(false);

    const goBack = () => {
      root.$router.back();
      toggleSearchVisible(true);
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

    const handleOnGetQuoteError = (onGetQuoteRes) => {
      if (onGetQuoteRes.error) {
        throw 'api fail';
      }
    };

    const getQuote = async (_productIndex) => {
      enableLoader.value = true;
      const cartItems = JSON.parse(root.$store.state.cartItem);
      if (cartItems) {
        root.$store.dispatch('setRelatedBpp', _relatedBpp.value);
        const getQuoteRequest = {
          selectRequestDto: [
            {
              context: {
                // eslint-disable-next-line camelcase
                bpp_id: _relatedBpp.value.context.bpp_id,
                // eslint-disable-next-line camelcase
                bpp_uri: _relatedBpp.value.context.bpp_uri,
                transaction_id: root.$store.state.TransactionId,
                domain: 'mobility'
              },
              message: {
                order: {
                  items: [props.product],
                  fulfillment: {
                    id:
                      _relatedBpp.value.message.catalog['bpp/fulfillments'][0]
                        .id,
                    start:
                      _relatedBpp.value.message.catalog['bpp/fulfillments'][0]
                        .start,
                    end:
                      _relatedBpp.value.message.catalog['bpp/fulfillments'][0]
                        .start
                  },
                  provider: {
                    id:
                      _relatedBpp.value.message.catalog['bpp/providers'][0].id,
                    locations: [
                      {
                        id:
                          _relatedBpp.value.message.catalog['bpp/providers'][0]
                            .locations[0].id
                      }
                    ]
                  }
                }
              }
            }
          ]
        };
        const responseQuote = await init(
          getQuoteRequest,
          root.$store.state.token
        );

        handleOnGetQuoteError(responseQuote);

        root.$store.dispatch(
          'setquoteData',
          JSON.stringify(responseQuote[0].message)
        );

        root.$store.dispatch(
          'setTransactionId',
          responseQuote[0].context.transaction_id
        );

        enableLoader.value = false;
        isQuoteData.value = true;
        root.$router.push('/LocationSearch');
      }
    };

    const changeItemNumber = async (type) => {
      emit('updateItemCount', _value);

      getQuote(_productIndex);
    };

    return {
      isQuoteData,

      changeItemNumber,
      _value,
      _productIndex,
      _maxLimit,
      isLocationdropOpen,
      toggleLocationDrop,
      isShow,
      toggleIsShow,
      location,
      locationSelected,
      currentUser,
      openHamburger,
      goBack,
      getQuote,
      enableLoader,
      _relatedBpp
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
.loader-circle {
  margin-top: 37%;
}

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
</style>
