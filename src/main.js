import Vue from "vue";

import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./router/index.js";
import "./index.css";

import MdCard from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
