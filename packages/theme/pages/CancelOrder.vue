<template>
  <div class="cancel-page">
    <div class="top-bar">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div>Cancel booking</div>
    </div>
    <div class="details">
      <div class="detail-head">
        <div class="h-main">You have chosen to cancel the booking</div>
        <div class="h-sub">
          Please accept the provider’s  booking cancellation policy
        </div>
      </div>
      <div><hr class="sf-divider" /></div>
      <div class="detail-body">
        <div class="b-head">Cancellation policy</div>
        <p>
          FIn publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </p>
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </p>
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </p>
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </p>
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </p>
      </div>
    </div>
    <div class="c-footer">
      <button class="sf-button color-primary" @click="openCancelModal = true">
        <div class="f-btn-text">Accept Cancellation Policy</div>
      </button>
    </div>
    <ModalSlide :visible="openCancelModal" @close="goBack()" >
      <div v-if="!canceltext">
        <div class="modal-heading">Cancel booking Reason</div>
        <div><hr class="sf-divider" /></div>
      </div>

      <div class="modal-body">
        <div v-if="!canceltext" class="option-container">
          <div class="option-head">
            Please select the reason for cancellation
          </div>

          <SfRadio
            v-for="value in cancelReasonValues"
            :key="value"
            class="sf-radio--transparent"
            :value="value"
            :label="value"
            :disabled="false"
            :selected="selectedReason"
            @change="selectedReason = value"
          />
        </div>

        <button
          v-if="!canceltext"
          class="sf-button color-primary "
          :class="{ 'is-disabled--button': !selectedReason }"
          @click="cancelBox"
          :disabled="!selectedReason"
        >
          <div class="f-btn-text"> <label> Cancel Ride</label>
           </div>
        </button>
        <div>
          <h4 v-if="canceltext">Booking Cancelled</h4>
          <p v-if="canceltext">
            <!-- Refund will be credited to your account as per refund policy -->
          </p>

          <button
            v-if="canceltext"
            class="sf-button color-primary "
            :class="{ 'is-disabled--button': !selectedReason }"
            @click="onConfirm"
            :disabled="!selectedReason"
          >
            <div class="f-btn-text">Okay</div>
          </button>
        </div>
      </div>
    </ModalSlide>
  </div>
</template>
<script>
import ModalSlide from '~/components/ModalSlide.vue';
import { ref,onMounted } from '@vue/composition-api';
import { SfIcon, SfRadio } from '@storefront-ui/vue';

export default {
  name: 'CancelOrder',
  components: {
    ModalSlide,
    SfIcon,
    SfRadio
  },
  setup(_, context) {
    const openCancelModal = ref(false);
    const selectedReason = ref('');
    const cancelReasonValues = [
      'Plan Changed',
      'Booked by mistake',
      'Unable to contact driver',
      'Driver denied duty'
    ];
    const canceltext = ref(false);
    const cancelBox = () => {
      canceltext.value = true;
    };
    

    const goBack = () => context.root.$router.back();
    const onConfirm = () => context.root.$router.push('/OrderCancelled');

    const closeModal = () => {
      openCancelModal.value = false;
      selectedReason.value = '';
      canceltext.value = false;
    };
    onMounted(() => {
      openCancelModal.value = true
})

    return {
      openCancelModal,
      cancelReasonValues,
      selectedReason,
      goBack,
      onConfirm,
      closeModal,
      cancelBox,
      canceltext
    };
  }
};
</script>

<style lang="scss" scoped>
.cancel-page {
  position: relative;
  height: calc(100vh - 45px);
  .sf-button {
    width: 100%;
    border-radius: 4px;
    height: 48px
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
    .icon_back {
      position: absolute;
      left: 0;
      margin: 10px;
    }
  }

  .c-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: white;
    button {
      margin: 25px;
    }
  }

  .details {
    color: #37474f;
    overflow: scroll;
    height: calc(100vh - 206px);
    .detail-head {
      padding: 30px;
      .h-main {
        font-weight: 500;
        font-size: 20px;
      }
      .h-sub {
        padding-top: 10px;
        font-weight: 500;
        font-size: 12px;
      }
    }
    .detail-body {
      padding: 30px;
      .b-head {
        font-weight: 500;
        font-size: 16px;
      }
      p {
        font-size: 13px;
        line-height: 21px;
      }
    }
  }
  h4 {
    text-align: center;
  }
  label{
    font-family: 'SF Pro Text';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 19px;
  }

  .modal-heading {
    margin: 20px;
    font-size: 20px;
    font-weight: 500;
  }

  .modal-body {
    padding: 20px;
    color: #37474f;
    .option-container {
      padding: 0 10px 60px;
      .option-head {
        font-weight: 600;
        font-size: 17px;
        padding-bottom: 20px;
      }
      .sf-radio {
        font-size: 15px;
      }
    }
  }
}
</style>
