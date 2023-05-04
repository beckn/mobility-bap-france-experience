<template>
  <div id="payment">
    <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
      <LoadingCircle :enable="enableLoader" :customText="'confirming order'" />
    </div>
    <div class="top-bar header-top">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div class="">Select Payment Method</div>
    </div>

    <div class="details header-push">
      <div class="sub-heading">
        <div class="p-name">Payment</div>
      </div>
      <Card v-if="!!(order && order.cart)">
        <CardContent
          v-for="breakup in order.cart.quote.breakup"
          :key="breakup.title"
          class="flex-space-bw"
        >
          <div class="address-text">{{ breakup.title }}</div>
          <div class="address-text">₹{{ Math.trunc(breakup.price.value) }}</div>
        </CardContent>
        <div>
          <hr class="sf-divider divider" />
        </div>
        <CardContent class="flex-space-bw">
          <div class="address-text bold">Total</div>
          <div class="address-text bold">
            ₹{{ Math.trunc(order.cart.quote.price.value) }}
          </div>
        </CardContent>
      </Card>
      <!-- <div class="sub-heading">
        <div class="p-name">Other</div>
      </div> -->
      <Card>
        <CardContent>
          <div class="redo">
            <input
              type="radio"
              class="container"
              :name="'Payment'"
              :value="'Cash'"
              :disabled="false"
              :selected="paymentMethod"
              @change="changePaymentMethod"
            />
            <img
              style="padding-top:8px; padding-left: 10px;"
              src="/icons/money 2.png"
              alt=""
              :width="30"
              :height="30"
            />
            <label class="cash">Cash</label>
          </div>
        </CardContent>
      </Card>
    </div>
    <BookRide
      class="footer-fixed"
      :buttonText="'Book Now'"
      :buttonEnable="isPayConfirmActive"
    >
    </BookRide>
  </div>
</template>
<script>
import { SfButton, SfRadio, SfIcon, SfImage } from '@storefront-ui/vue';
import { useUiState } from '~/composables';

import {
  ref,
  computed,
  onBeforeMount,
  watch,
  onMounted
} from '@vue/composition-api';

import LoadingCircle from '~/components/LoadingCircle';
// import helpers from '../helpers/helpers';
import { useConfirmOrder, cartGetters } from '@vue-storefront/beckn';

import Card from '~/components/Card.vue';

import BookRide from './BookRide.vue';
import CardContent from '~/components/CardContent.vue';
import helpers, { createConfirmOrderRequest } from '../helpers/helpers';
const { toggleCartSidebar } = useUiState();

export default {
  name: 'Payment',
  components: {
    SfImage,
    SfButton,
    SfIcon,
    Card,
    CardContent,
    SfRadio,
    BookRide,
    LoadingCircle
  },
  methods: {
    openCart() {
      toggleCartSidebar();
    }
  },
  setup(_, context) {
    // const cartData = JSON.parse(localStorage.getItem('cartData')).items[0];

    const paymentMethod = ref('');
    const order = ref({});
    const isOrderVerified = ref(false);
    const enableLoader = ref(false);

    const { init, poll, pollResults, stopPolling } = useConfirmOrder(
      'confirm-order'
    );

    const changePaymentMethod = (value) => {
      paymentMethod.value = value;
    };

    const isPayConfirmActive = computed(() => {
      return paymentMethod.value !== '';
    });
    // const { initResult
    // } = useUiState();

    const confirmRide = async () => {
      enableLoader.value = true;
      const transId = context.root.$store.state.TransactionId; //localStorage.getItem('transactionId');
      const initRes = context.root.$store.state.initResult; //JSON.parse();                                                             //;
      const quoteItems = JSON.parse(context.root.$store.state.quoteData); //JSON.parse(localStorage.getItem('quoteData'));
      const cartItems = JSON.parse(context.root.$store.state.cartItem);

      console.log(initRes[0].message.order);

      if (transId && initRes && quoteItems && cartItems) {
        const params = createConfirmOrderRequest(
          transId,
          initRes[0].message.order,
          quoteItems.quote,
          cartItems
        );
        const response = await init(params, context.root.$store.state.token);
        setTimeout(async () => {
          await poll(
            { messageIds: response[0].context.message_id },
            context.root.$store.state.token
          );
        }, 500);
      }

      watch(
        () => pollResults.value,
        (newValue) => {
          if (helpers.shouldStopPooling(newValue, 'order')) {
            stopPolling();

            context.root.$store.dispatch('setconfirmData', newValue[0].message);
            context.root.$store.dispatch(
              'setconfirmDataContext',
              newValue[0].context
            );

            context.root.$store.dispatch(
              'setTransactionId',
              newValue[0].context.transaction_id
            );

            sessionStorage.setItem(
              'confirmDataContext',
              JSON.stringify(newValue[0].context)
            );
          }
        }
      );
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
                  eventCode: 'mbth_sent_ride_details',
                  eventAction: 'sent ride details',
                  eventSourceId:
                    'becknify.humbhionline.in.mobility.BPP/beckn_open/app1-succinct-in',
                  eventDestinationId: 'mobilityreferencebap.becknprotocol.io',
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
      enableLoader.value = false;
    };

    const goBack = () => context.root.$router.back();
    // onMounted(() => {
    //   confirmRide();
    // });
    onBeforeMount(async () => {
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
                  eventCode: 'mbtb_bkng_ride',
                  eventAction: 'booking ride',
                  eventSourceId: 'mobilityreferencebap.becknprotocol.io',
                  eventDestinationId:
                    'becknify.humbhionline.in.mobility.BPP/beckn_open/app1-succinct-in',
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
      await confirmRide();
      order.value = JSON.parse(localStorage.getItem('orderProgress'));
    });
    return {
      confirmRide,
      //cartData,
      paymentMethod,
      changePaymentMethod,
      order,
      cartGetters,
      goBack,
      isPayConfirmActive,
      enableLoader,
      isOrderVerified
    };
  }
};
</script>
<style lang="scss" scoped>
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
.container {
  accent-color: #d77753;

  width: 0.8rem;
}

.cash {
  padding-left: 10px;
  padding-top: 10px;
}

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

.redo {
  display: flex;
}

.Rbtn {
  padding-right: 0px;
}

.icon_back {
  position: absolute;
  left: 0;
  margin: 10px;
}

.details {
  margin: 2px 20px;
}

.p-name {
  font-size: 16px;
  font-weight: 600;
  color: #37474f;
}

.sub-heading {
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
}

.loader-circle {
  width: 100%;
  position: fixed;
  z-index: 1;
  // top: 130px;
  left: 0;
  height: 95vh;
}

SfRadio {
  padding-right: 0px;
}

.flex-space-bw {
  justify-content: space-between;
}
</style>
