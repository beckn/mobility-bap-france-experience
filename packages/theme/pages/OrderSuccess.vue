<template>
  <div id="payment">
    <div class="top-bar header-top"></div>
    <div class="content  header-push">
      <div class="sub-heading">
        <div><img class="im" src="/icons/ratingSubmitted.svg" /></div>
      </div>
      <div class="details">
        <div class="sub-heading dis-block">
          <div class="sub-heading">
            Your trip has completed
          </div>
          <div class="p-name flex-set">Thank you! You have arrived your</div>
          <div class="p-name flex-set">
            destination
          </div>
        </div>
      </div>
      <div id="location-btn">
        <div class="popover-bg">
          <div class="btn-div">
            <div style="display:flex; justify-content: space-between;">
              <div>
                <p class="p1">
                  Total payable amount
                </p>
              </div>
              <div style="padding-top: 4%;">
                <b> {{ getCurrencyValue() }} {{ Math.round(driverInfo.quote.price.value) }}</b>
              </div>
              <!-- <p class="p2">
                Mode
              </p> -->
              <!-- <img src="/icons/money 2.png" alt="" :width="30" :height="30" />
              <b class="b1">Cash on Delivery</b> -->
            </div>

            <div>
              <button class="sf-button button color-primary" link="" @click="goToHomePage">
                <!-- button icon template  -->
                <slot name="buttonIcon" />
                <div class="f-btn-text">Search for another ride</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfButton, SfRadio, SfIcon } from '@storefront-ui/vue';
import { onMounted, onUnmounted } from '@vue/composition-api';

import { ref } from '@vue/composition-api';
// import { onMounted } from '@vue/composition-api';
// import helpers from '../helpers/helpers';
// import { useCart } from '@vue-storefront/beckn';

import Card from '~/components/Card.vue';
//import { useUiState } from '~/composables';
import Footer from '~/components/Footer.vue';
import CardContent from '~/components/CardContent.vue';


export default {
  name: 'OrderSuccess',
  components: {
    SfButton,
    SfIcon,
    Card,
    CardContent,
    SfRadio,
    Footer
  },
  setup(_, context) {
    // const transactionId = context.root.$route.query.id;
    const confirmData = JSON.parse(context.root.$store.state.confirmDatas);
    const driverInfo = ref(confirmData ? confirmData.order : '');

    const goToHomePage = () => {
      context.root.$router.push({
        path: '/'

      });


    };

    const getCurrencyValue = () => {
      if (localStorage.getItem('experienceType')) {
        return '₹'
      }
      if (localStorage.getItem('importedOrderType')) {
        const orderType = localStorage.getItem('importedOrderType');
        if (orderType === 'parisFlow') {
          return '€'
        }
        if (orderType === 'gambiaFlow') {
          return 'D'
        }
        return '₹'

      }
      return 'D'
    }
    return {
      goToHomePage,
      driverInfo,
      confirmData,
      getCurrencyValue
    };
  }
};
</script>
<style lang="scss" scoped>
.im {
  padding-top: 15%;
  padding-right: 5%;
}

img {
  padding-top: 4%;
  padding-left: 3%;
}

// .header-top{
//     position: fixed;
//     width: 100%;
//     top: 45px;
//     z-index: 9;
// }
// .header-push{
//     top: 107px;
//     position: relative;
//     padding-bottom: 107px;
// }
.top-bar {
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-around;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
}

#location-btn {
  padding-top: 15%;
}

.btn-div {
  box-shadow: 0px -7px 9px -7px rgba(0, 0, 0, 0.2);
  padding-bottom: 3%;
}

.p1 {
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  color: #6c6c6e;
}

.p2 {
  padding-top: 5px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  padding-left: 5px;
  padding-right: 1px;

  color: #37474f;
}

b {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height, or 125% */

  color: #000000;
}

.dis-block {
  display: block !important;
}

.details {
  margin: 2px 20px;
}

.content {
  margin: 2px 20px;
}

.p-name {
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  /* or 124% */

  text-align: center;

  color: #6c6c6e;
}

.button {
  width: 100%;
  border-radius: 5px;
  height: 48px;
}

.flex-set {
  display: flex;
  justify-content: space-around;
}

.sub-heading {
  margin: 34px 0px;
  display: flex;
  justify-content: space-around;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;

  /* identical to box height, or 104% */

  text-align: center;

  color: #37474f;
}
</style>
