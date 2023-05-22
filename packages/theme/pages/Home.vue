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
    const importedOrder = ref(null);
    const isOrderImported = ref(false);
    onBeforeMount(() => {
      let URL = window.location.href;
      if (URL.includes('?')) {
        isOrderImported.value = true;
        let start = URL.indexOf('=') + 1;
        const orderObjectUrl = decodeURIComponent(URL.substring(start));
        sa.get(orderObjectUrl)
          .then((res) => {
            localStorage.setItem('importedOrderObject', res.text);
            importedOrder.value = JSON.parse(res.text);
          })
          .catch((e) => console.error(e));
      }
    });
    return {
      importedOrder,
      isOrderImported
    };
  }
};
</script>
<style>
#home {
  padding-top: 15%;
}
</style>
