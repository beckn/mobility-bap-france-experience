<template>
  <client-only>
    <div>
      <div>
        <div class="open-search"></div>
        <div>
          <CurrentLocationMapForOpenStreet :enable="true" :disablepulse="true" :upadateMap="upadateMap" />
        </div>
        <div v-if="!enableLoader" class="open-search header-top-space">
          <div class="open-search-input">
            <div class="inputBox">
              <div class="input1 input-opensearch">
                <SfImage id="icon" src="/icons/Vector.png" alt="Vue Storefront Next" />

                <label>Pickup: </label>

                <!-- v-on:keyup.enter="openSearch" -->
                <input @click="pickupLocation" v-model="pickup" :valid="false" errorMessage="errer" type="text"
                  placeholder="Enter Pickup" v-e2e="'home-search-input'" />
              </div>
              <!-- <div class="hr">  <hr style="width:100%;" />
        <SfImage src="/icons/Transport.svg" alt="Vue Storefront Next" /></div> -->
              <div class="hr-theme-slash-2">
                <div class="hr-line"></div>
                <div class="hr-icon">
                  <!-- <SfImage src="/icons/Transport.svg" alt="Vue Storefront Next" /> -->
                </div>
              </div>

              <div class="input">
                <SfImage id="icon" src="/icons/Vector.png" alt="Vue Storefront Next" />
                <label for=""> Dropoff: </label>

                <input @click="dropLocation" v-model="message" v-on:keyup.enter="openSearch" :valid="false"
                  errorMessage="errer" type="text" placeholder="Enter Destination" v-e2e="'home-search-input'" />
              </div>

              <SfButton :disabled="!message.length" id="btn" class="button-pos sf-button--pure color-primary"
                @click="voilationcheck" v-e2e="'home-search-button'"><label for="btn">Search Rides</label>
                <!-- <span class="sf-search-bar__icon"> contactSupport
            <SfIcon color="var(--c-text)" size="18px" icon="search" />
          </span> -->
              </SfButton>
            </div>
          </div>
          <div v-if="errorMsg" class="error-msg">
            Please fill out this field.
          </div>
          <div v-if="errorMsg2" class="error-msg">
            Pickup and Drop locations are same!.
          </div>
        </div>
        <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
          <br /><br /><br />
          <LoadingCircle :enable="enableLoader" />
          <br />
          <p class="warningtext">Please wait! Searching for cabs..</p>
        </div>
        <template>
          <div class="location-blk d-flex w-100">
            <div class="layout-container">
              <div id="location" class="location-content">
                <SfSidebar :visible="!!isLocationdropOpen" :button="false" title="Set Location"
                  @close="toggleLocationDrop" class="sidebar sf-sidebar--right">
                  <transition name="fade">
                    <client-only>
                      <LocationSearchBar :buttonlocation="buttonlocation" @locationSelected="locationSelected"
                        @toggleLocationDrop="toggleLocationDrop" @edit="edit" v-e2e="'app-location-sidebar'" />
                    </client-only>
                  </transition>
                </SfSidebar>
              </div>
            </div>
          </div>
        </template>

        <div class="sf-footer">
          <SfFooter class="footer">
            <!-- <p><span>By</span> <img src="../assets/images/p-b-phonepe.png" alt="" /> </p> -->
            <p>
              <span class="powered-by">Powered by</span>
              <img src="../assets/images/beckn-logo.png" alt="" />
            </p>
          </SfFooter>
        </div>
      </div>
      <div>
        <template>
          <ContactSupportSlider :visible="isAlert" @close="isAlert = false">
            <template>
              <div class="bar-pos" @click="Alertmodal">
                <SfButton class="sf-button--pure rect-bar-style">
                  <SfImage src="/icons/Rectangle-bar.png" :width="60" :height="5.5" alt="Rectangle bar" />
                </SfButton>
              </div>
              <div>
                <div class="modal-heading">
                  Alert
                  <SfImage src="/icons/Alert.png" :width="15" :height="15" alt="Rectangle bar" />
                </div>
                <div>
                  <hr class="sf-divider" />
                </div>
              </div>
              <div class="modal-body">
                <div class="option-container">
                  <p class="warningtext">
                    This Area has extremely high traffic, <br />
                    Recommend alternate modes of transport. <br /><br />
                    To know more, read the details at :
                    <br />
                    <br />

                    <span @click="openViolatedPolicy" style="cursor: pointer; color: blue">
                      {{ violatedPolicyName }}
                    </span>
                  </p>
                  <button class="color-primary btnclass1" @click="underStandButtonHandler">
                    <div class="f-btn-text">
                      <label style="color: antiquewhite; font-weight: 700">Ok, I Understand</label>
                    </div>
                  </button>
                </div>
              </div>
            </template>
          </ContactSupportSlider>
        </template>
      </div>

      <!-- TODO TERM AND CONDITION MODEL UNCOMMENT IF NEDEDD IN FUTUR -->

      <keep-alive>
        <div class="location-content">
          <BottomSlider :visible="TC_modal">
            <template>
              <div class="bar-pos" @click="TC_toggle">
                <SfButton class="sf-button--pure rect-bar-style">
                  <SfImage src="/icons/Rectangle-bar.png" :width="60" :height="5.5" alt="Rectangle bar" />
                </SfButton>
              </div>

              <div>
                <div>
                  <div>
                    <div style="text-align: center" class="modal-heading1">
                      Imported Order
                    </div>
                    <div>
                      <hr class="sf-divider" />
                    </div>
                  </div>
                  <div>
                    <div class="option-container">
                      <div>
                        <img style="width: 100%; height: 135px" :src="_importedOrderObject !== null
                            ? _importedOrderObject.message.order.item[0]
                              .descriptor.images[0]
                            : ''
                          " alt="brigu lake" />
                      </div>
                      <br />
                      <div style="text-align: center" class="modal-text">
                        You appear to have placed an order for "{{
                          _importedOrderObject !== null
                          ? _importedOrderObject.message.order.item[0]
                            .descriptor.name
                          : null
                        }}"
                      </div>
                      <br />
                      <div class="container">
                        <div style="display: flex; justify-content: space-between">
                          <div>
                            <span class="trektittle">{{
                              _importedOrderObject !== null
                              ? _importedOrderObject.message.order.item[0]
                                .descriptor.name
                              : ''
                            }}
                            </span>
                          </div>
                          <div>
                            <span class="trektittle">Order ID:</span>
                            <span style="
                                overflow: hidden;
                                width: 100px;
                                display: block;
                                text-overflow: ellipsis;
                              ">
                              {{
                                _importedOrderObject !== null
                                ? _importedOrderObject.message.order.id
                                : ''
                              }}
                              <!-- {{
                            decodedOrderObject !== null
                              ? decodedOrderObject.message.order.id
                              : ''
                          }} -->
                            </span>
                          </div>
                        </div>
                        <div style="margin-top: 10px; text-align: center">
                          <P style="font-size: 14px">
                            {{
                              _importedOrderObject !== null
                              ? _importedOrderObject.message.order.item[0]
                                .descriptor.short_desc
                              : ''
                            }}
                          </P>
                        </div>
                        <!-- <div style="display:flex; justify-content: space-between; ">
                          <div>
                           <span class="trektittle"> Booked on</span>
                         </div>
                         <div>
                         <span>21st Jun 2021, 12:21pm</span>
                        </div>
                         </div> -->
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            margin-top: 10px;
                          ">
                          <div>
                            <span class="trektittle">No.of Travellers</span>
                          </div>
                          <div>
                            <span>
                              {{
                                _importedOrderObject !== null
                                ? _importedOrderObject.message.order.item[0]
                                  .quantity
                                : ''
                              }}
                            </span>
                          </div>
                        </div>
                        <div style="display: flex; justify-content: space-between">
                          <div>
                            <span class="trektittle"> Total Price</span>
                          </div>
                          <div>
                            <span>
                              D
                              {{
                                _importedOrderObject !== null
                                ? _importedOrderObject.message.order.item[0]
                                  .price.value
                                : ''
                              }}
                            </span>
                          </div>
                        </div>

                        <!-- Your content goes here -->

                        <!-- more content -->
                      </div>
                      <br />
                      <span class="modal-text">
                        Would you like to see best travel options to reach this
                        location?</span>
                      <br />
                    </div>
                    <div style="margin: 13px">
                      <button class="color-primary btnclass1" @click="TC_toggle">
                        <div class="f-btn-text">
                          <label style="color: antiquewhite; font-weight: 700">Yes! Let's go</label>
                        </div>
                      </button>
                      <br />
                      <button class="color-primary btnclass" @click="TC_toggle">
                        <div class="f-btn-text">
                          <label style="color: #f37a20; font-weight: 700">No, I will travel later</label>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </BottomSlider>
        </div>
      </keep-alive>
    </div>
  </client-only>
