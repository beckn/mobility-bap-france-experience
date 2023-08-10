<template>
  <div class="dv">
    <div class="layout-container driver-data">
      <div class="location-content">
        <client-only>
          <div class="location-icon">
            <slot>
              <div @click="toggleIsShow" class="" v-e2e="'app-header-location-input-div'">
                <template>
                  <div class="button-pos1">
                    <SfButton class="sf-button--pure rect-bar-style">
                      <!--<span class="sf-search-bar__icon">-->
                      <SfImage src="/icons/Rectangle-bar.png" :width="60" :height="5.5" alt="Rectangle bar" />
                      <!--</span>-->
                    </SfButton>
                  </div>

                  <div>
                    <template>
                      <div class="provider-head aline-center side-padding">
                        <div class="flexy">
                          <div class="text-padding">
                            <div class="aline-center">
                              <div class="p-name">
                                <div v-if="DriverInfo === true">
                                  {{
                                    driverInfo.fulfillment.vehicle.registration
                                  }}
                                </div>
                                <div></div>
                              </div>
                            </div>
                            <span class="flexy">
                              <span class="rating-css">
                                <div v-if="DriverInfo === true">
                                  {{ vehicleMakeAndModal }}
                                </div>
                              </span>
                            </span>
                          </div>
                        </div>
                        <!-- <div class="button-pos">
                              <div class="text-padding">
                                <div class="aline-center">
                                  <div class="p-name text-color">
                                    6363
                                  </div>
                                </div>
                                <span class="flexy">
                                  <span class="">
                                    OTP
                                  </span>
                                </span>
                              </div>
                            </div> -->
                      </div>

                      <!-- <hr class="sf-divider" /> -->
                      <div>
                        <hr class=" hr1 sf-divider" />
                      </div>

                      <div class="provider-head aline-center side-padding">
                        <div class="flexy">
                          <div v-if="DriverInfo === true">
                            <img src="/icons/manjnath.png" alt="" :width="37" :height="39" />
                          </div>
                          <div class="text-padding ">
                            <div class="aline-center">
                              <div class="p-name">
                                <div v-if="DriverInfo === true">
                                  {{ driverInfo.fulfillment.agent.name }}
                                </div>
                                <div v-if="!DriverInfo === true">
                                  Searching for nearby drivers...
                                </div>
                              </div>
                            </div>
                            <div v-if="DriverInfo === true">
                              <span class="flexy">
                                <div class="rating-css">
                                  4
                                </div>
                                <span class="sf-rating__icon">
                                  <SfIcon color="#FADB14" size="16px" icon="star" />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="button-pos">
                          <div v-if="DriverInfo === true">
                            <img class="" src="/icons/Group 125.png" alt="Vue Storefront Next" />
                          </div>
                        </div>
                      </div>

                      <!-- <div class="provider-head aline-center side-padding">
                              <div class="t-c-l-data">
                                Temperature  
                              </div>
                              <div class="button-pos t-c-l-data" >
                                97.3<sup><span>&#176;</span></sup>F
                              </div>    
                            </div>

                            <div class="provider-head aline-center side-padding">
                              <div class="t-c-l-data">
                                Last Checked at
                              </div>
                              <div class="button-pos t-c-l-data" >
                                12:34pm
                              </div>    
                            </div>

                            <div class="provider-head aline-center side-padding">
                              <div class="t-c-l-data">
                                Language Known
                              </div>
                              <div class="button-pos t-c-l-data" >
                                Hindi & Kannada
                              </div>    
                            </div> -->
                    </template>
                  </div>
                </template>
              </div>
            </slot>
          </div>
        </client-only>
        <div>
          <template>
            <div class="location-content">
              <BottomSlider :visible="isShow" @close="closeModal">
                <template>
                  <div class="bar-pos" @click="toggleIsShow">
                    <SfButton class="sf-button--pure ">
                      <SfImage src="/icons/Rectangle-bar.png" :width="60" :height="5.5" alt="Rectangle bar" />
                    </SfButton>
                  </div>

                  <div>
                    <div>
                      <template>
                        <div>
                          <div class="provider-head aline-center side-padding ">
                            <div class="flexy">
                              <div class="button-pos"></div>
                              <div class="text-padding">
                                <div class="aline-center">
                                  <div class="p-name">
                                    <div v-if="DriverInfo === true">
                                      {{
                                        driverInfo.fulfillment.vehicle
                                          .registration
                                      }}
                                    </div>
                                  </div>
                                </div>
                                <span class="flexy">
                                  <span class="rating-css">
                                    <div v-if="DriverInfo === true">
                                      {{ vehicleMakeAndModal }}
                                    </div>
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div class="button-pos">
                              <!-- <div class="text-padding">
                              <div class="aline-center">
                                <div class="p-name text-color">
                                  6363
                                </div>
                              </div>
                              <span class="flexy">
                                <span class="">
                                  OTP
                                </span>
                              </span>
                            </div> -->
                            </div>
                          </div>

                          <div>
                            <hr class="sf-divider" />
                          </div>

                          <div class="provider-head aline-center side-padding">
                            <div class="flexy">
                              <div v-if="DriverInfo === true">
                                <img src="/icons/manjnath.png" alt="" :width="37" :height="39" />
                              </div>
                              <div class="text-padding">
                                <div class="aline-center">
                                  <div class="p-name">
                                    <!-- {{ driverInfo.fulfillment.agent.name }} -->
                                    <div v-if="DriverInfo === true">
                                      {{ driverInfo.fulfillment.agent.name }}
                                    </div>
                                    <div v-if="!DriverInfo === true">
                                      Searching for nearby drivers...
                                    </div>
                                  </div>
                                </div>
                                <div v-if="DriverInfo === true">
                                  <span class="flexy">
                                    <div class="rating-css">
                                      4
                                    </div>
                                    <span class="sf-rating__icon">
                                      <SfIcon color="#FADB14" size="16px" icon="star" />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="button-pos">
                              <div v-if="DriverInfo === true">
                                <img class="" src="/icons/Group 125.png" alt="Vue Storefront Next" />
                              </div>
                            </div>
                          </div>

                          <!-- <div class="provider-head aline-center side-padding"> -->
                          <!-- <div class="t-c-l-data">
                                    Temperature  
                                  </div>
                                  <div class="button-pos t-c-l-data" >
                                    97.3<sup><span>&#176;</span></sup>F
                                  </div>     -->
                          <!-- </div> -->

                          <!-- <div class="provider-head aline-center side-padding"> -->
                          <!-- <div class="t-c-l-data">
                                    Last Checked at
                                  </div>
                                  <div class="button-pos t-c-l-data" >
                                    12:34pm
                                  </div>     -->
                          <!-- </div> -->

                          <!-- <div class="provider-head aline-center side-padding"> -->
                          <!-- <div class="t-c-l-data">
                                    Language Known
                                  </div>
                                  <div class="button-pos t-c-l-data" >
                                    Hindi & Kannada
                                  </div>     -->
                          <!-- </div> -->

                          <div class="provider-head aline-center side-padding">
                            <div class="flexy">
                              <div class="text-padding">
                                <span class="flexy">
                                  <span class="rating-css">
                                    Total fare
                                  </span>
                                </span>

                                <div class="aline-center">
                                  <div class="p-name">
                                    D{{
                                      Math.round(driverInfo.quote.price.value)
                                    }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="button-pos">
                              <div class="text-padding">
                                <div class="aline-center">
                                  <span class="p-name">Payment</span>
                                  <span class="p-name">Cash</span>
                                </div>
                                <!-- <span class="flexy text-color">
                                change
                              </span> -->
                              </div>
                            </div>
                          </div>

                          <div class=" provider-head aline-center side-padding">
                            <div class="flexy">
                              <SfIcon class="locationicon" color="#f37a20" size="20px" icon="marker" />

                              <div class="text-padding1">
                                <div class="aline-center">
                                  <div class="p-name">
                                    Source
                                  </div>
                                </div>
                                <div class="rating-css">
                                  <div>
                                    <input type="text" :value="_SourceLocation" disabled />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- <div class="button-pos text-color" >
                                    Edit
                                  </div>     -->
                          </div>

                          <div class="provider-head aline-center side-padding">
                            <div class="flexy">
                              <SfIcon class="locationicon" color="#2081F3" size="20px" icon="marker" />

                              <div class="text-padding1">
                                <div class="aline-center">
                                  <div class="p-name">
                                    Destination
                                  </div>
                                </div>
                                <span class="flexy">
                                  <div class="rating-css">
                                    <input type="text" :value="_destloc" disabled />
                                  </div>
                                </span>
                              </div>
                            </div>
                            <!-- <div class="button-pos text-color" >
                                    Edit
                                  </div>     -->
                          </div>
                          <br />
                          <div>
                            <hr class="sf-divider" />
                          </div>
                          <div @click="isShow = false">
                            <SfButton id="btn" @click="isContactSupport = true">
                              Contact Support
                              <SfIcon class="button-pos">
                                <SfImage id="icon" src="/icons/contactSupport.png" alt="Vue Storefront Next" :width="40"
                                  :height="42" />
                              </SfIcon>
                            </SfButton>
                          </div>

                          <div style="cursor: pointer;" v-if="!cancelRide" class="cancel-order" @click="goBack2">
                            Cancel Ride
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </BottomSlider>
            </div>
          </template>
          <div>
            <template>
              <ContactSupportSlider :visible="isContactSupport" @close="isContactSupport = false">
                <template>
                  <div class="bar-pos" @click="contactSupport">
                    <SfButton class="sf-button--pure rect-bar-style">
                      <SfImage src="/icons/Rectangle-bar.png" :width="60" :height="5.5" alt="Rectangle bar" />
                    </SfButton>
                  </div>
                  <div>
                    <div class="modal-heading">Contact Support</div>
                    <div>
                      <hr class="sf-divider" />
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="option-container">
                      <!-- <div class="option-head">
                        you can reach out to one of our customer support
                        executives for any help, queries or feedback to ABC Mart
                      </div> -->
                      <SfButton class="support-btns" @click="openWindow('tel:' + `+919876542183`)"
                        aria-label="Close modal" type="button">Call us</SfButton>
                      <SfButton class="support-btns" @click="openWindow('mailto:' + `john.soans@gmail.com`)"
                        aria-label="Close modal" type="button">Email us</SfButton>
                      <!-- TO DO chat with us button  -->
                      <!-- <SfButton
                        class="support-btns"
                        @click="openWindow(isSupportAvailable.uri)"
                        aria-label="Close modal"
                        type="button"
                        >Chat with us</SfButton
                      > -->
                    </div>
                  </div>
                </template>
              </ContactSupportSlider>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfCircleIcon,
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfInput
} from '@storefront-ui/vue';
import ProductCard from '~/components/ProductCard';
import { ref, onBeforeMount, computed, watch } from '@vue/composition-api';
import { useUiState } from '~/composables';
import LoadingCircle from '~/components/LoadingCircle';
import LocationSearchBar from '../components/LocationSearchBar.vue';
import Dropdown from '../components/Dropdown.vue';
import DropdownContent from '../components/DropdownContent.vue';
import BottomSlider from '../components/ConfirmBottomSlider.vue';
import ContactSupportSlider from '../components/ContactSupportSlider.vue';
import { useSupport } from '@vue-storefront/beckn';

