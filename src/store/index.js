import Vue from "vue";
import Vuex from "vuex";
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
<<<<<<< HEAD
=======

>>>>>>> home
Vue.use(Vuex);
const Store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
export default Store;
