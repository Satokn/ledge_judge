import Vue from "vue";
import VueFreezeframe from "vue-freezeframe";
import App from "./App.vue";
import '@/assets/tailwind.css'

Vue.use(VueFreezeframe);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
