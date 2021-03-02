import Vue from "vue";
import Vuex from "vuex";
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
import users from "./modules/users"

Vue.use(Vuex);
const Store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    users
  }
});
export default Store;
