<!-- <button @click="isShow = !isShow">click Me</button> -->

<template>
  <!--<div v-if="!isShow">-->
  <div v-if="!isShow" >
   <div class="" >
    <template>
      <div>
        <div class="provider-head aline-center side-padding">
          <div class="flexy">
            <div class="text-padding">
              <div class="aline-center">
                <div class="p-name">
                  KA05 AF 6226
                </div>
              </div>
              <span class="flexy">
                <span class="rating-css">
                 Toyota Etios, Silver
                </span>
              </span> 
            </div>
          </div>
          <div class="button-pos" >
            <div class="text-padding">
              <div class="aline-center">
                <div class="p-name">
                  6363
                </div>
              </div>
              <span class="flexy">
                <span class="">
                  OTP
                </span>
              </span> 
            </div>
          </div>    
        </div>
                
        <div><hr class="sf-divider" /></div>

        <div class="provider-head aline-center side-padding">
          <div class="flexy">
            <img
              class="provide-img"
              src="/icons/contactSupport.png"
              alt=""
              :width="37"
              :height="39"
            />
            <div class="text-padding">
              <div class="aline-center">
                <div class="p-name">
                  Manjunath Reddy
                </div>
              </div>
              <span class="flexy">
                <span class="rating-css">
                    4
                </span>
                <span class="sf-rating__icon">
                    <SfIcon color="#FADB14" size="16px" icon="star" />
                </span>
              </span> 
            </div>
                     
          </div>
          <div class="button-pos" >
            <SfButton class="contact">
                <img
                    class="contact-img"
                    id="icon"
                    src="/icons/contact.png"
                    alt="Vue Storefront Next"
                />
            </SfButton>
          </div>    
        </div>

        <div class="provider-head aline-center side-padding">
          <div>
            Temperature  
          </div>
          <div class="button-pos" >
            97.3*F
          </div>    
        </div>

        <div class="provider-head aline-center side-padding">
          <div>
            Last Checked at
          </div>
          <div class="button-pos" >
            12:34pm
          </div>    
        </div>

        <div class="provider-head aline-center side-padding">
          <div>
            Language Known
          </div>
          <div class="button-pos" >
            Hindi & Kannada
          </div>    
        </div>

        <div class="provider-head aline-center side-padding">
          <div class="flexy">
            <div class="text-padding">
             <span class="flexy">
                <span class="rating-css">
                 Total fare
                </span>
              </span> 
              <div class="aline-center">
                <div class="p-name">
                  €80
                </div>
              </div>
            </div>
          </div>
          <div class="button-pos" >
            <div class="text-padding">
              <div class="aline-center">
                <div>
                  Payment <span class="p-name">Google Pay</span>
                </div>
              </div>
              <span class="flexy">
                change
              </span> 
            </div>
          </div>    
        </div>
                
        <div><hr class="sf-divider" /></div>

        <div class="position-relative">
          <div class="flexy">
            <SfButton class="button-pos-left sf-button--pure">
              <SfIcon class="locationicon" color="#f37a20" size="20px" icon="marker" /> 
            </SfButton>
            <input
              type="text"
              placeholder=""
              aria-label="Select Location"
            />
            <template class="position-relative">
              <SfButton class="button-pos1 sf-button--pure">
                Edit
              </SfButton>
            </template>
          </div>
        </div>

        <div class="position-relative">
          <div class="flexy">
            <SfButton class="button-pos-left sf-button--pure">
              <SfIcon class="locationicon" color="#2081F3" size="20px" icon="marker" /> 
            </SfButton>
            <input
              type="text"
              placeholder=""
              aria-label="Select Location"
            />
            <template class="position-relative">
              <SfButton class="button-pos1 sf-button--pure">
                Edit
              </SfButton>
            </template>
          </div>
        </div>
        <br/>
        <!--<div class="flexy">   
          <SfIcon class="locationicon" color="#f37a20" size="20px" icon="marker" /> 
          <div class="inputs-container location-block">
            <span>Source</span>
            <div class="search-bar side-padding">
              <SfSearchBar
                placeholder="Enter Source"
                aria-label="Search"
                :icon="null"  
                                     
              >
              </SfSearchBar>
            </div>
          </div>
        </div>-->

        <div><hr class="sf-divider" /></div>
        <!--<div class="flexy">
          <SfIcon color="#2081F3" class="locationicon" size="xxl" icon="marker" />                 
            <div class="inputs-container location-block">
              <span>Destination</span>
                <div class="search-bar side-padding">
                  <SfSearchBar
                    placeholder="Enter Destination"
                    aria-label="Search"
                    :icon="null"  
                                                                
                  >
                  </SfSearchBar>
                </div>
            </div>                 
        </div>-->
        
        <div><hr class="sf-divider" /></div>
          <nuxt-link :to="localePath('/payment')">
          <SfButton id="btn">
            Contact Support
            <SfIcon class="button-pos">
                <SfImage
                    id="icon"
                    src="/icons/contactSupport.png"
                    alt="Vue Storefront Next"
                    :width="20"
                    :height="22"
                />
                </SfIcon>
            </SfButton>
          </nuxt-link>
         
          <div class="cancel-order provider-head aline-center side-padding">
            <label>Cancel Order</label>
          </div>
      </div>
    </template>
  </div>
    <div class="popover-bg">
      <div class="popover-content position-relative">
       

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
  right: 10px;
  //top: 0;
}
.button-pos1 {
  position: absolute;
  right: 0px;
  top: 0;
}
#icon {
  height: 15.62504768371582px;
  width: 15.624926567077637px;
  padding: 4px;
}

input {
  position: relative;
}

.btn {
    //top:112px;
    //background-color: #f37a20;
    width: 63px;
    box-shadow: 0px -5px 40px rgba(0, 0, 0, 0.15);
    width: 100%;
    margin-bottom: 0%;
}

.search-bar{
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
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

  .inputs-container {
    margin-bottom: 28px;
  }
    
  .close {
    position: absolute;
    right: 32px;
    top: 32px;
    width: 32px;
    height: 32px;
    opacity: 1;
  }
  .close:hover {
    opacity: 1;
  }
  .close:before,
  .close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  #btn {
    //top:112px;
    width: 63px;
    box-shadow: 0px -5px 40px rgba(0, 0, 0, 0.15);
    width: 100%;
    margin-bottom: 0%;
  }
  .locationicon{
    left: 10%;
    width: 30px;
    height: 30px;
    margin-right: 20px;
  }
  .s-p-price{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    position: absolute; 
    right: 10%; 
    width: 100px; 
    text-align:right;
    color: #f37a20;
  }
  .loc-input{
    font-size: 12px;
    height: 0px;
    
  }
  .location-block{
    margin-left: 25px;
  }
  .display-map{
    height: 250px;
    width: 100%;
    background-color: antiquewhite;
  }
  img{
    border-radius: 9px;
  }
  .cancel-order{
    color: #FF5552;
    font-family: 'SF Pro Text';
   position: absolute;
  }
  .contact{
    border-radius: 50%;
    background-color: rgba(243, 122, 32, 0.14);
    height: 50px;
    width: 50px;
  }
  
input {
  width: 100%; 
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  background-color: white;
  
}

</style>
