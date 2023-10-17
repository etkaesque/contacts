import Home from "../views/Home.vue";
import Page404 from "../views/Page404.vue";
import DetailedContact from "../views/DetailedContact.vue";
import StructureManagment from "../views/StructureManagment.vue";
import Login from "../views/AdminstratorLogin.vue";
import AdminManagment from "../views/AdminAcountManagment.vue";
import Companies from "../views/Companies.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: Home,
  },

  { path: "*", component: Page404 },

  { path: "/contact/:id", component: DetailedContact},

  { path: "/structure", component: StructureManagment },

  { path: "/login", component: Login },

  { path: "/admin", component: AdminManagment },

  { path: "/companies", component: Companies },
];

export default routes;
