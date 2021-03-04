import Vue from "vue";
import Vuex from "vuex";
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
import rights from "./modules/rights"
Vue.use(Vuex);
const Store = new Vuex.Store({
  modules:{
    rights
  },
  state,
  mutations,
  actions,
  getters
});
export default Store;