export default {
  name: 'DriverInfo',
  components: {
    BottomSlider,
    ContactSupportSlider,
    SfCircleIcon,
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    ProductCard,
    SfInput,
    LoadingCircle,
    LocationSearchBar,
    Dropdown,
    DropdownContent
  },
  props: ['DriverInfo', 'cancelRide'],
  data() {
    return {
      isActive: false
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
  },

  setup(_, { root }) {
    const {
      poll: onSupport,
      init: support,
      pollResults: supportResult
    } = useSupport('support');

    //const { confirmDataContext } = useUiState();
    const callSupport = async () => {
      const params = [
        {
          context: root.$store.state.confirmDataContext,
          message: {
            // "uri":
            // eslint-disable-next-line camelcase
            ref_id: './mobility/ind.blr/2966@taxi.becknprotocol.io.fulfillment'
          }
        }
      ];

      try {
        const response = await support(params);
        console.log(response.context.message_id);
        await onSupport({
          messageId: response[0].context.message_id
        });
      } catch (error) {
        console.log('Error calling support apis - ', error);
      }
    };

    onBeforeMount(async () => {
      //console.log(confirmDataContext.value);
      await callSupport();
    });

    const { toggleSearchVisible } = useUiState();
    //const isShow = ref(false);
    toggleSearchVisible(false);

    const goBack = () => {
      root.$router.back();
      toggleSearchVisible(true);
    };
    const isSupportAvailable = computed(() => {
      return supportResult.value?.message;
    });
    const mytime = setTimeout(() => {
      root.$router.push('/tripstart');
    }, 10000);
    const goBack2 = () => {
      clearTimeout(mytime);
      root.$router.push('/CancelOrder');
    };

    const trigger = ref(true);
    const currentLocation = () => {
      isLocationdropOpen.value = !isLocationdropOpen.value;
      trigger.value = false;
    };
    const { selectedLocation, updateLocation } = useUiState();
    const isLocationdropOpen = ref(false);
    const isShow = ref(false);
    const isContactSupport = ref(false);
    const location = ref(selectedLocation?.value?.address);
    const currentUser = root.$store.$fire.auth.currentUser;
    const toggleLocationDrop = () => {
      trigger.value = true;
      isLocationdropOpen.value = !isLocationdropOpen.value;
    };
    const toggleIsShow = () => {
      isShow.value = !isShow.value;
    };

    const contactSupport = () => {
      isContactSupport.value = !isContactSupport.value;
    };

    const openHamburger = false;

    const locationSelected = (latitude, longitude, address) => {
      location.value = address;
      selectedLocation.latitude === true;
      // this.$eventBus.$emit(`${address}`)
      // localStorage.setItem('pickup', JSON.stringify(address));
      updateLocation({
        latitude: latitude,
        longitude: longitude,
        address: address
      });
    };
    //const _SourceLocation = ref(JSON.parse(localStorage.getItem('slocation')));
    //const { sLocation, dLocation } = useUiState();
    const _SourceLocation = ref(root.$store.state.sLocation.addres);
    // const _destloc = ref(
    //   JSON.parse(localStorage.getItem('destinationLocation'))
    // );
    const _destloc = ref(root.$store.state.dLocation.addres);

    const closeModal = () => {
      isShow.value = false;
    };
    //const { confirmDatas } = useUiState();
    let confirmData = root.$store.state.confirmDatas;
    const driverInfo = ref(confirmData ? confirmData[0].message.responses[0].message.order : '');

    const parsedItemName = driverInfo.value?.items[0].descriptor.name.split(
      ','
    );

    const vehicleMakeAndModal = `${parsedItemName[1].split(':')[1]} ${parsedItemName[2].split(':')[1]
      }`;

    const openWindow = (link) => {
      window.open(link);
    };

    return {
      driverInfo,
      closeModal,
      isContactSupport,
      contactSupport,
      _SourceLocation,
      _destloc,
      goBack,
      isLocationdropOpen,
      toggleLocationDrop,
      isShow,
      toggleIsShow,
      location,
      locationSelected,
      currentUser,
      openHamburger,
      trigger,
      currentLocation,
      goBack2,
      mytime,
      parsedItemName,
      vehicleMakeAndModal,
      isSupportAvailable,
      openWindow
    };
  }
};
</script>

<style lang="scss" scoped>
body {
  overflow-y: hidden;
}

.top-bar {
  overflow-y: hidden;
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-around;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);

  .icon_back {
    position: absolute;
    left: 0;
    margin: 10px;
  }
}

