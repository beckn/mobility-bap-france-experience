<template>
  <div>
    <nuxt-link :to="localePath('/BookCab')">
    <div class="s-p-addcart">
      <button
        v-if="_value == 0"
        class="color-primary sf-button add-btn"
        :disabled="false"
        link=""
        @click="changeItemNumber('add')"
      >
         Select
      </button>
    </div>
    </nuxt-link>
  </div>
</template>
<script>
import { SfInput, SfIcon } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';

export default {
  name: 'AddToCart',
  components: {
    SfInput,
    SfIcon
  },
  props: {
    value: { type: Number, default: 1 },
    maxLimit: { type: Number, default: 100 },
    //bookCab: {type:Boolean, default: false}
  },
  setup(props, { emit}) {
    //const _BookCab = ref(props.bookCab);
    const _value = ref(props.value);
    const _maxLimit = ref(props.maxLimit);
    const changeItemNumber = (type) => {
     emit('updateItemCount', _value);
    };
    return {
      //_BookCab,
      _value,
      _maxLimit,
      changeItemNumber
    };
  }
};
</script>
<style lang="scss" scoped>
.quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .quantity-value {
    margin-top: 10px;
  }
}
.s-p-addcart{
  width: 139px;
  box-sizing: border-box;
  height: 40px;
  border-radius: 3px;
}
</style>
