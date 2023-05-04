<style lang="scss">
@import '../assets/styles.scss';
</style>

<template>
  <div class="header-container">
    <div class="fixed-head">
      <div class="fixed-head-height"></div>
      <div class="head-class">
        <div class="title">
          <nuxt-link :to="localePath('/')">
            <SfImage
              src="/icons/Group.png"
              :width="25"
              :height="20"
              alt="Vue Storefront Next"
            />
          </nuxt-link>
          <h3>
            Travel Buddy
          </h3>
        </div>
        <div>
          <!-- <div class="profile-icon" v-if="!isAuthenticatedUser">
            <nuxt-link :to="localePath('/Policies')"
              ><SfIcon icon="profile" />
            </nuxt-link>
          </div> -->
        </div>

        <div>
          <!-- <nuxt-link :to="localePath('/Login')">
            <div class="sign-in-text" v-if="!isAuthenticatedUser">
              <span></span> Sign In
            </div>
          </nuxt-link> -->
        </div>
      </div>
      <LoadingBar
        :enable="
          enableLoadindBar &&
            ['Product', 'cart', 'Search'].includes($route.name)
        "
      />
      <div
        v-if="['home', 'Search'].includes($route.name)"
        class="h-padding  flexy"
      >
        <!-- <div
          v-if="['Search'].includes($route.name)"
          class="icon-padding circle-centre"
          @click="goBack"
        >
          <SfIcon color="var(--c-text)" size="20px" icon="chevron_left" />
        </div> -->
        <!-- <Location
          :isDisabled="false"
          :class="{ 'disable-location': false }"
          class="location-section aline-center"
          v-e2e="'app-header-location'"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { SfImage, SfIcon, SfBottomModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useWishlist, useUser, useSearch } from '@vue-storefront/beckn';
import { computed, onBeforeUnmount } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import Location from './Location';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { unMapMobileObserver } from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import LoadingBar from './LoadingBar';
import Card from '~/components/Card.vue';

export default {
  components: {
    SfImage,
    SfIcon,
    SfBottomModal,
    Location,
    LoadingBar,
    Card
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const { toggleLoginModal, enableLoadindBar } = useUiState();
    const { setTermForUrl } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { load: loadWishlist } = useWishlist();
    const { stopPolling } = useSearch('search');
    const currentUser = root.$store.$fire.auth.currentUser;

    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    const goBack = () => {
      stopPolling();
      root.$router.back();
    };

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    onSSR(async () => {
      await loadUser();
      await loadWishlist();
    });

    onBeforeUnmount(async () => {
      unMapMobileObserver();
    });

    return {
      accountIcon,
      handleAccountClick,
      setTermForUrl,
      LoadingBar,
      enableLoadindBar,
      goBack,
      currentUser
    };
  },
  computed: {
    isAuthenticatedUser() {
      return this.currentUser !== null;
    }
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  background-color: #ffffff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 10px 0;
    border-bottom: 0.5px solid #f1f1f1;
  }

  .h-padding {
    padding-left: var(--spacer-sm);
    padding-right: var(--spacer-sm);
  }

  .search-bar {
    width: 100%;
    margin-top: 15px;
  }

  .title {
    display: flex;
    flex-direction: row;
    padding: 13px;
    align-items: center;
    // justify-content: center;
  }

  .head-class {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .icon-padding {
    padding-right: 10px;
    cursor: pointer;

    .sf-icon {
      --icon-color: #f37a20 !important;
      width: 20px;
      height: 20px;
    }
  }

  h3 {
    font-style: normal;
    font-family: 'SF Pro Text';
    font-weight: 500;
    font-size: 20px;
    padding-right: 7px;
    padding-left: 3px;
    //line-height: 110%;
    //font-weight: 800;
    //font-size: 55px;
    // line-height: 110%;
    text-align: center;

    // padding-top: 10px;
    letter-spacing: -0.03em;

    color: #f37a20;
  }

  .location-btn {
    color: #37474f;
    padding: 13px 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
    position: relative;
    // z-index: 99;
    background-color: #fbfcff;

    .selected-location {
      font-size: 13px;
      font-weight: 500;
    }

    .location-text {
      font-size: 11px;
    }
  }
}

.sf-overlay {
  background: unset;
}

.header-on-top {
  z-index: 2;
}

.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);

  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}

.burger {
  position: absolute;
  right: 6vw;
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}

.sign-in-text {
  color: #f37a20;
  font-weight: 600;
  padding-right: 10px;
}

.profile-icon {
  padding-right: 10px;
}
</style>
