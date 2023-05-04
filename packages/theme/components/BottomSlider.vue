<template>
  <section>
    <SfOverlay :transition="'sf-fade'" :visible="visible"> </SfOverlay>
    <transition :name="'sf-collapse-bottom'">
      <div
        v-if="visible"
        v-focus-trap
        v-click-outside="close"
        class="sf-modal__container modal_main_div"
      >
       
        <div ref="content" class="sf-modal__content content">
          <slot />
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { SfOverlay, SfIcon, SfButton } from '@storefront-ui/vue';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import {
  focusTrap,
  clickOutside
} from '@storefront-ui/vue/src/utilities/directives';
import {
  // ref, onMounted,
  watch,
  toRefs
} from '@vue/composition-api';

export default {
  name: 'BottomSlider',
  components: {
    SfOverlay,
    SfIcon,
    SfButton
  },
  directives: { focusTrap, clickOutside },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { root, emit }) {
    const close = () => {
      emit('close');
    };
    const { visible } = toRefs(props);
    watch(visible, (value) => {
      if (value) {
        root.$nextTick(() => {
          disableBodyScroll(root.$refs.content);
        });
      } else {
        clearAllBodyScrollLocks();
      }
    });

    return {
      close
    };
  }
};
</script>
<style lang="scss" scoped>
.modal_main_div {
  z-index: 3;
  top: auto;
  border-radius: 20px 20px 0px 0px;
}

.content{
  margin:0;
  padding:0;
}
</style>

