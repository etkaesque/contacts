import Vue from "vue";
import Vuex from "vuex";

import contact from "./modules/contact";
import data from "./plugins/data";
import popup from "./modules/popup"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    contact,
    popup
  },
  plugins: [data],
});

export default store;
