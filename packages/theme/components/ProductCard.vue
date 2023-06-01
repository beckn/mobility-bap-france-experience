<template>
  <div class="s-product">
    <div :class="{ horizontal: horizontalView, vertical: !horizontalView }">
      <div class="p-image">
        <SfImage
          @click="$emit('goToProduct')"
          :src="_pImage"
          alt="product img"
          :width="56"
          :height="60"
        />
      </div>
      <div class="s-p-details">
        <div class="price-verified">
          <div @click="$emit('goToProduct')" class="s-p-name">
            {{ _pName.split('-')[0] }}
          </div>
        </div>
        <div class="p-distance">
          {{ providerGetters.getProviderDistance(provider) }} min away
        </div>
        <!-- <div class="s-p-weight">{{ _pWieght }}</div> -->
        <div
          class="price-increase"
          v-if="!!_updatedPrice && _updatedPrice !== _pPrice"
        >
          Price increased by <span>€{{ _updatedPrice - _pPrice }}</span>
        </div>
        <div class="verify-inline-container">
          <div class="s-p-price" v-if="_updatedCount !== 0">
            D {{ Math.round(_updatedPrice ? _updatedPrice : _pPrice) }}
          </div>
        </div>
        <span class="out-stock" v-if="_updatedCount === 0">Out of Stock</span>
      </div>
      <div class="s-p-add-cart">
        <SfImage
          v-if="deleteCard"
          src="/icons/delete.svg"
          alt="delete-icon"
          @click="$emit('deleteItem')"
        />
        <Bookcab
          v-if="!dropdownCouner"
          v-e2e="'add-to-cart'"
          :value="_pCount"
          :product="_product"
          :index="1"
          :relatedBpp="_relatedBpp"
          @updateItemCount="(data) => $emit('updateItemCount', data)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { SfImage, SfIcon } from '@storefront-ui/vue';
import Bookcab from '../pages/BookCab.vue';
import { productGetters, providerGetters } from '@vue-storefront/beckn';
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'ProductCard',
  components: {
    SfImage,
    Bookcab,
    SfIcon
  },
  props: {
    product: { type: Object },
    relatedBpp: { type: Object},
    pName: { type: String, default: '' },
    pIndex: { type: Number, default: 0 },
    pWieght: { type: String, default: '' },
    pPrice: { type: Number, default: '' },
    pImage: { type: String, default: '' },
    pCount: { type: Number, default: 0 },
    updatedPrice: { type: Number, default: null },
    updatedCount: { type: Number, default: null },
    horizontalView: { type: Boolean, default: true },
    deleteCard: { type: Boolean, default: false },
    dropdownCouner: { type: Boolean, default: false }
  },

  setup(props, { emit }) {
    const _pIndex = computed(() => props.pIndex);
    const _pName = computed(() => props.pName);
    const _pWieght = computed(() => props.pWieght);
    const _pPrice = computed(() => props.pPrice);
    const _pImage = computed(() => props.pImage);
    const _pCount = computed(() => props.pCount);
    const _product = computed(() => props.product);
    const _updatedPrice = computed(() => props.updatedPrice);
    const _updatedCount = computed(() => props.updatedCount);
    const _relatedBpp = computed(() => props.relatedBpp)
    const dpList = [1, 2, 3, 4, 'More'];
    const openDropdown = ref(false);
    const dropdownClick = (data) => {
      console.log(data);
      if (data === 'More') {
        emit('dropdownMore');
        openDropdown.value = false;
      } else {
        emit('updateItemCount', data);
        openDropdown.value = false;
      }
    };

    return {
      productGetters,
      providerGetters,
      _pName,
      _pIndex,
      _pWieght,
      _pPrice,
      _pImage,
      _pCount,
      _product,
      dpList,
      openDropdown,
      _updatedPrice,
      _updatedCount,
      dropdownClick,
      _relatedBpp
    };
  },
  methods: {
    getProductBase(product) {
      this.$emit('removeSearchResults');
      return btoa(JSON.stringify(product));
    },
    showModal(pName) {
      const element = document.getElementById(pName);
      element.style.display = 'inline-block';
      setTimeout(() => {
        element.style.display = 'none';
      }, 2000);
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown-container {
  position: relative;

  .dropdown-button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #f37a20;
    font-weight: 700;
    width: 70px;
    height: 30px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 6px;
  }

  .dowpdown {
    background: #ffffff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 0 7px;
    position: absolute;
    width: 56px;
    z-index: 1;

    .dowpdown-item {
      display: flex;
      justify-content: center;
      padding: 7px 0;
    }

    .border {
      border-bottom: 1px solid rgba(226, 226, 226, 0.7);
    }

    .color-text {
      color: #f37a20;
      cursor: pointer;
    }
  }
}

.s-p-name {
  min-height: 0;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 10px;
  color: #37474f;
}

.s-p-price {
  line-height: 10px;
}

.p-image {
  padding-left: 25%;
}

.p-distance {
  line-height: 13px;
  //line-height: 14px;
  padding-bottom: 5px;
  color: #8a8d8e;
  font-family: 'Roboto';
}
</style>
