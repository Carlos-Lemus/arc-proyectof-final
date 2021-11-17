import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    // isLoggedIn: false,
  },
  mutations: {
    // setLoginSign(state, value) {
    //   state.isLoggedIn = value;
    // },

    setUser(state, userData) {
      state.user = userData;
    },
  },
  actions: {
    // setLoginSignAction(context) {
    //   context.commit('setLogin');
    // },

    setUserAction(context, userData) {
      context.commit('setUser', userData);
    },

  },
  getters: {
    user(state) {
      return state.user;
    },
    // isLoggedIn(state) {
    //   return state.isLoggedIn;
    // },
  },
  modules: {
  }
  
});