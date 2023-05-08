<template>
  <div class="search-page">
    <div class="top-bar header-top">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div>Search</div>
    </div>

    <div class="open-search-input">
      <div class="input1">
        <SfImage id="icon" src="/icons/Vector.png" alt="Vue Storefront Next" />

        <label>Pickup: </label>

        <input disabled="true" :value="pickuploc" errorMessage="errer" type="text" placeholder="Enter Pickup" />
      </div>

      <div class="hr-theme-slash-2">
        <div class="hr-line"></div>
        <div class="hr-icon"></div>
      </div>

      <div class="input">
        <SfImage id="icon" src="/icons/Vector.png" alt="Vue Storefront Next" />
        <label for=""> Dropoff: </label>

        <input disabled="true" :value="dropLoc" errorMessage="errer" type="text" placeholder="Enter Destination" />
      </div>
    </div>

    <div class="details">
      <!-- <transition-group name="sf-fade" mode="out-in"> -->
      <div v-if="pollResults && pollResults.length > 0" class="search__wrapper-results" key="results">
        <div class="side-padding result-num res res1 ">
          <span><span v-e2e="'total-result'">{{ totalResults(pollResults) }}</span>
            results found
          </span>
        </div>

        <div v-for="(bpp, bppIndex) in pollResults" :key="bppIndex">
          <div v-for="(provider, prIndex) in bpp.bpp_providers" :key="prIndex">
            <div class="provider-head aline-center side-padding">
              <div class="flexy">
                <img class="provide-img" :src="providerGetters.getProviderImages(provider)[0]
                  ? providerGetters.getProviderImages(provider)[0]
                  : require('~/assets/images/store-placeholder.png')
                  " alt="Vila stripe maxi shirt dress" :width="35" :height="36" />

                <div class="text-padding">
                  <div class="aline-center">
                    <div class="p-name">
                      {{ providerGetters.getProviderName(provider, provider) }}
                    </div>
                  </div>
                  <span class="flexy">
                    <span class="rating-css">
                      {{ providerGetters.getProviderDistance(provider) }}
                    </span>
                    <span class="sf-rating__icon">
                      <SfIcon color="#FADB14" size="16px" icon="star" />
                    </span>
                  </span>
                </div>
              </div>
              <div class="exp-provider" @click="openProvider(bpp, provider)">
                Explore All
              </div>
            </div>
            <div class="results--mobile">
              <ProductCard v-for="(product, pIndex) in provider.items.slice(0, 5)"
                @goToProduct="goToProduct(product, provider, bpp)" :key="bppIndex +
                  '-' +
                  prIndex +
                  '-' +
                  pIndex +
                  '-' +
                  keyVal +
                  'product'
                  " :pName="productGetters.getName(product)" :pPrice="productGetters.getPrice(product).regular"
                :pImage="product.descriptor.images[0]" :pWieght="productGetters.getProductWeight(product) + ' kg'"
                :product="product" :pCount="cartGetters.getItemQty(isInCart({ product }))" :pIndex="pIndex"
                @updateItemCount="(item) => updateItemCount(item, provider, bpp, pIndex)
                  " />
            </div>
            <div>
              <hr class="sf-divider" />
            </div>
          </div>
        </div>
      </div>

      <CurrentLocationMap :enable="enableLoader" key="marker" />

      <div v-if="noSearchFound" key="no-search" class="before-results">
        <SfImage src="/icons/feather_search.svg" class="" alt="error" loading="lazy" />
        <p>
          <b>{{ $t('Your search did not yield ') }}</b>
        </p>
        <p>
          <b>{{ $t('any results ') }}</b>
        </p>
        <p>{{ $t('Please try searching again using ') }}</p>
        <p>{{ $t('different keyword') }}</p>
      </div>
      <!-- </transition-group> -->
    </div>
  </div>
