<template>
  <div>
    <div class="card" @click="$emit('goToForm')">
      <div class="card-content">
        <div style=" padding-right: 10px;">
          <SfImage :src="_pImage" alt="product img" :width="30" :height="40" />
        </div>
        <div>
          <span class="tittle">{{ _pTittle }}</span>

          <div>
            <span class="subtittle">Start Date: {{ _Sdate }}</span>
            <span class="subtittle">End Date:{{ _Edate }} </span>
            <br />
            <span class="subtittle"
              >Type: <span class="subtittle">{{ _pType }}</span></span
            >
          </div>
        </div>
      </div>
      <div>
        <span>
          <span v-show="Applied" class="tag">Applied</span>
          <span v-show="New" class="tag1">New</span>
          <span v-show="Disputed" class="tag2">Disputed</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { SfImage, SfIcon } from '@storefront-ui/vue';
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'ProductCard',
  components: {
    SfImage,
    SfIcon
  },
  props: {
    New: { type: Boolean, default: false },
    Applied: { type: Boolean, default: false },
    Disputed: { type: Boolean, default: false },
    pType: { type: String, default: '' },
    pTittle: { type: String, default: '' },
    pImage: { type: String, default: '' },
    Sdate: { type: String, default: '' },
    Edate: { type: String, default: '' },
    Tag: { type: String, default: '' }
  },

  setup(props, { emit }) {
    const _pType = computed(() => props.pType);
    const _pTittle = computed(() => props.pTittle);
    const _pImage = computed(() => props.pImage);
    const _Sdate = computed(() => props.Sdate);
    const _Edate = computed(() => props.Edate);
    const _Tag = computed(() => props.Tag);

    return {
      _pImage,
      _pTittle,
      _pType,
      _Sdate,
      _Edate,
      _Tag
    };
  },
  methods: {}
};
</script>
<style scoped>
.card {
  display: flex;
  padding: 10px 25px;
  font-size: 16px;
  border: 0.8px solid #c4c4c4;
  box-shadow: 0px 4px 45px 0px rgba(26, 42, 97, 0.06);
  border-radius: 5px;
  justify-content: space-between;
}
div.card:hover {
  border: 1px solid rgba(243, 122, 32, 1);
  border-radius: 5px;
  cursor: pointer;
}
.card-content {
  display: flex;
}
.tag {
  z-index: +1;
  background: rgba(112, 198, 121, 1);
  border-radius: 3px;
  color: #999;
  display: inline-block;

  line-height: 26px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}
.tag1 {
  z-index: +1;
  background: rgba(243, 122, 32, 1);
  border-radius: 3px;
  color: #999;
  display: inline-block;

  line-height: 26px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}
.tag2 {
  z-index: +1;
  background: rgba(239, 121, 121, 1);
  border-radius: 3px;
  color: #999;
  display: inline-block;

  line-height: 26px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}

.tittle {
  padding-left: 5px;
  font-family: 'Poppins';
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
}
.subtittle {
  padding-left: 5px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 15px;
  /* identical to box height */

  color: #000000;
}
</style>
