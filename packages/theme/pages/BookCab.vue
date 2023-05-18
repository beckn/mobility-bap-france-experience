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
    relatedBpp: { type: Object },
  },
  data() {
    return {
      isActive: false
    };
  },
  setup(props, { root, emit }) {
    const {
      selectedLocation,
      updateLocation,
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
    const _relatedBpp = computed(() => props.relatedBpp)

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
    const getQuote = async (_productIndex) => {
      enableLoader.value = true;
      const cartItems = JSON.parse(root.$store.state.cartItem);
      if (cartItems) {
        const getQuoteRequest = [
          {
            context: {
              // eslint-disable-next-line camelcase
              bpp_id: _relatedBpp.value.context.bpp_id,
              // eslint-disable-next-line camelcase
              bpp_uri: _relatedBpp.value.context.bpp_uri,
              transaction_id: root.$store.state.TransactionId,
            },
            message: {
              cart: {
                items: [props.product]
              }
            }
          }
        ];

        const responseQuote = await init(
          getQuoteRequest,
          root.$store.state.token
        );

        if (root.$store.state.experienceId !== null) {
          setTimeout(async () => {
            try {
              await fetch(
                'https://api.eventcollector.becknprotocol.io/v2/event',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  redirect: 'follow', // manual, *follow, error
                  referrerPolicy: 'no-referrer', // no-referrer,
                  body: JSON.stringify({
                    experienceId: root.$store.state.experienceId,
                    eventCode: 'mbtb_ride_slectd',
                    eventAction: 'ride selected',
                    eventSourceId: 'mobilityreferencebap.becknprotocol.io',
                    eventDestinationId:
                      'becknify.humbhionline.in.mobility.BPP/beckn_open/app1-succinct-in',
                    payload: '', //add full context object
                    eventStart_ts: new Date().toISOString()
                  }) // body data type must match "Content-Type" header
                }
              );
            } catch (error) {
              console.error(error);
            }
          }, 1000);
        }

        const msgId = responseQuote[0].context.message_id;
        await poll({ messageIds: msgId }, root.$store.state.token);
      }
      // Loops over the onGetQuote response and checks for error object. If any error then throws 'api fail'
      const handleOnGetQuoteError = (onGetQuoteRes) => {
        onGetQuoteRes.forEach((onGetQuoteRes) => {
          if (onGetQuoteRes.error) {
            throw 'api fail';
          }
        });
      };

      watch(
        () => pollResults.value,
        async (onGetQuoteRes) => {
          if (!polling.value || !onGetQuoteRes) {
            return;
          }

          handleOnGetQuoteError(onGetQuoteRes);

          if (helpers.shouldStopPooling(onGetQuoteRes, 'quote')) {
            stopPolling();

            //setquoteData(JSON.stringify(onGetQuoteRes[0].message));
            root.$store.dispatch('setquoteData', (JSON.stringify(onGetQuoteRes[0].message)));

            root.$store.dispatch('setTransactionId', (onGetQuoteRes[0].context.transaction_id));

            enableLoader.value = false;
            if (root.$store.state.experienceId !== null) {
              setTimeout(async () => {
                try {
                  await fetch(
                    'https://api.eventcollector.becknprotocol.io/v2/event',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      redirect: 'follow', // manual, *follow, error
                      referrerPolicy: 'no-referrer', // no-referrer,
                      body: JSON.stringify({
                        experienceId: root.$store.state.experienceId,
                        eventCode: 'mbth_accept_ride',
                        eventAction: 'quotation sent',
                        eventSourceId:
                          'becknify.humbhionline.in.mobility.BPP/beckn_open/app1-succinct-in',
                        eventDestinationId:
                          'mobilityreferencebap.becknprotocol.io',
                        payload: '', //add full context object
                        eventStart_ts: new Date().toISOString()
                      }) // body data type must match "Content-Type" header
                    }
                  );
                } catch (error) {
                  console.error(error);
                }
              }, 1000);
            }
            isQuoteData.value = true;
            root.$router.push('/LocationSearch');
          }
        }
      );
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
