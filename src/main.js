import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/reset/reset.css";
import "./ElementUI"
import 'element-ui/lib/theme-chalk/index.css';
import "./filters/dateFilter"
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
