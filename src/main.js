import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import Routes from "./router/index.js";
import store from "./store/index.js";
import "./index.css";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import vueDebounce from "vue-debounce";
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.use(vueDebounce, {
  listenTo: ["input", "keyup"],
});
Vue.use(VueMaterial);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

new Vue({
  store: store,
  render: (h) => h(App),
  router: router,
}).$mount("#app");