</template>

<script>
import { SfButton, SfSidebar, SfIcon, SfImage } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { SfFooter } from '@storefront-ui/vue';
import { ref, onBeforeMount, onMounted, computed } from '@vue/composition-api';
import LocationSearchBar from './LocationSearchBar.vue';
import superAgent from 'superagent';
import CurrentLocationMapForOpenStreet from './CurrentLocationMapForOpenStreet.vue';
import ContactSupportSlider from '../components/ContactSupportSlider.vue';
import BottomSlider from '../components/ConfirmBottomSlider.vue';
import LoadingCircle from '~/components/LoadingCircle';
const {
  selectedLocation,
  updateLocation,
  qurantinetData,
  TC_modal,
  TC_toggle,
} = useUiState();

export default {
  components: {
    SfButton,
    SfIcon,
    SfFooter,
    LocationSearchBar,
    SfSidebar,
    SfImage,
    CurrentLocationMapForOpenStreet,
    ContactSupportSlider,
    BottomSlider,
    LoadingCircle,
  },

  props: {
    importedOrderObject: {
      type: Object,
    },
  },

  setup(props, context) {
    const _importedOrderObject = computed(() => props.importedOrderObject);
    const pickup = ref('Banjul, The Gambia');
    const buttonlocation = ref(false);
    const location = ref(true);
    const message = ref('');
    const errorMsg = ref(false);
    const errorMsg2 = ref(false);
    const upadateMap = ref('');
    const isAlert = ref(false);
    const violatedPolicyName = ref('');
    const violatedPolicyId = ref('');

    const underStandButtonHandler = () => {
      isAlert.value = false;
      openSearch();
    };
    const Alertmodal = () => {
      isAlert.value = !isAlert.value;
    };
    const enableLoader = ref(false);

    // TODO UNCOMMENT THIS CODE IF NEEDED DROP LOCATION FROM IMPORTEDORDEROBJECT

    // if (_importedOrderObject.value) {
    //   const fulfillment_end_loc =
    //     _importedOrderObject.value.message.order.item[0].tags
    //       .fulfillment_end_loc;
    //   const [longStr, latStr] = fulfillment_end_loc.split('/');

    //   const lat = parseFloat(latStr);
    //   const long = parseFloat(longStr);

    //   const latlng = { lat: lat, lng: long };

    //   const geoCodeService = new window.google.maps.Geocoder();

    //   geoCodeService.geocode({ location: latlng }, (results, status) => {
    //     console.log('lat:', latlng.lat, 'lng:', latlng.lng);
    //     if (status === 'OK') {
    //       if (results[0]) {
    //         console.log(results[0]);

    //         console.log(results[0].formatted_address);
    //         message.value = results[0].formatted_address;
    //         context.root.$store.dispatch('updateDlocation', {
    //           late: latStr,
    //           lng: longStr,
    //           addres: results[0].formatted_address
    //         });
    //       } else {
    //         window.alert('No results found');
    //       }
    //     } else {
    //       window.alert('Geocoder failed due to: ' + status);
    //     }
    //   });
    // }

    onMounted(() => {
      context.root.$store.dispatch('updateslocation', {
        lat: 13.45274,
        long: -16.57803,
        addres: 'Banjul, The Gambia',
      });
      let URL = window.location.href;
      if (URL.includes('?')) {
        TC_toggle();
      }
    });

    const voilationcheck = async () => {
      enableLoader.value = true;

      try {
        superAgent
          .post(
            'https://api.mobility-bap-policy-demo.becknprotocol.io/v1/policy/checkViolation/location'
          )
          .set('Content-Type', 'application/json')
          .send({
            locations: [
              `${context.root.$store.state.dLocation.late},${context.root.$store.state.dLocation.lng}`,
            ],
          })
          .then((res) => {
            if (res.body.policyCheckResult[0].violation === false) {
              enableLoader.value = false;
              openSearch();
            } else if (res.body.policyCheckResult[0].violation === true) {
              enableLoader.value = false;
              violatedPolicyName.value =
                res.body.policyCheckResult[0].violatedPolicies[0].name;
              violatedPolicyId.value =
                res.body.policyCheckResult[0].violatedPolicies[0].id;
              Alertmodal();
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    onBeforeMount(async () => {
      let URL = window.location.href;

      if (URL.includes('?')) {
        let experienceId = URL.slice(URL.indexOf('?') + 1);
        context.root.$store.dispatch('setExperienceId', experienceId);
        //setExperienceId(experienceId);
      } else {
        await fetch(
          'https://api.eventcollector.becknprotocol.io/v2/event/experience',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
          }
        )
          .then((res) => {
            return res.text();
          })
          .then((result) => {
            context.root.$store.dispatch('setExperienceId', result);

            //setExperienceId(result);
          })
          .catch((e) => console.error(e));
      }
    });

    const edit = () => {
      if (location.value) {
        pickup.value = '';

        isLocationdropOpen.value = !isLocationdropOpen.value;
      } else if (!location.value) {
        message.value = '';

        isLocationdropOpen.value = !isLocationdropOpen.value;
      }
    };
    const Currentlocation = (latitude, longitude, address) => {
      pickup.value = address;

      context.root.$store.dispatch('updateslocation', {
        lat: latitude,
        long: longitude,
        addres: address,
      });
    };

    const locationSelected = (latitude, longitude, address) => {
      if (location.value) {
        context.root.$store.dispatch('updateslocation', {
          lat: latitude,
          long: longitude,
          addres: address,
        });

        pickup.value = address;
        upadateMap.value = address;
      } else if (!location.value) {
        message.value = address;
        context.root.$store.dispatch('updateDlocation', {
          late: latitude,
          lng: longitude,
          addres: address,
        });
      } else if (pickup.value === message.value) {
        message.value = '';
      }

      updateLocation({
        latitude: latitude,
        longitude: longitude,
        address: address,
      });
    };

    const isLocationdropOpen = ref(false);
    const toggleLocationDrop = () => {
      isLocationdropOpen.value = !isLocationdropOpen.value;
    };
    const pickupLocation = async () => {
      buttonlocation.value = true;
      location.value = true;
      isLocationdropOpen.value = !isLocationdropOpen.value;
    };
    const dropLocation = async () => {
      buttonlocation.value = false;
      location.value = false;
      isLocationdropOpen.value = !isLocationdropOpen.value;
    };

    const openSearch = async () => {
      if (message.value && pickup.value && message.value != pickup.value) {
        if (errorMsg.value) errorMsg.value = false;
        if (errorMsg2.value) errorMsg2.value = false;

        context.root.$router.push({
          name: 'Search',
          params: {
            searchKey: message.value,
            pickuploc: pickup.value,
          },
        });
      } else if (!message.value || !pickup.value) {
        errorMsg.value = true;
        errorMsg2.value = false;
      } else if (message.value === pickup.value) {
        errorMsg2.value = true;
      }
    };

    const openViolatedPolicy = () => {
      context.root.$router.push({
        path: '/QuarantineZone',
        query: {
          policyId: violatedPolicyId.value,
        },
      });
    };

    return {
      pickupLocation,
      selectedLocation,
      message,
      errorMsg,
      errorMsg2,
      openSearch,
      pickup,
      isLocationdropOpen,
      locationSelected,
      location,
      dropLocation,
      toggleLocationDrop,
      buttonlocation,
      edit,
      Currentlocation,
      upadateMap,
      isAlert,
      Alertmodal,
      TC_toggle,
      TC_modal,
      enableLoader,
      voilationcheck,
      underStandButtonHandler,
      violatedPolicyName,
      openViolatedPolicy,
      violatedPolicyId,
      _importedOrderObject,
    };
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: rgba(0, 78, 146, 1);
  pointer-events: none;
}

.option-container {
  padding: 15px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  // text-align: center;
  letter-spacing: 0.6px;

  color: #000000;

  color: #000000;

  .option-head {
    font-weight: 600;
    font-size: 17px;
    padding-bottom: 20px;
  }

  .sf-radio {
    font-size: 15px;
  }
}

.modal-heading1 {
  margin: 13px;
  font-size: 20px;
  font-weight: 500;
}

.modal-heading {
  margin: 13px;
  font-size: 20px;
  font-weight: 500;
}

.modal-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  /* or 157% */

  color: #37474f;
}

.container {
  padding: 8px;
  margin: 10px;
  height: 125px;
  /* set the desired height */
  overflow: auto;
  /* create a scrollable area */
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  border: 1px solid #bbbbbb;
  border-radius: 3px;
}

.trektittle {
  font-style: normal;
  font-weight: 600 !important;
  font-size: 14px !important;
  line-height: 22px !important;
  color: #37474f;
}

.btnclass {
  border-radius: 3px;
  width: 100%;
  height: 48px;
  border: 1px solid rgba(243, 122, 32, 1);
  background: rgba(255, 255, 255, 1);
}

.btnclass1 {
  border-radius: 3px;
  width: 100%;
  height: 48px;
  background: rgba(243, 122, 32, 1);
  border: 1px solid rgba(243, 122, 32, 1);
}

.rect-bar-style {
  padding-left: 45%;
  padding-top: 5px;
}

.modal-body {
  padding: 20px;
  color: #37474f;

  .option-container {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 0.6px;
    padding-bottom: 0px;
    word-spacing: 1.8px;

    color: #000000;

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

.open-search {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  @media (min-width: 560px) {
    padding-top: 40px;
    width: 50%;
    margin: auto;
  }

  .inputBox {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }

  #icon {
    padding-right: 5px;
    padding-top: 3px;
  }

  #btn {
    width: 328px;
    height: 48px;
    background: #f37a20;
    border-radius: 4px;
    width: 100%;

    label {
      font-weight: 600;
      letter-spacing: 0.8px;
      font-size: 17px;
    }
  }

  #btn1 {
    width: 328px;
    height: 48px;
    background: #f37a20;
    border-radius: 4px;
    width: 100%;

    label {
      font-weight: 600;
      letter-spacing: 0.8px;
      font-size: 17px;
    }
  }

  .hr-theme-slash-2 {
    display: flex;
    margin-bottom: 0px;

    .hr-line {
      width: 100%;
      position: relative;
      padding: 7px;
      margin: 9px;
      border-bottom: 1px solid rgba(196, 196, 196, 0.4);
    }

    .hr-icon {
      position: relative;
      top: 11px;
    }
  }

  .input {
    display: flex;
    //padding-top: 5%;
    padding-right: 5%;
    padding-bottom: 5%;

    input::placeholder {
      font-weight: 300;
      font-size: 14px;
    }
  }

  .input1 {
    display: flex;
    padding-top: 8%;
    padding-right: 5%;

    input::placeholder {
      font-weight: 300;
      font-size: 14px;
    }
  }

  .location-drop input {
    font-size: 15px;
    font-weight: 600;
    height: 35px;
  }

  padding: 0px 20px;

  h4 {
    text-align: center;
    font-size: 27px;
    font-weight: 800;
    line-height: 30px;
  }

  p {
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    color: #7c7c7c;
    margin-bottom: 30px;
  }

  .open-search-input {
    border-top-left-radius: 25px;
    // display: flex;
    margin-bottom: 8px;

    // position: relative;
    &.disable {
      h4 {
        padding: 20px;
      }

      button {
        background: #bfbfbf;

        .sf-icon {
          --icon-color: #fff !important;
        }
      }
    }

    input {
      border-radius: 6px;
      width: 100%;
      box-sizing: border-box;
      border: none;
      font-weight: 700;
      font-size: 12px;
      padding: 2px 0 0 4px;
    }

    label {
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
    }

    button {
      width: 100%;
      position: relative;
      padding: 17px;
      height: 63px;
      top: 0;
      color: #fbfcff;
      // background: #F37A20;
      border-radius: 6px;
      // border-bottom-right-radius: 6px;
      right: 0;

      .sf-icon {
        --icon-color: #fff !important;
      }
    }
  }

  .error-msg {
    font-size: 14px;
    color: #d12727;
  }
}

.sf-footer {
  text-align: center;
  background: #fbfcff !important;
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 0;

  p {
    margin: 0;

    span {
      font-size: 17px;
      position: relative;
      top: -6px;

      &.powered-by {
        font-size: 10px;
        top: -1px !important;
      }
    }
  }
}

.warningtext {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.6px;

  color: #000000;
}

.layout-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
