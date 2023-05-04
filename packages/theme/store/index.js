//import { useUiState } from '~/composables';
//const { settoken } = useUiState();

const actions = {
  async onAuthStateChangedAction(state, { authUser }) {
    if (!authUser) {
      // remove state
      state.commit('SET_USER', null);

      // redirect from here
      this.$router.push({
        path: '/Login'
      });
    } else {
      const { uid, email, Aa } = authUser;

      state.commit('settoken', Aa);

      //localStorage.setItem('token', Aa);
      state.commit('SET_USER', {
        uid,
        email,
        Aa
      });
      this.$router.push({
        path: '/'
      });
    }
  },
  updateslocation({ commit }, location) {
    commit('UPDATE_S_LOCATION', location);
  },
  updateDlocation({ commit }, location) {
    commit('UPDATE_D_LOCATION', location);
  },
  setExperienceId({ commit }, id) {
    commit('Set_ExperienceId', id);
  },

  setName({ commit }, name) {
    commit('Set_Name', name);
  },
  setphoneNo({ commit }, phone) {
    commit('Set_phoneNo', phone);
  },
  settrackLat({ commit }, data) {
    commit('Set_trackLat', data);
  },
  settrackLong({ commit }, data) {
    commit('Set_trackLong', data);
  },
  setquoteData({ commit }, data) {
    commit('Set_quoteData', data);
  },
  setTransactionId({ commit }, data) {
    commit('Set_TransactionId', data);
  },
  setinitResult({ commit }, data) {
    commit('Set_initResult', data);
  },
  setcartData({ commit }, data) {
    commit('Set_cartData', data);
  },
  setcartItem({ commit }, data) {
    commit('Set_cartItem', data);
  },
  settoken({ commit }, data) {
    commit('Set_token', data);
  },
  setconfirmData({ commit }, data) {
    commit('Set_confirmData', data);
  },
  setconfirmDataContext({ commit }, data) {
    commit('Set_confirmDataContext', data);
  }
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  UPDATE_S_LOCATION(state, location) {
    state.sLocation = location;
  },
  UPDATE_D_LOCATION(state, location) {
    state.dLocation = location;
  },
  Set_ExperienceId(state, id) {
    state.experienceId = id;
  },
  Set_Name(state, name) {
    state.Name = name;
  },
  Set_phoneNo(state, phone) {
    state.phoneNo = phone;
  },
  Set_trackLat(state, data) {
    state.trackLat = data;
  },
  Set_trackLong(state, data) {
    state.trackLong = data;
  },
  Set_quoteData(state, data) {
    state.quoteData = data;
  },
  Set_TransactionId(state, data) {
    state.TransactionId = data;
  },
  Set_initResult(state, data) {
    state.initResult = data;
  },
  Set_cartData(state, data) {
    state.cartData = data;
  },
  Set_cartItem(state, data) {
    state.cartItem = data;
  },
  Set_token(state, data) {
    state.token = data;
  },
  Set_confirmData(state, data) {
    state.confirmDatas = data;
  },
  Set_confirmDataContext(state, data) {
    state.confirmDataContext = data;
  }
};

const state = () => ({
  user: null,
  sLocation: {
    lat: '',
    long: '',
    addres: ''
  },
  dLocation: {
    late: '',
    lng: '',
    addresss: ''
  },
  experienceId: '',
  Name: '',
  phoneNo: '',
  trackLat: '',
  trackLong: '',
  quoteData: '',
  TransactionId: '',
  initResult: '',
  cartData: '',
  cartItem: '',
  token: '',
  confirmDatas: '',
  confirmDataContext: ''
});

const getters = {
  getUser(state) {
    return (
      state.user,
      state.sLocation,
      state.dLocation,
      state.experienceId,
      state.Name,
      state.phoneNo,
      state.trackLat,
      state.trackLong,
      state.quoteData,
      state.TransactionId,
      state.initResult,
      state.cartData,
      state.cartItem,
      state.token,
      state.confirmDatas,
      state.confirmDataContext
    );
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
