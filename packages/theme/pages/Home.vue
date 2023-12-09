<template>
  <div id="">
    <OpenSearch v-if="isOrderImported ? !!importedOrder : true" :importedOrderObject="importedOrder" />
    <div @click="openCart"></div>
  </div>
</template>
<script>
import OpenSearch from '../components/OpenSearch';
import { useUiState } from '~/composables';
import { onBeforeMount, onMounted, ref } from '@vue/composition-api';
import helpers from '../helpers/helpers';
import * as sa from 'superagent';
import { useCart } from '@vue-storefront/beckn';

const { toggleCartSidebar } = useUiState();
export default {
  name: 'Home',
  components: {
    OpenSearch
  },

  methods: {
    openCart() {
      toggleCartSidebar();
    }
  },


  setup() {
    const { load } = useCart();
    const importedOrder = ref(null)
    const isOrderImported = ref(false)

    onBeforeMount(() => {
      localStorage.clear()
      function hasQueryParam(url, param) {
        const urlObject = new URL(url);
        return urlObject.searchParams.has(param);
      }

      let appUrl = window.location.href;

      const isUrlWithImportedOrder = hasQueryParam(appUrl, 'external_url')
      const isUrlWithDomainInfo = hasQueryParam(appUrl, 'experienceType')

      if (appUrl.includes('?')) {
        if (isUrlWithImportedOrder) {
          isOrderImported.value = true
          let start = appUrl.indexOf('=') + 1;
          const orderObjectUrl = decodeURIComponent(appUrl.substring(start));
          sa.get(orderObjectUrl).then(res => {
            localStorage.setItem('importedOrderObject', res.text
            )
            importedOrder.value = JSON.parse(res.text)
          }
          ).catch(e => console.error(e))
        }
        if (isUrlWithDomainInfo) {
          let start = appUrl.indexOf('=') + 1;
          const experienceType = decodeURIComponent(appUrl.substring(start));
          localStorage.setItem('experienceType', experienceType)

        }
      }

    })

    onMounted(() => {
      if (localStorage.getItem('cartData')) {
        const cartData = JSON.parse(localStorage.getItem('cartData'));
        const days = helpers.calculateDays(cartData.cartTime, new Date());
        if (days > 7) {
          localStorage.removeItem('cartData');
          localStorage.removeItem('transactionId');
        }
      }
      load();
    });

    return {
      importedOrder,
      isOrderImported
    }
  }
};
</script>
<style>
#home {
  padding-top: 15%;
}
</style>