</template>
<script>
import {
  SfIcon,
  SfSearchBar,
  SfButton,
  SfImage,
  SfBottomModal
} from '@storefront-ui/vue';
import { ref, onBeforeMount, watch, onMounted } from '@vue/composition-api';
import LoadingCircle from '~/components/LoadingCircle';
import ProductCard from '~/components/ProductCard';
import Footer from '~/components/Footer';
import { useUiState } from '~/composables';
import debounce from 'lodash.debounce';
import Filterpage from '~/pages/Filterpage';
import CurrentLocationMap from '~/components/CurrentLocationMap';
import {
  productGetters,
  providerGetters,
  cartGetters,
  useCart,
  useFacet,
  useSearch
} from '@vue-storefront/beckn';

export default {
  name: 'Search',
  components: {
    Filterpage,
    LoadingCircle,
    SfBottomModal,
    SfIcon,
    SfSearchBar,
    SfButton,
    ProductCard,
    Footer,
    SfImage,
    CurrentLocationMap
  },
  setup(_, context) {
    const {
      searchString,
      changeSearchString,
      ///selectedLocation,
      toggleLoadindBar,
      clearCartPopup,
      updateExpPageData,
      //setcartItem,
      /// sLocation,
      //dLocation,
      //setTransactionId,
      //experienceId
    } = useUiState();
    const enableLoader = ref(false);
    const goBack = () => {
      context.root.$router.back();
    };
    const { addItem, cart, isInCart, load } = useCart();
    const data = context.root.$route.params.searchKey;
    const data2 = context.root.$route.params.pickuploc;

    const pickuploc = context.root.$store.state.sLocation.addres

    const searchKey = ref(data);
    const dropLoc = context.root.$store.state.dLocation.addres;
    const keyVal = ref(0);
    const { search, result } = useFacet();
    const { pollResults, poll, polling, stopPolling } = useSearch('search');
    const noSearchFound = ref(false);

    console.log(`${context.root.$store.state.dLocation.late},${context.root.$store.state.dLocation.lng}`);

    watch(
      () => clearCartPopup.value,
      (newVal) => {
        if (!newVal) {
          keyVal.value++;
        }
      }
    );
    onMounted(() => {
      handleSearch(searchKey.value);
    })

    const handleSearch = debounce(async (paramValue) => {
      if (polling.value) stopPolling();
      enableLoader.value = true;
      if (noSearchFound.value) noSearchFound.value = false;
      toggleLoadindBar(false);

      await search({
        pickup_location: `${context.root.$store.state.sLocation.lat},${context.root.$store.state.sLocation.long}`,
        drop_location: `${context.root.$store.state.dLocation.late},${context.root.$store.state.dLocation.lng}`,
        experienceId: context.root.$store.state.experienceId,
        created_at: Date.now()
      });

      context.root.$store.dispatch('setTransactionId', (result.value.data.ackResponse.context.transaction_id));

      watch(
        () => pollResults.value,
        async (newValue) => {
          if (newValue?.length > 0 && enableLoader.value) {
            enableLoader.value = false;
            if (context.root.$store.state.experienceId !== null) {
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
                        experienceId: context.root.$store.state.experienceId,
                        eventCode: 'mbth_snt_catalogue',
                        eventAction: 'sent catalogue',
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
            toggleLoadindBar(true);

            const nonEmptyBppProvderPollResult = pollResults.value.filter(
              (pollResult) => pollResult.bpp_providers.length !== 0
            );
            context.root.$store.dispatch('setcartItem', (JSON.stringify(nonEmptyBppProvderPollResult)));
          }
        }
      );
      // eslint-disable-next-line camelcase
      await poll({
        message_id: result.value.data.ackResponse.context.message_id
      });

      watch(
        () => polling.value,
        (newValue) => {
          if (!newValue) {
            enableLoader.value = false;
            toggleLoadindBar(false);
            if (pollResults?.value.length === 0) {
              noSearchFound.value = true;
            }
          } else {
            enableLoader.value = true;
            noSearchFound.value = false;
          }
        }
      );
    }, 1000);

    onBeforeMount(async () => {
      await load();
      if (searchKey.value) {
        handleSearch(searchKey.value);
      }
    });

    const searchHit = (value) => {
      if (value?.target?.value) {
        if (value.target.value === searchString.value) {
          handleSearch(value.target.value);
        } else {
          changeSearchString(value.target.value);
        }
      }
    };

    watch(searchString, (newVal) => {
      if (newVal !== '') {
        searchKey.value = newVal;
        handleSearch(newVal);
      }
    });

    const onSearchChange = (value) => {
      searchKey.value = value;
    };

    const clearSearch = () => {
      searchKey.value = '';
      handleSearch('');
    };

    const totalResults = (newValue) => {
      if (newValue) {
        let reusltNum = 0;
        for (const bpp of newValue) {
          for (const provider of bpp.bpp_providers) {
            reusltNum += provider.items.length;
          }
        }
        return reusltNum;
      }
    };

    const footerClick = () => {
      context.root.$router.push('/cart');
    };

    const goToProduct = (product, provider, bpp) => {
      const data = btoa(
        JSON.stringify({
          product,
          bpp: {
            id: bpp.bpp_id,
            descriptor: bpp.bpp_descriptor
          },
          bppProvider: {
            id: provider.id,
            descriptor: provider.descriptor
          },
          locations: provider.locations
        })
      );
      context.root.$router.push({
        path: '/product',
        query: {
          data: data
        }
      });
    };

    const updateItemCount = (data, provider, bpp, index) => {
      addItem({
        product: provider.items[index],
        quantity: data,
        customQuery: {
          bpp: {
            id: bpp.bpp_id,
            descriptor: bpp.bpp_descriptor
          },
          bppProvider: {
            id: provider.id,
            descriptor: provider.descriptor
          },
          locations: provider.locations
        }
      });
    };

    const openProvider = (bpp, provider) => {
      updateExpPageData({
        bpp: {
          // eslint-disable-next-line camelcase
          bpp_descriptor: bpp.bpp_descriptor,
          // eslint-disable-next-line camelcase
          bpp_id: bpp.bpp_id
        },
        provider,
        searchValue: searchKey.value
      });
      context.root.$router.push('/ExploreProvider');
    };

    return {
      goBack,
      enableLoader,
      productGetters,
      providerGetters,
      cartGetters,
      searchKey,
      pickuploc,
      dropLoc,
      keyVal,
      noSearchFound,
      cart,
      pollResults,
      isInCart,
      onSearchChange,
      clearSearch,
      updateItemCount,
      handleSearch,
      searchHit,
      footerClick,
      totalResults,
      goToProduct,
      openProvider
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
  background: #f8f7f7;
  //box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
}

.icon_back {
  position: absolute;
  left: 0;
  margin: 10px;
}

.res1 {
  padding: 12px;
}

.search-page {
  #icon {
    padding-right: 5px;
    padding-top: 3px;
  }
}

.exp-provider {
  display: none;
}

.rating-css {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #37474f;
  height: 20px;
  //font-weight: bold;
  //width: 10px;
  font-family: 'SF Pro Text';
}

.open-search-input {
  // display: flex;
  background: #f8f7f7;
  padding-left: 14px;
  margin-bottom: 8px;
  -webkit-box-shadow: 0 15px 8px -6px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0 15px 8px -6px rgba(0, 0, 0, 0.08);
  box-shadow: 0 15px 8px -6px rgba(0, 0, 0, 0.08);

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
    box-sizing: border-box;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    padding: 2px 0 0 4px;
    font-family: 'Inter';
    font-style: normal;
    //font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    letter-spacing: -0.24px;
  }

  label {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    letter-spacing: -0.24px;
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

.input {
  display: flex;
  padding-top: 5%;
  padding-right: 5%;
  padding-bottom: 10%;
  background: #f8f7f7;
}

.input1 {
  display: flex;
  padding-top: 10%;
  padding-right: 5%;
  padding-bottom: 5%;
  background: #f8f7f7;
}

.hr-theme-slash-2 {
  display: flex;
  margin-bottom: 0px;
  background: #f8f7f7;

  .hr-line {
    width: 100%;
    position: relative;

    margin: 11px;
    border-bottom: 1px solid rgba(196, 196, 196, 0.4);
  }

  .hr-icon {
    position: relative;
    top: 11px;
  }
}
</style>
