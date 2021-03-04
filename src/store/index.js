import Vue from "vue";
import Vuex from "vuex";
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
import users from "./modules/users"
import roles from "./modules/roles"
import rights from "./modules/rights"

Vue.use(Vuex);
const Store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    users,
    roles,
    rights
  }
});
export default Store;