.loader-circle {
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 110px;
  left: 0;
  height: calc(100vh - 170px);
}

.modal-heading {
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
}

.inputs-container {
  margin-bottom: 28px;
}

.sf-sidebar__content {
  padding: 0 !important;
}

.collected-product-list {
  flex: 1;
}

.a {
  background-color: wheat;
  height: 100%;
  width: 100%;
}

.sf-circle-icon {
  --icon-color: #f37a20;
}

.layout-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.button-pos1,
.bar-pos {
  //display: flex;
  align-items: center;
  //align-content: center;
  height: 5px;
  padding-left: 158px;
  //justify-content: center;
}

.bar-pos {
  padding-left: 0px;
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

.mapdata {
  height: 350px;
  width: 100%;
}

/*.popover-blk{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: rgb(187, 184, 184);
}*/
.contact {
  border-radius: 50%;
  background-color: rgba(243, 122, 32, 0.14);
  height: 50px;
  width: 50px;
}

img {
  border-radius: 18px;
  margin-right: 10px;
}

.hr1 {
  width: 168%;
}

.button-pos {
  position: absolute;
  right: 10px;
  //top: 0;
}

.s-p-price {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  position: absolute;
  right: 10%;
  width: 100px;
  text-align: right;
  color: #f37a20;
}

#icon {
  height: 15.62504768371582px;
  width: 15.624926567077637px;
  padding: 4px;
}

