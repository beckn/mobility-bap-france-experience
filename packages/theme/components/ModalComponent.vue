<!-- <button @click="isShow = !isShow">click Me</button> -->

<template>
  <div v-if="!isShow">
    <div class="popover-bg">
      <div class="popover-content position-relative">
        <h3>Device location is not enabled</h3>
        <p>
          Please provide the permission to access better & hassle free delivery
        </p>

        <div class="position-relative">
          <div
            class="serchbar"
            @click="$emit('toggleLocationDrop')"
            v-e2e="'app-header-location-modal-input-div'"
          >
            <SfButton class="button-pos-left sf-button--pure">
              <SfIcon color="var(--c-text)" size="20px" icon="marker" />
            </SfButton>
            <input
              type="text"
              placeholder="Search for location"
              aria-label="Select Location"
              class="
                  sf-header__search
                  be-search-location
                  sf-search-bar
                  sf-header__search
                  be-search-location
                "
              disabled="!isActive"
              v-e2e="'app-header-location-modal-input'"
            />
            <template class="position-relative">
              <SfButton class="button-pos sf-button--pure">
                <span class="sf-search-bar__icon">
                  <SfIcon color="var(--c-text)" size="18px" icon="search" />
                </span>
              </SfButton>
            </template>
          </div>
          <p class="p1">or</p>
          <div class="btn">
            <div>
              <SfButton id="btn" @click="$emit('currentLocation')">
                <SfIcon>
                  <SfImage
                    id="icon"
                    src="/icons/location.svg"
                    alt="Vue Storefront Next"
                  />
                </SfIcon>

                <h5>ENABLE LOCATION</h5>
              </SfButton>
            </div>
          </div>
        </div>
        <template> </template>

        <!-- <ModalComponent class="modalclass" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { SfButton, SfIcon, SfImage } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';

export default {
  components: {
    SfButton,
    SfIcon,
    SfImage
  },

  setup() {
    const isShow = ref(false);
    const toggleIsShow = () => {
      isShow.value = !isShow.value;
    };

    return {
      isShow,
      toggleIsShow
    };
  }
};
</script>

<style lang="scss" scoped>
.notShown {
  visibility: hidden !important;
  position: absolute;
}
.button-pos {
  position: absolute;
  right: 0;
  top: 0;
}
#icon {
  height: 15.62504768371582px;
  width: 15.624926567077637px;
  padding: 4px;
}
h5 {
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  padding: 4px;
}

input {
  position: relative;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
#btn {
  border-radius: 4px;
  width: 156px;
  height: 22px;
}
.p1 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  /* identical to box height */

  text-align: center;

  /* Black/Normal */

  color: #37474f;
}
</style>
