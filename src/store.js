import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: []
  },
  mutations: {
    move: function(state, location) {
      return (state.location = location);
    }
  },
  actions: {}
});