/*.sf-button{
  justify-content: center;
  justify-items: center;
  align-content: center;
  text-align: center;
}*/
.driver-data {
  margin-top: 5px;

  //border: 2px solid #838281;
  z-index: 99999;
  background: #ffffff;
  box-shadow: 0px -5px 40px rgba(0, 0, 0, 0.1);
  //padding: 15px;
  border-radius: 5px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  // border-bottom: 2px solid
  // rgba(67, 70, 78, 1);
  //border-bottom-style: groove;
  //border-bottom: #000000;
  //background-color: white;
}

.cancel-order {
  color: #ff5552;
  display: flex;
  //line-height: 19px;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 19px;

  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.location-block {
  margin-left: 25px;
}

.display-map {
  height: 250px;
  width: 100%;
  background-color: antiquewhite;
}

.locationicon {
  left: 10%;
  width: 30px;
  height: 30px;
  margin-right: 20px;
}

#btn {
  //top:112px;
  //width: 63px;
  height: 48px;
  border-radius: 4px;
  box-shadow: 0px -5px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  margin-bottom: 0%;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.search-bar {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
}

.p-name {
  font-size: 14px;
  font-weight: 700px;
}

.t-c-l-data {
  font-size: 15px;
  font-weight: 400px;
  color: #000000;
  font-family: 'SF Pro Text';
}

.text-padding1 {
  padding-left: 40px;
  width: 80%;
  position: fixed;
}

.text-color {
  color: #f37a20;
}

.modal-body {
  padding: 20px;
  color: #37474f;

  .option-container {

    // TO DO chat with us button
    //padding: 0 10px 60px;
    .option-head {
      font-weight: 400;
      font-size: 15px;
      padding-bottom: 20px;
    }

    .sf-radio {
      font-size: 15px;
    }

    .sf-button {
      width: -webkit-fill-available;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  }
}

.sf-button {
  width: 100% !important;
}

.rect-bar-style {
  padding-top: 5px;
}
</style>
