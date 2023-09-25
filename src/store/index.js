import Vue from "vue";
import Vuex from "vuex";

import data from "./plugins/data";
import auth from "./plugins/auth";

import contact from "./modules/contact";
import company from "./modules/company";
import department from "./modules/department";
import division from "./modules/division";
import group from "./modules/group";
import popup from "./modules/popup";
import office from "./modules/office";
import admin from "./modules/admin";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    contact,
    popup,
    company,
    department,
    division,
    group,
    office,
    admin,
  },
  plugins: [data, auth],
});

export default store;
