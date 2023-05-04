<template>
  <div>
    <div class="top-bar header-top">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div class="pagetittle">
        Policies
        <span
          style="background-color: #F37A20; color: aliceblue;border-radius: 50%; font-weight: 400; display: inline-block; width: 15px;text-align: center;">{{
            notification }}</span>
      </div>
    </div>

    <div style="padding: 10px;">
      <label for="Filter"> <span>Filter:</span> </label>
      <select class="custom-select" name="Filter" id="Filter" @change="switchSelect($event)">
        <option value="All"> All</option>
        <option value="New">
          New
        </option>
        <option value="Applied">
          Applied
        </option>
        <option value="Disputed">Disputed</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
    <hr />

    <div v-if="Applied">
      <div style="padding:10px;" v-for="(policy, idx) in AppliedArray" :key="idx">
        <PolicyCard :Applied="true" :pImage="Icon" :pTittle="policy.name" :pType="policy.type"
          :Edate="convertdate(policy.endDate)" :Sdate="convertdate(policy.startDate)" @goToForm="goToForm(policy.id)" />
      </div>
    </div>
    <div v-if="Disputed">
      <div style="padding:10px;" v-for="(policy, idx) in DisputedArray" :key="idx">
        <PolicyCard :Disputed="true" :pImage="Icon" :pTittle="policy.name" :pType="policy.type"
          :Edate="convertdate(policy.endDate)" :Sdate="convertdate(policy.startDate)" @goToForm="goToForm(policy.id)" />
      </div>
    </div>
    <div v-if="New">
      <div style="padding:10px;" v-for="(policy, idx) in NewArray" :key="idx">
        <PolicyCard :New="true" :pImage="Icon" :pTittle="policy.name" :pType="policy.type"
          :Edate="convertdate(policy.endDate)" :Sdate="convertdate(policy.startDate)" @goToForm="goToForm(policy.id)" />
      </div>
    </div>
    <div v-if="Inactive">
      <div style="padding:10px;" v-for="(policy, idx) in inactiveArray" :key="idx">
        <PolicyCard :pImage="Icon" :pTittle="policy.name" :pType="policy.type" :Edate="convertdate(policy.endDate)"
          :Sdate="convertdate(policy.startDate)" @goToForm="goToForm(policy.id)" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from '@vue/composition-api';
import { SfIcon, SfRadio } from '@storefront-ui/vue';
import PolicyCard from '~/components/PolicyCard.vue';
import superAgent from 'superagent';

export default {
  name: 'Policies',

  components: {
    PolicyCard,
    SfIcon,
    SfRadio
  },
  setup(_, context) {
    let AppliedArray = ref([]);
    let DisputedArray = ref([]);
    let NewArray = ref([]);
    let inactiveArray = ref([]);
    const convertdate = (dateString) => {
      let dateObject = new Date(dateString);
      let mnth = ('0' + (dateObject.getMonth() + 1)).slice(-2);
      let day = ('0' + dateObject.getDate()).slice(-2);
      return [day, mnth, dateObject.getFullYear()].join('/');
    };

    //     export const convertUtcToYYMMDD = (dateString: string) => {​​
    //   let date = new Date(dateString),
    //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    //     day = ("0" + date.getDate()).slice(-2);
    //   return [date.getFullYear(), mnth, day].join("-");
    // }​​;

    const Icon = ref('/icons/document.png');
    const myFunction = (policy) => {
      if (policy.status === 'new') {
        NewArray.value.push(policy);
      } else if (policy.status === 'inactive') {
        inactiveArray.value.push(policy);
      } else if (policy.status === 'disputed') {
        DisputedArray.value.push(policy);
      } else if (policy.status === 'applied') {
        AppliedArray.value.push(policy);
      }
    };
    const notification = computed(() => NewArray.value.length);
    onMounted(async () => {
      try {
        const res = await superAgent.get(
          'https://api.mobility-bap-policy-demo.becknprotocol.io/v1/policy'
        );
        res.body.forEach(myFunction);
      } catch (err) {
        console.log(err);
      }
    });

    const switchSelect = (event) => {
      if (event.target.value === 'All') {
        Allpolicy();
      } else if (event.target.value === 'New') {
        Newpolicy();
      } else if (event.target.value === 'Applied') {
        Appliedpolicy();
      } else if (event.target.value === 'Disputed') {
        Disputedpolicy();
      } else if ((event.target.value = 'Inactive')) {
        inactivepolicy();
      }
    };
    const goBack = () => {
      context.root.$router.back();
    };
    const goToForm = (Id) => {
      sessionStorage.setItem('policyId', JSON.stringify(Id));

      context.root.$router.push({
        name: 'QuarantineZone',
        query: {
          policyId: Id
        }
      });
    };
    const Inactive = ref(true);
    const Applied = ref(true);
    const New = ref(true);
    const Disputed = ref(true);

    const inactivepolicy = () => {
      Applied.value = false;
      New.value = false;
      Disputed.value = false;
      Inactive.value = true;
    };
    const Appliedpolicy = () => {
      Applied.value = true;
      New.value = false;
      Disputed.value = false;
      Inactive.value = false;
    };
    const Newpolicy = () => {
      Applied.value = false;
      New.value = true;
      Disputed.value = false;
      Inactive.value = false;
    };
    const Disputedpolicy = () => {
      Applied.value = false;
      New.value = false;
      Disputed.value = true;
      Inactive.value = false;
    };
    const Allpolicy = () => {
      Applied.value = true;
      New.value = true;
      Disputed.value = true;
      Inactive.value = true;
    };

    return {
      AppliedArray,
      DisputedArray,
      NewArray,
      Applied,
      New,
      Disputed,
      Inactive,
      inactiveArray,
      Icon,
      Appliedpolicy,
      Newpolicy,
      Disputedpolicy,
      Allpolicy,
      goBack,
      switchSelect,
      goToForm,
      inactivepolicy,
      notification,
      convertdate
    };
  }
};
</script>

<style lang="scss" scoped>
.active {
  padding: 12px 12px 0px 12px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  align-items: center;
  color: #000000;
  text-decoration: 3.6px underline rgba(243, 122, 32, 1);
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 0px;
}

.custom-select {
  width: 133px;
  height: 35px;
  background: #ffffff;
  border: 1px solid #9c9c9c;
  border-radius: 5px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
}

//.custom-select  option :hover{ color:orangered; }

option {
  box-shadow: 0 0 10px 100px orangered;
}

hr {
  height: 0px;
  border: 1px solid linear-gradient(90deg,
      rgba(0, 78, 146, 0.3) 0.42%,
      rgba(0, 4, 40, 0.3) 100%);
}

.top-bar {
  padding-right: 42%;
  padding-left: 10px;
  margin-bottom: 25px;
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
}

span {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  color: #333333;
}

.pagetittle {

  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 29px;
  /* identical to box height, or 181% */

  text-align: center;

  color: #181725;
}

.inactive {
  padding: 12px 12px 0px 12px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;

  align-items: center;
  padding-bottom: 0px;

  color: #000000;
  color: rgba(0, 0, 0, 0.4);
}
</style>
